import { useState } from "react";
import styled from "@emotion/styled/macro";
import { HEIGHT_LIST } from "../../../constants/height";
import { SlArrowUp } from "react-icons/sl";

export default function CarSellPage() {
  const [selectedDistrict, setSelectedDistrict] = useState(null); // 단일 선택 값
  const [expandedRegion, setExpandedRegion] = useState(null); // 확장된 지역 상태

  const handleSelect = (district) => {
    setSelectedDistrict(district.value); // 선택된 값 업데이트

    // 통신 로직 실행 (예시)
    console.log(`Selected district: ${district.value}`);

    // 이후 화면 전환 로직
    // navigateToNextStep();
  };

  const toggleExpand = (region) => {
    setExpandedRegion((prev) => (prev === region ? null : region));
  };

  const seoulDistricts = [
    { label: "강남구", value: "gangnam" },
    { label: "강동구", value: "gangdong" },
    { label: "강북구", value: "gangbuk" },
    { label: "강서구", value: "gangseo" },
    { label: "관악구", value: "gwanak" },
    { label: "광진구", value: "gwangjin" },
    { label: "구로구", value: "guro" },
    { label: "금천구", value: "geumcheon" },
    { label: "노원구", value: "nowon" },
    { label: "도봉구", value: "dobong" },
    { label: "동대문구", value: "dongdaemun" },
    { label: "동작구", value: "dongjak" },
    { label: "마포구", value: "mapo" },
    { label: "서대문구", value: "seodaemun" },
    { label: "서초구", value: "seocho" },
    { label: "성동구", value: "seongdong" },
    { label: "성북구", value: "seongbuk" },
    { label: "송파구", value: "songpa" },
    { label: "양천구", value: "yangcheon" },
    { label: "영등포구", value: "yeongdeungpo" },
    { label: "용산구", value: "yongsan" },
    { label: "은평구", value: "eunpyeong" },
    { label: "종로구", value: "jongno" },
    { label: "중구", value: "jung" },
    { label: "중랑구", value: "jungnang" },
  ];

  const gyeonggiDistricts = [
    { label: "가평군", value: "gapyeong" },
    { label: "고양시 덕양구", value: "goyang_deogyang" },
    { label: "고양시 일산동구", value: "goyang_ilsan_east" },
    { label: "고양시 일산서구", value: "goyang_ilsan_west" },
    { label: "과천시", value: "gwacheon" },
    { label: "광명시", value: "gwangmyeong" },
    { label: "광주시", value: "gwangju" },
    { label: "구리시", value: "guri" },
    { label: "군포시", value: "gunpo" },
    { label: "김포시", value: "gimpo" },
    { label: "남양주시", value: "namyangju" },
    { label: "동두천시", value: "dongducheon" },
    { label: "부천시", value: "bucheon" },
    { label: "성남시 분당구", value: "seongnam_bundang" },
    { label: "성남시 수정구", value: "seongnam_sujeong" },
    { label: "성남시 중원구", value: "seongnam_jungwon" },
    { label: "수원시 권선구", value: "suwon_kwonsun" },
    { label: "수원시 영통구", value: "suwon_yeongtong" },
    { label: "수원시 장안구", value: "suwon_jangan" },
    { label: "수원시 팔달구", value: "suwon_paldal" },
    { label: "시흥시", value: "siheung" },
    { label: "안산시", value: "ansan" },
    { label: "안양시", value: "anyang" },
    { label: "양주시", value: "yangju" },
    { label: "여주시", value: "yeoju" },
    { label: "용인시", value: "yongin" },
    { label: "의왕시", value: "uiwang" },
    { label: "의정부시", value: "uijeongbu" },
    { label: "이천시", value: "icheon" },
    { label: "파주시", value: "paju" },
    { label: "평택시", value: "pyeongtaek" },
    { label: "포천시", value: "pocheon" },
    { label: "하남시", value: "hanam" },
    { label: "화성시", value: "hwaseong" },
  ];

  const gangwonDistricts = [
    { label: "춘천시", value: "chuncheon" },
    { label: "원주시", value: "wonju" },
    { label: "강릉시", value: "gangneung" },
    { label: "동해시", value: "donghae" },
    { label: "태백시", value: "taebaek" },
    { label: "속초시", value: "sokcho" },
    { label: "삼척시", value: "samcheok" },
    { label: "홍천군", value: "hongcheon" },
    { label: "횡성군", value: "hoengseong" },
    { label: "영월군", value: "yeongwol" },
    { label: "평창군", value: "pyeongchang" },
    { label: "정선군", value: "jeongseon" },
    { label: "철원군", value: "cheorwon" },
    { label: "화천군", value: "hwacheon" },
    { label: "양구군", value: "yanggu" },
    { label: "인제군", value: "inje" },
    { label: "고성군", value: "goseong" },
    { label: "양양군", value: "yangyang" },
  ];

  return (
    <CarListContainer>
      <h3>선호하는 거래 지역을 골라주세요</h3>

      {/* 서울특별시 */}
      <Region
        title="서울특별시"
        isExpanded={expandedRegion === "seoul"}
        toggleExpand={() => toggleExpand("seoul")}
        districts={seoulDistricts}
        handleSelect={handleSelect}
        selectedDistrict={selectedDistrict}
      />

      {/* 경기도 */}
      <Region
        title="경기도"
        isExpanded={expandedRegion === "gyeonggi"}
        toggleExpand={() => toggleExpand("gyeonggi")}
        districts={gyeonggiDistricts}
        handleSelect={handleSelect}
        selectedDistrict={selectedDistrict}
      />

      {/* 강원특별자치도 */}
      <Region
        title="강원특별자치도"
        isExpanded={expandedRegion === "gangwon"}
        toggleExpand={() => toggleExpand("gangwon")}
        districts={gangwonDistricts}
        handleSelect={handleSelect}
        selectedDistrict={selectedDistrict}
      />
    </CarListContainer>
  );
}

const Region = ({
    title,
    isExpanded,
    toggleExpand,
    districts,
    handleSelect,
    selectedDistrict,
  }) => (
    <>
      <SelectRegion onClick={toggleExpand}>
        <SubText>{title}</SubText> <SlArrowUp />
      </SelectRegion>
      {isExpanded && (
        <RegionGrid>
          {districts.map((district) => (
            <District
              key={district.value}
              onClick={() => handleSelect(district)}
              isSelected={selectedDistrict === district.value}
            >
              {district.label}
            </District>
          ))}
        </RegionGrid>
      )}
    </>
  );
  

const SelectRegion = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const SubText = styled.p`
  font-size: 17px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
`;

const CarListContainer = styled.div`
  min-height: 100%;
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 100px;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;

    

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;  

const RegionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const District = styled.div`
  padding: 10px;
  border: 1px solid ${({ isSelected }) => (isSelected ? "#007BFF" : "#ccc")};
  background-color: ${({ isSelected }) =>
    isSelected ? "#E0F0FF" : "#f9f9f9"};
  text-align: center;
  cursor: pointer;
`;
