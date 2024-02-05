import React from "react";
import Image from "next/image";
import Link from "next/link";
import { webName } from "../globalDetails";
const Requestform = () => {

  const Comment = `Explore EduLearn: Streamline PDF sharing for educational advancement! Share why EduLearn is a must for your school.`
  return (
    <div className="mt-16">
      <p className="text-center px-10 pb-8 text-lg">
        You can write to your school here to ask them to create an account wth
        us. After they create an account, they can invite you to their group to
        gain free access.
      </p>
      <div className=" border-[3px] rounded-2xl border-[--web-primary-color] w-fit px-1 md:px-10 mx-auto flex-col justify-center">
        <Image
          className="w-32 h-32 mx-auto mt-10"
          src={"logo.svg"}
          width={100}
          height={100}
        />
        <h1 className="text-center  font-bold text-2xl py-10">
        Recommend {webName} to your School
        </h1>

        <div className="flex justify-center">
          <div className="flex md:flex-row flex-col justify-center gap-10 md:gap-6">
            <div className="flex flex-col  gap-10 w-72 md:w-72">
              <input
                type="text"
                placeholder="Your Name"
                className="rounded-[3px] pl-2 h-12 outline-none focus:border-[3px] border border-[--web-primary-color] bg-[--web-container]"
              />
              <input
                type="text"
                placeholder="School Name"
                className="rounded-[3px] pl-2 h-12 border outline-none focus:border-[3px] border-[--web-primary-color] bg-[--web-container]"
              />
            </div>
            <div className="flex flex-col gap-10 w-72 md:w-72">
              <input
                type="text"
                placeholder="Your Email"
                className="rounded-[3px] h-12 pl-2 outline-none focus:border-[3px] border border-[--web-primary-color] bg-[--web-container]"
              />
              <input
                type="text"
                placeholder="School Email"
                className="rounded-[3px] h-12 pl-2 border outline-none focus:border-[3px] border-[--web-primary-color] bg-[--web-container]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-10 flex-col py-10 ">
          <textarea
            type="text"
            placeholder={ Comment }
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
