import styled from "@emotion/styled";

export const ManagerContainer = styled.div`
  min-height: 100vh;
  display: flex;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const ContentBox = styled.div`
  width: 100%;
  max-height: 800px;
  display: flex;
  flex-direction: column;
`;

export const NavRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(77, 77, 77, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const ErrorOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const ErrorBox = styled.div`
  height: 150px;
  width: 300px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

export const ErrorText = styled.div`
  font-size: 12px;
  color: #000;
  overflow-x: "hidden";
`;
