import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

// 이미지 리스트
import img1 from "../../../../assert/main_slide/centerTo1.png";
import img2 from "../../../../assert/main_slide/centerTo1.png";
import img3 from "../../../../assert/main_slide/centerTo1.png";
import img4 from "../../../../assert/main_slide/centerTo1.png";
import img5 from "../../../../assert/main_slide/centerTo1.png";

const images = [
  { src: img1, position: "center" },
  { src: img2, position: "left" },
  { src: img3, position: "right" },
];

const CenterToBanner = () => {
  const [visibleImages, setVisibleImages] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < images.length) {
        setVisibleImages((prev) => [...prev, images[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 3000); // 1초 간격으로 등장

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageContainer>
      {images.map((image, idx) => (
        <Image key={idx} src={image.src} position={image.position} isVisible={visibleImages.includes(image)} />
      ))}
    </ImageContainer>
  );
};

export default CenterToBanner;

// 애니메이션 키프레임 (중앙에서 등장)
const fadeInCenter = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// 애니메이션 키프레임 (왼쪽으로 등장)
const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px); /* 오른쪽에서 시작 */
  }
  to {
    opacity: 1;
    transform: translateX(0); /* 제자리 */
  }
`;

// 애니메이션 키프레임 (오른쪽으로 등장)
const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px); /* 왼쪽에서 시작 */
  }
  to {
    opacity: 1;
    transform: translateX(0); /* 제자리 */
  }
`;

// 이미지 컨테이너
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 600px;
  height: 400px;
  overflow: hidden;
  background-color: pink;
`;

// 이미지 스타일
const Image = styled.img`
  position: absolute;
  width: 150px;
  height: 150px;
  object-fit: cover;
  opacity: 0;

  ${({ position }) =>
    position === "center" &&
    css`
      animation: ${fadeInCenter} 0.8s ease-in-out forwards;
    `}

  ${({ position }) =>
    position === "left" &&
    css`
      left: 100px; /* 왼쪽 위치 */
      animation: ${fadeInLeft} 0.8s ease-in-out forwards;
    `}

  ${({ position }) =>
    position === "right" &&
    css`
      right: 100px; /* 오른쪽 위치 */
      animation: ${fadeInRight} 0.8s ease-in-out forwards;
    `}

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 1;
    `}
`;
