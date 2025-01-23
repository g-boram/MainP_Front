import { useEffect, useState } from "react";
import { getSimpleUser } from "../../api/userApi";
import styled from "@emotion/styled/macro";
import { HEIGHT_LIST } from "../../constants/height";
import HeadTitle from "../../components/manager/HeadTitle";
import {
  ContentWrapper,
  ManagerContainer,
  NavRow,
} from "../../styles/managerLayoutStyles";
import { colorPalette } from "../../styles/colorPalette";
import { FaUserCog } from "react-icons/fa";
import Flex from "../../components/shared/Flex";
import Spacing from "../../components/shared/Spacing";
import { icons } from "../../constants/icons";
import { Link, useNavigate } from "react-router-dom";

export default function MyPage(car) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const a = JSON.parse(sessionStorage.getItem("user"));
  const nowUserName = a.username;

  const watched = JSON.parse(
    localStorage.getItem(`selectedCars${nowUserName}`)
  );
  console.log(watched);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const data = await getSimpleUser(userId);
          setUser(data.data);
        } else {
          setError("User not logged in");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const imageIcon = user && icons.filter((icon) => icon.name === user.imageUrl);

  return (
    <CarListContainer>
      <HeadTitle title={"회원정보 상세보기"} desc={"회원정보 상세보기 "} />
      {error && <p>Error: {error.message}</p>}
      {user && (
        <ContentBox>
          <FormContainer>
            <Flex
              height="250px"
              width="100%"
              align="center"
              justify="space-between"
            >
              <UserImgBox>
                {user.imageUrl !== null ? (
                  imageIcon.length > 0 ? (
                    imageIcon[0].iconComp
                  ) : (
                    <FaUserCog size={40} color="#ddd" />
                  )
                ) : (
                  <FaUserCog size={40} color="#ddd" />
                )}
              </UserImgBox>

              <InfoBox>
                <Flex direction="column" width="50%">
                  <Flex>
                    <Label>· 권한</Label>
                    <ValueRow>{sessionUser.role}</ValueRow>
                  </Flex>
                  <Flex>
                    <Label>· 이름</Label>
                    <ValueRow>{sessionUser.username}</ValueRow>
                  </Flex>
                  <Flex>
                    <Label>· 핸드폰 번호</Label>
                    <ValueRow>{user.phoneNumber}</ValueRow>
                  </Flex>
                  <Flex>
                    <Label>· 생년월일</Label>
                    <ValueRow>{sessionUser.birth}</ValueRow>
                  </Flex>
                </Flex>

                <Flex direction="column" width="50%">
                  <Flex>
                    <Label>· 이메일</Label>
                    <ValueRow>{sessionUser.email}</ValueRow>
                  </Flex>
                  <Flex>
                    <Label>· 성별</Label>
                    <ActiveRow gender={sessionUser.gender}>
                      {sessionUser.gender}
                    </ActiveRow>
                  </Flex>
                  <Flex>
                    <Label>· 주소</Label>
                    <ValueRow>{sessionUser.address}</ValueRow>
                  </Flex>
                  <Flex>
                    <Label>· 생성일</Label>
                    <ValueRow>{sessionUser.createdAt}</ValueRow>
                  </Flex>
                </Flex>
              </InfoBox>
            </Flex>
            <Spacing size={30} />
          </FormContainer>
        </ContentBox>
      )}
      <h2>최근 본 상품</h2>
      {watched && watched.length > 0 ? (
        <SelectCar>
          {watched.map((car, index) => (
            <div
              key={index}
              onClick={() => navigate("/car/detail", { state: { ...car } })}
            >
              <RecentCarRow>
                <CarImgBox>
                  <CarImg src={car.imageUrl} />
                </CarImgBox>
                <TextWrap>
                  <Text>
                    {car.make} {car.model}
                  </Text>
                  <Text>가격 : {car.price}</Text>
                </TextWrap>
              </RecentCarRow>
            </div>
          ))}
        </SelectCar>
      ) : (
        <p>최근 본 상품이 없습니다.</p>
      )}
    </CarListContainer>
  );
}

const SelectCar = styled.div`
  display: flex;
`;

const ContentBox = styled.div`
  width: 100%;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
`;

const TextWrap = styled.div`
  width: 300px;
  text-align: center;
  border-top: 1px solid rgb(0, 0, 0, 0.5);
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: bold;
  line-height: 10px;
`;

const CarImg = styled.img`
  width: 100px;
`;

const CarImgBox = styled.div`
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
  border-radius: 15px;
  position: relative;

  > img {
    width: 100%;
    border-radius: 15px;
    object-fit: contain;
  }
`;

const CarListContainer = styled.div`
  user-select: none;
  min-height: 100%;
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 100px;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
`;

const InfoBox = styled.div`
  width: 900px;
  display: flex;
`;

const Label = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: flex-start;
  font-size: 11px;
  padding-left: 20px;
  font-weight: bold;
  background-color: #fafafa;
  color: ${colorPalette.fontBlack};
`;

const ValueRow = styled.div`
  height: 100%;
  width: 100%;
  color: ${colorPalette.fontDarkGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const UserImgBox = styled.div`
  height: 200px;
  width: 200px;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  margin-right: 10px;

  > img {
    height: 200px;
    width: 200px;
    object-fit: contain;
  }
`;

const ActiveRow = styled.div`
  height: 35px;
  width: 100%;
  color: ${({ gender }) => (gender === "남" ? "green" : "red")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;

const RecentCarRow = styled.div`
  /* display: flex; */
  justify-content: space-between;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin-right: 15px;
  cursor: pointer;
`;
