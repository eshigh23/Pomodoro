import './Navbar.css'
import { GiTomato } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { logoutUserApi } from '../api/authApi'
import { UserContext } from '../context/userContext'
import { useContext } from 'react'



export default function Navbar() {

    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)

    const navigateToAuth = () => {
        navigate('/auth')
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
        <section className="navbar">
            <GiTomato color="white" size={40}/>
            <p className="ibm-medium-24 clickable">Pomodoro Timer</p>

            { !user ? (
                <p
                    onClick={navigateToAuth}
                    className="ibm-medium-24 clickable"
                >
                        Login/Signup
                </p>

            ) : (
                <p
                    onClick={handleLogout}
                    className="ibm-medium-24 clickable"
                >
                Logout
            </p>
            )}

            {/* <p className="ibm-medium-24">Stats</p>
            <p className="ibm-medium-24">Rewards</p> */}
        </section>
    )
}