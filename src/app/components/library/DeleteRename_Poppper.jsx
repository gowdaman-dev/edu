"use client"
import { MdDelete } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { AnimatePresence,motion } from "framer-motion";

import axios from "axios";
import { ref, deleteObject } from "firebase/storage";
import { db } from "@/firebase/firebase";
import { Anybody } from "next/font/google";
function Popper(props) {
  const id = props.id
 async function handleDelete() {



    if (id) {
try{
  
  const deleteFile = ref(db, `files/${id}`);
  const deleteAudio = ref(db,`audio/${id}`);
  const deleteTrans = ref(db,`transcript/${id}`);
 await deleteObject(deleteFile)
await   deleteObject(deleteAudio)
await   deleteObject(deleteTrans)
  

axios.delete("/api/files", { data: { id: id } })
        .then(res => {
          props.update(id);
          props.animate(true)
          props.closePop(null)
        })

}catch (e) {


}




    }

  }
  function handle_click_rename() {
    props.closePop(null)

    props.rename(true)
  }
  return (
    <div className="delete_rename" initial={{ opacity: .4 }} animate={{ opacity: 1 }} transition={{ type: 'spring', duration: .5 }} exit={{ opacity: 0 }}   >


      <div className='fixed grid grid-rows-2 rounded-md bg-white border-gray-400 border z-[2] md:right-44 right-16 sm:right-28 lg:right-60 xl:right-96 ' >
        <div className="grid grid-cols-3 row-span-1 md:py-2 active:bg-gray-100 delete_rename  ">
          <span className="col-span-1 grid place-content-center text-[--web-primary-color]">

            <MdDelete />
          </span>
          <span className=' col-span-2  flex items-center' onClick={() => handleDelete()}>Delete</span>

        </div>
        <div className="grid grid-cols-3 row-span-1 py-2 md:py-4 active:bg-gray-100 delete_rename">

          <span className="col-span-1 grid place-content-center text-[--web-primary-color]">


            <MdOutlineDriveFileRenameOutline />
          </span>
          <span className='' onClick={handle_click_rename}>Rename</span>
        </div>

      </div>

    </div>
  )
}

export default Popper