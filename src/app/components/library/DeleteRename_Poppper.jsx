import { MdDelete } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import React from 'react'
import axios from "axios";

function Popper(props) {
  const id = props.id
  function handleDelete() {
    if (id) {
      axios.delete("/api/files", { data: { id: id } })
      .then(res => { props.update(id);
        props.animate(true)
      props.closePop(null) 
    })
    }
  }
  return (
    <div className='fixed flex flex-col rounded-md bg-white border-gray-400 border z-[2] md:right-44 right-16 sm:right-28 lg:right-60 xl:right-96' >
      <div className="grid grid-cols-3  md:py-2 active:bg-teal-100 ">
        <span className="col-span-1 grid place-content-center">

          <MdDelete />
        </span>
        <span className=' col-span-2' onClick={() => handleDelete()}>Delete</span>

      </div>
      <div className="grid grid-cols-3 py-2 md:py-4 active:bg-teal-100 ">

        <span className="col-span-1 grid place-content-center">


          <MdOutlineDriveFileRenameOutline />
        </span>
        <span className=''>Rename</span>
      </div>

    </div>
  )
}

export default Popper