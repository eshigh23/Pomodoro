import { createContext } from "react";
import { useEffect, useState } from "react"
import { fetchUserForAuthApi } from "../api/authApi";


export const UserContext = createContext(null)


export function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [theme, setTheme] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const responseData = await fetchUserForAuthApi()
            console.log('responseData:', responseData)
            console.log("user:", responseData.user)
            setUser(responseData.user)
        }
        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, theme, setTheme }}>
            { children }
        </UserContext.Provider>
    )
}