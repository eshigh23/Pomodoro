


import { useEffect, useState } from 'react'
import { getStatsApi } from "../../api/studySessionApi"

/*
1. weekly timeline
2. total hours studied today and this week
3. subject rankings (top 3 for now) this week and their hourly breakdown
4. graph
*/

export default function DashboardPage() {
    
    useEffect(() => {
        const getStats = async () => {
            try {
                const responseData = await getStatsApi()
                console.log('responseData:', responseData)

            } catch (e) {
                console.error(e)
            }
        }
        getStats()
    }, [])

    return (
        <div>
            <div>
                <p>Weekly timeline</p>
            </div>

            <div>
                <p>Total hours today</p>
                <p>Total hours this week</p>
            </div>

            <div>
                <p>subject #1 and hours studied</p>
                <p>subject #2 and hours studied</p>
                <p>subject #3 and hours studied</p>
            </div>

            <div>
                <p>Graph showing this week's hours and subjects</p>
            </div>
        </div>
    )

}