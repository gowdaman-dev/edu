import React from "react";
import Recommend from "../components/Form";
import { webName } from "../components/globalDetails";
import Link from "next/link";

const page = () => {
  const content = {
    Header: `Recommend ${webName} Edu to your School`,
    Comment: `I am a student and heard that ${webName} is providing a free version for schools right now. ${webName} is a text to speech application that an help us listen to Word documents, PDFs, non-DRM eBooks, and websites. I think it will be very helpful for us, please consider creating an account at ${webName}. After signing up, please invite me to the group so I can login and use ${webName} for my schoolwork`,
  };
  return (
    <div className="mt-16">
      <p className="text-center px-10 pb-8 text-lg">
        You can write to your school here to ask them to create an account wth
        us. After they create an account, they can invite you to their group to
        gain free access.
      </p>
      <Recommend content={content} />
      <div className="mx-auto w-72 md:w-[600px] py-10">
        <h2 className="md:-ml-8 -ml-20 font-bold ">Instructions: </h2>
        <div className="grid py-5 gap-4">
          <p>
            This is for students to send a request to their school’s
            administrators to sign up for an account with NaturalReader. If you
            are an administrator or teacher, you can <Link href={'request'} className="text-[--web-primary-color]">contact us directly</Link> to open
            an account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
