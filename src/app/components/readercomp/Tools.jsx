import { BiRotateRight } from "react-icons/bi";
import { AiOutlineUpload } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import { BsZoomOut } from "react-icons/bs";
import { BsZoomIn } from "react-icons/bs";
import { AiOutlineFullscreen } from "react-icons/ai";
import React, { useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";


function Tools({ click, fullScreen, zoomIn, zoomOut, download, newFile, rotation,customRotate,setCustomRotate }) {
  const handleFullScreen = () => {
    fullScreen.onClick(); // Safe call with optional chaining
  };
  const handleZoomIn = () => {
    zoomIn.onClick(); // Safe call with optional chaining
  };
  const handleZoomOut = () => {
    zoomOut.onClick(); // Safe call with optional chaining
  };
  const handleDownload = () => {
    download.onClick(); // Safe call with optional chaining
  };
  const handleUpload = (e) => {
    newFile.onClick(e); // Safe call with optional chaining
  };
  const handleRotate = () => {
    rotation.onClick(); // Safe call with optional chaining
  };

  const handleCustomRotate=()=>{
    const currentStyle=customRotate.style
  
    if(currentStyle=="rotateY(0)"){
    setCustomRotate({style:"rotateY(180deg)"})

    }
    else if(currentStyle=="rotateY(180deg)"){
    setCustomRotate({style:"rotateZ(180deg)"})

    }
    else if(currentStyle=="rotateZ(180deg)"){
      setCustomRotate({style:"rotateY(0)"})
  
      }
  }


  return (
    <motion.div initial={{ opacity: .4 }} animate={{ opacity: 1 }} transition={{ type: 'spring', duration: .5 }} exit={{ opacity: 0 }} className='tool col-end-12 row-span-4  absolute grid grid-cols-8    grid-rows-5 bg-white w-72 rounded-lg border-[2px]  box-border  right-1 justify-center'>
      <h4 className="col-span-7 flex justify-center items-center ml-10 ">Tools</h4>
      <span className='flex justify-end col-span-1 col-end-9 text-3xl p-2 cursor-pointer text-gray-500' onClick={() => click(false)}>
        <AiOutlineClose />
      </span>

      <button className=" col-span-4 row-span-2 m-1 col-start-1 col-end-5    bg-gray-100 rounded-md gap-y-5 flex flex-col  items-center" onClick={handleFullScreen}><span className="text-3xl mt-2 text-[--web-primary-color]">
        <AiOutlineFullscreen /> </span><span className="text-sm text-black  rounded-t-xl h-full  block w-full">F-screen</span></button>
      <button className=" col-span-5 row-span-2 m-1 col-start-5 col-end-9    bg-gray-100 rounded-md gap-y-5 flex flex-col  items-center" onClick={handleZoomIn}><span className="text-3xl mt-2 text-[--web-primary-color]">
        <BsZoomIn /> </span><span className="text-sm text-black  rounded-t-xl h-full  block w-full">zoom-in</span></button>
      <button className=" col-span-4 row-span-2 m-1 col-start-1 col-end-5  bg-gray-100 rounded-md gap-y-5 flex flex-col  items-center" onClick={handleZoomOut}><span className="text-3xl mt-2 text-[--web-primary-color]">
        <BsZoomOut /> </span><span className="text-sm text-black  rounded-t-xl h-full  block w-full">Zoom-out</span></button>


      {/* 
   //this buttons are work as well but i stoped thier function due to super admin request
   <button className="col-span-3 row-span-2 m-1    bg-gray-100 rounded-md gap-y-5 flex flex-col  items-center" onClick={handleDownload}><span className="text-3xl mt-2 text-[--web-primary-color]">
        <AiOutlineDownload /> </span><span className="text-sm text-black  rounded-t-xl h-full  block w-full">Download</span></button>
     <button className="col-span-3 row-span-2 m-1  col-start-2  bg-gray-100 rounded-md gap-y-5 flex flex-col  items-center" onClick={handleUpload}>            <input
        type="file"
        onChange={(e) => handleUpload(e)}
        className="hidden"
        id="file"
      />
        <label htmlFor="file" className="flex flex-col h-full w-full  items-center gap-y-5">
          <span className="text-3xl mt-2 text-[--web-primary-color]">
            <AiOutlineUpload /></span><span className="text-sm text-black  rounded-t-xl h-full  block w-full">Upload</span>
        </label>

      </button>  */}
     {/*
     this is default pdf rotate but we need to show up the pdf like mirror ,back so what i use custom division and style that
     <button className="col-span-5 row-span-2 m-1 col-start-5 col-end-9     bg-gray-100 rounded-md gap-y-5 flex flex-col items-center" onClick={handleRotate}><span className="text-3xl mt-2 text-[--web-primary-color]">
        <BiRotateRight /></span><span className="text-sm text-black  rounded-t-xl h-full  block w-full">Rotate</span></button> */}
        <button className="col-span-5 row-span-2 m-1 col-start-5 col-end-9     bg-gray-100 rounded-md gap-y-5 flex flex-col items-center" onClick={handleCustomRotate}><span className="text-3xl mt-2 text-[--web-primary-color]">
        <BiRotateRight /></span><span className="text-sm text-black  rounded-t-xl h-full  block w-full">Rotate</span></button> 
    </motion.div>
  );
}

export default Tools;
