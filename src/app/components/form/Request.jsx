"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { webName } from "../globalDetails";
import DropDown from "./DropDown";
import { grades } from "./grade";
import { AnimatePresence, motion } from "framer-motion";

const Requestform = () => {
  const schoolname = [
    {
      school: "acet",
    },
    {
      school: "achariya",
    },
  ];
  const userType = [
    {
      role: "student",
    },
    {
      role: "staff",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    userName: "",
    email: "",
    schoolName: "",
    role: "",
    grade: "",
    comment: "",
  });
  const { schoolName } = data;
  const dropdownRef = useRef();
  //close dropdown when click happended outside of the field
  useEffect(() => {
    const handleClose = (e) => {
      if (e.target != dropdownRef.current) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClose);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const toggle = () => {
    setIsOpen(true);
  };

  const regualarClass =
    "rounded-[3px] capitalize pl-2 w-72 text-b h-12 border outline-none focus:border-[3px] border-[--web-primary-color] bg-[--web-container]";
  const roleClass =
    "rounded-[3px] pl-2 h-12 pt-1 mt-10 outline-none focus:border-[3px] w-72 md:w-[600px] mx-auto  border border-[--web-primary-color] bg-[--web-container]";

  const [isStudent, setisStudent] = useState(false); // State to store input field value of second dropdown

  const handlerole = (value) => {
    value.trim() === "student" ? setisStudent(true) : setisStudent(false);
  };

  const Comment =
    "Tell us more about yourself and the purpose of using our product";

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
        <h1 className="text-center font-bold text-2xl py-10">
          {webName} Request Form
        </h1>
        <form action="">
          <div className="flex justify-center">
            <div className="flex md:flex-row flex-col justify-center gap-10 md:gap-6">
              <div className="flex flex-col  gap-10 w-72 ">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="rounded-[3px] pl-2 h-12 outline-none focus:border-[3px] border border-[--web-primary-color] bg-[--web-container]"
                />
                {
                  <div className="relative ">
                    <div
                      ref={dropdownRef}
                      className="rounded-[3px] cursor-pointer capitalize pl-2 py-3 w-72 text-b h-12 border outline-none focus:border-[3px] border-[--web-primary-color] bg-[--web-container]"
                      onChange={(e) => setData({ ...data, schoolName })}
                      onClick={toggle}
                    >
                      {" "}
                      { {schoolName} || "School Name"} {" "}
                    </div>

                    <AnimatePresence mode="wait">
                      {isOpen && (
                        <motion.div
                          initial={{ y: 10, opacity: 0.6 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 10, opacity: 0 }}
                          transition={{ duration: 0.5, type: "spring" }}
                          className="absolute max-h-64 overflow-auto w-72 mt-2 z-40 pl-2 py-2  rounded-lg grid gap-2 bg-white round"
                        >
                          {" "}
                          
                          {  
                              schoolname.map((option) => {
                              const label = Object.keys(option).map(
                                (key) => option[key]
                              );

                              return (
                                <div>
                                  <p>School Name</p>
                                <p
                                  className="capitalize cursor-pointer p-1 w-[273px] rounded-lg hover:bg-gray-100"
                                  onClick={ () => setData({...data,schoolName: label}) }
                                  key={label}
                                >
                                  {" "}
                                  {label}
                                </p>
                                </div>
                              );
                            })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                   
                  </div>
                }
                 {console.log({schoolName})}
              </div>
              <div className="flex flex-col gap-10 w-72 ">
                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  className="rounded-[3px] h-12 pl-2 outline-none focus:border-[3px] border border-[--web-primary-color] bg-[--web-container]"
                />
                <DropDown
                  className={regualarClass}
                  options={userType}
                  default={"User Type"}
                  handleRole={handlerole} // Pass the callback function
                />
              </div>
            </div>
          </div>
          <div className="mx-10">
            {isStudent && (
              <DropDown
                className={roleClass}
                options={grades}
                default={"Grade"}
              />
            )}{" "}
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
              onClick={handleSubmit}
              onSubmit={"recommend"}
              className="rounded-[5px] cursor-pointer text-white h-14 bg-[--web-primary-color] text-center w-72 md:w-[600px] mx-auto  border-2 border-[--web-primary-color]"
            />
          </div>
        </form>
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
