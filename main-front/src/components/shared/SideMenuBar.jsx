import React, { useState } from "react";
import styled from "@emotion/styled";

export default function SideMenuBar({ setIsLoading, setCarData }) {
  // 여러 개의 활성화된 항목을 저장
  const [activeIndices, setActiveIndices] = useState([]);

  const filterTitle = [
    {
      title: "제조사",
      content: <div></div>,
    },
    {
      title: "차량 제조 연도",
      content:
        "Madrid is the capital of Spain and the largest municipality in both the Community of Madrid and Spain as a whole. The city has almost 3.2 million inhabitants and a metropolitan area population of approximately 6.5 million.",
    },
    {
      title: "주행거리",
      content:
        "Paris is the capital and most populous city of France, with an area of 105 square kilometres (41 square miles) and a population of 2,206,488. Since the 17th century, Paris has been one of Europe's major centres of finance, commerce, fashion, science, and the arts.",
    },
    {
      title: "연료타입",
      content:
        "Barcelona is a city in Spain. It is the capital and largest city of Catalonia, as well as the second most populous municipality of Spain. With a population of 1.6 million within city limits, its urban area extends to numerous neighbouring municipalities within the Province of Barcelona and is home to around 4.8 million people.",
    },
    {
      title: "변속기",
      content:
        "Milan is a city in northern Italy, capital of Lombardy, and the second-most populous city in Italy after Rome, with the city proper having a population of 1,372,810 while its metropolitan area has a population of 3,242,820.",
    },
    {
      title: "색상",
      content:
        "Milan is a city in northern Italy, capital of Lombardy, and the second-most populous city in Italy after Rome, with the city proper having a population of 1,372,810 while its metropolitan area has a population of 3,242,820.",
    },
  ];

  // 아코디언 항목의 열림/닫힘을 토글
  const toggleAccordion = (index) => {
    setActiveIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        // 이미 열려있다면 닫기
        return prevIndices.filter((i) => i !== index);
      } else {
        // 닫혀있다면 열기
        return [...prevIndices, index];
      }
    });
  };

  return (
    <Container>
      <Accordion>
        {filterTitle.map((item, index) => {
          const isActive = activeIndices.includes(index);
          return (
            <AccordionItem key={index}>
              <AccordionTitle
                onClick={() => toggleAccordion(index)}
                role="button"
                aria-expanded={isActive}
                aria-controls={`accordion-content-${index}`}
              >
                {item.title}
                <AccIcon>{isActive ? "-" : "+"}</AccIcon>
              </AccordionTitle>
              {isActive && <AccordionContent id={`accordion-content-${index}`}>{item.content}</AccordionContent>}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Accordion = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: white;
  width: 300px;
`;

const AccordionItem = styled.li`
  border-bottom: 1px solid #eee;
  &:last-of-type {
    border-bottom: none;
  }
`;

const AccordionTitle = styled.div`
  padding: 15px 20px;
  margin: 0;
  max-width: 350px;
  font-size: 14px;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const AccIcon = styled.span`
  font-size: 14px;
`;

const AccordionContent = styled.div`
  padding: 15px 20px;
  font-size: 14px;
  min-height: 100px;
  max-height: 500px;
  color: #6c757d;
  line-height: 1.5;
`;
