import './SubjectScreen.css'

export default function SubjectScreen({ sortedSubjects, setIsOverlay, sessions, setSessions}) {

    const handleSubjectChange = (sessionIndex, segmentIndex, newSubject) => {
        setSessions(prev => {
            const updated = [...prev]   // copy entire sessions array

            updated[sessionIndex] = {
                ...updated[sessionIndex],
                segments: updated[sessionIndex].segments.map((seg, idx) => (
                    idx === segmentIndex
                        ? { ...seg, subject: newSubject }
                        : seg
                ))
            }

            return updated
        })
    }

    return (
        <div className="subject-screen">

            { sessions.map((session, idx) => (
                <div key={idx} className="subject-screen__row">
                    <p className="ibm-bold-24" key={idx}>Session #{idx + 1}:</p>


                     <select 
                        className="main--select ibm-semibold-24
                            main--subject-text light-pink-input"
                        value={sessions[idx]}
                        onChange={(e) => {
                            if (e.target.value === 'newSubject') {
                                setIsOverlay(true)
                            } else {
                                setSessions(prev => (
                                    prev.map((session, i) => (
                                        i === idx ? e.target.value : session
                                    ))
                                ))
                            }
                        }}
                    >
                        <option value=''>
                            General
                        </option>

                        { sortedSubjects.map(subject => (
                            <option key={subject} value={subject}>
                                {subject}
                            </option>
                        ))}

                        <option value="newSubject">
                            + Add subject
                        </option>
                    </select> 
                </div>
            ))}
            {/* <p className="main--subject-text ibm-bold-32">Subject:</p>
           */}
        </div>
    )
}