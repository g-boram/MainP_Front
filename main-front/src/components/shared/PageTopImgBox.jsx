import styled from "@emotion/styled";
import BoardMainImg from "../../assert/boardMainImg.jpg";

import { colorPalette } from "../../styles/colorPalette";

export default function PageTopImgBox({ imgName }) {
  // 이미지 경로를 결정하는 함수
  const getImgPath = (name) => {
    switch (name) {
      case "board":
        return BoardMainImg;
      default:
        return "";
    }
  };

  const img = getImgPath(imgName);

  return <ImgContainer>{img ? <img src={img} alt="TopImg" /> : null}</ImgContainer>;
}

const ImgContainer = styled.div`
  height: 100px;
  width: 100%;
  background-color: ${colorPalette.imgBackBG};

  > img {
    height: 300px;
    width: 100%;
    object-fit: cover;
  }
`;
