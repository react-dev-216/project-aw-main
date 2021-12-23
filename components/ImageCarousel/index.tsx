import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { useRouter } from 'next/router'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import NextArrow from '../../assets/svg/next.svg';
import ZoonInSVG from '../../assets/svg/zoomin.svg';
import ZoonOutSVG from '../../assets/svg/zoomout.svg';
import {
  Container, Box, Typography, Grid
} from '@mui/material';

export type ImageType = { id: number; url: string };

const ImageCarousel: React.FC<{ images?: ImageType[] }> = ({ images }) => {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ImageType>();
  const [focus, setFocus] = useState(false);
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
  const handleDownload = (url)=> {
    const img_url = selectedImage.url;
    fetch(img_url, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${selectedImage.id}-image.png`); 
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
              {focus && images &&
                <Box className="image-tools" onMouseOver={focusHandler}>
                  <div className="tool-buttons-left">
                    <Typography sx={{mr: 2,fontSize: 15, fontWeight: 400, color:'black'}} >{`${selectedImageIndex} / ${images.length}`}</Typography>
                    <span className="tool-button " onClick={() => zoomOut()}>
                      <ZoonOutSVG />
                    </span>
                    <span className="tool-button zoom-in" onClick={() => zoomIn()}>
                      <ZoonInSVG />
                    </span>
                  </div>
                  <span className="tool-button" onClick={() => handleDownload()}>
                    Download
                  </span>                
                </Box>
              }
              <TransformComponent>
                <img 
                  className="selected-image" 
                  src={selectedImage?.url} 
                  alt="hero-image"
                  width={545}
                  height={545}
                />
              </TransformComponent>
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
                        backgroundImage: `url(${image.url})`, 
                      }}
                      key={image.id}
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

