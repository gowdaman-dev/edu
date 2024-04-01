'use client'
import { MdWifiProtectedSetup } from "react-icons/md";
import { MdTextRotateVertical } from "react-icons/md";
import { GoMirror } from "react-icons/go";
import { AiFillPauseCircle, AiFillPlayCircle, AiOutlineLeft, AiOutlineMore, AiOutlineUser } from "react-icons/ai";
import { useState, useEffect, useRef } from 'react';
import PdfViewer from '@/app/components/readercomp/Renderpdf'
import axios from "axios";
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

function Page({ params }) {
  const [transcript, setTransScript] = useState([])
  const heightRef = useRef(null)
  const [rotateTools, setRotateTools] = useState(false)
  const [audioRate, setAudioRate] = useState(1)
  const [rotateStyles, setRotateStyles] = useState({ styles: "rotateY(0deg)" })
  const [audioRateToggle, setAudioRateToggle] = useState(false)
  
  const [openPlayer, setOpenPlayer] = useState(false)
  //player
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const currentText = useRef(null);
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    audioRef.current.playbackRate = audioRate;
  };
  const [isTools, setIsTools] = useState(false)
  const handleSeek = (event) => {
    const audio = audioRef.current;
    const seekTime = parseFloat(event.target.value);
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };
  const handleMirror = () => {
    heightRef.current.scrollBy(50, 50)

    setRotateStyles({ styles: "rotateY(180deg)" })
    setRotateTools(false)
  }
  const handleDown = () => {
    setRotateStyles({ styles: "rotateZ(180deg)" })
    setRotateTools(false)

  }
  const handleDefault = () => {
    setRotateStyles({ styles: "rotateY(0deg)" })
    setRotateTools(false)

  }
  //player end
  function secondsToTime(secs) {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = Math.floor(secs % 60);
    const hoursStr = hours > 0 ? hours.toString().padStart(2, '0') + ':' : '';
    const minutesStr = minutes.toString().padStart(2, '0') + ':';
    const secondsStr = seconds.toString().padStart(2, '0');
    return hoursStr + minutesStr + secondsStr;
  }

  //caption
  //here you to update the audio for it is default for H ,you have to change it as A,F,J on {params.fileid}F like this TIP: make it is in a useEffect
  const models = [
    {
      name: "jack",
      path: "/ai Images/1.jpeg",
      key: 'A'
    },
    {
      name: "riya",
      path: "/ai Images/2.jpg",
      key: 'F'
    },
    {
      name: "steven",
      path: "/ai Images/3.jpg",
      key: 'J'
    },
    {
      name: "mia",
      path: "/ai Images/4.jpeg",
      key: 'H'
    }
  ]
  const [currentModel, setCurrentModel] = useState(models[3])
  useEffect(() => {
    let handler = async () => {
      const { data } = await axios.get(`https://firebasestorage.googleapis.com/v0/b/lmsedu-e5dbc.appspot.com/o/transcript%2F${params.fileid}${currentModel.key}?alt=media&token=c193bafc-ce23-49f1-a2fc-8c65381721f2`)
      const { words } = await data;
      setTransScript(words)
    }
    handler()
  }, [currentModel])
  const [currentTranscriptionRate, setCurrentTranscriptionRate] = useState(200)
  const audioData = `https://firebasestorage.googleapis.com/v0/b/lmsedu-e5dbc.appspot.com/o/audio%2F${params.fileid}${currentModel.key}?alt=media&token=11fccbc3-c457-40bc-9c96-386a5bbef464`
  const [showDropdown, setShowDropdown] = useState(false)
  const OnModelChange = async (model) => {
    console.log(audioRef.current.duration)
    const transcriptEndTime = transcript.at(transcript.length - 1)
    await setIsPlaying(false)
    await audioRef.current.pause()
    await setCurrentModel(model);
    setIsPlaying(true)
    audioRef.current.play()
    audioRef.current.currentTime = currentTime
    const crtaud = audioRef.current.duration;
  }
  return (
    <>
      <header className="flex fixed z-[8] w-screen justify-between flex-col items-center pt-4 border-b bg-white px-4">
        <div className="flex w-full justify-between items-center bg-white px-4 pb-2">
          {
            openPlayer && (
              <div className="flex items-center justify-center gap-8">
                <AiOutlineLeft onClick={() => {
                  setIsPlaying(false)
                  setOpenPlayer(false)
                  audioRef.current.pause()
                }} />
                <div className="relative" onClick={() => setShowDropdown(!showDropdown)}>
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                    <Image className="h-full w-full rounded-full bg-gray-200" src={currentModel.path} height={20} width={20} alt='logo' />
                  </div>
                  {
                    showDropdown && (
                      <motion.div className="absolute top-full left-0 w-44 rounded-md bg-white py-2 shadow-md"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                        <div className="grid grid-cols-4 gap-2 px-2">
                          {
                            models.map((model, index) => (
                              <motion.button onClick={() => OnModelChange(model)} key={index} className=""><Image className="h-full w-full rounded-full bg-gray-200" src={model.path} height={20} width={20} alt='logo' /></motion.button>
                            ))
                          }
                        </div>
                      </motion.div>
                    )
                  }
                </div>
              </div>
            )
          }

          {
            !openPlayer && (
              <div className="flex items-center gap-2 justify-center">
                <AiFillPlayCircle className="text-2xl sm:text-4xl text-[--web-primary-color] cursor-pointer" onClick={() => {
                  setIsPlaying(true)
                  setOpenPlayer(true)
                  audioRef.current.play()
                }} />
                <p className="text-gray-800 font-semibold">Play</p>
              </div>
            )
          }
          {
            openPlayer && (
              <div className="player flex items-center gap-4">
                <BiRotateLeft className="text-3xl text-gray-700 cursor-pointer" onClick={() => audioRef.current.currentTime -= 1} />
                <div className="playpause" onClick={() => setIsPlaying(!isPlaying)}>
                  {(isPlaying && audioRef.current.play) ? <AiFillPauseCircle onClick={() => audioRef.current.pause()} className="text-2xl sm:text-4xl text-[--web-primary-color] cursor-pointer" /> : <AiFillPlayCircle onClick={() => audioRef.current.play()} className="text-2xl sm:text-4xl text-[--web-primary-color] cursor-pointer" />}
                </div>
                <BiRotateRight className="text-3xl text-gray-700 cursor-pointer" onClick={() => audioRef.current.currentTime += 1} />
              </div>
            )
          }
          <div className="toggler flex items-center justify-center gap-2">
            {
              openPlayer && (
                <>
                  <div className=" absolute border px-2 py-1 rounded text-gray-800 mr-[100px] w-16 text-center">
                    <button className="w-full" onClick={() => setAudioRateToggle(!audioRateToggle)}>{audioRate}x</button>
                    {
                      audioRateToggle && (
                        <div className="speed absolute top-full py-1 z-[5] rounded-lg border flex flex-col gap-2 bg-white w-full items-center left-0 mt-2">
                          <button className="rounded hover:bg-gray-100 w-[90%]" onClick={() => { setAudioRate(.75); setAudioRateToggle(false) }}>0.75x</button>
                          <button className="rounded hover:bg-gray-100 w-[90%]" onClick={() => { setAudioRate(1); setAudioRateToggle(false) }}>1x</button>
                          <button className="rounded hover:bg-gray-100 w-[90%]" onClick={() => { setAudioRate(1.5); setAudioRateToggle(false) }}>1.5x</button>
                          <button className="rounded hover:bg-gray-100 w-[90%]" onClick={() => { setAudioRate(2); setAudioRateToggle(false) }}>2 x</button>
                          <button className="rounded hover:bg-gray-100 w-[90%]" onClick={() => { setAudioRate(2.5); setAudioRateToggle(false) }}>2.5x</button>
                          <button className="rounded hover:bg-gray-100 w-[90%]" onClick={() => { setAudioRate(3); setAudioRateToggle(false) }}>3 x</button>
                        </div>
                      )
                    }
                  </div>
                </>
              )
            }
            <AiOutlineMore onClick={() => !openPlayer ? setIsTools(!isTools) : setRotateTools(!rotateTools)} className="text-2xl cursor-pointer" />
          </div>
        </div>
        <div className={`w-full flex-col ${openPlayer ? "flex" : 'hidden'}`}>
          <div className="px-2 pt-2 w-full flex justify-between items-center text-sm font-light text-gray-800">
            {
              audioRef.current && (
                <>
                  <p>{secondsToTime(Math.round(currentTime.toFixed(2)))}</p>
                  <p>{secondsToTime(Math.round(audioRef.current.duration)) != "NaN:NaN" ? secondsToTime(Math.round(audioRef.current.duration)) : "00:00"}</p>
                </>
              )
            }
          </div>
          <audio
            ref={audioRef}
            src={audioData}
            onTimeUpdate={handleTimeUpdate}
          ></audio>
          <input
            type="range"
            min="0"
            max={audioRef.current?.duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full appearance-none h-1 mt-2 bg-purple-400 rounded-full outline-none"
          />
        </div>
      </header>
      <div className={`flex flex-col z-[1] ${openPlayer ? "h-fit" : 'h-screen'} overflow-y-scroll`}>
        {
          !openPlayer && (
            <PdfViewer setTools={setIsTools} stateTools={isTools} />
          )
        }
        <div ref={heightRef} style={{ transform: rotateStyles.styles }} className="w-[95vw] px-4 py-2 mt-[100px] flex ">
          {
            openPlayer && (
              <>
                <p className="flex flex-wrap w-full h-fit pb-[250px]">
                  {
                    transcript && (
                      transcript.map((item, i) => {
                        return <p ref={currentText} id={`${(currentTime * 1000 >= item.start && currentTime * 1000 >= item.end ) ? 'currentword' : ''}`} className={`${(currentTime * 1000 >= item.start) ? 'bg-purple-100 text-[--web-primary-color]' : 'text-gray-800'} py-1 px-[5px]`} key={i}>{item.text}</p>
                      })
                    )
                  }
                </p>
              </>
            )
          }
        </div>
        {rotateTools && (

          <div className="fixed top-[80px] p-4 gap-2 right-5 z-40 border bg-white rounded-xl flex w-[240px] ">
            <button className=" order-3 flex-auto  bg-gray-100 rounded-md  flex flex-col  items-center active:scale-95" onClick={handleMirror} ><span className="text-3xl mt-2 text-[--web-primary-color]">
              <GoMirror /> </span><span className="text-sm text-black  rounded-t-xl h-full  block w-full">Mirror</span></button>

            <button className=" order-2  flex-auto bg-gray-100 rounded-md  flex flex-col  items-center active:scale-95" onClick={handleDown} ><span className="text-3xl mt-2 text-[--web-primary-color]">
              <MdTextRotateVertical /> </span><span className="text-sm text-black  rounded-t-xl h-full  block w-full">Rotate</span></button>
            <button className=" order-1  flex-auto  bg-gray-100 rounded-md  flex flex-col  items-center active:scale-95" onClick={handleDefault} ><span className="text-3xl mt-2 text-[--web-primary-color]">
              <MdWifiProtectedSetup /> </span><span className="text-sm text-black  rounded-t-xl h-full  block w-full">Default</span></button>
          </div>
        )

        }
      </div>
    </>
  )
}



export default Page
