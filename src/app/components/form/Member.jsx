"use client";
import { BiLoaderCircle } from "react-icons/bi"; 
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { webName } from "../globalDetails";
import { grades, roles } from "./data";

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
  const [check, setCheck] = useState('')
  const dropdownRef = useRef();
  const [data, setData] = useState({
    userName: "",
    email: "",
    schoolName: "",
    role: "",
    grade: "",
    comment: "",
  });



  const { role } = data;
  const { grade } = data;
  const { schoolName } = data;
  const roleRef = useRef();
  const gradeRef = useRef();

  //close dropdown when click happended outside of the field
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

      const optionExist = schoolname.find(
        (item) => {
          const val = item.schoolname.toLowerCase()
          const bool = val == schoolName.toLowerCase().trim()
          return bool
        });
      optionExist || schoolName == ""
        ? setIsNotValid(false)
        : setIsNotValid(true);
    };
    validate();


  }, [check]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mloader,setMloader] = useState(false);
  const formRef = useRef(null)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMloader(true);
    setError('')
    setSuccess('')
    if (data.userName == '' || data.email == '' || data.role == '' || data.grade == '' || data.schoolName == '') {
      setError('Please fill all the fields')
      setMloader(false);
      return
    }
    try {
      const response = await fetch('/api/memberRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (response.status === 400) {
        setError(res.message);
        setMloader(false);
        return
      } else {
        setSuccess(res.message)
        setMloader(false);
        formRef.current.reset();
        setData({
          schoolName: "",
          role: "",
          grade: "",
        });

        return
      }
    } catch (error) {
      setMloader(false);

    }
  };
  const toggleRole = () => {
    setIsRoleOpen(true);
  };
  const toggleGrade = () => {
    setIsGradeOpen(true);
  };
  const handleRoleClick = value => {

    setData({ ...data, role: value });

  };

  const handleGradeClick = value => {
    setData({ ...data, grade: value });
  }

  const toggleSchool = () => {
    setIsSchoolOpen(true);
  };

  const handleChangeSchool = (e) => {
    const value = e.target.value;
    setIsSchoolOpen(true)
    setData({ ...data, schoolName: value });
  };

  const handleBlurSchool = (e) => {
    const value = e.target.value;
    setData({ ...data, schoolName: value });
    setCheck(value)
  };

  const handleClickSchool = (value) => {
    setData({ ...data, schoolName: value });

    setIsNotValid(false);
    setIsSchoolOpen(false);
  };

  const handleFocusSchool = () => {
    setIsSchoolOpen(true);
  }
  const roleClass = `rounded-lg  pl-2 w-72 text-b h-12 border cursor-pointer   bg-[--web-container]`;
  const regularClass = `rounded-lg  pl-2 w-72 text-b h-12 border   bg-[--web-container]`;
  const gradeClass = ` rounded-lg cursor-pointer pl-2 h-12  mt-10   w-72 md:w-[600px]  border bg-[--web-container]`;


  return (
    <div className="mt-16 w-screen z-30">
      <p className="text-center px-10 pb-8 text-lg">
        Note : This form is designed for MEMBERS OF REGISTERED SCHOOL  only. If you are the SCHOOL ORGANIZER ,
        please{" "}
        <Link className="text-[--web-primary-color]" href={"/new/organizer/request"}>
          Register your School
        </Link>{" "}
        instead.
      </p>
      <div className=" md:shadow-[0px_0px_2px_0px] rounded-lg py-2  w-fit px-1 md:px-10 mx-auto flex-col justify-center">
        <Image
          className="w-32 h-32 mx-auto mt-10"
          src={"/logo.svg"}
          width={100}
          height={100}
          alt="logo"
        />
        <h1 className="text-center font-bold text-2xl py-10">
          {webName} Member Request Form
        </h1>
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ y: 10, opacity: 0.6 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="my-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-50"
            >
              <p className="text-red-500 text-center">{error}</p>
              
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {success && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
              className="my-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-50"
            >
              <p className="text-green-500 text-center">Request submitted successfully!</p>
             
            </motion.div>
          )}
        </AnimatePresence>
        <form action="" onSubmit={handleSubmit} ref={formRef}>
          <div className="flex justify-center">
            <div className="flex md:flex-row flex-col justify-center gap-10 md:gap-6">
              <div className="flex flex-col  gap-10 w-72 ">
                <input
                  type="text"
                  placeholder="Your Name"
                  onChange={e => setData({ ...data, userName: e.target.value })}
                  className={regularClass}
                />
                <div className="relative ">
                  {isNotValid && <p className="text-red-500 absolute -mt-6">Please select a valid option
                  </p>}
                  <input
                    ref={dropdownRef}
                    className={regularClass}
                    placeholder={"School Name"}
                    onChange={handleChangeSchool}
                    onBlur={handleBlurSchool}
                    onClick={toggleSchool}
                    value={schoolName}
                    onFocus={handleFocusSchool}

                  />
                  {
                    isSchoolOpen && schoolname.filter((data) => {
                      return schoolName === "" ? true : data.schoolname.toLowerCase().trim().includes(schoolName.toLowerCase().trim());
                    }).length > 0 && (
                      <AnimatePresence mode="wait">
                        {isSchoolOpen && (
                          <motion.div
                            initial={{ y: 10, opacity: 0.6 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="absolute border max-h-64 overflow-auto w-72 mt-2 z-40 pl-2 py-2 shadow-lg rounded-lg grid gap-2 bg-white round "
                          >
                            {" "}
                            {schoolname
                              // filter the data according to input
                              .filter((data) => {
                                return schoolName === ""
                                  ? true
                                  : data.schoolname.toLowerCase().trim().includes(schoolName.toLowerCase().trim());
                              })
                              .map((option, index) => {
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
                    )}
                </div>
              </div>
              <div className="flex flex-col gap-10 w-72 ">
                <input
                  type="email"
                  placeholder="Your Email"
                  onChange={e => setData({ ...data, email: e.target.value })}

                  className="rounded-lg h-12 pl-2  border bg-[--web-container]
                  "
                />
                <div className="relative ">
                  <input
                    ref={roleRef}
                    className={roleClass}
                    placeholder="Select Your Role"
                    value={role}
                    onFocus={() => { setIsRoleOpen(true) }}
                    onBlur={() => { setIsRoleOpen(false) }}
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
                        className="absolute border max-h-64 overflow-auto w-72 mt-2 z-40 pl-2 py-2 shadow-lg rounded-lg grid gap-2 bg-white round "
                      >
                        {" "}
                        {
                          roles.map(item => (
                            <p key={item} className="cursor-pointer capitalize py-1 w-full px-2 rounded-lg hover:bg-gray-100" onClick={() => {
                              handleRoleClick(item)
                            }}> {item}</p>
                          ))
                        }
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center relative">

            <input
              ref={gradeRef}
              onClick={toggleGrade}
              onFocus={() => { setIsGradeOpen(true) }}
              onBlur={() => { setIsGradeOpen(false) }}
              placeholder="Select Your Grade"

              className={gradeClass}
              value={grade && "Grade " + grade}
              readOnly
            />

            {" "}

            <AnimatePresence mode="wait">
              {isGradeOpen && (
                <motion.div
                  initial={{ y: 10, opacity: 0.6 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="absolute border max-h-64 top-full overflow-auto w-72 md:w-[600px] mt-2 z-40 pl-2 py-2 shadow-lg rounded-lg grid gap-2 bg-white round "
                >
                  {" "}
                  {
                    grades.map(item => (
                      <p key={item} className="cursor-pointer py-1 w-full px-2 rounded-lg hover:bg-gray-100" onClick={() => {
                        handleGradeClick(item)
                      }}>Grade {item}</p>
                    ))
                  }
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-10 flex-col py-10 ">
            <textarea
              type="text"
              placeholder="Tell more about yourself"
              onChange={e => setData({ ...data, comment: e.target.value })}

              className="rounded-lg resize-none pl-2 pt-1 min-h-56   h-auto w-72 md:w-[600px] mx-auto  border bg-[--web-container]"
            />
            <button
              type="submit"
              
              className="rounded-[5px] cursor-pointer text-white h-14 bg-[--web-primary-color] text-center w-72 md:w-[600px] mx-auto  border-2"
            >{mloader &&(<span className="flex justify-center gap-2"> <BiLoaderCircle className="mt-1" /> <p>submitting...</p> </span> ) || "Submit Query"}</button>
          </div>
        </form>
      </div>
      <div className="grid justify-center">
        <div className=" w-80 md:w-[600px] py-10">
          <h2 className="md:-ml-8 -ml-4  font-bold ">Instructions: </h2>
          <ol className=" py-5 leading-6 text-justify grid gap-4">
            <li>
              1. Only Registered School's members may request for an MiWay member
              account, such as teachers or students ...
            </li>

            <li>
              2. If your school is not yet registered, then you can{" "}
              <Link href={"/new/organizer/request"} className="text-[--web-primary-color]">
                Register Your school
              </Link>{" "} to
              open an account with us.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Requestform;
