"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

const DropDown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClose = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClose);
  }, []);

  const toggle = () => {
    setIsOpen(true);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);

    selectedOption.toString().toLowerCase() === "student"
      ? props.handleRole(true)
      : null;
  };

  const handleClick = (label) => {
    setSelectedOption(label);
    const student = selectedOption.toString().toLowerCase() === "student";
    props.handleRole(student);
    setIsOpen(false);
  };

  return (
    <div className="relative ">
      <input
        ref={dropdownRef}
        className="rounded-[3px] capitalize pl-2 w-72 md:w-72 text-b h-12 border outline-none focus:border-[3px] border-[--web-primary-color] bg-[--web-container]"
        placeholder={props.default}
        onChange={handleChange}
        onClick={toggle}
        value={selectedOption}
        a
        required
      />
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ y: 10, opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="absolute max-h-72 overflow-auto w-72 mt-2 z-40 pl-2 py-2  rounded-lg grid gap-2 bg-white round"
          >
            {" "}
            {props.options
              .filter((data) => {
                return selectedOption === ""
                  ? true
                  : Object.keys(data).some((key) =>
                      data[key].toLowerCase().includes(selectedOption)
                    );
              })
              .map((option) => {
                const label = Object.keys(option).map((key) => option[key]);

                return (
                  <p
                    className="capitalize cursor-pointer p-1 w-[273px] rounded-lg hover:bg-gray-100"
                    onClick={() => {
                      handleClick(label);
                    }}
                    key={label}
                  >
                    {" "}
                    {label}
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
