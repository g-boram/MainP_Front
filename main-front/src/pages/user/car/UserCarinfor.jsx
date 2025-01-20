import styled from "@emotion/styled/macro";
import { HEIGHT_LIST } from "../../../constants/height";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
import priceImg from "../../../assert/market_price_graph.png";
import { Link } from "react-router-dom";

export default function UserCarinfor() {
    const location = useLocation();
    const { carNumber, ownerName, birthDate } = location.state;
    const [carDetails, setCarDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!carNumber) return;  // carNumber가 없으면 API 호출을 막음
        axios.get(`http://localhost:8081/details/${carNumber}`)
            .then(response => {
                console.log(response.data);
                setCarDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching car details:', error);
                setLoading(false);
            });
    }, [carNumber]);

    // carDetails가 null이 아닐 때만 데이터를 렌더링
    if (loading) return <div>Loading...</div>;
    if (!carDetails) return <div>차량 정보가 없습니다.</div>;

    return (
        <CarListContainer>
            <TopText>안녕하세요 {carDetails.ownerName}님!</TopText>
            <TopText>이 차의 시세는 {carDetails.carPrice}만원 입니다.</TopText>
            <SubText>{carDetails.carName} 기준</SubText>
            <ImgArea><img src={priceImg}></img></ImgArea>
            <DescArea>
                <SubText2>·시세는 최근 3개월 내 시장가격이 반영된 차량의 견적가 기준으로 반영됩니다</SubText2>
                <SubText2>·차량의 상태에 따라 실제 견적 가격은 달라질 수 있습니다.</SubText2>
            </DescArea>
            <LinkStyle to={`/carsell`}><FormBtn>계속 진행하기</FormBtn></LinkStyle>
            <LinkStyle to={`/`}>메인으로</LinkStyle>
        </CarListContainer>
    );
}



const LinkStyle = styled(Link)`
    color: #000;
    display: flex;
    justify-content: center;
    line-height: 0;
    font-size: 13px;
    text-decoration: none;
`

const FormBtn = styled.div`
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  height: 50px;
  line-height: 50px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  color: #fff;
  background-color: #d72e36;
  cursor: pointer;
`;

const SubText2 = styled.p`
    font-weight: bold;
    margin-left: 10px;
    font-size: 13px;
    color: #a3a0a8;

    &:nth-of-type(1){
        height: 6px;
    }

`

const DescArea = styled.div`
    /* border: 1px solid #000; */
    background-color: rgb(246, 246, 246);
    padding: 3px;
    border-radius: 8px;
    
    
`

const ImgArea = styled.div`
    margin:0 auto;
    text-align: center;
    /* border: 1px solid #000; */
    
    img{
        width: 500px;
    }
`;

const SubText = styled.p`
    font-weight: bold;
    font-size: 13px;
    color: rgba(0, 0, 0,0.5);

`;

const TopText = styled.h2`
    line-height: 12px;
    font-weight: 800;

    &:nth-of-type(1){
        margin-top: 50px;
    }
`

const Wrap = styled.div`
    
`

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