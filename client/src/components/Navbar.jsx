import './Navbar.css'
import { GiTomato } from 'react-icons/gi'


export default function Navbar() {

    return (
        <section className="navbar">
            <GiTomato color="white" size={40}/>
            <p className="ibm-medium-24">Pomodoro Timer</p>
            {/* <p className="ibm-medium-24">Stats</p>
            <p className="ibm-medium-24">Rewards</p> */}
        </section>
    )
}