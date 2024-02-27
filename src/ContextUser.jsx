"use client";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();
function ContextUserData({ children }) {
    const [nav, setnav] = useState(false);
    const [navmob, setnavmob] = useState(false);
    const [exporter, setExporter] = useState("false");
    const [fetchrole, setFetchrole] = useState("");
    const [navSearch, setNavSearch] = useState("");
    const [navGrade, setNavGrade] = useState("1");
    const [count, setCount] = useState(0);
    const [addmanually, setAddmanually] = useState(false);
    const [userDetailpopup, setUserDetailpopup] = useState(false);
    const [requestedpop, setRequestedpop] = useState(false);
    const [showAccInfo, setShowAccInfo] = useState(false);
    const [showsklinfo, setShowSklInfo] = useState(false);
    const [toggleRequest, setToggleRequest] = useState(false);
    
    console.log(toggleRequest);
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
            setNavGrade,
            userDetailpopup,
            setUserDetailpopup,
            requestedpop,
            setRequestedpop,
            showAccInfo,
            setShowAccInfo,
            showsklinfo,
            setShowSklInfo
        }}>
            {children}
        </UserContext.Provider>
    );
}
export default ContextUserData;
