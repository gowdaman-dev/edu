"use client";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Information = () => {
  const [SchoolName, setSchoolName] = useState("Default School");
  const [OwnerName, setOwnerName] = useState("JGDHL");
  const total = 10;
  const classes = [
    {
      s_no: 1,
      grade: "Grade 1",
      members: 2,
    },
    {
      s_no: 2,
      grade: "Grade 2",
      members: 4,
    },
    {
      s_no: 3,
      grade: "Grade 3",
      members: 4,
    },
    {
      s_no: 4,
      grade: "Grade 4",
      members: 2,
    },
    {
      s_no: 5,
      grade: "Grade 5",
      members: 4,
    },
    {
      s_no: 3,
      grade: "Grade 6",
      members: 6,
    },
    {
      s_no: 7,
      grade: "Grade 7",
      members: 2,
    },
    {
      s_no: 8,
      grade: "Grade 8",
      members: 4,
    },
    {
      s_no: 9,
      grade: "Grade 9",
      members: 4,
    },
    {
      s_no: 10,
      grade: "Grade 10",
      members: 2,
    },
    {
      s_no: 11,
      grade: "Grade 11",
      members: 7,
    },
    {
      s_no: 12,
      grade: "Grade 12",
      members: 2,
    },
    {
      s_no: 13,
      grade: "Grade 13",
      members: 2,
    },
    {
      s_no: 14,
      grade: "Grade 14",
      members: 2,
    },
  ];

  return (
    <div className=" h-fit w-full   ">

      <div className=" flex flex-col items-center relative h-fit  ">
        <h1 className=" font-bold text-xl p-3 border-b-2 w-[90%]">School Information</h1>

        <dl className="flex flex-col w-[90%]">
          <div className="flex justify-between p-2 items-center h-fit">
            <div className="flex">
              <dt>School Name :</dt>
              <dd>{SchoolName}</dd>
            </div>
            <dd className="flex">
              <MdEdit size={20} className="mr-4 cursor-pointer" />
              <button className="text-teal-700">Delete School</button>
            </dd>
          </div>
          <div className="flex justify-between p-2 items-center h-[20%]">
            <div className="flex">
              <dt>School Owner :</dt>
              <dd> {OwnerName} </dd>
            </div>
            <button className="text-teal-700">Reqest Transfer ownership</button>
          </div>
          <div className="flex p-2">
            <dt>Total members : </dt>
            <dd> {total} </dd>
          </div>

          <dt>classes : </dt>
          <div className=" max-h-[300px]   overflow-y-scroll ">
          

            {classes.map((item, index) => (
            <div key={item.s_no} className="flex w-[90%] justify-between items-center   ">
              <div className="flex w-[70%]  p-[10px]  justify- ml-5">
                <dd className="w-[10%]">{item.s_no +"."}</dd>
                <dd className="w-[70%]">
                  {item.grade} : ({item.members} members)
                </dd>
              </div>
              <div className=" inline-flex  ">
                <MdEdit size={20} className="mr-5" />
                <MdDelete size={20} className="" />
              </div>
             
            </div>
          ))}
          </div>
        </dl>
      </div>


      <div className="flex justify-between w-[90%]  absolute bottom-0 left-8 border-t-2 p-3   ">
        <p className=" ">
          {" "}
          Only owner ( {OwnerName} ) can create or delete classes{" "}


        </p>
        <button className="text-teal-800 ">Cancel</button>
      </div>


    </div>
  );
};

export default Information;
