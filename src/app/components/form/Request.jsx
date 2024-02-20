"use client";
import { AiFillCaretDown } from "react-icons/ai"; 
import { AiFillCamera } from "react-icons/ai"; 

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { webName } from "../globalDetails";
import { grades } from "./grade";
import { AnimatePresence, motion } from "framer-motion";

const Requestform = () => {
  const [schoolname, setSchoolname] = useState([]);

  useEffect(() => {
    fetch("/api/schoolList", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setSchoolname(data));
  }, []); 

 
 
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isSchoolOpen, setIsSchoolOpen] = useState(false);
  const [isNotValid, setIsNotValid] = useState(false);
  const [check,setCheck] = useState('')
  const dropdownRef = useRef();
  const [data, setData] = useState({
    userName: "",
    email: "",
    schoolName: "",
    role: "",
    grade: "",
    comment: "",
  });
  const { role, grade } = data;
  const roleRef = useRef();
  const gradeRef = useRef();

  useEffect(() => {
    const handleClose = (e) => {
      if (e.target != roleRef.current) {
        setIsRoleOpen(false);

      }
      if (e.target != gradeRef.current) {
        setIsGradeOpen(false);
      }
      if (e.target != dropdownRef.current) {
        setIsSchoolOpen(false);
      }
    };
    window.addEventListener("click", handleClose);
  }, []);
  useEffect(() => {
    const validate = () => {
/*       props.handleSchool(schoolName);
 */
      const optionExist = schoolname.find(
        (item) =>{
const val=item.schoolname.toLowerCase()
const bool=val== schoolName.toLowerCase().trim()
return bool
        });
      optionExist || schoolName == ""
        ? setIsNotValid(false)
        : setIsNotValid(true);
    };
    validate();

    console.log(schoolName);

  }, [check]);

  const requestEvent = (e) => {
    e.preventDefault();
    console.log(data);
  };

  const toggleRole = () => {
    setIsRoleOpen(!isRoleOpen);
  };

  const toggleGrade = () => {
    setIsGradeOpen(!isGradeOpen);
  };

  const handleRoleClick = (value) => {
    setData({ ...data, role: value });
  };

  const handleGradeClick = (value) => {
    setData({ ...data, grade: value });
    //  setIsGradeOpen(false);
  }
  
  const toggleSchool = () => {
    setIsSchoolOpen(true);
  };

  const handleChangeSchool = (e) => {
    const value = e.target.value;
    setData({...data, schoolName :value});
  };

  const handleBlurSchool = (e) => {
    const value = e.target.value;
    setIsSchoolOpen(false)
    setData({...data, schoolName :value});
    setCheck(value)
  };

  const handleClickSchool = (value) => {
    setData({...data, schoolName :value});

    setIsNotValid(false);
    setIsSchoolOpen(false);
  };

  const handleFocusSchool = () => {
    setIsSchoolOpen(true);
  }

  const handleSchool = (value) => {
    setData({ ...data, schoolName: value });
  };

  const roleColor = role === "" ? " text-gray-400" : "text-black";
  const gradeColor = grade === "" ? " text-gray-400" : "text-black";

  const roleClass = `rounded-lg ${roleColor} pl-2 w-72 text-b h-12 border cursor-pointer outline-none  bg-[--web-container]`;
  const regularClass = `rounded-lg  pl-2 w-72 text-b h-12 border outline-none  bg-[--web-container]`;
  const gradeClass = ` rounded-lg cursor-pointer ${gradeColor} pl-2 h-12  mt-10 outline-none  w-72 md:w-[600px]  border bg-[--web-container]`;
  const dropdownClass = `cursor-pointer py-2 rounded-lg hover:bg-gray-100`
  const Comment =
    "Tell us more about yourself and the purpose of using our product";

  return (
    <div className="mt-16 w-screen z-30">
      <p className="text-center px-10 pb-8 text-lg">
        Note : This form is designed for MEMBERS OF REGISTERED SCHOOL  only. If you are the SCHOOL ORGANIZER ,
        please{" "}
        <Link className="text-[--web-primary-color]" href={"recommend"}>
          Register your School
        </Link>{" "}
        instead.
      </p>
      <div className=" md:shadow-[0px_0px_2px_0px] rounded-lg py-2  w-fit px-1 md:px-10 mx-auto flex-col justify-center">
        <Image
          className="w-32 h-32 mx-auto mt-10"
          src={"logo.svg"}
          width={100}
          height={100}
          alt="logo"
        />
        <h1 className="text-center font-bold text-2xl py-10">
          {webName} Memeber Request Form
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <div className="flex md:flex-row flex-col justify-center gap-10 md:gap-6">
              <div className="flex flex-col  gap-10 w-72 ">
                <input
                  type="text"
                  placeholder="Your Name"
                  onChange={e => setData({ ...data, userName: e.target.value })}
                  required
                  className={regularClass}
                />
                <div className="relative ">
      {isNotValid && <p className="text-red-500 absolute -mt-6">please Choose give option</p>}
      <input
        ref={dropdownRef}
        className={regularClass}
        placeholder={"School Name"}
        onChange={handleChangeSchool}
        onBlur={handleBlurSchool}
        onClick={toggleSchool}
        value={schoolName}
        onFocus={handleFocusSchool}
        required
      />

      <AnimatePresence mode="wait">
        {isSchoolOpen && (
          <motion.div
            initial={{ y: 10, opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="absolute max-h-64 overflow-auto w-72 mt-2 z-40 pl-2 py-2  rounded-lg grid gap-2 bg-white round"
          >
            {" "}
            {schoolname
              // filter the data according to input
              .filter((data) => {
                return schoolName === ""
                  ? true
                  : data.schoolname.toLowerCase().trim().includes(schoolName.toLowerCase().trim());
              })
              .map((option) => {
                return (
                  <p
                    className="capitalize cursor-pointer p-1 w-[273px] rounded-lg hover:bg-gray-100"
                    onClick={() => {
                      handleClickSchool(option.schoolname);
                    }}
                    key={option.schoolname}
                  >
                    {" "}
                    {option.schoolname}
                  </p>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
              </div>
              <div className="flex flex-col gap-10 w-72 ">
                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  onChange={e => setData({ ...data, email: e.target.value })}

                  className="rounded-lg h-12 pl-2 outline-none  border bg-[--web-container]
                  "
                />
                <div className="relative ">
                  <input
                    ref={roleRef}
                    className={roleClass}
                    placeholder="Select Your Role"
                    value={role}
                    onFocus={()=>{setIsRoleOpen(true)}}
                    onBlur={()=>{setIsRoleOpen(false)}}
                    readOnly
                    onClick={toggleRole}
                  />
                  {" "}

                  <AnimatePresence mode="wait">
                    {isRoleOpen && (
                      <motion.div
                        initial={{ y: 10, opacity: 0.6 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="absolute  max-h-64 overflow-auto w-72 mt-2 z-40 pl-2 py-2  rounded-lg grid gap-2 bg-white round "
                      >
                        {" "}
                        <p
                          className={dropdownClass}
                          onClick={() => {

                            handleRoleClick("student");
                          }}
                        >
                          Student
                        </p>
                        <p
                          className={dropdownClass}
                          onClick={() => {
                            handleRoleClick("teacher");
                          }}
                        >
                          Teacher
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
          <div>
            
              <input
                ref={gradeRef}
                onClick={toggleGrade}
                onFocus={()=>{setIsGradeOpen(true)}}
                onBlur={()=>{setIsGradeOpen(false)}}
                placeholder="Select Your Grade"
                className={gradeClass}
                value={grade}
              />

            {" "}
          
          <AnimatePresence mode="wait">
            {isGradeOpen && (
              <motion.div
                initial={{ y: 10, opacity: 0.6 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="absolute max-h-64 overflow-auto w-72 z-40 pl-2 py-2  rounded-lg grid gap-2 mt-2 bg-white round "
              >
                {" "}
                {
                  grades.map(item => (
                    <p key={item} className="cursor-pointer py-1 w-64 rounded-lg hover:bg-gray-100" onClick={() => {
                      handleGradeClick(item)
                    }}>{item}</p>
                  ))
                }
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          <div className="flex justify-center gap-10 flex-col py-10 ">
            <textarea
              type="text"
              placeholder={Comment}
              onChange={e => setData({ ...data, comment: e.target.value })}

              className="rounded-lg resize-none pl-2 pt-1 min-h-56 outline-none  h-auto w-72 md:w-[600px] mx-auto  border bg-[--web-container]"
            />
            <input
              type="submit"
              className="rounded-[5px] cursor-pointer text-white h-14 bg-[--web-primary-color] text-center w-72 md:w-[600px] mx-auto  border-2"
            />
          </div>
        </form>
      </div>
      <div className="grid justify-center">
        <div className=" w-80 md:w-[600px] py-10">
          <h2 className="md:-ml-8 -ml-4  font-bold ">Instructions: </h2>
          <div className=" py-5 leading-6">
            <p className="pb-3 text-justify">
              1. Only Registered School's members  may register for an EDU
              account, such as teachers or students ...
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

export default RequestForm;