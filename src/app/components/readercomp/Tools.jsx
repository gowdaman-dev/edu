import { BiRotateRight } from "react-icons/bi";
import { AiOutlineUpload } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import { BsZoomOut } from "react-icons/bs";
import { BsZoomIn } from "react-icons/bs";
import { AiOutlineFullscreen } from "react-icons/ai";
import React from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { AnimatePresence,motion } from "framer-motion";


function Tools({ click, fullScreen, zoomIn, zoomOut, download, newFile, rotation }) {
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

  return (
    <motion.div initial={{ opacity: .4 }} animate={{ opacity: 1 }} transition={{ type: 'spring', duration: .5 }} exit={{ opacity: 0 }}    className='tool col-end-12 row-span-4  absolute grid grid-cols-8  grid-rows-8  bg-white w-72 rounded-lg border-[2px] row-start-2 box-border col-span-4 right-1 justify-center'>
      <h4 className="col-span-7 flex justify-center items-center ml-10 ">Tools</h4>
      <span className='flex justify-end col-span-1 col-end-9 text-3xl p-2 cursor-pointer text-gray-500' onClick={() => click(false)}>
        <AiOutlineClose />
      </span>

      <button className=" col-span-3 row-span-2 m-1 col-start-2    bg-gray-100 rounded-md gap-y-5 flex flex-col  items-center" onClick={handleFullScreen}><span className="text-3xl mt-2 text-[--web-primary-color]">
        <AiOutlineFullscreen /> </span><span className="text-sm text-white bg-[--web-primary-color] rounded-t-xl h-full  block w-full">Fscreen</span></button>
      <button className=" col-span-3 row-span-2 m-1   bg-gray-100 rounded-md gap-y-5 flex flex-col  items-center" onClick={handleZoomIn}><span className="text-3xl mt-2 text-[--web-primary-color]">
        <BsZoomIn /> </span><span className="text-sm text-white bg-[--web-primary-color] rounded-t-xl h-full  block w-full">zoomin</span></button>
      <button className=" col-span-3 row-span-2 m-1 col-start-2  bg-gray-100 rounded-md gap-y-5 flex flex-col  items-center" onClick={handleZoomOut}><span className="text-3xl mt-2 text-[--web-primary-color]">
        <BsZoomOut /> </span><span className="text-sm text-white bg-[--web-primary-color] rounded-t-xl h-full  block w-full">Zoomout</span></button>

        // the below buttons are work cool we just hie them due to not availablity of audio
   {/* <button className="col-span-3 row-span-2 m-1    bg-gray-100 rounded-md gap-y-5 flex flex-col  items-center" onClick={handleDownload}><span className="text-3xl mt-2 text-[--web-primary-color]">
        <AiOutlineDownload /> </span><span className="text-sm text-white bg-[--web-primary-color] rounded-t-xl h-full  block w-full">Download</span></button>
     <button className="col-span-3 row-span-2 m-1  col-start-2  bg-gray-100 rounded-md gap-y-5 flex flex-col  items-center" onClick={handleUpload}>            <input
        type="file"
        onChange={(e) => handleUpload(e)}
        className="hidden"
        id="file"
      />
        <label htmlFor="file" className="flex flex-col h-full w-full  items-center gap-y-5">
          <span className="text-3xl mt-2 text-[--web-primary-color]">
            <AiOutlineUpload /></span><span className="text-sm text-white bg-[--web-primary-color] rounded-t-xl h-full  block w-full">Upload</span>
        </label>

      </button>  */}
      <button className="col-span-3 row-span-2 m-1    bg-gray-100 rounded-md gap-y-5 flex flex-col items-center" onClick={handleRotate}><span className="text-3xl mt-2 text-[--web-primary-color]">
        <BiRotateRight /></span><span className="text-sm text-white bg-[--web-primary-color] rounded-t-xl h-full  block w-full">Rotate</span></button>
    </motion.div>
  );
}

export default Tools;
