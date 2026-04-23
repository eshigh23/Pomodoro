
const User = require('../models/User')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { OAuth2Client } = require('google-auth-library')
const crypto = require("crypto")
const transporter = require('../config/nodemailer')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// services
const createToken = (userId, username) => {

    const token = jwt.sign(
        {
            _id: userId,
            username
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return token
}

const sendEmail = async (email, link) => {

    // @todo-- set email to use actual email
    const info = await transporter.sendMail({
        from: `"YAP Pomodoro" <${process.env.SMTP_USER}>`,    // sender address
        to: "lshigh23@gmail.com",
        subject: "Reset your password",
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>YAP Pomodoro Password Reset Request</h2>
            <p>Click the link below to reset your password:</p>

            <a href="${link}" style="
                display: inline-block;
                padding: 10px 16px;
                background-color: #e74c3c;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
            ">
                Reset Password
            </a>

            <p style="margin-top: 20px;">
                Or copy and paste this into your browser:
            </p>
            <p>${link}</p>

            <p style="margin-top: 20px; font-size: 12px; color: gray;">
                If you didn’t request this, you can ignore this email.
            </p>
            </div>
        `,
        });

    console.log("Message sent: %s", info.messageId);

}

const createUserObjectForAuth = (userId, username, subjects) => {
    return { 
        user: { _id: userId, username: username, subjects: subjects || [] }
    }
}


// controller methods
exports.fetchUserForAuth = async (req, res) => {
    const reqUser = req.user
    console.log("user:", reqUser)

    try {
        if (!reqUser) return res.status(200).send()
        // verify user in db
        // @todo-- move into requireAuth
        const user = await User.findById(reqUser._id)
        if (!user) {
            console.log('no user')
            return res.status(200).send()
        }

        const authUser = createUserObjectForAuth(user._id, user.username, user.subjects)

        return res.status(200).json(authUser)

    } catch (e) {
        console.error(e)
        res.status(500).send()
    }
}


exports.sendforgotPasswordLink = async (req, res) => {
    const { email } = req.body
    console.log("email:", email)

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(200).json({ message: 'If an account exists, a reset link has been sent' })
        }

        // generate random token
        const resetToken = crypto.randomBytes(32).toString("hex")

        // hash token before storing in db
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 1000 * 60 * 30; // 30 min

        await user.save();

        // send link
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        await sendEmail(email, resetUrl)


        console.log("RESET LINK:", resetUrl);
        return res.status(200).json({ message: 'If an account exists, a reset link has been sent' })

    } catch (e) {
        console.error(e)
        return res.status(500).send()
    }
}


exports.resetPassword = async (req, res) => {

    let { password, confirmPassword, token } = req.body
    console.log(password, confirmPassword, token)

    try {
        // hash token and search user
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex")

        console.log('hashedToken:', hashedToken)

        const user = await User.findOne({ resetPasswordToken: hashedToken })
        if (!user) return res.status(404).send()

        // send error message if user 
        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ errorMessage: 'Your link has expired. Please generate a new one.'})
        }

        // compare and update passwords
        if (password !== confirmPassword) {
            console.log('passwords do not match')
            return res.status(400).json({ errorMessage: 'Passwords must match' })
        }

        const hashed = await bcrypt.hash(password, saltRounds)

        user.password = hashed
        user.save()

        return res.status(200).json({ message: 'Your password has been updated' })


    } catch (e) {
        return res.status(500).send()
    }
}


exports.handleGoogleLogin = async (req, res) => {
    const { token } = req.body
    console.log("token in backend:", token)

    try {
        // verify google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        const payload = ticket.getPayload()

        const {
            sub: googleId,
            email,
            name,
        } = payload

        let user = await User.findOne({ googleId })

        if (!user) {
            user = await User.create({
                email,
                username: name,
                googleId,
            })
        }

        let authToken = createToken(user._id, user.username)
        console.log('authToken')

        // 4. Send cookie
        res.cookie('token', authToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false // true in production (https)
        });

        const authUser = createUserObjectForAuth(user._id, user.username, user.subjects)
        return res.status(200).json(authUser)

  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid Google token' });
  }
}


exports.registerUser = async (req, res) => {
    
    try {
        const { username, password, confirmPassword, email } = req.body.userData

        // password validation
        if (password.trim() !== confirmPassword.trim()) {
            return res.status(400).json({ errorMessage: 'Passwords must match.'})
        }

        // look up pre-existing user
        const existingUsername = await User.findOne({ username: username })
        if (existingUsername) {
            return res.status(409).json({ errorMessage: 'Username already taken.' })
        }

        const existingEmail = await User.findOne({ email: email })
        if (existingEmail) {
            return res.status(409).json({ errorMessage: 'Email already taken.' })
        }

        // create hashed password
        const hashed = await bcrypt.hash(password, saltRounds)

        const user = await User.create({
            username: username,
            password: hashed,
            email: email
        })

        console.log("user in backend:", user)


        // create and store jwt token in cookie
        let token = createToken(user._id, user.username)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,  // todo: change to true in prod
            sameSite: "lax"
        })

        const authUser = createUserObjectForAuth(user._id, user.username, user.subjects)

        return res.status(201).json(authUser)


    } catch (e) {
        return res.status(500).send()
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body.userData
        console.log(username, password)

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ errorMessage: 'User with that username not found' })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(400).json({ errorMessage: 'Incorrect password' })

        // create and store jwt token in cookie
        let token = createToken(user._id, user.username)


        res.cookie("token", token, {
            httpOnly: true,
            secure: false,  // todo: change to true in prod
            sameSite: "lax"
        })

        const authUser = createUserObjectForAuth(user._id, user.username, user.subjects)

        return res.status(200).json(authUser)

    } catch (e) {
        console.error(e)
        return res.status(500).send()
    }
}


exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        return res.status(200).json({ message: 'Logged out'})

    } catch (e) {
        return res.status(500).send()
    }
}