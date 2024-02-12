"use client";


const DropDown = (props) => {


 


 

  // send the value to parent file when out of the field is clicked
  

  const handleClick = (label) => {
    setSelectedOption(label);
    setIsValid(true);
    //send the value to parent file
    props.handleRole ? props.handleRole(label[0]) : null;

    setIsOpen(false);
  };

  return (
    <div>
      
    </div>
  );
};

export default DropDown;
