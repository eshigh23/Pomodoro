import './Start.css'


export default function Start({ options, setOptions, subject, setSubject}) {

     {/* section 2: body */}
     return (
        <>
        {/* subject text and select */}
        <p className="main--subject-text ibm-bold-32">Subject:</p>
        <select 
            className="
                main--select 
                ibm-semibold-24 
                main--subject-text
                light-pink-input
            "
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
        >
            <option value=''>
                None
            </option>
            <option value="Coding">
                Coding
            </option>

            <option value={"newSubject"}>
                + Add subject
            </option>
        </select>


        {/* options */}
        <div className="main--option-wrapper ibm-bold-32">
            <input 
                className="main--option-box light-pink-input ibm-bold-32"
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
                className="main--option-box light-pink-input ibm-bold-32"
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
                className="main--option-box light-pink-input ibm-bold-32"
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