import './Main.css'
import { useEffect, useState } from 'react'
import { GiTomato } from "react-icons/gi";
import Start from './Start/Start';
import Timer from './Timer/Timer';
 
export default function Main() {

    const [isStarted, setIsStarted] = useState(false)
    const [options, setOptions] = useState({
        minutes: 60,
        breaks: 10,
        totalSessions: 3
    })

    const [subject, setSubject] = useState("")




    useEffect(() => {
        if (subject === 'newSubject')
        console.log("new subject hehe")
    }, [subject])

    useEffect(() => {
        console.log('options:', options)
    }, [options])





    return (
        <section className="main">
            {/* section 1: header */}
            <div className="main--header">
                <GiTomato className="main--icon" size={96}/>
                <p className="ibm-bold-40 uppercase">Pomodoro</p>
            </div>


            {/* section 2: body */}
            <div className="main--body">
                { !isStarted ? (
                    <Start
                        options={options}
                        setOptions={setOptions}
                        subject={subject}
                        setSubject={setSubject}
                    />
                ) : (
                    <Timer
                        options={options}
                        subject={subject}
                        setSubject={setSubject}
                    />
                )}
            </div>


            {/* section 3: start button */}
            <div className="main--start-section">
                <button 
                    className="clickable button ibm-bold-36"
                    onClick={()=> setIsStarted(prev => !prev)}
                >
                        {!isStarted ? 'Start' : 'Pause'}
                </button>
            </div>

        </section>
    )

}