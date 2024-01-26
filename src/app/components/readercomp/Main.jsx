"use client"
import React, { useEffect, useState, useRef,Fragment } from 'react'
import { useWindowSize } from 'react-use'

import { IoClose } from 'react-icons/io5'

function Main() {
    const [isClient, setIsClient] = useState(false)
    const [data,setData]=useState([])
    const divRef=useRef()
    useEffect(() => {
      setIsClient(true)
      const textValue =
        "Drag and drop your files, or type, paste, and edit text here. Natural Reader is a professional text-to-speech program that converts any written text into spoken words. We have both free and paid subscriptions to our applications to meet different users' needs on different budgets. Our Plus subscription includes exclusive features and the use of Plus Voices, our newest and most advanced voices. Plus Voices enable fluid and natural-sounding text to speech that matches the patterns and intonation of human voices. Free users can sample the Premium Voices for 20 minutes per day and the Plus Voices for 5 minutes per day. Or use any available Free Voices unlimitedly.You can also listen and go with our mobile app. By using the mobile camera, you can even use our app to listen to physical books and notes."
        const dataChunks = textValue.split(/(?<=\.)/);
      setData(dataChunks)
    }, [])
    const { width } = useWindowSize()
   


  return (
    isClient && ( <section
          style={{
            minHeight: '500px'
          }}
          className='h-full md:shadow-[5px_5px_0px_#C7BFBF,-5px_-5px_4px_#e4eef2] sm:h-full md:h-min md:drop-shadow-none w-screen md:w-[70%] xl:w-[840px]  md:mt-10 md:rounded-xl '
        >
          {width > 760 && (
            <section
            onClick={()=> divRef.current.textContent=null}
              className='flex items-center justify-end h-12 pr-2 text-2xl'
            >
              <IoClose />
            </section>
          )}

          <div
        style={{
          minHeight: '500px'
        }}
        ref={divRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className='w-full h-full p-4 bg-transparent outline-none '
          >
            {
            data.map((i, index) => {
              return (
                <Fragment key={index} >
                
                <p  >{i} </p><br />
                </Fragment>
               
                
              )
            })}
          </div>
        </section>
    )
  )
}

export default Main