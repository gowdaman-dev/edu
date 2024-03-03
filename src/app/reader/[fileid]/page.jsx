'use client'
import { AiFillPlayCircle, AiOutlineLeft, AiOutlineMore, AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { useState, useEffect, useRef } from 'react';
import PdfViewer from '@/app/components/readercomp/Renderpdf'
import axios from "axios";

function Page({ params }) {
  const [transcript, setTransScript] = useState([])
  useEffect(() => {
    let handler = async () => {
      const { data } = await axios.get(`https://firebasestorage.googleapis.com/v0/b/lmsedu-e5dbc.appspot.com/o/transcript%2F${params.fileid}?alt=media&token=c193bafc-ce23-49f1-a2fc-8c65381721f2`)
      const { words } = await data;
      console.log(data);
      setTransScript(words)
    }
    handler()
  }, [])
  const [openPlayer, setOpenPlayer] = useState(false)
  //player
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    const seekTime = parseFloat(event.target.value);
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };
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
  const audioData = `https://firebasestorage.googleapis.com/v0/b/lmsedu-e5dbc.appspot.com/o/audio%2F${params.fileid}?alt=media&token=11fccbc3-c457-40bc-9c96-386a5bbef464`
  return (
    <>
      <header className="flex fixed w-screen justify-between flex-col items-center pt-4 border-b bg-white px-4">
        <div className="flex w-full justify-between items-center bg-white px-4 pb-2">
          <div className="w-10">
            {
              openPlayer && (
                <AiOutlineLeft onClick={() => {
                  setIsPlaying(false)
                  setOpenPlayer(false)
                  audioRef.current.pause()
                }} />
              )
            }
          </div>
          {
            !openPlayer && (
              <AiFillPlayCircle className="text-2xl sm:text-4xl text-[--web-primary-color] cursor-pointer" onClick={() => {
                setIsPlaying(true)
                setOpenPlayer(true)
                audioRef.current.play()
              }} />
            )
          }
          {
            openPlayer && (
              <div className="player">
                <div className="playpause" onClick={() => setIsPlaying(!isPlaying)}>
                  {(isPlaying && audioRef.current.play) ? <AiOutlinePauseCircle onClick={() => audioRef.current.pause()} className="text-2xl sm:text-4xl text-[--web-primary-color] cursor-pointer" /> : <AiOutlinePlayCircle onClick={() => audioRef.current.play()} className="text-2xl sm:text-4xl text-[--web-primary-color] cursor-pointer" />}
                </div>
              </div>
            )
          }
          <div className="toggler" onClick={() => setIsTools(!isTools)}>
            <AiOutlineMore className="text-2xl cursor-pointer" />
          </div>
        </div>
        <div className={`w-full flex-col ${openPlayer ? "flex" : 'hidden'}`}>
          <div className="px-2 pt-2 w-full flex justify-between items-center text-sm fonr-light text-gray-800">
            {
              audioRef.current && (
                <>
                  <p>{secondsToTime(Math.round(currentTime.toFixed(2)))}</p>
                  <p>{secondsToTime(Math.round(audioRef.current.duration))}</p>
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
            className="w-full appearance-none h-1 mt-2 bg-blue-400 rounded-full outline-none"
          />
        </div>
      </header>
      <div className={`flex flex-col z-[1] ${openPlayer ? "h-fit" : 'h-screen'} overflow-y-scroll`}>
        {
          !openPlayer && (
            <PdfViewer />
          )
        }
        <div className="w-screen px-4 py-2 mt-[100px] flex">
          {
            openPlayer && (
              <>
                <p className="flex flex-wrap w-full h-fit">
                  {
                    transcript && (
                      transcript.map((item, i) => {
                        return <p className={`${(currentTime*1000 <= item.end &&currentTime*1000 >= item.start+100) ? 'bg-blue-100 text-blue-500' : 'text-gray-800'} py-1 px-[5px]`} key={i}>{item.text}</p>
                      })
                    )
                  }
                </p>
              </>
            )
          }
        </div>
      </div>
    </>
  )
}


export default Page