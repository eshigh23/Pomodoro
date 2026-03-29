import './Timer.css'

import { useEffect, useState } from 'react'

export default function Timer({ options, subject, setSubject, isRunning, setIsRunning,
    currentSession, setCurrentSession, sessionText, setSessionText
 }) {


    const [isSession, setIsSession] = useState(true)
    const [animate, setAnimate] = useState(false);


    useEffect(() => {
        // The 10ms delay ensures the browser registers the 100% 
        // position before moving to 0.
        const timer = setTimeout(() => setAnimate(true), 10);
        return () => clearTimeout(timer);
    }, []);


    // count in seconds
    // const [count, setCount] = useState(options.minutes * 60)

    const [timer, setTimer] = useState({
        timer: options.minutes * 60,    // seconds
        prevTime: Date.now()
    })


    // decrement timer each second
    useEffect(() => {
        if (!isRunning) return

        const interval = setInterval(() => {

            const now = Date.now()

            setTimer(prev => {
                const timeElapsed = now - prev.prevTime
                const secondsElapsed = timeElapsed / 1000

                return {
                    timer: prev.timer - secondsElapsed,
                    prevTime: now
                }
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [isRunning])



    useEffect(() => {
        console.log("timer:", timer)
    }, [timer])

    // useEffect(() => {
    //     if (count !== 0) return

    //     handleSessionChange()
    // }, [count])




    const handleSessionChange = () => {
        if (isSession) {    // if currently in session, go to break
            setIsSession(false) 
            setCount(options.breaks * 60)   // set count to break time
            setSessionText(`Break #${currentSession}`)
        }

        else {  // end study or continue to next session
            if (currentSession < options.totalSessions) {   // cntu
                const nextSession = currentSession + 1

                setIsSession(true)
                setCurrentSession(nextSession)
                setSessionText(`Session #${nextSession}`)
                setCount(options.minutes * 60)
            }
            else {  // end study
                setIsRunning(false)
                setSessionText('Study over!')
            }
        }
    }


    const formatCount = (count) => {
        const hours = Math.trunc(count/60/60 % 60)
        const minutes = Math.trunc(count/60 % 60)
        const seconds = Math.trunc(count % 60)
        return `${hours}h ${minutes}m ${seconds}s`
    }


    
    return(
        <div className={`slide-wrapper ${animate ? 'active' : ''}`}>
            <p className="main--subject-text ibm-bold-32">Subject:</p>

            <select 
                className="
                    main--select 
                    ibm-semibold-24 
                    main--subject-text
                    light-pink-input
                "
                value={subject}
                onChange={(e) => setSubject(e.target.value) }
            >
                <option value="Coding">
                    Coding
                </option>

                <option value=''>
                    None
                </option>

                <option value={"newSubject"}>
                    + Add subject
                </option>
            </select>

            <div className="timer">
                <p className="ibm-bold-64">{formatCount(timer.timer)}</p>
                <div className="timer--underline"/>
                <p className="ibm-bold-20">{sessionText}</p>
            </div>
        </div>
    )
}