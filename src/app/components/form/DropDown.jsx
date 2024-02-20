"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

const DropDown = (props) => {
  const [isSchoolOpen, setIsSchoolOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isNotValid, setIsNotValid] = useState(false);
  const dropdownRef = useRef();

  //close dropdown when click happended outside of the field
  useEffect(() => {
    const handleClose = (e) => {
      if (e.target != dropdownRef.current) {
        setIsSchoolOpen(false);
      }
    };
    window.addEventListener("click", handleClose);
  }, []);
  useEffect(() => {
    const validate = () => {
/*       props.handleSchool(selectedOption);
 */
      const optionExist = schoolname.find(
        (item) =>{
const val=item.schoolname
const bool=val.toLowerCase()== selectedOption.toLowerCase()
return bool
         

        }
        
      );
      optionExist || selectedOption == ""
        ? setIsNotValid(false)
        : setIsNotValid(true);
    };
    validate();
  }, [selectedOption]);
  const toggleSchool = () => {
    setIsSchoolOpen(true);
  };

  const handleChangeSchool = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleBlurSchool = (e) => {
    const value = e.target.value;
    setIsSchoolOpen(false)
    setSelectedOption(value);
  };

  const handleClickSchool = (label) => {
    setSelectedOption(label);

    setIsNotValid(false);
    setIsSchoolOpen(false);
  };

  const handleFocusSchool = () => {
    setIsSchoolOpen(true);
  }

  return (
    <div className="relative ">
      {isNotValid && <p className="text-red-500 absolute -mt-6">please Choose give option</p>}
      <input
        ref={dropdownRef}
        className={regularClass}
        placeholder={"School Name"}
        onChange={handleChangeSchool}
        onBlur={handleBlurSchool}
        onClick={toggleSchool}
        value={selectedOption}
        onFocus={handleFocusSchool}
        required
      />

      <AnimatePresence mode="wait">
        {isSchoolOpen && (
          <motion.div
            initial={{ y: 10, opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="absolute max-h-64 overflow-auto w-72 mt-2 z-40 pl-2 py-2  rounded-lg grid gap-2 bg-white round"
          >
            {" "}
            {schoolname
              // filter the data according to input
              .filter((data) => {
                return selectedOption === ""
                  ? true
                  : data.schoolname.toLowerCase().includes(selectedOption);
              })
              .map((option) => {
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
    </div>
  );
};

export default DropDown;
