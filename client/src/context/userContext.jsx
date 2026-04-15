import { createContext } from "react";
import { useEffect, useState } from "react"
import { fetchUserForAuthApi } from "../api/authApi";


export const UserContext = createContext(null)


export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const responseData = await fetchUserForAuthApi()
            console.log("user:", responseData.user)
            setUser(responseData.user)
        }
        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}