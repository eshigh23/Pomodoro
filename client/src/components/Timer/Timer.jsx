import './Timer.css'
import Overlay from '../Overlay/Overlay';

import { useEffect, useState } from 'react'
import { createStudySessionApi } from '../../api/studySessionApi';

export default function Timer({ options, isRunning, setIsRunning,
    currentSession, setCurrentSession, sessionText, setSessionText, timer, setTimer, subject, startedAt
 }) {


    const [isSession, setIsSession] = useState(true)
    const [animate, setAnimate] = useState(false);


    // any point to defining this? yes, the timer should be defined outside.
    useEffect(() => {
        setTimer({
            timer: options.minutes * 60,    // total study time in seconds
            breakTimer: options.breaks * 60,
            prevTime: Date.now() 
        })
    }, [])


    useEffect(() => {
        console.log('currentSession:', currentSession)
    }, [currentSession])


    useEffect(() => {
        console.log('timer!:', timer.timer)
    }, [timer.timer])


    useEffect(() => {
        console.log('break timer!:', timer.breakTimer)
    }, [timer.breakTimer])



    useEffect(() => {
        // The 10ms delay ensures the browser registers the 100% 
        // position before moving to 0.
        const timer = setTimeout(() => setAnimate(true), 10);
        return () => clearTimeout(timer);
    }, []);


    // if timer is resumed after manual pause, set prevTime to right now
    useEffect(() => {
        if (isRunning) {
            setTimer(prev => ({
                ...prev,
                prevTime: Date.now()
            }))
        }
    }, [isRunning])


    // decrement timer each second by comparing previously stored Date obj to new Date obj
    useEffect(() => {
        if (!isRunning) return

        // after manual pause, make sure prevTime starts from current time
        // setTimer(prev => ({...prev, prevTime: Date.now()}))

        const interval = setInterval(() => {

            const now = Date.now()

            setTimer(prev => {
                const timeElapsed = now - prev.prevTime
                const secondsElapsed = timeElapsed / 1000

                return {
                    ...prev,
                    ...(isSession && { timer: prev.timer - secondsElapsed }),
                    ...(!isSession && { breakTimer: prev.breakTimer - secondsElapsed}),
                    prevTime: now
                }
            })
        }, 100)

        return () => clearInterval(interval)
    }, [isRunning, isSession])


    // if session timer is 0 or less, start break
    useEffect(() => {
        if (!timer || Math.round(timer.timer) > 0) return
        console.log('break timer, how many times does this fire')
        handleStartBreak()

    }, [timer?.timer])


    // if break timer is 0 or less, start session
    useEffect(() => {
        if (!timer || Math.round(timer.breakTimer) > 0) return
        handleStartSession()

    }, [timer.breakTimer])


    // start or restart break AND make api call to save session
    const handleStartBreak = async () => {
        setIsSession(false) // stop decrementing timer.timer

        const sessionData = {
            subject,
            duration: options.minutes,
            startedAt,
            completedAt: Date.now()
        }

        console.time("session-create");
        const responseData = await createStudySessionApi(sessionData)
        console.timeEnd("session-create");
        console.log('responseData:', responseData)

        setSessionText(`Break #${currentSession}`)
    }


    // start or restart session, otherwise end timer
    const handleStartSession = () => {

        if (currentSession < options.totalSessions) {   // if current session <= num total sessions, cntu
            setIsSession(true)
            
            const newCurrentSession = currentSession + 1
            setCurrentSession(newCurrentSession)
            setSessionText(`Session #${newCurrentSession}`)

            // reset the timer
            setTimer(prev => ({
                ...prev,
                timer: options.minutes * 60,
                breakTimer: options.breaks * 60, 
            }))
        }
        else {  // end study
            setIsRunning(false)
            setSessionText('Study over!')
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
        <div className={`slide-wrapper ${animate ? 'active' : ''}`}>
    
            <div className="timer">
                <h1>{subject}</h1>
                    <p className="ibm-bold-64">{isSession ? formatCount(timer.timer) : formatCount(timer.breakTimer)}</p>
                    <div className="timer--underline"/>
                <p className="ibm-bold-20">{sessionText}</p>
            </div>
        </div>
        </>
    )
}