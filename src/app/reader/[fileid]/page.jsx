'use client'
import { motion } from "framer-motion";
import { AiFillPlayCircle, AiOutlineLeft, AiOutlineMore, AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { useState, useEffect, useRef } from 'react';
import PdfViewer from '@/app/components/readercomp/Renderpdf'
import Transcribe from "./Transcribe";
import Audio from "./Audio";

function Page({ params }) {
  const [isPlay, setIsPlay] = useState(false)
  //const [transcript, setTransScript] = useState(Transcribe(fileid))
  const [openPlayer, setOpenPlayer] = useState(false)
  const audioData = `https://firebasestorage.googleapis.com/v0/b/lmsedu-e5dbc.appspot.com/o/audio%2F${params.fileid}?alt=media&token=11fccbc3-c457-40bc-9c96-386a5bbef464`
  const playerRef = useRef(null)
  useEffect(() => {
    if (isPlay) {
      console.log('ply');
      playerRef.current.play()
    }
  })
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const updateCurrentDuration = () => {
      if (playerRef.current) {
        // Access the currentTime property of the audio element
        setCurrentTime(playerRef.current.currentTime);
      }
    };

    // Attach event listener to update the current time
    if (playerRef.current) {
      playerRef.current.addEventListener('timeupdate', updateCurrentDuration);
    }

    // Cleanup function
    return () => {
      if (playerRef.current) {
        playerRef.current.removeEventListener('timeupdate', updateCurrentDuration);
      }
    };
  }, []);
  function secondsToTime(secs) {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = Math.floor(secs % 60);

    const hoursStr = hours > 0 ? hours.toString().padStart(2, '0') + ':' : '';
    const minutesStr = minutes.toString().padStart(2, '0') + ':';
    const secondsStr = seconds.toString().padStart(2, '0');

    return hoursStr + minutesStr + secondsStr;
  }

  const audioRef = useRef();
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderChange = (e) => {
    const newValue = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = (newValue / 100) * audioRef.current.duration;
    }
  };

  const handleSliderDragStart = () => {
    setIsDragging(true);
  };

  const handleSliderDragEnd = () => {
    setIsDragging(false);
  };

  const updateSlider = () => {
    if (audioRef.current && !isDragging) {
      const value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      sliderRef.current.value = value;
    }
  };
  const [buffered, setBuffered] = useState(0);
  const progressBarRef = useRef(null);

  // Update current time and buffered progress on playback changes
  useEffect(() => {
    if (audioRef.current) {
      const updateCurrentTime = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
      audioRef.current.addEventListener('timeupdate', updateCurrentTime);

      const updateBuffered = () => {
        setBuffered((audioRef.current.buffered.end(0) / audioRef.current.duration) * 100);
      };
      audioRef.current.addEventListener('progress', updateBuffered);

      return () => {
        audioRef.current.removeEventListener('timeupdate', updateCurrentTime);
        audioRef.current.removeEventListener('progress', updateBuffered);
      };
    }
  }, [audioRef]);

  // Update progress bar on time change
  useEffect(() => {
    if (progressBarRef.current && !isNaN(currentTime)) {
      const progress = (currentTime / audioRef.current.duration) * 100;
      progressBarRef.current.style.width = `${progress}%`;
    }
  }, [currentTime]);

  // Handle user interaction with the progress bar
  const handleProgressBarClick = (event) => {
    const clickPosition = event.nativeEvent.offsetX / progressBarRef.current.offsetWidth;
    const newTime = clickPosition * audioRef.current.duration;
    // Seek to the new time
    audioRef.current.currentTime = newTime;
  };

  return (
    <>
      <header className="flex w-screen justify-between flex-col items-center pt-4 border-b bg-white px-4">
        <div className="flex w-full justify-between items-center bg-white px-4">
          <div className="w-10">
            {
              openPlayer && (
                <AiOutlineLeft onClick={() => {
                  setIsPlay(false)
                  setOpenPlayer(false)
                }} />
              )
            }
          </div>
          {
            !openPlayer && (
              <AiFillPlayCircle className="text-2xl sm:text-4xl text-[--web-primary-color] cursor-pointer" onClick={() => {
                setIsPlay(true)
                setOpenPlayer(true)
              }} />
            )
          }
          {
            openPlayer && (
              <div className="player">
                <div className="playpause" onClick={() => setIsPlay(!isPlay)}>
                  {isPlay ? <AiOutlinePauseCircle onClick={() => playerRef.current.pause()} className="text-2xl sm:text-4xl text-[--web-primary-color] cursor-pointer" /> : <AiOutlinePlayCircle onCanPlay={() => playerRef.current.play()} className="text-2xl sm:text-4xl text-[--web-primary-color] cursor-pointer" />}
                </div>
              </div>
            )
          }
          <div className="toggler" onClick={() => setIsTools(!isTools)}>
            <AiOutlineMore className="text-2xl cursor-pointer" />
          </div>
        </div>
        {
          audioData && (
            <audio ref={playerRef}>
              <source src={audioData} />
            </audio>
          )
        }
        <div className="w-full flex flex-col">
          <div className="px-2 pt-2 w-full flex justify-between items-center text-sm fonr-light text-gray-800">
            {
              playerRef.current && (
                <>
                  <p>{secondsToTime(Math.round(currentTime.toFixed(2)))}</p>
                  <p>{secondsToTime(Math.round(playerRef.current.duration))}</p>
                </>
              )
            }
          </div>
          {
            playerRef.current && (
              <div className="duration-controller">
                <motion.div
                  className="progress-bar flex h-2 rounded-full bg-gray-200 overflow-hidden"
                  ref={progressBarRef}
                  onClick={handleProgressBarClick}
                >
                  <div className="buffered-bar flex h-full rounded-full bg-gray-300" style={{ width: `${buffered}%` }} />
                </motion.div>
                <span className="current-time text-sm text-gray-700">{secondsToTime(currentTime)}</span>
                <span className="duration text-sm text-gray-700">{secondsToTime(audioRef.current.duration)}</span>
              </div>
            )
          }
        </div>
      </header>
      <div className='h-screen    flex flex-col fixed z-[1]'>
        <PdfViewer />
      </div>
    </>
  )
}


export default Page