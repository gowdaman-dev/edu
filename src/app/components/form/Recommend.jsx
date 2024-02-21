'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { webName } from "../globalDetails";
import { motion, AnimatePresence } from "framer-motion";
const Requestform = () => {
  const [formData, setFormData] = useState({
    name: "",
    schoolname: "",
    email: "",
    role: "",
    description: "",
  });
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitEvent = async (e) => {
    setError('')
    setSuccess('')
    e.preventDefault();
    if (data.name === '' || data.schoolname === '' || data.email === '' || data.role === '' || data.description === '') {
      setError('Please fill all the fields')
      return
    }
    try {
      const response = await fetch("/api/organizerRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log();
      if (response.status === 400) {
        setError(data.message)
        return
      }
      setSuccess(data.message)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const Comment = `Explore EduLearn : Streamline PDF sharing for educational advancement! Share why EduLearn is a must for your school.`;
  return (
    <div className="mt-16">
      <p className="text-center px-10 pb-8 text-lg">
        You can write to your school here to ask them to create an account wth
        us. After they create an account, they can invite you to their group to
        gain free access.
      </p>
      <div className=" rounded-lg md:shadow-[0px_0px_2px_0px] sm:w-fit w-full px-1 md:px-10 mx-auto flex-col justify-center">
        <Image
          className="w-32 h-32 mx-auto mt-10"
          src={"/logo.svg"}
          width={100}
          height={100}
          alt=""
        />
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
        <h1 className="text-center  font-bold text-2xl py-10">
          Recommend {webName} to your School
        </h1>
        <form onSubmit={submitEvent} className="text-gray-800" action="">
          <div className="flex justify-center">
            <div className="flex md:flex-row w-full flex-col justify-center gap-10 md:gap-6">
              <div className="flex flex-col gap-10 md:w-72 w-full">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-lg pl-2 h-12 outline-none border  bg-[--web-container]"
                />
                <input
                  id="schoolname"
                  name="schoolname"
                  type="text"
                  placeholder="School Name"
                  value={formData.schoolname}
                  onChange={handleChange}
                  className="rounded-lg pl-2 h-12 border outline-none border web-container]"
                />
              </div>
              <div className="flex flex-col gap-10 w-full md:w-72 ">
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-lg h-12 pl-2 outline-none border  bg-[--web-container]"
                />
                <input
                  id="role"
                  name="role"
                  type="text"
                  placeholder="Role You Play"
                  value={formData.role}
                  onChange={handleChange}
                  className="rounded-lg h-12 pl-2 border outline-none border web-container]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-10 flex-col py-10 ">
            <textarea
              id="description"
              name="description"
              type="text"
              placeholder={Comment}
              value={formData.description}
              onChange={handleChange}
              className="rounded-lg pl-2 pt-1 min-h-56 outline-none border order border resize-none"
            />
            <input
              type="submit"
              className="rounded-[5px] cursor-pointer text-white h-14 bg-[--web-primary-color] text-center w-full mx-auto  border-2 border-[--web-primary-color]"
            />
          </div>
        </form>
      </div>

      <div className="grid justify-center">
        <div className=" w-80 md:w-[600px] py-10">
          <h2 className="md:-ml-8 -ml-4  font-bold">Instructions: </h2>
          <div className=" py-5 leading-6">
            <p className="text-justify ">
              This is for students to send a request to their school's
              administrators to sign up for an account with NaturalReader. If
              you are an administrator or teacher, you can{" "}
              <Link
                href={"requeststaff"}
                className="text-[--web-primary-color]"
              >
                contact us directly
              </Link>{" "}
              to open an account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requestform;
