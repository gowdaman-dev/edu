import React from 'react'
async function EventHandler() {
    const res = await fetch(`/api/memberlist`, { cache: 'no-cache', next:{
        revalidate:0.5
    } });
    const data = await res.json();
    return data;
}
async function Fetched() {
    const data = await EventHandler();
    return data
}
export default Fetched