import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { useRouter } from 'next/router'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
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

// export type ImageType = { url: string };
export type ImageType = string;

const ImageCarousel: React.FC<{ images?: ImageType[] }> = ({ images }) => {
  const router = useRouter();
  const handleFullScreen = useFullScreenHandle();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ImageType>();
  const [focus, setFocus] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const carouselItemsRef = useRef<HTMLDivElement[] | null[]>([]);

  useEffect(() => {
    window.addEventListener("keypress", function(e) {
      console.log('keypress=>',e)
      if (e.keyCode === 13) {
        // handleFullScreen.enter();
      }
    }, false);   

    // document.addEventListener("fullscreenchange", function() {
    //  console.log("fullscreenchange event fired!");
    //   // handleFullScreen.enter();
    // });
    // /* Firefox */
    // document.addEventListener("mozfullscreenchange", function() {
    //   console.log("fullscreenchange event fired!");
    // });

    // /* Chrome, Safari and Opera */
    // document.addEventListener("webkitfullscreenchange", function() {
    //   console.log("fullscreenchange event fired!");
    // });

    // /* IE / Edge */
    // document.addEventListener("msfullscreenchange", function() {
    //   console.log("fullscreenchange event fired!");
    // });
  }, []);
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
   if (isFullScreen) handleFullScreen.enter();
   else handleFullScreen.exit();
  }, [isFullScreen]);

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

  const handleRightClick = () => {
    if (images && images.length > 0 && selectedImageIndex < images.length - 1) {
      let newIdx = selectedImageIndex + 1;
      if (newIdx >= images.length) {
        newIdx = 0;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  const handleLeftClick = () => {
    if (images && images.length > 0 && selectedImageIndex > 0) {
      let newIdx = selectedImageIndex - 1;
      if (newIdx < 0) {
        newIdx = images.length - 1;
      }
      handleSelectedImageChange(newIdx);
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
    event.stopPropagation();
    setFocus(true)
  };
  const blurHandler = (event: any) => {
    if (!focusInCurrentTarget(event)) {
      setFocus(false)
    }
  };
  const handleDownload = ()=> {
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
  // if (selectedImage === undefined) return null;
  return (
    <div className="carousel-container" >
      <TransformWrapper
        initialScale={1}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <div className="selected-image-wrapper"  onMouseOver={focusHandler} onMouseOut={blurHandler}>
              <FullScreen handle={handleFullScreen}>
                {focus && images &&
                  <>
                    <Box className="image-tools" onMouseOver={focusHandler}>
                      <div className="tool-buttons-left">
                        <Typography sx={{mr: 2,fontSize: 15, fontWeight: 400, color:'black'}} >{`${selectedImageIndex} / ${images.length}`}</Typography>
                        <span className="tool-button " onClick={() => zoomOut()}>
                          <ZoonOutSVG />
                        </span>
                        <span className="tool-button zoom-in" onClick={() => zoomIn()}>
                          <ZoonInSVG />
                        </span>
                        <span className="tool-button " onClick={()=> setIsFullScreen(!isFullScreen)}>
                          Full Screen
                        </span>
                      </div>
                      <span className="tool-button" onClick={() => handleDownload()}>
                        Download
                      </span>                
                    </Box>
                    {handleFullScreen.active &&
                      <>
                        <NextArrow 
                          className={selectedImageIndex === 0 ?'carousel__button-left carousel__button-disabled' : 'carousel__button-left'} 
                          onClick={()=>{resetTransform();handleLeftClick();}}      
                        />
                        <NextArrow 
                          className={images && selectedImageIndex === images.length - 1 ? 'carousel__button-right carousel__button-disabled' : 'carousel__button-right'}
                          onClick={()=>{resetTransform();handleRightClick();}}
                        />
                      </>
                    }
                  </>
                }
                <TransformComponent>              
                  <img 
                    className={`${handleFullScreen.active ? 'fill-window' : 'selected-image'}`} 
                    src={selectedImage} 
                    alt="hero-image"
                    width={545}
                    height={545}
                  />
                </TransformComponent>
              </FullScreen>
            </div>
            <div className="carousel">
              <NextArrow 
                className={selectedImageIndex === 0 ?'carousel__button-left carousel__button-disabled' : 'carousel__button-left'} 
                onClick={()=>{resetTransform();handleLeftClick();}}      
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
                onClick={()=>{resetTransform();handleRightClick();}}
              />
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ImageCarousel;

