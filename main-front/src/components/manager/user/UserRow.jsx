import styled from "@emotion/styled";
import formatDateByHyphen from "../../../utils/formatDate";
import Spacing from "../../shared/Spacing";
import { colorPalette } from "../../../styles/colorPalette";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "../../../utils/formatNumber";

export default function UserRow(userData) {
  const navigate = useNavigate();

  const { userId, address, email, birth, role, createdAt, phoneNumber, updatedAt, username, gender } = userData;

  const handleDetailPage = () => {
    navigate("/manager/users/detail", { state: { ...userData } });
  };
  const handleUpdatePage = () => {
    navigate("/manager/users/update", { state: { ...userData } });
  };
  const handleDelete = () => {};

  return (
    <UserRowWrapper gender={gender} role={role}>
      <div id="userId">{userId}</div>
      <div id="role">{role}</div>
      <div id="username">{username}</div>
      <div id="phoneNumber">{formatPhoneNumber(phoneNumber)}</div>
      <div id="email">{email}</div>
      <div id="address">{address}</div>
      <div id="birth">{birth}</div>
      <div id="gender">{gender}</div>
      <div id="createdAt">{formatDateByHyphen(createdAt)}</div>
      <div id="updatedAt">{formatDateByHyphen(updatedAt)}</div>
      <div id="btnBox">
        <DetailBtn onClick={handleDetailPage}>상세보기</DetailBtn>
        <Spacing size={5} direction="width" />
        <UpdateBtn onClick={handleUpdatePage}>수정</UpdateBtn>
        <Spacing size={5} direction="width" />
        <DeleteBtn onClick={handleDelete}>삭제</DeleteBtn>
      </div>
    </UserRowWrapper>
  );
}

const UserRowWrapper = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
  color: ${colorPalette.fontBlack};
  cursor: pointer;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  #userId {
    width: 80px;
  }
  #role {
    width: 100px;
    font-weight: bold;
    color: ${({ role }) =>
      role === "USER" ? "#000" : role === "ADMIN" ? "red" : role === "SELLER" ? "green" : "blue"};
  }
  #username {
    width: 100px;
  }
  #email {
    width: 110px;
  }
  #address {
    width: 150px;
  }
  #phoneNumber {
    width: 120px;
  }
  #birth {
    width: 120px;
  }
  #gender {
    width: 60px;
    color: ${({ gender }) => (gender === "남" ? "#002fff" : "#ff0053")};
  }
  #createdAt {
    width: 100px;
    color: ${colorPalette.fontGrey};
  }
  #updatedAt {
    width: 100px;
    color: ${colorPalette.fontGrey};
  }

  :hover {
    background-color: #f7f7f7;
  }
`;

const DetailBtn = styled.button`
  height: 30px;
  padding: 2px 10px;
  font-size: 12px;
  background-color: ${colorPalette.btnBlack};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;

  :hover {
    font-weight: bold;
    background-color: ${colorPalette.hoverBlack};
  }
`;
const UpdateBtn = styled.button`
  height: 30px;
  padding: 2px 10px;
  font-size: 12px;
  background-color: ${colorPalette.btnBlue};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;

  :hover {
    font-weight: bold;
    background-color: ${colorPalette.hoverBlue};
  }
`;
const DeleteBtn = styled.button`
  height: 30px;
  padding: 2px 10px;
  font-size: 12px;
  background-color: ${colorPalette.btnRed};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;

  :hover {
    font-weight: bold;
    background-color: ${colorPalette.hoverRed};
  }
`;
