import axios from 'axios'

const BASE_URL = 'http://localhost:5000/auth'


export const fetchUserForAuthApi = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/fetchUserForAuth`,
            { withCredentials: true }
        )
        console.log('response:', response)
        return response.data // returns user info in req.body if defined, otherwise undefined

    } catch (e) {
        console.error(e)
    }
}

export const handleGoogleLoginApi = async (credentialResponse) => {
    console.log('credentialResponse:', credentialResponse)
    try {
        const response = await axios.post(`${BASE_URL}/google`, { token: credentialResponse.credential },
            { withCredentials: true }
        )
        return response.data 

    } catch (e) {
        console.error(e)
    }
}

export const loginUserApi = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { userData }, 
            { withCredentials: true }
        )
        return response.data

    } catch (e) {
        console.error(e)
    }
}


export const logoutUserApi = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/logout`, {}, 
            { withCredentials: true }
        )
        return response.data

    } catch (e) {
        console.error(e)
    }
}


export const registerUserApi = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, { userData }, 
            { withCredentials: true }
        )
        return response.data

    } catch (e) {
        console.error(e)
    }
}

// user data is password, confirmPassword, and (refresh) token
export const resetPasswordApi = async (userData) => {
    try {
        const response = await axios.put(`${BASE_URL}/resetPassword`, userData, 
            { withCredentials: true }
        )
        console.log('response:', response)
        return response.data

    } catch (e) {
        console.error(e)
    }
}


export const sendForgotPasswordLinkApi = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/sendForgotPasswordLink`, { email }, 
            { withCredentials: true }
        )
        console.log('response:', response)
        return response.data

    } catch (e) {
        console.error(e)
    }
}