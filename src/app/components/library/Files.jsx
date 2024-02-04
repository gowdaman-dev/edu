'use client'
// pending :hadle file size, file not send eroor handle
import { BiCloudUpload } from 'react-icons/bi'
import React, { useEffect, useState } from 'react'
import { FaRegFilePdf } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import SkeletonAnimation from '../SkeletonAnimation'
import fetchFiles from '@/utils/FetchFiles'
import axios from 'axios'
import ProgressComp from './ProgressComponent'
import Popper from './DeleteRename_Poppper'
import { fetchData } from 'next-auth/client/_utils'
let filesShow = []
function Files() {
  const [data, setData] = useState([])
  const [isAnimate, setIsAnimate] = useState(true)
  const [newFile, setNewFile] = useState(0)
  const [progress, setProgress] = useState(0)
  const [progVisible, setProgVisible] = useState(false)
  const [pop_DEl_Rename, setPop_Del_Rename] = useState(null)
  const [delete_id, setDelate_id] = useState(null)
  useEffect(() => {
    const fetchData = () => {
      try {
        fetchFiles().then(res => {
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
  }, [newFile])

  useEffect(()=>{
    console.log(data.length);
    if(data.length==undefined){
    console.log("Yes effect1");

filesShow=null
    }

  },[data])
  function handlePopClick(index, id) {
    if (index === pop_DEl_Rename) {
      setPop_Del_Rename(null)
    }
    else {

      setPop_Del_Rename(index)
      setDelate_id(id)
    }
  }
  if (!data.message && data) {
    console.log(data.length);
    filesShow = data.map((item, index) => {
      let name = item.fname
      let size = item.fsize
      let date = item.fdate
      let id = item.fid
      //work done on items
      //for file name
      name = name.split('.pdf')
      name = name[0]
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
          className='grid grid-flow-col grid-rows-3 bg-[#ffffff]  grid-cols-8 md:w-[80%]  overflow-auto  border-b-[1px]  text-[#008C8C] w-full border-teal-400 relative text-xl'
        >
          <span className='grid col-span-1 row-span-3 text-3xl text-teal-500 sm:text-4xl place-content-center '>
            <FaRegFilePdf />
          </span>
          <p
            className=' col-span-6 row-span-2    flex font-serif items-center'
            key={'filename' + index}
          >
            {name}
          </p>
          <p
            className='block col-span-6 row-span-1 text-sm text-gray-500'
            key={'filesize' + index}
          >
            {size}
          </p>
          <span className='grid col-span-1 row-span-3 text-xl place-content-center rounded-full active:bg-gray-100' key={index} onClick={() => { handlePopClick(index, id) }} >
            <BsThreeDotsVertical />
          </span>

          {pop_DEl_Rename === index &&



            <Popper id={delete_id} update={setNewFile} closePop={setPop_Del_Rename} animate={setIsAnimate}/>

          }
        </div>
      )
    })
  }
  const renderData = (
    data.message ? (
      <p className='bg-[#92d1cd9a] p-10 rounded-lg'>Oop's {data.message}</p>
    ) : !isAnimate && (
      filesShow
    )
  );
  
 
  function handleChange(e) {
    let file = e.target.files[0]
    const fileData = new FormData()

    fileData.append('file', file)
    sendData(fileData)
  }

  async function sendData(data) {
    setProgVisible(true)
    const sendFile = await axios.post(
      `/api/files`,
      data,
      {
        onUploadProgress: progressEvent => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setProgress(percentCompleted)
        }
      }
    )
    if (sendFile.status !== 200) {
      // need to handle jk
      console.log('file send failed')
    } else {
      setProgVisible(false)

      setIsAnimate(true)
      setNewFile(newFile + 1)
    }
  }

  return (
    <div>
      <ul className='flex items-center justify-between h-16 border-b-2 border-teal-700'>
        <li>
          <b>Shared Files ({data.length || 0})</b>
        </li>
        <li>
          <input
            type='file'
            accept='application/pdf'
            onChange={e => handleChange(e)}
            name='file'
            id='fileUpload'
            hidden
          />
          <label
            htmlFor='fileUpload'
            className=' mr-4 border-2 flex cursor-pointer text-[#008C8C] justify-between items-center px-6 py-2 border-[#008c8c] rounded-md active:scale-90 active:bg-[#92D1CD]'
          >
            <span className='inline-block text-[#008C8C] pr-4 text-3xl '>
              <BiCloudUpload />
            </span>
            <span>Upload</span>
          </label>
        </li>
      </ul>
      <section className='relative flex flex-col items-center w-full mt-3  '>
        {progVisible && (
          <ProgressComp progressChange={progress} click={setProgVisible} />
        )}

        {renderData}
        {isAnimate && <SkeletonAnimation />}
        {isAnimate && <SkeletonAnimation />}
        {isAnimate && <SkeletonAnimation />}
        {isAnimate && <SkeletonAnimation />}
      </section>

    </div>
  )
}

export default Files
