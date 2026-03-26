import './Main.css'
import { useEffect, useState } from 'react'
import { GiTomato } from "react-icons/gi";
 
export default function Main() {

    const [isStarted, setIsStarted] = useState(false)
    const [selected, setSelected] = useState('regular')
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isStarted) return

        const interval = setInterval(() => {
            setCount(prevCount => prevCount + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [isStarted])


    const formatCount = (count) => {
        const hours = Math.trunc(count/60/60 % 60)
        const minutes = Math.trunc(count/60 % 60)
        const seconds = Math.trunc(count % 60)
        return `${hours}h ${minutes}m ${seconds}s`
    }


    return (
        <section className="main">
            <GiTomato className="main--icon" size={96}/>
            <p className="main--header-text ibm-bold-40 uppercase">Pomodoro</p>
            <div className="main--subject-container">
                <p className="ibm-bold-32">Subject:</p>
                    <select 
                        className="
                            main--select 
                            ibm-semibold-24 
                            main--subject-text
                            light-pink-input"
                    >
                        <option value="none">
                            None
                        </option>
                         <option value="none">
                            + Add subject
                        </option>
                    </select>
            </div>

            <div className="main--input-options ibm-bold-32">
                <div className="main--input-option">
                    <div className="main--option-box light-pink-input">
                        <p>60</p>
                    </div>
                    <p>minute sessions</p>
                </div>

                <div className="main--input-option">
                    <div className="main--option-box light-pink-input">
                        <p>10</p>
                    </div>
                    <p>minute breaks</p>
                </div>

                <div className="main--input-option">
                    <div className="main--option-box light-pink-input">
                        <p>3</p>
                    </div>
                    <p>total sessions</p>
                </div>
            </div>


            {/* <div className="main--counter-container">
                <p className="ibm-bold-64 main--counter">{formatCount(count)}</p>
                <div className="main--counter-underline"/>
            </div> */}
            <button 
                className="clickable main--start-button ibm-bold-36"
                onClick={()=> setIsStarted(prev => !prev)}
            >
                    {!isStarted ? 'Start' : 'Pause'}
            </button>
        </section>
    )

}