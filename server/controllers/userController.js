const User = require('../models/User')

exports.addSubjects = async (req, res) => {
    const { subjects } = req.body
    const authUser = req.user

    console.log('subjects:', subjects)

    try {
        if (!subjects.length) return res.status(209).send()

        // add one to multiple subjects

        const updatedUser = await User.findByIdAndUpdate(authUser._id, {
            $addToSet: {
                subjects: { $each: subjects }
            }
        }, { new: true })

        return res.status(200).json({ updatedSubjects: updatedUser.subjects })

    } catch (e) {
        console.error(e)
        return res.status(500).send()
    }
}