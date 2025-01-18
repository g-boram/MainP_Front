import styled from "@emotion/styled/macro";
import { HEIGHT_LIST } from "../../../constants/height";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function MyCarSellPage(){
    return(
        <CarListContainer>
            <ScArea>
            <SellContainer>
                <TopText>딜러견적 비교해서 최고가에 팔기</TopText>
                <LinkStyle to="/carsellestimate">
                <SellButton>HiCar 비교견적<SlArrowRight/></SellButton>
                </LinkStyle>
            </SellContainer>
            </ScArea>
            
                <SellContainer2>
            <TopText>원하는 가격에 팔기</TopText>
                </SellContainer2>
                <SellButton2>직거래 간편등록<SlArrowRight/></SellButton2>
            
        </CarListContainer>
    )
}


const SellContainer2 = styled.div`
    width: 140px;
`
const SellButton2 = styled.div`
display : flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    padding : 10px;
    border-radius: 8px;
    color : #000;
    box-sizing: border-box;
    width: 152px;
    font-weight: 600;
    background-color : #fff;
    border: 1px solid rgba(0, 0, 0,0.3);
    font-size: 14px;

    svg{
        font-size: 10px;
        
    }
`


const LinkStyle = styled(Link)`
    color: #000;
    text-decoration: none;
`

const ScArea = styled.div`
height: 350px;
border-bottom: 1px solid rgba(0, 0, 0,0.3);
`

const SellContainer = styled.div`
    width: 160px;
    
` ;

const TopText = styled.h3`
    line-height: 25px;
    font-weight: 800;
`

const SellButton = styled.div`
    display : flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    padding : 10px;
    border-radius: 8px;
    color : #fff;
    box-sizing: border-box;
    width: 152px;
    font-weight: 600;
    background-color : #d72e36;
    font-size: 14px;

    svg{
        font-size: 10px;
        
    }
`

const CarListContainer = styled.div`
  min-height: 100%;
  width: 1200px;
  margin: 0 auto;
//   display: flex;
  margin-bottom: 100px;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;