'use client'
// pending :hadle file size, file not send eroor handle
import { MdPictureAsPdf } from "react-icons/md";
import { BiCloudUpload } from 'react-icons/bi'
import React, { useEffect, useState, useContext } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import SkeletonAnimation from '../SkeletonAnimation'
import fetchFiles from '@/utils/FetchFiles'
import axios from 'axios'
import ProgressComp from './ProgressComponent'
import Popper from './DeleteRename_Poppper'
import { db } from '@/firebase/firebase'
import { v4 as uuid } from 'uuid'
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useSession } from "next-auth/react";
import { UserContext } from "@/ContextUser";
import Alert from "./Alert";
let filesShow = []
function Files() {
  const router=useRouter()


  const { data: session, loading } = useSession()
  const { school: SCHOOL } = session.user
  const [isStudent, setStudent] = useState(session.user.role === "student")
  const { navGrade: GRADE,setUrl } = useContext(UserContext)
  const [data, setData] = useState([])
  const [isAnimate, setIsAnimate] = useState(true)
  const [newFile, setNewFile] = useState(0)
  const [progress, setProgress] = useState(0)
  const [progVisible, setProgVisible] = useState(false)
  const [pop_DEl_Rename, setPop_Del_Rename] = useState(null)
  const [delete_id, setDelete_id] = useState(null)
  const [file_Name, setName] = useState(null)
  const [alert, setAlert] = useState(false)
  useEffect(() => {
    const fetchData = () => {


      try {
        fetchFiles(session, GRADE).then(res => {
          if (res) {
            setIsAnimate(false)

            setData(res)
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()

  }, [newFile, GRADE, loading])
  useEffect(() => {
    // Define the event listener function
    function clickEvent(e) {
      const tag = e.target.tagName
      switch (tag) {
        case "DIV":
          if (!(e.target.classList.contains("delete_rename"))) {

            setPop_Del_Rename(null)
          }
          break;
        case "SECTION":
          setPop_Del_Rename(null)
          break;
        case "P":
          setPop_Del_Rename(null)
          break;
        case "DIV":
          setPop_Del_Rename(null)
          break;
        case "UL":
          setPop_Del_Rename(null)
          break;
        case "SVG":
          setPop_Del_Rename(null)
          break;
        case "PATH":
          setPop_Del_Rename(null)
          break;

        case "LABEL":
          setPop_Del_Rename(null)
          break;
        default:
          null

      }

    }

    // Add event listener when component mounts
    window.addEventListener("click", clickEvent);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("click", clickEvent);
    };
  })

  function handlePopClick(index, id, name) {
    if (index === pop_DEl_Rename) {
      setPop_Del_Rename(null)
    }
    else {

      setPop_Del_Rename(index)
      setDelete_id(id)
      setName(name)
    }
  }
  const pdfClick = (e,URL) => {
const threeDotParent=e.target.classList.contains("three_dot")
const threeDotSvg=e.target.parentElement.classList.contains("three_dot")
    if((!threeDotParent && !threeDotSvg) && pop_DEl_Rename===null){

      router.push("/reader/"+URL)
    }

  }
  if (!data.message && data) {
    filesShow = data.map((item, index) => {
      let name = item.fname
      let size = item.fsize
      let id = item.fid
      const URLID=id
      //work done on items
      //for file name
      let trimName = item.fname
      trimName = trimName.split(".pdf")
      trimName = trimName[0]
      name = name.split(/\.(pdf|docx|doc)$/)[0];
      name = name.length > 30 ? name.slice(0, 30) + '...' : name
      // for file size
      size = size / 1000
      size =
        size > 1000
          ? (size / 1000).toFixed(2) + 'MB/s'
          : Math.floor(size) + ' KB/s'

      return (
        <div 
          key={'file' + index}
          className='grid grid-flow-col grid-rows-3   grid-cols-8 cursor-pointer  text-balance   text-gray-500 w-full border-gray-200 relative md:text-[16px] sm:text-md text-sm border-b-[1px]
          '
        >
          <span className='grid col-span-1 row-span-3 text-3xl text-gray-500 sm:text-2xl  place-content-center py-3 ' onClick={(e)=>pdfClick(e,URLID)}>
            <MdPictureAsPdf />
          </span>
          <p
            className='col-span-5 sm:col-span-6 row-span-3 font-light     flex  items-center' onClick={(e)=>pdfClick(e,URLID)}
            key={'filename' + index}
          >
            {name}
          </p>
          {
            !isStudent &&
            <span className='grid col-span-2 sm:col-span-1 row-span-3 text-xl bg-gray-100 py-0 place-content-center   three_dot  ' key={index} onClick={() => { handlePopClick(index, id, trimName) }} >
              <BsThreeDotsVertical />
            </span>
          }

          {pop_DEl_Rename === index &&



            <Popper name={file_Name} id={delete_id} update={setNewFile} closePop={setPop_Del_Rename} animate={setIsAnimate} />

          }
        </div>
      )
    })
  }
  const renderData = (
    data.message ? (
      !isAnimate ? (
        <p className='bg-gray-200 text-gray-600 p-10 rounded-lg mt-20'>Oop's {data.message}</p>
      ) : null
    ) : !isAnimate && (
      filesShow
    )
  );




  function handleChange(e) {
    let file = e.target.files[0]
    const _uuid = uuid()
    const NAME = file.name
    //TODO:firebase operation
    if (file) {
      if (NAME.includes(".pdf")) {
        setProgVisible(true)
        const reference = ref(db, `files/${_uuid}`)
        const uploadTask = uploadBytesResumable(reference, file);

        uploadTask.on("state_changed", (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress = Math.round(progress)

          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }

        }, (err) => {


        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const fileData = {
              fname: file.name,
              fsize: file.size,
              _fid: _uuid,
              furl: downloadURL,
              fgrade: GRADE,
              fschool: SCHOOL

            }
            sendData(fileData)
            setProgVisible(false)
            setProgress(0)
            e.target.value = ""

          })

        })



      }
      else {
        setAlert(true)
        e.target.value = ""
      }
    }

  }

  async function sendData(data) {
    setProgVisible(true)
    const sendFile = await axios.post(
      `/api/files`,
      data)
    if (sendFile.status !== 200) {
      // need to handle jk
      console.log('file send failed')
    } else {
      //  setProgVisible(false)

      setIsAnimate(true)
      setNewFile(newFile + 1)
    }
  }
  return (
    <div>
      <ul className='flex items-center justify-between h-16 border-b border-gray-100 w-screen md:w-full'>
        {isStudent ?
          <li className="px-4 text-gray-600 flex justify-center  w-full">
            <b>Shared Library ({data.length || 0})</b>
          </li> :
          <li className="px-4 text-gray-600 text-center">
            <b>Shared Library ({data.length || 0})</b>
          </li>}
        {!isStudent && <li>
          <input
            type='file'
            accept='.pdf,.doc,.docx'
            onChange={e => handleChange(e)}
            name='file'
            id='fileUpload'
            hidden
          />
          <label
            htmlFor='fileUpload'
            className=' mr-4 border-2 flex cursor-pointer text-gray-500 justify-between items-center px-6 py-2  rounded-md active:scale-90 active:bg-gray-100'
          >
            <span className='inline-block text-[--web-primary-color] pr-6 text-3xl '>
              <BiCloudUpload />
            </span>
            <span>Upload</span>
          </label>
        </li>}
      </ul>
      <section className='relative flex flex-col items-center w-full  z-[1] '>
        {progVisible && (
          <ProgressComp progressChange={progress} click={setProgVisible} />
        )}

        {renderData}
        {isAnimate && <SkeletonAnimation />}
        {isAnimate && <SkeletonAnimation />}
        {isAnimate && <SkeletonAnimation />}
        {isAnimate && <SkeletonAnimation />}
        {alert && <Alert msg={"Important! Only PDFs are currently accepted. Please change your upload to a PDF file."} title={"ALERT"} click={setAlert} />}
      </section>
    </div>
  )
}

export default Files
