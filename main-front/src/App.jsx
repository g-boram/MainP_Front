import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// import PrivateRoute from "./components/auth/PrivateRoute";
// import MyPage from "./pages/user/MyPage";
import HomePage from "./pages/HomePage";
import CarPage from "./pages/user/car/CarPage";
import SigninPage from "./pages/user/SigninPage";
import SignupPage from "./pages/user/SignupPage";
import NoticePage from "./pages/user/board/NoticePage";
import NoticeDetailPage from "./pages/user/board/NoticeDetailPage";
import ChatBot from "./components/ai/ChatBot";
import MyCarSellPage from "./pages/user/car/MyCarSellPage";
import CarSellEstimate from "./pages/user/car/CarSellEstimate";
import UserCarinfor from "./pages/user/car/UserCarinfor";
import CarSellPage from "./pages/user/car/CarSellPage";

// [ 관리자 ]
import ManagerPage from "./pages/manager/ManagerPage";
import M_NoticePage from "./pages/manager/board/M_NoticePage";
import M_NoticeCreatePage from "./pages/manager/board/M_NoticeCreatePage";
import MyPage from "./pages/user/MyPage";
import M_NoticeDetailPage from "./pages/manager/board/M_NoticeDetailPage";
import M_NoticeUpdatePage from "./pages/manager/board/M_NoticeUpdatePage";
import EventPage from "./pages/user/board/EventPage";
import EventDetailPage from "./pages/user/board/EventDetailPage";
import ScrollToTop from "./components/shared/ScrollToTop";
import M_CarPage from "./pages/manager/car/M_CarPage";
import M_CarCreatePage from "./pages/manager/car/M_CarCreatePage";
import M_CarDetailPage from "./pages/manager/car/M_CarDetailPage";
import M_CarUpdatePage from "./pages/manager/car/M_CarUpdatePage";
import CarDetailPage from "./pages/user/car/CarDetailPage";
import M_UsersPage from "./pages/manager/users/M_UsersPage";
import M_UsersDetailPage from "./pages/manager/users/M_UsersDetailPage";
import M_UsersCreatePage from "./pages/manager/users/M_UsersCreatePage";
import M_UsersUpdatePage from "./pages/manager/users/M_UsersUpdatePage";
import FaQPage from "./pages/user/board/FaQPage";
import FaQDetailPage from "./pages/user/board/FaQDetailPage";
import M_RepairPage from "./pages/manager/repair/M_RepairPage";
import M_RepairCreatePage from "./pages/manager/repair/M_RepairCreatePage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        limit={3}
      />
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap");
          body {
            margin: 0;
            padding: 0;
            font-family: "Nanum Gothic Coding", monospace;
            color: #333;
            line-height: 1.6;
          }
          * {
            box-sizing: border-box;
          }
        `}
      />
      <ScrollToTop />
      <Header />
      <LayoutContainer>
        <ChatBot />
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" Component={HomePage} />
          <Route path="/signin" Component={SigninPage} />
          <Route path="/signup" Component={SignupPage} />
          <Route path="/mypage" Component={MyPage} />
          <Route path="/board/notice" Component={NoticePage} />
          <Route path="/board/event" Component={EventPage} />
          <Route path="/board/faq" Component={FaQPage} />
          <Route path="/board/notice/detail/:id" Component={NoticeDetailPage} />
          <Route path="/board/event/detail/:id" Component={EventDetailPage} />
          <Route path="/board/faq/detail/:id" Component={FaQDetailPage} />
          <Route path="/car" Component={CarPage} />
          <Route path="/car/detail" Component={CarDetailPage} />
          <Route path="/mycarsellpage" Component={MyCarSellPage} />
          <Route path="/carsellestimate" Component={CarSellEstimate} />
          <Route path="/usercarinfor" Component={UserCarinfor}/>
          <Route path="/carsell" Component={CarSellPage}/>

          

          {/* 관리자 페이지 */}
          <Route path="/manager" Component={ManagerPage} />
          <Route path="/manager/board/notice" Component={M_NoticePage} />
          <Route path="/manager/board/notice/create" Component={M_NoticeCreatePage} />
          <Route path="/manager/board/notice/detail" Component={M_NoticeDetailPage} />
          <Route path="/manager/board/notice/update" Component={M_NoticeUpdatePage} />
          <Route path="/manager/car" Component={M_CarPage} />
          <Route path="/manager/car/create" Component={M_CarCreatePage} />
          <Route path="/manager/car/detail" Component={M_CarDetailPage} />
          <Route path="/manager/car/update" Component={M_CarUpdatePage} />
          <Route path="/manager/users" Component={M_UsersPage} />
          <Route path="/manager/users/create" Component={M_UsersCreatePage} />
          <Route path="/manager/users/detail" Component={M_UsersDetailPage} />
          <Route path="/manager/users/update" Component={M_UsersUpdatePage} />
          <Route path="/manager/repair" Component={M_RepairPage} />
          <Route path="/manager/repair/create" Component={M_RepairCreatePage} />
          <Route path="/manager/repair/update" Component={M_RepairPage} />
          <Route path="/manager/repair/delete" Component={M_RepairPage} />

          {/* @TODO: 인증이 필요한 페이지 나누기 ex) 관리자,유저의 등급, 로그인 여부 ... */}
          {/* <Route path="/my" element={
                  <PrivateRoute>
                    <MyPage />
                  </PrivateRoute>
                  }
                /> */}
        </Routes>
        <Footer />
      </LayoutContainer>
    </BrowserRouter>
  );
}

const LayoutContainer = styled.div`
  position: relative;
  /* max-width: 1400px; */
  height: 100vh;
  margin: 0 auto;
  padding: 0;

  @media (max-width: 600px) {
    min-width: 100vw;
  }
  @media (min-width: 600px) {
    /* max-width: 1400px; */
  }
`;

export default App;
