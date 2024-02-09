import React from "react";
import { useState } from "react";
const DropDown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (label) => {
    setSelectedOption(label);

    console.log(label);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      
        <input 
         className="rounded-[3px] pl-2 w-72 md:w-72 text-b h-12 border outline-none focus:border-[3px] border-[--web-primary-color] bg-[--web-container]"
         onClick={toggle}
        placeholder={props.default} value={selectedOption} /> 
     
      {isOpen && (
        <div className="absolute w-72 md:w-72 z-40 pl-2 pt-3 grid gap-2 bg-white round">
          {props.options.map((option) => (
            <p
             
              key={option.value}
              onClick={() => handleClick(option.label)}
            >
              {option.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
