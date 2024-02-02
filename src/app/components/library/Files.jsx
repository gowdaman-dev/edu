'use client'
import React, { useEffect, useState } from 'react'
import { FaRegFilePdf } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import fetchFiles from '@/utils/FetchFiles'
let filesShow=[]
async function Files () {
  const [data, setData] = useState([])
  const [isAnimate,setIsAnimate]=useState(true)
  const [newFile,setNewFile]=useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchFiles()
        if(responseData){
          setIsAnimate(false)

          setData(responseData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [newFile])

const tailwindSkeleton=(
  <div className=" border-teal-200 border-2 bg-white shadow rounded-md p-4 w- w-[80%] mx-auto">
  <div className="flex space-x-4 animate-pulse">
    <div className="w-10 h-10 bg-teal-300 rounded-full"></div>
    <div className="flex-1 py-1 space-y-6">
      <div className="h-2 bg-teal-300 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 col-span-2 bg-teal-300 rounded"></div>
          <div className="h-2 col-span-1 bg-teal-300 rounded"></div>
        </div>
        <div className="h-2 bg-teal-300 rounded"></div>
      </div>
    </div>
  </div>
  
</div>
)
  if(!data.message){

    
     filesShow = data.map((item, index) => {
      let name = item.fname
      let size = item.fsize
      let date = item.fdate
      let id = item.fid
      //work done on items
      //for file name
      name = name.split('.')
      name = name[0]
      name = name.length > 30 ? name.slice(0, 30) + '...' : name
  
      // for file size
      size = size / 1000
      size = Math.floor(size) + ' KB/s'
  
      return (
        <div
          key={'file' + index}
          className='grid grid-flow-col grid-rows-2 bg-[#ffffff] gap-4  grid-cols-8 md:w-[80%] rounded-lg overflow-auto border-[1px] border-[#008C8C] text-[#008C8C]'
        >
          <span className='grid col-span-1 row-span-2 text-4xl place-content-center text-[#008C8C]'>
            <FaRegFilePdf />
          </span>
          <p className='block col-span-6 row-span61' key={'filename' + index}>
            {name}
          </p>
          <p className='block col-span-6 row-span-1 ' key={'filesize' + index}>
            {size}
          </p>
          <span className='grid col-span-1 row-span-2 text-xl place-content-center'>
            <BsThreeDotsVertical />
          </span>
        </div>
      )
    })
  }
 
  function handleChange (e) {
    let file = e.target.files[0]
    const fileData = new FormData()

    fileData.append('file', file)
    sendData(fileData)
  }

  async function sendData (data) {
    const sendFile = await fetch(
      "http://localhost:3000/api/files",
      {
        method: 'POST',
        body: data
      }
    )
    if (!sendFile.ok) {
      throw new Error('File send failed')
    } else {
      setIsAnimate(true)
      setNewFile((newFile+1))
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
            <span className='inline-block text-[#008C8C] pr-4  '>
              <FaPlus />
            </span>
            <span>Upload</span>
          </label>
        </li>
      </ul>
      <section className='flex flex-col items-center w-full mt-3 gap-y-3'>
        {
          !isAnimate && filesShow
        }
        {
          data.message && <p className='bg-[#92d1cd9a] p-10 rounded-lg'>
           Oop's {data.message} 
          </p>
        }
        {isAnimate && tailwindSkeleton}
        {isAnimate && tailwindSkeleton}
        {isAnimate && tailwindSkeleton}
        {isAnimate && tailwindSkeleton}
      
      </section>
    </div>
  )
}

export default Files
