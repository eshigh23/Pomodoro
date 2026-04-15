export default function ResetPasswordForm({ userPassword, setUserPassword, onSubmit }) {

    return(
        <form className="auth--form" onSubmit={onSubmit}>
        
            <div className="auth--options ibm-bold-24">
                <div className="auth--option-container">
                    <p>Reset password</p>
                    <div className={`auth--underline active`}></div>
                </div>  
            </div>

            {/* <p>{message}</p> */}

            <div className="auth--input-container">
                <p className="ibm-semibold-20">Password:</p>
                <input
                    className="auth--input"
                    autoComplete="off"
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    value={userPassword.password}
                    onChange={(e) => setUserPassword(prev => ({...prev, password: e.target.value}))}
                />
            </div>

            <div className="auth--input-container">
                <p className="ibm-semibold-20">Confirm password:</p>
                <input
                    className="auth--input"
                    autoComplete="off"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={userPassword.confirmPassword}
                    onChange={(e) => setUserPassword(prev => ({...prev, confirmPassword: e.target.value}))}
                />
            </div>
        <button className="light-pink-button overlay--button">Confirm</button>
    </form>
    )
}