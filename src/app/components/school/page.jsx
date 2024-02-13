"use client";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Information = () => {
  const [SchoolName, setSchoolName] = useState("Default School");
  const [OwnerName, setOwnerName] = useState("Deepath");
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
      members: 40,
    },
    {
      s_no: 12,
      grade: "Grade 12",
      members: 112,
    },
  ];

  return (

    <div className="">
      <h1 className="">School Information</h1>
     
        <dl className="grid columns-8">
          <div className="">
            <div className="grid col-span-4 row-span-1">
              <dt>School Name :</dt>
              <dd>{SchoolName}</dd>
            </div>
            <dd className="">
              <MdEdit className="" />
              <button className="">Delete</button>
            </dd>
          </div>
          <div className="">
            <div className="">
              <dt>School Owner :</dt>
              <dd> {OwnerName} </dd>
            </div>
            <button className="">Reqest Transfer ownership</button>
          </div>
          <div className="">
            <dt>Total members : </dt>
            <dd> {total} </dd>
          </div>

          <dt>classes : </dt>
          {classes.map((item, index) => (
            <div key={item.s_no} className="">
              <div className="">
                <dd className="">{item.s_no}</dd>
                <dd className="">
                  {item.grade} : ({item.members} members)
                </dd>
              </div>
              <span className="">
                <MdEdit className="" />
                <MdDelete className="" />
              </span>
            </div>
          ))}
        </dl>
      
      <p className="">
        {" "}
        Only owner ( {OwnerName} ) can create or delete classes{" "}
      </p>
    </div>
  );
};

export default Information;
