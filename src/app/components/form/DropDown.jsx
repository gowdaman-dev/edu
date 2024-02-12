"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

const DropDown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isValid,setIsValid] = useState(true);
  const dropdownRef = useRef();
  //close dropdown when click happended outside of the field
  useEffect(() => {
    const handleClose = e => {
      if (e.target != dropdownRef.current) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClose);
  }, []);

  const toggle = () => {
    setIsOpen(true);
  };

  const handleChange = e => {
    setSelectedOption(e.target.value);
    
  };
 // send the value to parent file when out of the field is clicked

 const handleBlur = e => {
  props.handleRole ? (
    props.handleRole(e.target.value)
  ) : null

  const optionExists = props.options.some(option => {
      const optionValues = Object.values(option);
      return optionValues.some(value => value.toLowerCase() === e.target.value);
    });
    if (!optionExists) {
      setIsValid(false)
      console.log("done");
    } else {console.log("no");}

  };
  
  const handleClick = label => {
    setSelectedOption(label);
    setIsValid(true)
//send the value to parent file
    props.handleRole ? (
    props.handleRole(label[0]) ) : null

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
        a
        required
      />
      {!isValid && (<p>please Choose give option</p>)}
      
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
              .filter( data => {
                return selectedOption === ""
                  ? true
                  : Object.keys(data).some(key =>
                      data[key].toLowerCase().includes(selectedOption)
                    );
              })
              .map( option => {
                const label = Object.keys(option).map( key => option[key]);

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
