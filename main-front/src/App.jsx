import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";

// import PrivateRoute from "./components/auth/PrivateRoute";
// import MyPage from "./pages/user/MyPage";
import HomePage from "./pages/HomePage";
import ManagerPage from "./pages/manager/ManagerPage";
import SigninPage from "./pages/user/SigninPage";
import SignupPage from "./pages/user/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <LayoutContainer>
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" Component={HomePage} />
          <Route path="/signin" Component={SigninPage} />
          <Route path="/signup" Component={SignupPage} />

          {/* 관리자 페이지 */}
          <Route path="/manager" Component={ManagerPage} />

          {/* @TODO: 인증이 필요한 페이지 나누기 ex) 관리자,유저의 등급, 로그인 여부 ... */}
          {/* <Route path="/my" element={
                  <PrivateRoute>
                    <MyPage />
                  </PrivateRoute>
                  }
                /> */}
        </Routes>
      </LayoutContainer>
    </BrowserRouter>
  );
}

const LayoutContainer = styled.div`
  max-width: 1400px;
  height: 100vh;
  margin: 0 auto;
  padding: 0;

  @media (max-width: 600px) {
    min-width: 100vw;
  }
  @media (min-width: 600px) {
    max-width: 1400px;
  }
`;

export default App;
