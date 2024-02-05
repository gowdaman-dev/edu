'use client'
import { signOut, useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
export const UserContext = createContext();
function ContextUserData({ children }) {
    const [nav, setnav] = useState(true)
    const [navmob, setnavmob] = useState(false)
    const [exporter, setExporter] = useState("false")
    const [fetchrole, setFetchrole] = useState('')
    const [navSearch, setNavSearch] = useState('')
    const [navGrade, setNavGrade] = useState('1')
    const [count, setCount] = useState(0)
    const [addmanually, setAddmanually] = useState(false)

    return (
        <UserContext.Provider value={{
            navmob,
            setnavmob,
            nav,
            setnav,
            fetchrole,
            setFetchrole,
            addmanually,
            setAddmanually,
            count,
            setCount,
            exporter,
            setExporter,
            navSearch,
            setNavSearch,
            navGrade, 
            setNavGrade
        }}>
            {children}
        </UserContext.Provider>
    );
}
export default ContextUserData