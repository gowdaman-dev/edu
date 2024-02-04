'use client'
import React, { useContext, useEffect, useState } from 'react'
import Fetched from './MemberList'
import { UserContext } from '@/ContextUser'
import useSWR from 'swr'

function UserProvider({ }) {
    const { fetchrole } = useContext(UserContext)
    const [membersdata, setMemberdata] = useState([])
    const [pulse, setPulse] = useState(false)
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data , error , isLoading} = useSWR('/api/memberlist', fetcher,{refreshInterval:10})

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    // useEffect(() => {
    //     setPulse(true)
    //     setMemberdata([])
    //     Fetched()
    //         .then((res) => {
    //             if (res) {
    //                 setMemberdata(res);
    //                 setPulse(false)
    //             }
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    // }, [fetchrole])
    return (
        <div className='w-full'>
            <table className='w-full '>
                <thead className='border-b py-2 border-gray-200/[.5]'>
                    <tr className='py-2'>
                        <td className='py-2 px-4'>Name</td>
                        <td className='py-2 px-4'>Email</td>
                        <td className='py-2 px-4'>Standard</td>
                        <td className='py-2 px-4'>Role</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ? Array(6).fill(0).map((d, i) => {
                            return <Pulsecomponent key={i} />
                        }) : ''
                    }
                    {
                        data.filter((data) => {
                            return fetchrole == '' ? data : data.role.includes(fetchrole)
                        }).map((data) => {
                            return <tr key={data.email} className={`border-b bg-white/[.2]`}>
                                <td className="px-4 text-md font-light">{data.name}</td>
                                <td className="px-4 text-md font-light">{data.email}</td>
                                <td className="px-4 text-md font-light">{data.standard}</td>
                                <td className="px-4 text-md font-light">{data.role}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserProvider


const Pulsecomponent = () => {
    return (
        <tr className="w-full py-2 px-2 animate-pulse">
            <td className='px-4 py-2 h-fit'>
                <div className="w-1/2 py-2 bg-black/[.4] rounded-full"></div>
            </td>
            <td className='px-4 py-2 h-fit'>
                <div className="w-1/2 py-2 bg-black/[.4] rounded-full"></div>
            </td>
            <td className='px-4 py-2 h-fit'>
                <div className="w-1/2 py-2 bg-black/[.4] rounded-full"></div>
            </td>
            <td className='px-4 py-2 h-fit'>
                <div className="w-1/2 py-2 bg-black/[.4] rounded-full"></div>
            </td>
        </tr>
    )
}