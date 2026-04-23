const StudySession = require('../models/StudySession')

exports.createStudySession = async (req, res) => {
    const authUser = req.user

    const { subject, duration, completedAt, startedAt } = req.body
    console.log(subject, duration, startedAt, completedAt)

    try {
        // validate user in db
        
        // create study session
        const newSession = await StudySession.create({
            user: authUser._id,
            subject,
            duration,
            startedAt,
            completedAt
        })

        return res.status(201).send()

    } catch (e) {
        console.error(e)
        return res.status(500).send()
    }
}