import './EndScreen.css'
import { GiTomato } from 'react-icons/gi'
import { useEffect, useState } from 'react'

export default function EndScreen({ subject, endStats }) {

    const [animate, setAnimate] = useState(false)


    // animation state
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimate(true)
        }, 10)

        return (() => clearTimeout(timer))
    })


    const formatCount = (count) => {
        if (!count) return

        const hours = Math.floor(count / 60)
        const minutes = count % 60
        return `${hours}h ${minutes}m`
    }


    return (
        <div className={`slide-wrapper ${animate ? 'active' : ''}`}>
        <div className="endscreen">

            <div className="end--header ibm-bold-32">
                    <GiTomato className="end--tomato" size={32}/>
                    <p>Session over!</p>
                    <GiTomato className="end--tomato" size={32}/>
            </div>


            <div className="end--middle-col">
                <div className="end--subject-wrapper">
                    <p className="ibm-semibold-24">{subject} study session</p>
                </div>

                <div className="end--row ibm-bold-24">     
                    <p>Total time:</p>
                    <div className="end--col-2">
                        <p>{formatCount(endStats?.totalMinutesStudied)}</p>
                    </div>
                </div>

                <div className="end--row ibm-bold-24">    
                    <p>Avg. session length:</p>
                    <div className="end--col-2">
                        <p>{formatCount(endStats?.avgSessionLength)}</p>
                    </div>
                </div>

                <div className="end--row ibm-bold-24">   
                    <p>Total sessions:</p>
                    <div className="end--col-2">
                        <p>{endStats?.totalSessions}</p>
                    </div>
                </div>

                <div className="end--link ibm-bold-16">     
                   Log in to save your study sessions
                </div>

            </div>
      </div>
    </div>   
    )
}