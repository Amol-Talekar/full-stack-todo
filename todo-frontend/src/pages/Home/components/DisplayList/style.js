import styled from "styled-components";

export const DisplayContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-top: 30px;
  min-width: 320px;
`;

export const DisplayButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 60px;
  margin-top: 30px;
  button {
    background-color: #16a3b7;
    border: none;
    border-radius: 8px;
    min-width: 60px;
    width: 33%;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    color: white;

    &:hover {
      background-color: #128b9c;
      font-weight: bold;
    }
  }
`;

export const TodoGroupBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  //border: 1px solid red;
`;

export const SingleTodoBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 16px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid gray;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;

  .done {
    text-decoration: line-through;
    color: red;
    font-weight: normal;
  }

  p {
    font-weight: bold;
  }
`;

export const ActionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ActionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 32px;

  img {
    max-width: 100%;
  }
`;

export const DeleteButtonsBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
  button {
    background-color: #b30000;
    width: 45%;
    border: none;
    border-radius: 8px;
    padding: 8px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: red;
    }
  }
`;
