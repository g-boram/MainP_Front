import styled from "@emotion/styled";

export default function BoardPage() {
  return (
    <BoardContainer>
      <h1>ManagerPage</h1>
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  height: 100%;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: pink;
`;
