import styled from "@emotion/styled";

import { TfiMapAlt } from "react-icons/tfi";
import { HiOutlineTicket } from "react-icons/hi2";
import { GiCarSeat } from "react-icons/gi";
import { FaCarOn } from "react-icons/fa6";
import { FaCarBurst } from "react-icons/fa6";
import { FaCarTunnel } from "react-icons/fa6";
import { GiMusicalNotes } from "react-icons/gi";
import { FaKeycdn } from "react-icons/fa6";
import { FaUsb } from "react-icons/fa6";
import { ImDisplay } from "react-icons/im";

export default function CarIconOption() {
  const iconData = [
    { icon: <TfiMapAlt size={25} />, value: "네비게이션" },
    { icon: <HiOutlineTicket size={25} />, value: "하이패스" },
    { icon: <GiCarSeat size={25} />, value: "열선시트" },
    { icon: <FaCarOn size={25} />, value: "썬루프" },
    { icon: <FaKeycdn size={25} />, value: "스마트키" },
    { icon: <FaCarBurst size={25} />, value: "경보시스템" },
    { icon: <GiMusicalNotes size={25} />, value: "스피커" },
    { icon: <FaUsb size={25} />, value: "USB" },
    { icon: <ImDisplay size={25} />, value: "디스플레이" },
    { icon: <FaCarTunnel size={25} />, value: "스마트컨트롤" },
  ];
  return (
    <IconContainer>
      <IconWrapper>
        {iconData.map((icon) => (
          <IconBox>
            {icon.icon}
            {icon.value}
          </IconBox>
        ))}
      </IconWrapper>
    </IconContainer>
  );
}

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const IconWrapper = styled.div`
  max-width: 450px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  font-size: 11px;
  gap: 10px;
  margin-top: 20px;
  color: grey;
`;
