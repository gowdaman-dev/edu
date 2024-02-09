"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { webName } from "../globalDetails";
import DropDown from "./DropDown";


const Requestform = () => {
  const schoolName = [
    {
      value : 1,
      label : "ACET",
    },
    {
      value : 2,
      label : 'Achariya'
    }
  ]
  const Comment =
    "Tell us more about yourself and the purpose of using our product";
  const [SelectedRole, setSelectedRole] = useState("default");
  return (
    <div className="mt-16 z-30">
      <p className="text-center px-10 pb-8 text-lg">
        Note: this form is designed for EDUCATORS only. If you are a STUDENT,
        please{" "}
        <Link className="text-[--web-primary-color]" href={"recommend"}>
          recommend it to your school
        </Link>{" "}
        instead.
      </p>
      <div className=" border-[3px] rounded-2xl border-[--web-primary-color] w-fit px-1 md:px-10 mx-auto flex-col justify-center">
        <Image
          className="w-32 h-32 mx-auto mt-10"
          src={"logo.svg"}
          width={100}
          height={100}
          alt="logo"
        />
        <h1 className="text-center  font-bold text-2xl py-10">
          {webName} Edu Request Form
        </h1>

        <div className="flex justify-center">
          <div className="flex md:flex-row flex-col justify-center gap-10 md:gap-6">
            <div className="flex flex-col  gap-10 w-72 md:w-72">
              <input
                type="text"
                placeholder="Your Name"
                className="rounded-[3px] pl-2 h-12 outline-none focus:border-[3px] border border-[--web-primary-color] bg-[--web-container]"
              />

             
               <DropDown options= {schoolName} default = {"School Name"}

               />
             
            </div>
            <div className="flex flex-col gap-10 w-72 md:w-72">
              <input
                type="text"
                placeholder="Your Work Email"
                className="rounded-[3px] h-12 pl-2 outline-none focus:border-[3px] border border-[--web-primary-color] bg-[--web-container]"
              />
              <select
                name="role"
                id="role"
                defaultValue="default"
                className="rounded-[3px] h-12 pl-2 border outline-none focus:border-[3px] border-[--web-primary-color] bg-[--web-container]"
                onChange={(event) => {
                  setSelectedRole(event.target.value);
                }}
              >
                <option value="default" disabled>
                  User Type
                </option>
                <option value="owner">Owner</option>
                <option value="staff">Staff</option>
                <option value="student">Student</option>
              </select>
            </div>
          </div>
        </div>

        
        <div className="flex justify-center gap-10 flex-col py-10 ">
          <textarea
            type="text"
            placeholder={Comment}
            className="rounded-[3px] pl-2 pt-1 min-h-56 outline-none focus:border-[3px] h-auto w-72 md:w-[600px] mx-auto  border border-[--web-primary-color] bg-[--web-container]"
          />
          <input
            type="submit"
            value={"Send"}
            className="rounded-[5px] cursor-pointer text-white h-14 bg-[--web-primary-color] text-center w-72 md:w-[600px] mx-auto  border-2 border-[--web-primary-color]"
          />
        </div>
      </div>
      <div className="grid justify-center">
        <div className=" w-80 md:w-[600px] py-10">
          <h2 className="md:-ml-8 -ml-4  font-bold ">Instructions: </h2>
          <div className=" py-5 leading-6">
            <p className="pb-3 text-justify">
              1. Only school personnel (not students) may register for an EDU
              account, such as teachers or school administrators
            </p>
            <p className="pb-3 text-justify">
              2. Once a School is set up under your account, you as the account
              owner can create Classes and add Students & Teachers. Users set as
              "Teachers" have admin access to invite or delete other members.
            </p>
            <p className="pb-3 text-justify">
              3. Under a free EDU account, all invited users also have free user
              limitations.
            </p>
            <p className="pb-3 text-justify">
              4. If you are a student, you can{" "}
              <Link href={"recommend"} className="text-[--web-primary-color]">
                request that your school
              </Link>{" "}
              open an account with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requestform;
