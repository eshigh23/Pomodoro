const StudySession = require('../models/StudySession')
const mongoose = require('mongoose')
const dayjs = require("dayjs")


const getDateRanges = () => {
    return {
        startOfToday: dayjs().startOf("day").toDate(),
        startOfWeek: dayjs().startOf("week").toDate()
    }
}


const formatMinutes = (minutes = 0) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;

    return `${hours}h ${mins}m`;
};


const getDailyAndWeeklyMinutesStudied = async (userId) => {
    const { startOfToday, startOfWeek } = getDateRanges()

    const todayResult = await StudySession.aggregate([
        { 
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                startedAt: { $gte: startOfToday }
            }
        },
        {
            $group: {
                _id: null,
                totalMinutes: { $sum: "$duration" }
            }
        }
    ])

    const weekResult = await StudySession.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                startedAt: { $gte: startOfWeek }
            }
        },
        {
            $group: {
                _id: null,
                totalMinutes: { $sum: "$duration" }
            }
        }
    ])

    const todayMinutes = todayResult[0]?.totalMinutes || 0
    const weekMinutes = weekResult[0]?.totalMinutes || 0

    return {
        todayFormatted: formatMinutes(todayMinutes),
        weekFormatted: formatMinutes(weekMinutes),
        raw: {
            todayMinutesRaw: todayMinutes,
            weekMinutesRaw: weekMinutes
        }
    }
}


const getTopSubjects = async (userId) => {
    const { startOfToday, startOfWeek } = getDateRanges()

    const topSubjects = await StudySession.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                startedAt: { $gte: startOfWeek }
            }
        },
        {
            $group: {
                _id: "$subject",
                totalMinutes: { $sum: "$duration" }
            }
        },
        {
            $sort: { totalMinutes: -1 }
        },
        {
            $limit: 3
        }
    ])

    // format minutes
    const formattedSubjects = topSubjects.map(s => {
        return {
            subject: s._id, // rename id field (subject) to "subject"
            time: formatMinutes(s.totalMinutes) // add formatted time
        }
    })

    return formattedSubjects
}


const getGraphData = async (userId) => {

    const { startOfToday, startOfWeek } = getDateRanges()

    // get this weeks sessions, sorting oldest first
    const sessions = await StudySession.find({
        user: userId,
        startedAt: { $gte: startOfWeek }
    }).sort({ startedAt: 1 })

    const days = {}

    sessions.forEach(session => {
        // convert startedAt timestamp to formatted day
        const day = dayjs(session.startedAt).format("dddd")

        if (!days[day]) {   // if day (i.e. Monday) not in dictionary
            days[day] = {   // add new entry to avoid key error
                day,
                totalMinutes: 0,
                segments: []
            }
        }

        // format segments object (based on subject studied)
        days[day].segments.push({
            subject: session.subject,
            minutes: session.duration,
            startedAt: session.startedAt
        })

        days[day].totalMinutes += session.duration
    })

    // convert days dictionary into an array
    const graphData = Object.values(days)
    console.log("graphData:", graphData)
    console.log(JSON.stringify(graphData, null, 2))
}


exports.getStats = async (req, res) => {
    const authUser = req.user

    try {
        // get total time studied (daily and weekly)
        const totalTimeStudied = await getDailyAndWeeklyMinutesStudied(authUser._id)

        // get top subjects of the week and their time studied
        const topSubjects = await getTopSubjects(authUser._id)
        console.log('topSubjects:', topSubjects)

        const graphData = await getGraphData(authUser._id)


        return res.status(200).json({ totalTimeStudied, topSubjects, graphData })

    } catch (e) {
        console.error(e)
        return res.status(500).send()
    }
}