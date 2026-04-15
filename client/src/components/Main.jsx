import './Main.css'
import { useEffect, useState } from 'react'
import { GiTomato } from "react-icons/gi";
import EndScreen from './EndScreen/EndScreen';
import Start from './Start/Start';
import Timer from './Timer/Timer';
import Overlay from './Overlay/Overlay';
import { Pause, Play } from "lucide-react"

import { useContext } from 'react'
import { UserContext } from '../context/userContext'

 
export default function Main() {

    const { user, setUser } = useContext(UserContext)
    console.log("user in context:", user)

    const [isStarted, setIsStarted] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const [isEnded, setIsEnded] = useState(false)
    const [sessionText, setSessionText] = useState('')
    const [currentSession, setCurrentSession] = useState(1)
    const [isOverlay, setIsOverlay] = useState(false)

    const [options, setOptions] = useState({
        minutes: 60,
        breaks: 10,
        totalSessions: 3
    })

    const [timer, setTimer] = useState('')


    const [endStats, setEndStats] = useState()

    const [subject, setSubject] = useState("General")

    useEffect(() => {
        console.log("options:", options)
    }, [options])


    const calculateEndStats = () => {

        // calculate total minutes studied
        // first multiply 'full' sessions by options.minutes
        // then calculate partial session by subtracting remaining time from start time of last session
        console.log("timer.timer:", timer.timer)
        console.log('timer in minutes:', timer.timer / 60)
        console.log('Math.trunc timer in minutes:', Math.trunc(timer.timer / 60))

        console.log('currentSession:', currentSession)
        console.log('options.minutes:', options.minutes)
        console.log('options.minutes - timer:', options.minutes - (Math.round(timer.timer / 60)))
        console.log('session * minutes:', (currentSession - 1) * options.minutes)
        console.log('minutes - timer:', options.minutes - (Math.round(timer.timer / 60) ))

        // multiply number of minutes by full complete sessions
        // then add the number of minutes studied for the last session
        const _totalMinutesStudied = 
            ((currentSession - 1) * options.minutes) + (options.minutes - (Math.round(timer.timer / 60)))

        const _totalSessions = 
            Math.round((_totalMinutesStudied / options.minutes) * 10) / 10

        const _avgSessionLength = 
            _totalMinutesStudied / _totalSessions



        console.log("total minutes studied, supposedly:", _totalMinutesStudied)
        console.log("total sessions studied, supposedly:", _totalSessions)
        console.log("avg session length:", _avgSessionLength)

        setEndStats({
            totalMinutesStudied: _totalMinutesStudied,
            totalSessions: _totalSessions,
            avgSessionLength: _avgSessionLength
        })
    }


    // useEffect(() => {
    //     console.log("Session text:", sessionText)
    // }, [sessionText])

    // useEffect(() => {
    //     if (subject === 'newSubject')
    //     console.log("new subject hehe")
    // }, [subject])

    // useEffect(() => {
    //     console.log('options:', options)
    // }, [options])


    return (
        <section className="main">
            
            { isOverlay && (
                <Overlay 
                    setIsOverlay={setIsOverlay}
                />
            )}
            {/* section 1: header */}
            <div className="main--header">
                {/* <p className="ibm-bold-24">YET ANOTHER</p> */}
                <h3>Welcome, {user?.username}</h3>
                <GiTomato className="main--icon" size={96}/>
                <p className="ibm-bold-40 uppercase">Pomodoro</p>
            </div>


            {/* section 2: body */}
            <div className="main--body">
                <p className="main--subject-text ibm-bold-32">Subject:</p>
                <select 
                    className="
                        main--select 
                        ibm-semibold-24 
                        main--subject-text
                        light-pink-input
                    "
                    value={subject}
                    onChange={(e) => {
                        if (e.target.value === 'newSubject') {
                            setIsOverlay(true)
                        }
                        else {
                            setSubject(e.target.value) 
                        }
                    }}
                >
                    <option value="Coding">
                        Coding
                    </option>

                    <option value=''>
                        None
                    </option>

                    <option value="newSubject">
                        + Add subject
                    </option>
                </select>

                { !isStarted ? (
                    <Start
                        options={options}
                        setOptions={setOptions}
                    />
                ) : (
                    !isEnded ? (
                        <Timer
                            options={options}
                            isRunning={isRunning}
                            setIsRunning={setIsRunning}
                            currentSession={currentSession}
                            setCurrentSession={setCurrentSession}
                            sessionText={sessionText}
                            setSessionText={setSessionText}
                            timer={timer}
                            setTimer={setTimer}
                        />
                    ) : (
                        <EndScreen 
                            subject={subject}
                            endStats={endStats}
                        />
                    )
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
                        if (!isStarted) {
                            setIsStarted(prev => !prev)
                            setIsRunning(true)
                            setSessionText(`Session #${currentSession}`)
                        }
                        else {
                            calculateEndStats()
                            setIsEnded(true)
                        }

                    }}
                >
                        {!isStarted ? 'Start' : 'End'}
                </button>
            </div>

        </section>
    )

}