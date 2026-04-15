import { useEffect, useState } from 'react'
import { resetPasswordApi, sendForgotPasswordLinkApi } from '../../api/authApi'
import SendLinkForm from '../../components/SendLinkForm/SendLinkForm'
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm'
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'


export default function ForgotCredentialsPage () {

    const { token } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('token:', token)
    }, [token])

    const [email, setEmail] = useState('')
    const [userPassword, setUserPassword] = useState({
        password: '',
        confirmPassword: ''
    })


    const handleSendLink = async () => {
        try {
            const responseData = await sendForgotPasswordLinkApi(email)
            // setMessage(responseData.message)

        } catch (e) {
            console.error(e)
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()

        try {
            const responseData = await resetPasswordApi({
                password: userPassword.password,
                confirmPassword: userPassword.confirmPassword,
                token
            })
            console.log('responseData reset password:', responseData)
            navigate('/auth', {
                state: { message: "Your password has been reset" }
            })

        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="auth--container">
            <div className="auth--content-container">
                {/* if no token */}
                { !token ? (
                    <SendLinkForm
                        email={email}
                        setEmail={setEmail}
                        onSubmit={handleSendLink}
                />
                ) : (
                    <ResetPasswordForm
                        userPassword={userPassword}
                        setUserPassword={setUserPassword}
                        onSubmit={handleResetPassword}
                    />
                )}
            </div>
        </div>
    )
}