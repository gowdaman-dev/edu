"use client"
import { MdDelete } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { ref, deleteObject } from "firebase/storage";
import { db } from "@/firebase/firebase";
import Rename from "./Rename";
function Popper(props) {
  const [isOpen, setIsOpen] = useState(false)
  const id = props.id
  function handleDelete() {



    if (id) {

      const desertRef = ref(db, `files/${id}`);
      deleteObject(desertRef).then(() => {
        axios.delete("/api/files", { data: { id: id } })
          .then(res => {
            props.update(id);
            props.animate(true)
            props.closePop(null)
          })
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });




    }

  }
  function handle_click_rename() {
    setIsOpen(true);
  }
  return (
    <div className="delete_rename" >


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
      {isOpen &&


        <div className="fixed z-[3]  w-full flex justify-center  left-1">
          <Rename name={props.name} id={id} update={props.update} closePop={props.closePop} animate={props.animate}/>
        </div>
      }
    </div>
  )
}

export default Popper