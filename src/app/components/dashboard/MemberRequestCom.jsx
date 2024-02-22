'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineDown, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useSession } from 'next-auth/react';

const MemberRequestPage = () => {
    const {data:session} = useSession()
    const [memberRequests, setMemberRequests] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    useEffect(() => {
        // Fetch member requests from the server
        const role = session?.user?.role == "admin"?"":"student"
        const fetchMemberRequests = async () => {
            try {
                const response = await fetch('/api/memberRequest', {
                    method: 'PUT',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({school:session?.user?.school , role})
                });
                const data = await response.json();
                setMemberRequests(data);
            } catch (error) {
                console.error('Error fetching member requests:', error);
            }
        };

        fetchMemberRequests();
    }, []);

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
                // Update member request status locally
                setMemberRequests(memberRequests.map(request => {
                    if (request._id === id) {
                        return { ...request, status: 'Declined' };
                    }
                    return request;
                }));
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
                // Update member request status locally
                setMemberRequests(memberRequests.map(request => {
                    if (request._id === id) {
                        return { ...request, status: 'Declined' };
                    }
                    return request;
                }));
            }
        } catch (error) {
            console.error('Error declining member request:', error);
        }
    };

    const toggleShowDetails = (id) => {
        setSelectedRequestId(selectedRequestId === id ? null : id);
    };

    return (
        <div>
            <div className="flex items-center justify-between py-2 px-4">
                <button className="font-bold flex items-center justify-center text-gray-600 text-md" onClick={() => { }}>
                    <AiOutlineLeft />Back
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Member Requests</h1>
                <div className=""></div>
            </div>
            <div className="flex flex-col gap-2 w-full px-4 mt-4">
                {memberRequests.map(request => (
                    <motion.div key={request._id} className="shadow-md rounded-lg p-4 cursor-pointer h-fit" style={{ overflow: "hidden" }}
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
                                <div className="cursor-pointer p-1" onClick={() => toggleShowDetails(request._id)}>
                                    {
                                        selectedRequestId === request._id ? <AiOutlineDown /> : <AiOutlineRight />
                                    }
                                </div>
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, height: selectedRequestId === request._id ? "fit-content" : 0 }}
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
                ))}
            </div>
        </div>
    );
};

export default MemberRequestPage;

