"use client"
import { Viewer, Worker, SpecialZoomLevel, RotateDirection } from "@react-pdf-viewer/core";
import { BsThreeDots } from 'react-icons/bs'
import Tools from "./Tools";
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import { openPlugin } from '@react-pdf-viewer/open';
import '@react-pdf-viewer/open/lib/styles/index.css';
import "@react-pdf-viewer/core/lib/styles/index.css";
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { useEffect, useState, useRef, useCallback } from "react";
import { FaPlayCircle, FaBackward, FaForward } from 'react-icons/fa'
import { FaRegCirclePause } from "react-icons/fa6";
import { rotatePlugin } from '@react-pdf-viewer/rotate';
import { useParams } from 'next/navigation'
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import axios from "axios";
import { getDownloadURL, ref } from "firebase/storage";
import { db } from "@/firebase/firebase";
import ProgressComp from "../library/ProgressComponent";
const PdfViewer = () => {
  const params = useParams()
  const [buffer, setBuffer] = useState([]);
  const viewerRef = useRef(null);
  const [progress, setProgress] = useState(0)
  const [progVisible, setProgVisible] = useState(false)
  const [isTools, setIsTools] = useState(false)
  //plugins 
  const zoomPluginInstance = zoomPlugin();
  const { CurrentScale, ZoomIn, ZoomOut } = zoomPluginInstance;
  const fullScreenPluginInstance = fullScreenPlugin();
  const { EnterFullScreen } = fullScreenPluginInstance;
  const getFilePluginInstance = getFilePlugin();
  const { Download } = getFilePluginInstance;
  const openPluginInstance = openPlugin();
  const { Open } = openPluginInstance;
  const rotatePluginInstance = rotatePlugin();
  const { Rotate } = rotatePluginInstance;
  //player
  const [isPlay, setIsPlay] = useState(false)


  const [pdfrender, setpdfRender] = useState(false)


  const updateProgress = (progressEvent) => {
    let progressChange = Math.floor((progressEvent.loaded / progressEvent.total) * 100);

    setProgress((prev) => {
      if (prev < progressChange) {
        return progressChange
      }
      return prev;
    });
  }
  useEffect(() => {
    setProgVisible(true)
    const randomParam = Math.random().toString().slice(2);
    async function fetchBytes() {
      const reference = ref(db, `files/${params.fileid}`)
      const URL = await getDownloadURL(reference);
      //to clear cache for prevent page reload after pdf set
      const URLWithParam = `${URL}?r=${randomParam}`;

      try {
        const data1 = await axios.get(URLWithParam, {
          responseType: "arraybuffer", onDownloadProgress: updateProgress,
        })
        const dataArray = new Uint8Array(data1.data)


        setBuffer(dataArray);
        setProgress(0)
        setProgVisible(false)
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchBytes();
  }, []);

  useEffect(() => {

    const dataPresent = viewerRef.current
    if (dataPresent.querySelector(".rpv-core__inner-pages--vertical")) {

      const mainClass = dataPresent.querySelector(".rpv-core__inner-pages--vertical")
      dataPresent.querySelector(".rpv-core__viewer").style.width = "100vw"
      //hide side bar 
      mainClass.classList.add('scrollbar-hide')
      const updatingPages = mainClass.children[0]


    }

  }, [pdfrender]);

  const handleDocumentLoad = () => {
    setpdfRender(!pdfrender)
  };

  const toggleTools = () => {
    if (!progVisible) {

      setIsTools(!isTools)
    }
  }
  //fullscreen


  return (
    <>
      <header className='h-[60px] border-t-[1px] border-[--web-primary-color] w-screen absolute z-[20] bottom-0 md:relative bg-white md:border-b-[1px] '>
        <ul className='flex items-center justify-around h-full relative'>
          <li className='flex justify-center grow gap-x-10 sm:gap-x-20 text-[--web-primary-color]'>
                <span onClick={() => setIsPlay(!isPlay)} className='text-2xl sm:text-3xl cursor-pointer'>{isPlay ? <FaRegCirclePause /> : <FaPlayCircle />}</span>
     
          </li>
          <li className="absolute right-2  " onClick={toggleTools}>
            <span className="flex justify-center items-center text-2xl cursor-pointer">
              <BsThreeDots />
            </span>
          </li>


        </ul>      </header>
      <main className='w-screen h-[90%] '>
        <section className={` fixed z-[10] w-screen grid grid-cols-12 ${isTools ? "h-screen" : null} grid-rows-12 tool`}>

          {isTools && (
            <Rotate direction={RotateDirection.Backward}>
              {(rotate) => (


                <Open>
                  {(open) => (




                    <Download>
                      {(getFile) => (



                        <ZoomOut>
                          {(zoomOut) => (




                            <ZoomIn>

                              {(zoomIn) => (
                                <EnterFullScreen>
                                  {(screen) => (
                                    <Tools click={setIsTools} fullScreen={screen} zoomIn={zoomIn} zoomOut={zoomOut} download={getFile} newFile={open} rotation={rotate} />


                                  )}
                                </EnterFullScreen>
                              )}
                            </ZoomIn>
                          )}
                        </ZoomOut>
                      )}
                    </Download>
                  )}
                </Open>
              )}
            </Rotate>
          )
          }
        </section>
        <section className='absolute flex flex-col items-center w-screen z-[1] '>

          {progVisible && (
            <ProgressComp progressChange={progress} click={setProgVisible} title={"Downloading :"} icon={"download"} />
          )}
        </section>
        {!progVisible && (

          <div ref={viewerRef} className="h-screen w-screen scrollbar-hide font-mono text-2xl" >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">


              <Viewer fileUrl={buffer} plugins={[fullScreenPluginInstance, zoomPluginInstance, getFilePluginInstance, openPluginInstance, rotatePluginInstance]} enableSmoothScroll onDocumentLoad={handleDocumentLoad} defaultScale={SpecialZoomLevel.PageWidth} />

            </Worker>
          </div>
        )}
      </main>

    </>
  );
};

export default PdfViewer;
