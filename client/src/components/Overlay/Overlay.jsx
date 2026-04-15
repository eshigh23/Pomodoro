import './Overlay.css'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'


export default function Overlay({ setIsOverlay }) {

    const [newSubjects, setNewSubjects] = useState([''])

    useEffect(() => {
        console.log('newSubjects:', newSubjects)
    }, [newSubjects])

    const handleCloseOverlay = () => {
        setIsOverlay(false)
    }

    return (
        <div className="overlay">
            <div className="overlay--new-subject">
                <X className="overlay--x" size={20} color="white" onClick={handleCloseOverlay}/>
                <p className="ibm-bold-32">Add new subject(s)</p>

                { newSubjects.map((subject, idx) => (
                    <label key={idx}>
                        <input
                            className="subject-input ibm-semibold-24"
                            type="text"
                            value={subject}
                            onChange={(e) => {
                                const value = e.target.value

                                setNewSubjects(prev => (
                                    prev.map((sub, i) => (
                                        i === idx ? value : sub)
                                    )
                                ))
                            }}
                        />
                    </label>
                ))}


                <p 
                    className="clickable ibm-bold-16"
                    onClick={() => setNewSubjects(prev => [...prev, ''])}
                >
                    + add another subject
                </p>
                <button className="overlay--button ibm-bold-32 light-pink-button">Confirm</button>
            </div>
        </div>
    )
}
