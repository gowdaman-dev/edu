"use client";
import React, { useEffect, useState, useRef } from "react";
const DropDown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClose = (e) => {
      if (e.target != dropdownRef.current) {
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
  };

  const handleClick = (label) => {
    setSelectedOption(label);
    setIsOpen(false);
  };

  return (
    <div className="relative ">
      <input
        ref={dropdownRef}
        className="rounded-[3px] pl-2 w-72 md:w-72 text-b h-12 border outline-none focus:border-[3px] border-[--web-primary-color] bg-[--web-container]"
        placeholder={props.default}
        onChange={handleChange}
        onClick={toggle}
        value={selectedOption}
      />

      {isOpen && (
        <div className="absolute w-72  z-40 pl-2 pt-3 grid gap-2 bg-white round">
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
              console.log(label);
              return <p onClick={() => handleClick(label)}> {label}</p>;
            })}
        </div>
      )}
    </div>
  );
};

export default DropDown;
