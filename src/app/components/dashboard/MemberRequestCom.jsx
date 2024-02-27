'use client'
import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineDown, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { UserContext } from '@/ContextUser';
import useSWR from 'swr';

const MemberRequestPage = () => {
    const { data: session } = useSession()
    const { setToggleRequest } = useContext(UserContext);
    const [selectedAccountFromRequest, setselectedAccountFromRequest] = useState('');
    const [counter, setCounter] = useState(1)
    const [error, setError] = useState('')
    const [requestCount, setRequestCount] = useState(0)
    const role = session?.user?.role == "admin" ? "" : "student"
    const fetchMemberRequesthandler = async () => {
        try {
            const response = await fetch('/api/memberRequest', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ school: session?.user?.school, role })
            });
            if(response.status === 400){
                setError("there is no reauest action");
                return
            }
            setError('');
            const data = await response.json();
            return data
        } catch (error) {
            console.error('Error fetching member requests:', error);
        }
    };
    const {data:memberRequesthandler , isLoading:datafetcher , mutate} = useSWR('request fetch', fetchMemberRequesthandler)
    const handleDecline = async (id) => {
        try {
            const response = await fetch(`/api/memberrequestevent`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ accid: id, event: 0 })
            });
            if (response.status === 200) {
                mutate([])
                return;
            }
        } catch (error) {
            console.error('Error declining member request:', error);
        }
    };
    const handleAccept = async (id) => {
        try {
            const response = await fetch(`/api/memberrequestevent`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ accid: id, event: 1 })
            });
            if (response.status === 200) {
                mutate([])
                return ;
            }
        } catch (error) {
            console.error('Error declining member request:', error);
        }
    };

    const toggleShowAccInfo = (id) => {
        if (id == selectedAccountFromRequest) {
            setselectedAccountFromRequest(null);
            return
        }
        setselectedAccountFromRequest(id)
        console.log("id: " + id)
    };
    return (
        <div className='w-screen h-screen top-0 left-0 fixed z-8 bg-white'>
            <div className="flex items-center justify-between py-2 px-4">
                <button className="font-bold flex items-center justify-center text-gray-600 text-md" onClick={() => { setToggleRequest(false); console.log("clicked"); }}>
                    <AiOutlineLeft />Back
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Member Requests</h1>
                <div className=""></div>
            </div>
            <div className="flex flex-col gap-2 w-full px-4 mt-4 overflow-y-scroll scrollbar-hide">
                {
                    error &&(
                        <p className='text-sm font-light text-gray-800 text-center'>{error}</p>
                    )
                }
                {
                    !memberRequesthandler?"":memberRequesthandler.map((request, i) => {
                        if (request) {
                            return <motion.div key={request._id} onClick={() => { toggleShowAccInfo(i) }} className="shadow-md rounded-lg p-4 cursor-pointer h-fit" style={{ overflow: "hidden" }}
                            >
                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center gap-6">
                                        <p className="font-bold">{request.name}</p>
                                        <p className="text-sm text-gray-500">{request.schoolname}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex py-2">
                                            <button onClick={() => handleAccept(request._id)} className="px-2 py-1 rounded ">
                                                <AiOutlineCheckCircle className="text-green-500" />
                                            </button>
                                            <button onClick={() => handleDecline(request._id)} className="px-2 py-1 rounded">
                                                <AiOutlineCloseCircle className="text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, height: selectedAccountFromRequest === i ? "fit-content" : 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="w-full flex items-center gap-4">
                                            <p className="w-[200px]">Email</p>:
                                            <p className="w-full">{request.email}</p>
                                        </div>
                                        <div className="w-full flex items-center gap-4">
                                            <p className="w-[200px]">User Type</p>:
                                            <p className="w-full">{request.role}</p>
                                        </div>
                                        <div className="w-full flex items-center gap-4">
                                            <p className="w-[200px]">Grade</p>:
                                            <p className="w-full">Grade {request.grade}</p>
                                        </div>
                                        <div className="w-full flex items-center gap-4">
                                            <p className="w-[200px]">Description</p>:
                                            <p className="w-full">{request.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        } else {
                            return
                        }
                    })
                }
            </div>
        </div>
    );
};

export default MemberRequestPage;

