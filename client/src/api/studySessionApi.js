import axios from 'axios'

const BASE_URL = 'http://localhost:5000/studySession'



export const createStudySessionApi = async (sessionData) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, sessionData,
            { withCredentials: true }
        )
        console.log('response:', response)
        return response.data

    } catch (e) {
        console.error(e)
    }
}


export const getStatsApi = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/stats`,
            { withCredentials: true }
        )
        console.log('response:', response)
        return response.data

    } catch (e) {
        console.error(e)
    }
}

