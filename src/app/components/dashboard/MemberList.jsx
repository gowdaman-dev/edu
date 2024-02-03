import React from 'react'
import axios from 'axios';
async function EventHandler() {
    const res = await axios.get('/api/memberlist',
        {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        })
    const data = await res.data;
    return data;
}
async function Fetched() {
    const data = await EventHandler();
    return data
}
export default Fetched