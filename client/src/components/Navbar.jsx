import './Navbar.css'
import { GiTomato } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { logoutUserApi } from '../api/authApi'
import { UserContext } from '../context/userContext'
import { useContext } from 'react'


export default function Navbar() {

    const navigate = useNavigate()
    const { user, setUser, theme } = useContext(UserContext)


    const navigateToAuth = () => {
        navigate('/auth')
    }

    const navigateToHome = () => {
        navigate('/')
    }


    const handleLogout = async () => {
        try {
            await logoutUserApi()
            console.log("Logged out!")
            setUser(null)
            navigate('/auth')

        } catch (e) {
            console.error(e)
        }
    }


    return (
        <nav className={`navbar ${theme ? 'dark-theme' : ''} `}>
            <GiTomato color="white" size={40} className="clickable" onClick={navigateToHome}/>
            <div className="navbar__items-container">
            <p className="ibm-medium-20 clickable" >Pomodoro</p>

                { !user ? (
                    <p
                        onClick={navigateToAuth}
                        className="ibm-medium-20 clickable"
                    >
                            Login/Signup
                    </p>

                ) : (
                    <p
                        onClick={handleLogout}
                        className="ibm-medium-20 clickable"
                    >
                    Logout
                </p>
                )}
            </div>

            {/* <p className="ibm-medium-24">Stats</p>
            <p className="ibm-medium-24">Rewards</p> */}
        </nav>
    )
}