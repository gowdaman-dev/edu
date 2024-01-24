'use client'
import { signOut, useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
export const UserContext = createContext();
function ContextUserData({ children }) {
    const { data: session } = useSession();
    const [userData, setUserData] = useState();
    const check = async () => {
        console.log("checking");
        try {
            const userExist = await fetch('/api/userinfo',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: session?.user?.email })
                })
            const { user } = await userExist.json()
            console.log(user);
            if (user) {
                setUserData(user)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <UserContext.Provider value={{ userData , check }}>
            {children}
        </UserContext.Provider>
    );
}
export default ContextUserData