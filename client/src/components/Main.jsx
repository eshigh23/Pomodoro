import './Main.css'
import { useEffect, useState, useMemo } from 'react'
import { GiTomato } from "react-icons/gi";
import SubjectScreen from './SubjectScreen/SubjectScreen';
import EndScreen from './EndScreen/EndScreen';
import Start from './Start/Start';
import Timer from './Timer/Timer';
import Overlay from './Overlay/Overlay';
import { Pause, Play } from "lucide-react"

import { useContext } from 'react'
import { UserContext } from '../context/userContext'

import { createStudySessionApi } from '../api/studySessionApi';

import Audio from './Audio/Audio';

 
export default function Main() {

    const { user, setUser } = useContext(UserContext)
    // console.log("user in context:", user)


    const [isRunning, setIsRunning] = useState(false)   // timer running state
    const [screen, setScreen] = useState("start")

    // session state
    const [currentSession, setCurrentSession] = useState(1)
    const [sessionText, setSessionText] = useState(`Session #${currentSession}`)
    const [sessions, setSessions] = useState([])


    const [isOverlay, setIsOverlay] = useState(false)


    const [options, setOptions] = useState({
        minutes: 60,
        breaks: 10,
        totalSessions: 3
    })

    const [timer, setTimer] = useState('')

    const [endStats, setEndStats] = useState()


    // initialize sessions state
    useEffect(() => {
        setSessions(
            Array.from({ length: options.totalSessions }, () => (
                'General'
            ))
        )
    }, [options])


    useEffect(() => {
        console.log("screen:", screen)
    }, [screen])

 
    useEffect(() => {
        console.log('sessions on mount:', sessions)
    }, [sessions])


    const sortedSubjects = useMemo(() => {
        return user?.subjects
            ? [...user.subjects].sort((a, b) => a.localeCompare(b))
            : []
    }, [user?.subjects])


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

            <Audio />
            
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
                { screen === 'start' && (
                    <Start
                        options={options}
                        setOptions={setOptions}
                    />
                )}

                { screen === 'subject' && (
                    <SubjectScreen 
                        sessions={sessions}
                        setSessions={setSessions}
                        sortedSubjects={sortedSubjects}
                        setIsOverlay={setIsOverlay}
                    />
                )}

                { screen === 'timer' && (
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
                        subject={sessions[currentSession - 1]}
                        startedAt={Date.now()}
                    />
                )}

                { screen === 'end' && (
                    <EndScreen 
                        subject={sessions[currentSession - 1]}
                        endStats={endStats}
                    />
                )}
            </div>


            {/* section 3: play & pause, start & button */}
            <div className="main--start-section">

                {/* play and pause button */}
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


                {/* start and end button */}
                <button 
                    className="clickable start-button ibm-bold-36"
                    onClick={()=> {
                        if (screen === 'start') {
                            setScreen('subject')
                        }
                        else if (screen === 'subject') {
                            setIsRunning(true)
                            setScreen('timer')
                        } else {
                            calculateEndStats()
                            setScreen('end')
                        }
                    }}
                >
                        {screen === 'start' && 'Next'}
                        {screen === 'subject' && 'Start'}
                        {screen === 'timer' && 'End'}
                </button>
            </div>

        </section>
    )

}