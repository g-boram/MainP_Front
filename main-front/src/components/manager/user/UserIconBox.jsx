import styled from "@emotion/styled";
import { useState } from "react";
import { colorPalette } from "../../../styles/colorPalette";
import Flex from "../../shared/Flex";

export default function UserIconBox({ icon, setIcon }) {
  const [selectedIcon, setSelectedIcon] = useState("");
  const icons = [
    { name: "cat", iconComp: "/icons/cat.png" },
    { name: "dog", iconComp: "/icons/dog.png" },
    { name: "bird", iconComp: "/icons/bird.png" },
    { name: "fish", iconComp: "/icons/fish.png" },
  ];

  const handleIconClick = (name) => {
    setIcon(name);
    setSelectedIcon(name);
  };

  return (
    <IconWrapper>
      <IconBoxTitle>사용자 아이콘 선택</IconBoxTitle>
      <SelectIconBox>{selectedIcon !== "" ? selectedIcon : icons[0].icon}</SelectIconBox>
      <IconListBox>
        {icons.map((icon) => (
          <Flex direction="column" justify="center" align="center">
            <IconBox key={icon.name} onClick={() => handleIconClick(icon.iconComp)}>
              {icon.iconComp}
              {icon.name}
            </IconBox>
            <IconName selected={selectedIcon === icon.iconComp ? true : false}>{icon.name}</IconName>
          </Flex>
        ))}
      </IconListBox>
    </IconWrapper>
  );
}

const IconWrapper = styled.div`
  height: 600px;
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconBoxTitle = styled.div`
  height: 30px;
  font-size: 13px;
`;

const SelectIconBox = styled.div`
  height: 250px;
  width: 250px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #f4f4f4;
  border-radius: 50%;
`;

const IconName = styled.div`
  height: 50px;
  font-size: 14px;
  padding: 3px 10px;
  border-radius: 15px;
  background-color: ${({ selected }) => (selected ? "#000" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #ddd;
`;

const IconListBox = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 15px;
  flex-wrap: wrap;
  background-color: #f4f4f4;
`;
