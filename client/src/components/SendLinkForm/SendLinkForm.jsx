import { useEffect, useState } from 'react'

export default function SendLinkForm({ email, setEmail, onSubmit}) {
    const [linkSent, setLinkSent] = useState(false)
    

    return(
        <form className="auth--form" onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
            setLinkSent(true)
        }}>
        
            <div className="auth--options ibm-bold-24">
                <div className="auth--option-container">
                    <p> Forgot password</p>
                    <div className={`auth--underline active`}></div>
                </div>  
            </div>

            {linkSent && <p>If your email is connected to an account, a link has been sent</p>}

            <div className="auth--input-container">
                <p className="ibm-semibold-20">Email:</p>
                <input
                    className="auth--input"
                    autoComplete="off"
                    type="text"
                    name="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        <button className="light-pink-button overlay--button">Send Link</button>
    </form>
    )
}