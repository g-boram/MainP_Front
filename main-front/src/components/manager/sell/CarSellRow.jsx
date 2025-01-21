import styled from "@emotion/styled";
import formatDateByHyphen from "../../../utils/formatDate";
import Spacing from "../../shared/Spacing";
import { colorPalette } from "../../../styles/colorPalette";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber } from "../../../utils/formatNumber";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { deleteUser } from "../../../api/userApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { SELLER_STATUS } from "../../../constants/carOption";

export default function CarSellRow(carSellData) {
  const navigate = useNavigate();
  const { open } = useAlertContext();
  const { user } = useSelector((state) => state.auth);
  const {
    id,
    orderUserId,
    username,
    sellerId,
    phone,
    email,
    color,
    mileage,
    time,
    region,
    price,
    notes,
    createdAt,
    orderStatus,
  } = carSellData;

  // 진행 상태값
  const status = SELLER_STATUS.find((item) => item.value === orderStatus);
  const confirmDeleteUser = () => {
    open({
      title: "회원삭제",
      description: "회원정보를 삭제 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleDelete(),
    });
  };

  const handleDetail = () => {};

  const handleDelete = async () => {
    try {
      // await deleteUser(userId);
      toast.success("회원정보 삭제 완료.");
      navigate(0);
    } catch (err) {
      console.log(err);
      toast.error("삭제 실패! 관리자 문의 바랍니다.");
    }
  };

  return (
    <UserRowWrapper gender={orderStatus}>
      <div id="no">{id}</div>
      <div id="orderUserId">{orderUserId}</div>
      <div id="username">{username}</div>
      <div id="sellerId">{sellerId === null ? "미지정" : sellerId}</div>
      <div id="phone">{formatPhoneNumber(phone)}</div>
      <div id="email">{email}</div>
      {/* <div id="color">{color}</div> */}
      <div id="orderStatus">{status ? status.label : ""}</div>
      {/* <div id="mileage">{mileage}</div> */}
      <div id="time">{time}</div>
      <div id="region">{region}</div>
      {/* <div id="price">{price}</div> */}
      {/* <div id="notes">{notes}</div> */}
      {/* <div id="createdAt">{createdAt}</div> */}
      <div id="btnBox">
        <DetailBtn onClick={handleDetail}>상세보기</DetailBtn>
        <CallBtn onClick={() => {}}>전화하기</CallBtn>
        <MailBtn onClick={() => {}}>메일전송</MailBtn>
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
    text-overflow: hidden;
    gap: 3px;
  }

  #no {
    width: 50px;
  }
  #orderUserId {
    width: 70px;
    font-weight: bold;
    /* color: ${({ role }) =>
      role === "USER" ? "#000" : role === "ADMIN" ? "red" : role === "SELLER" ? "green" : "blue"}; */
  }
  #username {
    width: 90px;
  }
  #sellerId {
    width: 90px;
  }
  #phone {
    width: 100px;
    justify-content: flex-start;
  }
  #email {
    width: 110px;
  }
  #color {
    width: 120px;
  }
  #mileage {
    width: 80px;
  }
  #time {
    width: 80px;
  }
  #region {
    width: 80px;
  }
  #price {
    width: 80px;
  }
  #notes {
    width: 80px;
  }
  #orderStatus {
    width: 80px;
    color: ${({ orderStatus }) => (orderStatus === "남" ? "#002fff" : "#ff0053")};
  }
  #createdAt {
    width: 80px;
    color: ${colorPalette.fontGrey};
  }
  #btnBox {
    width: 100px;
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
const CallBtn = styled.button`
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
const MailBtn = styled.button`
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
