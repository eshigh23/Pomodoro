import './AuthPage.css'
import { useEffect, useState } from 'react'
import { loginUserApi,  registerUserApi } from '../../api/authApi'
import { UserContext } from '../../context/userContext'
import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import { sendForgotPasswordLinkApi, handleGoogleLoginApi } from '../../api/authApi'

export default function AuthPage() {

    const navigate = useNavigate()
    const location = useLocation()
    const message = location.state?.message

    const { setUser } = useContext(UserContext)
    const [authType, setAuthType] = useState('login')
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    })


    // navigate to forgot credentials page
    const handleForgotPassword = async () => {
        navigate('/forgot-credentials')
    }

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const responseData = await handleGoogleLoginApi(credentialResponse)
            console.log('responseData:', responseData)
            setUser(responseData.user)
            navigate('/')

        } catch (e) {
            console.error(e)
        }
    }



    const handleModeChange = (mode) => {
        setAuthType(mode)
        setUserInfo({
            username: '',
            password: '',
            confirmPassword: '',
            email: ''
        })
    }


    const handleLoginUser = async (e) => {
        e.preventDefault()

        try {
            const responseData = await loginUserApi(userInfo)

            setUser(responseData.user)
            navigate('/')
        } catch (e) {
            console.error(e)
        }
    }

    const handleRegisterUser = async (e) => {
        e.preventDefault()

        try {
            const responseData = await registerUserApi(userInfo)
            console.log(responseData)

            setUser(responseData.authUser)
            navigate('/')

        } catch (e) {
            console.error(e)
        }
    }

    return(
        <div className="auth--container">
            <div className="auth--content-container">

                <div className="auth--options ibm-bold-32">
                    <div className="auth--option-container">
                        <p onClick={() => handleModeChange('login')}>Log in</p>
                        <div className={`auth--underline ${authType === 'login' ? 'active' : ''}`}></div>
                    </div>
                    <div className="auth--option-container signup">
                        <p onClick={() => handleModeChange('signup')}>Sign up</p>
                        <div className={`auth--underline ${authType === 'signup' ? 'active' : ''}`}></div>
                    </div>
                </div>
            
            {/* forms */}
            {message && <div className="success">{message}</div>}

            { authType === 'login' ? (
                <form className="auth--form">
                    <div className="auth--input-container">
                        <p className="ibm-semibold-20">Username or email:</p>
                        <input
                            className="auth--input"
                            autoComplete="off"
                            type="text"
                            name="username"
                            value={userInfo.username}
                            onChange={(e) => setUserInfo(prev => ({...prev, username: e.target.value}))}
                        />
                    </div>

                    <div className="auth--input-container">
                        <p className="ibm-semibold-20">Password:</p>
                        <input
                            className="auth--input"
                            type="password"
                            name="password"
                            value={userInfo.password}
                            onChange={(e) => setUserInfo(prev => ({...prev, password: e.target.value}))}
                        />
                    </div>

                    <button className="light-pink-button overlay--button" onClick={handleLoginUser}>Confirm</button>
                </form>
            ) : (
                <form onSubmit={handleRegisterUser} className="auth--form">
                    <div className="auth--input-container">
                        <p className="ibm-semibold-20">Email: </p>
                        <input
                            autoComplete="off"
                            className="auth--input"
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={(e) => setUserInfo(prev => ({...prev, email: e.target.value}))}
                        />
                    </div>
              
                    <div className="auth--input-container">
                        <p className="ibm-semibold-20"> Username:  </p>
                            <input
                                autoComplete="off"
                                className="auth--input"
                                type="text"
                                name="username"
                                value={userInfo.username}
                                onChange={(e) => setUserInfo(prev => ({...prev, username: e.target.value}))}
                            />
                    </div>
   
                    <div className="auth--input-container">
                        <p className="ibm-semibold-20"> Password: </p>
                            <input
                                className="auth--input"
                                type="password"
                                name="password"
                                value={userInfo.password}
                                onChange={(e) => setUserInfo(prev => ({...prev, password: e.target.value}))}
                            />
                    </div>

                    <div className="auth--input-container">
                    <p className="ibm-semibold-20"> Confirm password: </p>
                        <input
                            className="auth--input"
                            type="password"
                            name="confirmPassword"
                            value={userInfo.confirmPassword}
                            onChange={(e) => setUserInfo(prev => ({...prev, confirmPassword: e.target.value}))}
                        />
                
                    </div>
                    <button className="light-pink-button overlay--button">Confirm</button>
                </form>
            )}

            {/* <p className="ibm-semibold-16">--OR--</p> */}
            <div className="auth--google-divider"/>

            <GoogleLogin
                onSuccess={credentialResponse => {
                    handleGoogleLogin(credentialResponse)
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
            
            { authType==='login' && (
                <p 
                    onClick={handleForgotPassword}
                    className="ibm-semibold-14 auth--forgot-credentials"
                >
                    Forgot password
                </p>
            )}
            </div>
        </div>

    )
}