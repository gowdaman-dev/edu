"use client";


import React, { useState, useRef, useEffect,useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { webName } from "../globalDetails";
import { grades, roles } from "./grade";
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
      /*       props.handleSchool(schoolName);
       */
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

    console.log(schoolName);

  }, [check]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    setSuccess('')
    console.log(data);
    if (data.userName == '' || data.email == '' || data.role == '' || data.comment == '' || data.grade == '' || data.schoolName == '') {
      setError('Please fill all the fields')
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
        return
      } else {
        setSuccess(res.message)
        return
      }
    } catch (error) {
      console.log(error);
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
    setIsSchoolOpen(false)
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
        <form action="" onSubmit={handleSubmit}>
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
                          .map((option,index) => {
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
                        <p
                          className={dropdownClass}
                          onClick={() => {

                            handleRoleClick("Student");
                          }}
                        >
                          Student
                        </p>
                        <p
                          className={dropdownClass}
                          onClick={() => {
                            handleRoleClick("Teacher");
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
          <div className="flex justify-center relative">

            <input
              ref={gradeRef}
              onClick={toggleGrade}
              onFocus={() => { setIsGradeOpen(true) }}
              onBlur={() => { setIsGradeOpen(false) }}
              placeholder="Select Your Grade"

              className={gradeClass}
              value={grade && "Grade "+grade}
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
              placeholder={Comment}
              onChange={e => setData({ ...data, comment: e.target.value })}

              className="rounded-lg resize-none pl-2 pt-1 min-h-56   h-auto w-72 md:w-[600px] mx-auto  border bg-[--web-container]"
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

export default Requestform;
