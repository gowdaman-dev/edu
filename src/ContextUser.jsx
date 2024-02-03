'use client'
import { signOut, useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
export const UserContext = createContext();
function ContextUserData({ children }) {
    const [nav , setnav] = useState(true)
    const [fetchrole , setFetchrole ] = useState('')
    return (
        <UserContext.Provider value={{ nav , setnav , fetchrole , setFetchrole }}>
            {children}
        </UserContext.Provider>
    );
}
export default ContextUserData