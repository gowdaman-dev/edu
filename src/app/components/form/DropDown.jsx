"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

const DropDown = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isNotValid, setIsNotValid] = useState(false);
  const [check,setCheck] = useState ("")
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
  useEffect(() => {
    const validate = () => {
      props.handleSchool(selectedOption)

      const optionExist = props.options.find(item => item.school === selectedOption)
      optionExist || selectedOption == ""
        ? setIsNotValid(false)
        : setIsNotValid(true)

    };
    validate();
  }, [check]);
  const toggle = () => {
    setIsOpen(true);
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value.toLowerCase());
  };

  const handleBlur = (e) => {
    const value = e.target.value.toLowerCase();
    setCheck(value)
    setSelectedOption(value);
  };

  const handleClick = (label) => {
    setSelectedOption(label);

    setIsNotValid(false);
    setIsOpen(false);
  };

  return (
    <div className="relative ">
      <input
        ref={dropdownRef}
        className={props.className}
        placeholder={props.default}
        onChange={handleChange}
        onBlur={handleBlur}
        onClick={toggle}
        value={selectedOption}
        required
      />
      {isNotValid && <p className="text-red-500">please Choose give option</p>}

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
            {props.options
              // filter the data according to input
              .filter((data) => {
                return selectedOption === ""
                  ? true
                  : data.school.toLowerCase().includes(selectedOption);
              })
              .map((option) => {
                return (
                  <p
                    className="capitalize cursor-pointer p-1 w-[273px] rounded-lg hover:bg-gray-100"
                    onClick={() => {
                      handleClick(option.school);
                    }}
                    key={option.school}
                  >
                    {" "}
                    {option.school}
                  </p>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDown;
