import React from "react";
import Link from "next/link";
const Requestform = () => {
  const about =
    "Tell us more about yourself and the purpose of using our product";
  return (
    <div className="md:mt-32 mt-16">
      <p className="text-center px-10 pb-8 text-lg">
        Note: this form is designed for EDUCATORS only. If you are a STUDENT,
        please{" "}
        <Link className="text-[--web-primary-color]" href={""}>
          recommend&nbsp;it to&nbsp;your&nbsp;school
        </Link>{" "}
        instead.
      </p>
      <div className="border border-x-2 w-fit px-20 mx-auto flex-col justify-center">
        <h1 className="text-center py-10">NaturalReader Edu Request Form</h1>

        <div className="flex justify-center">
          <div className="flex md:flex-row flex-col justify-center gap-6">
            <div className="flex flex-col  gap-7 w-72 md:w-72">
              <input
                type="text"
                placeholder="Your Name"
                className="rounded-[3px] h-12 border border-1 border-[--web-primary-color] bg-[--web-container]"
              />
              <input
                type="text"
                placeholder="School Name"
                className="rounded-[3px] h-12 border border-1 border-[--web-primary-color] bg-[--web-container]"
              />
            </div>
            <div className="flex flex-col gap-7 w-72 md:w-72">
              <input
                type="text"
                placeholder="Your Work Email"
                className="rounded-[3px] h-12 border border-1 border-[--web-primary-color] bg-[--web-container]"
              />
              <input
                type="text"
                placeholder="Subject Name"
                className="rounded-[3px] h-12 border border-1 border-[--web-primary-color] bg-[--web-container]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-7 flex-col py-8 ">
          <textarea
            type="text"
            placeholder={about}
            className="rounded-[3px] min-h-56 w-72 md:w-[600px] mx-auto border border-1 border-[--web-primary-color] bg-[--web-container]"
          />
          <input
            type="sumbit"
            value={"Send"}
            className="rounded-[3px] text-center w-72 md:w-[600px] mx-auto border border-1 border-[--web-primary-color] bg-[--web-container]"
          />
        </div>
      </div>
      <div>
        <h2>Instructions: </h2>
        <p>
          1. Only school personnel (not students) may register for an EDU
          account, such as teachers or school administrators
        </p>
        <p>
          2. Once a School is set up under your account, you as the account
          owner can create Classes and add Students & Teachers. Users set as
          "Teachers" have admin access to invite or delete other members.
        </p>
        <p>
        3. Under a free EDU account, all invited users also have free user limitations.
        </p>
        <p>
        4. If you are a student, you can request that your school open an account with us.
        </p>
      </div>
    </div>
  );
};

export default Requestform;
