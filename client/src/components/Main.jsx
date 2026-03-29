import './Main.css'
import { useEffect, useState } from 'react'
import { GiTomato } from "react-icons/gi";
import Start from './Start/Start';
import Timer from './Timer/Timer';
import { Pause, Play } from "lucide-react"
 
export default function Main() {

    const [isStarted, setIsStarted] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const [sessionText, setSessionText] = useState('')
    const [currentSession, setCurrentSession] = useState(1)

    const [options, setOptions] = useState({
        minutes: 60,
        breaks: 10,
        totalSessions: 3
    })

    const [subject, setSubject] = useState("")


    useEffect(() => {
        console.log("Session text:", sessionText)
    }, [sessionText])

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
                {/* <p className="ibm-bold-24">YET ANOTHER</p> */}
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
                        isRunning={isRunning}
                        setIsRunning={setIsRunning}
                        currentSession={currentSession}
                        setCurrentSession={setCurrentSession}
                        sessionText={sessionText}
                        setSessionText={setSessionText}
                    />
                )}
            </div>


            {/* section 3: start button */}
            <div className="main--start-section">

                {/* play and pause button */}
                { isStarted && (
                    <button 
                        className="main--play-pause-button"
                        onClick={() => setIsRunning(prev => !prev)}
                    >
                        { isRunning ? (
                            <Pause 
                                size={32} 
                                color="#373737"
                                onClick={() => setSessionText('Session paused')}
                            />
                        ) : (
                            <Play 
                                size={32} 
                                color="#373737"
                                onClick={() => setSessionText(`Session #${currentSession}`)}
                            />
                        )}
                    </button>
                )}

                {/* start and end button */}
                <button 
                    className="clickable start-button ibm-bold-36"
                    onClick={()=> {
                        setIsStarted(prev => !prev)
                        setIsRunning(true)
                        setSessionText(`Session #${currentSession}`)
                    }}
                >
                        {!isStarted ? 'Start' : 'End'}
                </button>
            </div>

        </section>
    )

}