import './Start.css'
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';


export default function Start({ options, setOptions }) {

    const [animate, setAnimate] = useState(false);
    const { theme } = useContext(UserContext)

    useEffect(() => {
        // The 10ms delay ensures the browser registers the 100% 
        // position before moving to 0.
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);



     {/* section 2: body */}
     return (
        <>
        {/* options */}
        <div className="main--option-wrapper ibm-bold-32">
            <input 
                className={`main--option-box light-pink-input ibm-bold-32 ${theme ? 'dark-theme' : ''}`}
                type="number"
                min={1}
                max={1000}
                value={options.minutes}
                onChange={(e) => {
                    setOptions(prev => ({...prev, minutes: e.target.value}))
                }}
            />
            <p className="main--option-text">minute sessions</p>
        </div>


        <div className="main--option-wrapper ibm-bold-32">
            <input 
                className={`main--option-box light-pink-input ibm-bold-32 ${theme ? 'dark-theme' : ''}`}
                type="number"
                min={1}
                max={1000}
                value={options.breaks}
                onChange={(e) => {
                    setOptions(prev => ({...prev, breaks: e.target.value}))
                }}
                />       
            <p className="main--option-text">minute breaks</p>
        </div>

        <div className="main--option-wrapper ibm-bold-32">
            <input 
                className={`main--option-box light-pink-input ibm-bold-32 ${theme ? 'dark-theme' : ''}`}
                type="number"
                min={1}
                max={24}
                value={options.totalSessions}
                onChange={(e) => {
                    setOptions(prev => ({...prev, totalSessions: e.target.value}))
                }}
                />    
            <p className="main--option-text">total sessions</p>
        </div>
    </>
    )
}