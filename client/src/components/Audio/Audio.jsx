import { useRef, useState } from 'react'
import { ufo } from '@lucide/lab'
import { AudioLines, Icon, CircleSlash, CloudRainWind, Coffee } from 'lucide-react'
import './AudioButton.css'

import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

export default function Audio() {

    const { theme, setTheme } = useContext(UserContext)


    const audioRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [isOpen, setIsOpen] = useState(false)

    const ICON_HEIGHT = 32
    const SELECTOR_HEIGHT = 42
    const STEP = ICON_HEIGHT + 32 // icon height + gap
    const HEIGHT_DIFFERENCE = (SELECTOR_HEIGHT - ICON_HEIGHT ) / 2 // icon height + selector height divided by 2

    const handleToggleAudioMenu = () => {

    }

    const handleStopAudio = () => {
        if (!audioRef.current) return

        audioRef.current.pause()
        setIsPlaying(false)
    }

    const handlePlayAudio = (_selectedIndex) => {
        setSelectedIndex(_selectedIndex)

        if (!audioRef.current) return
        audioRef.current.play()
        setIsPlaying(true)
        setTheme('anything')
    }

    const resetTheme = () => {
        setTheme(null)
        handleStopAudio()
    }


    return (
        <div className={`audio-button ${isOpen ? "open" : "closed"}`}>
            {/* <button onClick={handleToggle}>Toggle sound</button> */}

            <div className="audio--icons-wrapper">
                {/* selector */}
                <div 
                    className="icon-selector"
                    style={{
                        transform: `translateY(${selectedIndex * (STEP) - HEIGHT_DIFFERENCE}px)`,
                    }}
                />


                {/* menu toggle icon */}
                <AudioLines 
                    className="clickable audio--icon audio--menu-toggle"
                    color="#020202" 
                    size={32}
                    onClick={() => setIsOpen(prev => !prev)} 
                />

                {/* divider */}
                {/* <div className="audio-button--divider"/> */}


                {/* actual sound icons */}

                    <div className="clickable audio--icon" onClick={() => {
                        setSelectedIndex(1)
                    }}>
                        <CircleSlash color="#373737" size={ICON_HEIGHT} onClick={resetTheme}/>
                    </div>

                    <div className="clickable audio--icon" onClick={() => handlePlayAudio(2)}>
                        <CloudRainWind  color="#373737" size={ICON_HEIGHT}/>
                    </div>

                    <div className="clickable audio--icon" onClick={() => handlePlayAudio(3)}>
                        <Coffee color="#373737" size={ICON_HEIGHT}/>
                    </div>

                    <div className="clickable" onClick={() => handlePlayAudio(4)}>
                        <Icon iconNode={ufo} color="#373737" size={ICON_HEIGHT}/>
                    </div>

            </div>
            <audio ref={audioRef} src="/sounds/rain-fireplace.ogg" loop />
        </div>

    )

}