import React from "react";
import Recommend from "../components/Form";
import { webName } from "../components/globalDetails";
import Link from "next/link";

const page = () => {
  //props data for placeholder
  const content = {
    Header: `Recommend ${webName} to your School`,

    Comment: `Explore EduLearn: Streamline PDF sharing for educational advancement! Share why EduLearn is a must for your school.`,
   
    input_1:'Your Email', 

    input_2:'School Email',
  };
  return (
    <div className="mt-16">
      <p className="text-center px-10 pb-8 text-lg">
        You can write to your school here to ask them to create an account wth
        us. After they create an account, they can invite you to their group to
        gain free access.
      </p>
      <Recommend content={content} />
      <div className='grid justify-center'>
      <div className=" w-80 md:w-[600px] py-10">
        <h2 className="md:-ml-8 -ml-4  font-bold">Instructions: </h2>
        <div className=" py-5 leading-6">
          <p className="text-justify ">
            This is for students to send a request to their school's
            administrators to sign up for an account with NaturalReader. If you
            are an administrator or teacher, you can <Link href={'requeststaff'} className="text-[--web-primary-color]">contact us directly</Link> to open
            an account.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default page;
