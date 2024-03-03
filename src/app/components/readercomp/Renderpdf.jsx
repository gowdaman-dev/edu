"use client"
import { Viewer, Worker, SpecialZoomLevel, RotateDirection } from "@react-pdf-viewer/core";
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
import { rotatePlugin } from '@react-pdf-viewer/rotate';
import { useParams } from 'next/navigation'
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import axios from "axios";
import { getDownloadURL, ref } from "firebase/storage";
import { db } from "@/firebase/firebase";
import ProgressComp from "../library/ProgressComponent";
//test
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
  const [originalPdfBuffer, setOriginalPdfBuffer] = useState([])
  //player


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
        const data = await axios.get(URLWithParam, {
          responseType: "arraybuffer", onDownloadProgress: updateProgress,
        })
        setOriginalPdfBuffer(data.data)
        const dataArray = new Uint8Array(data.data)


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


  return (
    <>

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
            <div className="h-screen w-screen fixed backdrop-blur-sm z-[3] top-0 ">
              <ProgressComp progressChange={progress} click={setProgVisible} title={"Downloading :"} icon={"download"} />
            </div>
          )}
        </section>
        {!progVisible && (
          <div ref={viewerRef} className={`h-screen w-screen scrollbar-hide font-mono text-2xl`} >
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
