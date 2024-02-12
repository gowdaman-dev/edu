'use client'
import React from 'react'

function page({params}) {
    const {user}  = params;
    console.log(user)
    return (
        <div>{user}</div>
    )
}

export default page