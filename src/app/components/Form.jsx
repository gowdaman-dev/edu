import React from "react";
import Image from "next/image";
const Requestform = (props) => {
  return (
    <div> 
      <div className=" border-[3px] rounded-2xl border-[--web-primary-color] w-fit px-1 md:px-10 mx-auto flex-col justify-center">
        <Image
          className="w-32 h-32 mx-auto mt-10"
          src={"logo.svg"}
          width={100}
          height={100}
        />
        <h1 className="text-center  font-bold text-2xl py-10">
          {props.content.Header}
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
                placeholder={props.content.input_1}
                className="rounded-[3px] h-12 pl-2 outline-none focus:border-[3px] border border-[--web-primary-color] bg-[--web-container]"
              />
              <input
                type="text"
                placeholder={props.content.input_2}
                className="rounded-[3px] h-12 pl-2 border outline-none focus:border-[3px] border-[--web-primary-color] bg-[--web-container]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-10 flex-col py-10 ">
          <textarea
            type="text"
            placeholder={props.content.Comment}
            className="rounded-[3px] pl-2 pt-1 min-h-56 outline-none focus:border-[3px] h-auto w-72 md:w-[600px] mx-auto  border border-[--web-primary-color] bg-[--web-container]"
          />
          <input
            type="submit"
            value={"Send"}
            className="rounded-[5px] cursor-pointer text-white h-14 bg-[--web-primary-color] text-center w-72 md:w-[600px] mx-auto  border-2 border-[--web-primary-color]"
          />
        </div>
      </div>
      
    </div>
  );
};

export default Requestform;
