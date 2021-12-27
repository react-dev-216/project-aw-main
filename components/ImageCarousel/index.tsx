import React, { useEffect, useRef, useState, MouseEvent } from "react";
import Image from 'next/image';
import { useRouter } from 'next/router'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CloseIcon from '@mui/icons-material/Close';
import NextArrow from '../../assets/svg/next.svg';
import ZoonInSVG from '../../assets/svg/zoomin.svg';
import ZoonOutSVG from '../../assets/svg/zoomout.svg';
import {
  Container, Box, Typography, Grid
} from '@mui/material';
import {
  useAppDispatch,
  useAppSelector,
} from '../../redux/hooks';
import ZoomCursor from '../ZoomCursor';

// export type ImageType = { url: string };
export type ImageType = string;

  let tick = 0;
const ImageCarousel: React.FC<{ images?: ImageType[] }> = ({ images }) => {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ImageType>();
  const [focus, setFocus] = useState(false);
  const [isZoomCursor, setZoomCursor] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [isZoomIn, setZoomIn] = useState(false);
  const carouselItemsRef = useRef<HTMLDivElement[] | null[]>([]);

  useEffect(() => {
    if (images && images[0]) {
      carouselItemsRef.current = carouselItemsRef.current.slice(
        0,
        images.length
      );

      setSelectedImageIndex(0);
      setSelectedImage(images[0]);
    }
  }, [images]);

  useEffect(() => {
    if (isFullScreen) setZoomCursor(false);
  }, [isFullScreen]);
  useEffect(() => {
    const intervalID = setInterval(()=> {
      const checkingTime = new Date()
      const later = checkingTime.getTime();
      console.log('check', tick, later)
      if(later - tick > 5000) setFocus(false);
    }, 1000)
    return(()=> {
      clearInterval(intervalID)
    })
  }, []);
  
  const handleSelectedImageChange = (newIdx: number) => {
    if (images && images.length > 0) {
      setSelectedImage(images[newIdx]);
      setSelectedImageIndex(newIdx);
      if (carouselItemsRef?.current[newIdx]) {
        carouselItemsRef?.current[newIdx]?.scrollIntoView({
          inline: "center",
          behavior: "smooth"
        });
      }
    }
  };

  const handleRightClick = (resetTransform: Function) => (e: MouseEvent) => {
    e.stopPropagation();
    if (images && images.length > 0 && selectedImageIndex < images.length - 1) {
      let newIdx = selectedImageIndex + 1;
      if (newIdx >= images.length) {
        newIdx = 0;
      }
      handleSelectedImageChange(newIdx);
      resetTransform();
    }
  };

  const handleLeftClick = (resetTransform: Function) => (e: MouseEvent) => {
    e.stopPropagation();
    if (images && images.length > 0 && selectedImageIndex > 0) {
      let newIdx = selectedImageIndex - 1;
      if (newIdx < 0) {
        newIdx = images.length - 1;
      }
      handleSelectedImageChange(newIdx);
      resetTransform();
    }
  };

  const focusInCurrentTarget = (event: any) => {
    if (event.relatedTarget === null) return false;    
    let node = event.relatedTarget.parentNode || null;          
    while (node !== null) {
      if (node === event.currentTarget) return true;
      node = node.parentNode;
    }
    return false;
  }

  const focusHandler = (event: any) => {
    // event.stopPropagation();
    const now = new Date();
    const cur = now.getTime()
    tick = cur;
    setFocus(true);
    setZoomCursor(true);
  };
  const blurHandler = (event: any) => {
    if (!focusInCurrentTarget(event)) {
      setFocus(false)
    }
    setZoomCursor(false);
  };
  const handleDownload = (e: MouseEvent)=> {
    e.stopPropagation();
    if(!selectedImage) return;
    const img_url = selectedImage;
    fetch(img_url, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const prefix = img_url.split('/').pop();
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${prefix || 'download'}-image.png`); 
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  const handleClickImageWrapper = (zoomIn: Function, zoomOut: Function) => {
    if (!isFullScreen) setFullScreen(true);
    // else {
    //   if (isZoomIn) {
    //     zoomOut(1); 
    //   } else {
    //     zoomIn(1); 
    //   }
    //   setZoomIn(!isZoomIn)
    // }
  }
  const handleZoomOutClick = (zoomOut: Function) => () => {
    zoomOut(1);
    setZoomIn(!isZoomIn);
  }
  const handleZoomInClick = (zoomIn: Function) => () => {
    if (isFullScreen) {
      zoomIn(1); 
      setZoomIn(!isZoomIn);
    } else {
      setFullScreen(true)
    }
  }
  // if (selectedImage === undefined) return null;
  console.log(isFullScreen)
  return (
    <div className="carousel-container" >
      <TransformWrapper
        initialScale={1}
        wheel={{
          disabled: true
        }}
        panning={{
          disabled: isFullScreen ? false : true
        }}
        maxScale={2}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <div               
              className={`${isFullScreen ? 'fullscreen-image-wrapper' :'selected-image-wrapper'}`}  
              onClick={()=> handleClickImageWrapper(zoomIn,zoomOut)} 
              // onMouseOver={focusHandler} 
              onMouseOut={blurHandler}
              onMouseMove={focusHandler}
              >
                {focus && images &&
                  <>
                    <Box className="image-tools" >
                      <div className="tool-buttons-left">
                        <Typography sx={{mr: 2,fontSize: 15, fontWeight: 400, color:'black'}} >{`${selectedImageIndex} / ${images.length}`}</Typography>
                        {isZoomIn ?
                        <span className="tool-button " onClick={handleZoomOutClick(zoomOut)} onMouseMove={(e)=>{e.stopPropagation();setZoomCursor(false)}}>
                          <ZoonOutSVG />
                        </span>
                        :
                        <span className="tool-button" onClick={handleZoomInClick(zoomIn)} onMouseMove={(e)=>{e.stopPropagation();setZoomCursor(false)}}>
                          <ZoonInSVG />
                        </span>
                        }
                      </div>
                      {isFullScreen ?
                        <span className="tool-button" onClick={() => {setFullScreen(false); setFocus(false); isZoomIn && (zoomOut(1),setZoomIn(!isZoomIn))}} onMouseMove={(e)=>{e.stopPropagation();setZoomCursor(false)}}>
                          <CloseIcon />
                        </span>                
                        :
                        <span className="tool-button" onClick={handleDownload} onMouseMove={(e)=>{e.stopPropagation();setZoomCursor(false)}}>
                          Download
                        </span>                
                      }
                    </Box>
                    {isFullScreen &&
                      <>
                        <NextArrow 
                          className={selectedImageIndex === 0 ?'full-screen-carousel__button-left carousel__button-disabled' : 'full-screen-carousel__button-left'} 
                          onClick={handleLeftClick(resetTransform)}      
                        />
                        <NextArrow 
                          className={images && selectedImageIndex === images.length - 1 ? 'full-screen-carousel__button-right carousel__button-disabled' : 'full-screen-carousel__button-right'}
                          onClick={handleRightClick(resetTransform)}
                        />
                      </>
                    }
                  </>
                }
                { isZoomCursor && !isFullScreen &&
                  <ZoomCursor />
                }  
                <TransformComponent>                             
                  <img 
                    className={`${isFullScreen ? 'fill-window' : 'selected-image'}`}
                    src={selectedImage} 
                    alt="hero-image"
                    width={545}
                    height={545}                   
                  >
                  </img>
                </TransformComponent>
            </div>
            <div className="carousel">
              <NextArrow 
                className={selectedImageIndex === 0 ?'carousel__button-left carousel__button-disabled' : 'carousel__button-left'} 
                onClick={handleLeftClick(resetTransform)}      
              />
              <div className="carousel__images">
                {images &&
                  images.map((image, idx) => (
                    <div              
                      onClick={() => {resetTransform();handleSelectedImageChange(idx);}}
                      style={{ 
                        backgroundImage: `url(${image})`, 
                      }}
                      key={`${idx}-photo`}
                      className={`carousel__image ${
                        selectedImageIndex === idx && "carousel__image-selected"
                      }`}
                      ref={(el) => (carouselItemsRef.current[idx] = el)}
                    />
                  ))}
              </div>
              <NextArrow 
                className={images && selectedImageIndex === images.length - 1 ? 'carousel__button-right carousel__button-disabled' : 'carousel__button-right'}
                onClick={handleRightClick(resetTransform)}
              />
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ImageCarousel;

