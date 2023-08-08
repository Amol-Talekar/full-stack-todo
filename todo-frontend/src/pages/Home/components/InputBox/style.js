import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  padding: 40px;
  // margin: 0px auto;
  border: 1px solid gray;
  border-radius: 8px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  min-width: 320px;
`;

export const InputLogoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  border: 1px solid gray;
  border-radius: 4px;
  height: 100%;

  &:hover {
    border: 1px solid black;
  }
`;

export const LogoDiv = styled.div`
  max-width: 24px;
  //min-height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #16a3b7;
  border-right: 1px solid gray;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 4px;
  img {
    max-width: 100%;
    height: 100%;
  }
`;

export const Input = styled.input`
  width: 100%;
  margin: 0px auto;
  padding: 6px;
  border-radius: 4px;
  border: none;
  ::placeholder {
    font-weight: bold;
  }

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  margin: 0px auto;
  background-color: #16a3b7;
  color: white;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #128b9c;
    font-weight: bold;
  }
`;
