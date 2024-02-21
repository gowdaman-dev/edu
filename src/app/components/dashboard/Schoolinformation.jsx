"use client";
import { UserContext } from "@/ContextUser";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import useSWR from "swr";

const schoolInformation = () => {
  const [SchoolName, setSchoolName] = useState("Default School");
  const [OwnerName, setOwnerName] = useState("JGDHL");
  const [skldata, setskldata] = useState({});
  const [skldataloader, setskldataloader] = useState({});
  const [sklstudentdata, setsklstudentdata] = useState({});
  const [sklstudentgradecount, setsklstudentgradecount] = useState([]);
  const { data: session } = useSession();
  const { showsklinfo, setShowSklInfo } = useContext(UserContext)
  const deleteSchool = async () => {
    try {
      const res = await fetch('/api/superadmin/remover', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: 'admin', school: session?.user?.school, id:'' })
      });
      const data = await res.json();
      console.log(data);
      // Additional logic based on response if needed
    } catch (error) {
      console.error('Error deleting school:', error);
    }
  };
  useEffect(() => {
    setskldataloader(true)
    const handler = async () => {
      const res = await fetch('/api/sklinfo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ school: session?.user?.school })
      })
      const rescount = await fetch('/api/studentlist', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ school: session?.user?.school })
      })
      const studentdata = await rescount.json();
      await setsklstudentdata(studentdata)
      const data = await res.json();
      await setskldata(data)
      await setskldataloader(false)
    }
    handler();
  }, [])
  useEffect(() => {
    if (sklstudentdata.length > 0) {
      let updatedGradeCount = [];
      for (let i = 1; i <= 12; i++) {
        const filteredStudentData = sklstudentdata.filter(student => student.standard === i);
        updatedGradeCount = [...updatedGradeCount, filteredStudentData.length];
      }
      setsklstudentgradecount(updatedGradeCount);
    }
  }, [sklstudentdata]);
  return (
    <div className={`fixed top-0 left-0 h-screen w-screen grid place-items-center bg-white/[.2] backdrop-blur-sm ${skldataloader?"animate-pulse":''}` }>
      <div className=" flex flex-col items-center relative h-fit bg-white border rounded-lg md:w-[600px] w-[90%]  ">
        <h1 className=" font-bold text-xl p-3 border-b-2 w-[90%]">School School</h1>
        <dl className="flex flex-col w-[90%]">
          <div className="flex justify-between p-2 items-center h-fit">
            <div className="flex">
              <dt>School Name :</dt>
              <dd>{skldata.schoolname}</dd>
            </div>
            <dd className="flex">
              {
                session?.user?.role === "admin" && (
                  <button onClick={deleteSchool} className="text-teal-700">Delete School</button>
                )
              }
            </dd>
          </div>
          <div className="flex justify-between p-2 items-center h-[20%]">
            <div className="flex">
              <dt>School Owner :</dt>
              <dd> {skldata.organiseremail} </dd>
            </div>
          </div>
          <div className="flex p-2">
            <dt>Total members : </dt>
            <dd> {sklstudentdata.length} </dd>
          </div>
          <dt>classes : </dt>
          <div className=" max-h-[300px]   overflow-y-scroll ">
            {
              sklstudentgradecount && (
                sklstudentgradecount.map((grade, index) => (
                  <div key={index} className="flex w-[90%] justify-between items-center">
                    <div className="flex w-[70%] p-[10px] justify- ml-5">
                      <dd className="w-[70%]">
                        Grade {index + 1} : ({grade} members)
                      </dd>
                    </div>
                  </div>
                ))
              )
            }
            {
              sklstudentgradecount == [] &&(
                <p>No class data in server</p>
              )
            }
          </div>
        </dl>
        <div className="flex justify-end w-full  border-t-2 p-3 ">
          <button onClick={() => setShowSklInfo(false)} className="text-teal-800 ">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default schoolInformation;
