import axios from 'axios'

const BASE_URL = 'http://localhost:5000/user'

/* takes in an array of string subjects */
export const addSubjectsApi = async (subjects) => {
    try {
        const response = await axios.post(`${BASE_URL}/addSubjects`, { subjects }, 
            { withCredentials: true }
        )
        return response.data

    } catch (e) {
        console.error(e)
    }
}
