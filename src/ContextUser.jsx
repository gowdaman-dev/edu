'use client'
import { signOut, useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
export const UserContext = createContext();
function ContextUserData({ children }) {
    const { data: session } = useSession();
    const [userData, setUserData] = useState();
    useEffect(() => {
        const check = async () => {
            try {
                const userExist = await fetch('/api/userinfo',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: session?.user?.email })
                    })
                const {user}  = await userExist.json()
                if (user) {
                    setUserData(user)
                }else{
                    setUserData('')
                    return
                }
            } catch (error) {
                console.log(error);
            }
        }
        check();
    },[])
    return (
        <UserContext.Provider value={{ userData }}>
            {children}
        </UserContext.Provider>
    );
}
export default ContextUserData