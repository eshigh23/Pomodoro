import './Timer.css'

import { useEffect, useState } from 'react'

export default function Timer({ options, subject, setSubject }) {

    const [isRunning, setIsRunning] = useState(true)
    const [isSession, setIsSession] = useState(true)
    const [currentSession, setCurrentSession] = useState(1)


    // count in seconds
    const [count, setCount] = useState(options.minutes * 60)


    // decrement timer each second
    useEffect(() => {
        if (!isRunning) return

        const interval = setInterval(() => {
            setCount(prevCount => prevCount - 1)
        }, 100)

        return () => clearInterval(interval)
    }, [isRunning])

    useEffect(() => {
        if (count !== 0) return

        handleSessionChange()
    }, [count])




    const handleSessionChange = () => {
        if (isSession) {    // if currently in session, go to break
            setIsSession(false) 
            setCount(options.breaks * 60)   // set count to break time
        }

        else {  // end study or continue to next session
            if (currentSession < options.totalSessions) {   // cntu
                setIsSession(true)
                setCurrentSession(prev => prev + 1)
                setCount(options.minutes * 60)
            }
            else {  // end study
                setIsRunning(false)
                console.log('study time is over')
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
        <>
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
                <p className="ibm-bold-64">{formatCount(count)}</p>
                <div className="timer--underline"/>
                { isRunning ? (
                    <p className="ibm-bold-20">{ isSession ? 'Session' : 'Break'} #{currentSession}</p>
                ):(
                    <p className="ibm-bold-20">Study over!</p>
                )}
                
            </div>
        </>
    )
}