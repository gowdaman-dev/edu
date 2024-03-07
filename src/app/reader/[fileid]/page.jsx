'use client'
import { AiFillPauseCircle, AiFillPlayCircle, AiOutlineLeft, AiOutlineMore, AiOutlinePauseCircle, AiOutlinePlayCircle, AiOutlineRotateLeft } from "react-icons/ai";
import { useState, useEffect, useRef } from 'react';
import PdfViewer from '@/app/components/readercomp/Renderpdf'
import axios from "axios";
import { BiRotateLeft, BiRotateRight } from "react-icons/bi";

function Page({ params }) {
  const [transcript, setTransScript] = useState([])
  const [audioRate, setAudioRate] = useState(1)
  const [audioRateToggle, setAudioRateToggle] = useState(false)
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
      <header className="flex fixed z-[8] w-screen justify-between flex-col items-center pt-4 border-b bg-white px-4">
        <div className="flex w-full justify-between items-center bg-white px-4 pb-2">
          {
            openPlayer && (
              <AiOutlineLeft onClick={() => {
                setIsPlaying(false)
                setOpenPlayer(false)
                audioRef.current.pause()
              }} />
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
              )
            }
            <AiOutlineMore onClick={() => !openPlayer ? setIsTools(!isTools) : null} className="text-2xl cursor-pointer" />
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
        <div className="w-screen px-4 py-2 mt-[100px] flex">
          {
            openPlayer && (
              <>
                <p className="flex flex-wrap w-full h-fit pb-[250px]">
                  {
                    transcript && (
                      transcript.map((item, i) => {
                        return <p ref={currentText} id={`${(currentTime * 1000 >= item.start && currentTime * 1000 >= item.end) ? 'currentword' : ''}`} className={`${(currentTime * 1000 >= item.start) ? 'bg-purple-100 text-[--web-primary-color]' : 'text-gray-800'} py-1 px-[5px]`} key={i}>{item.text}</p>
                      })
                    )
                  }
                </p>
              </>
            )
          }
        </div>
        <div className="fixed bottom-0 left-0 w-screen h-[250px] bg-purple-200/[.7] backdrop-blur-sm flex items-center justify-center">

          <p className="text-[--web-primary-color] text-xl tracking-widest">hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, eum.</p>
        </div>
      </div>
    </>
  )
}


export default Page
