import React, { useState } from "react";
import styled from "styled-components";
import { withdrawal } from "../../../services/api/myPage";
import { useNavigate } from "react-router-dom";

const MemberQuitModal = ({ onClose, setIsModalOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleInput = event => {
    setInputValue(event.target.value);
  };

  const handleQuit = async () => {
    const confirmPassword = {
      password: inputValue,
    };
    try {
      const res = await withdrawal(confirmPassword);
      console.log(res);
      if (!res.data) {
        setIsModalOpen(false);
        navigate("/");
      } else {
        setErrorMsg(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("탈퇴 처리에 실패하였습니다.");
    }
  };
  return (
    <BackGround>
      <ModalComponent>
        <Message>회원탈퇴</Message>
        <InputBox>
          <Input
            type="password"
            value={inputValue}
            onChange={handleInput}
            placeholder="비밀번호 입력"
          />
        </InputBox>
        {
          <WrongAlert>
            {errorMsg ? "비밀번호가 일치하지 않습니다." : ""}
          </WrongAlert>
        }
        <Buttons>
          <CancelBtn onClick={onClose}>
            <CancelText>취소</CancelText>
          </CancelBtn>
          <DecideBtn onClick={handleQuit}>
            <DecideText>탈퇴</DecideText>
          </DecideBtn>
        </Buttons>
      </ModalComponent>
    </BackGround>
  );
};

export default MemberQuitModal;

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 740px;
  height: 518px;
  flex-shrink: 0;
  border-radius: 19px;
  background: var(--f8f8f8, #fcfcfc);
  position: relative;
`;

const Message = styled.div`
  color: var(--light_black, #232323);
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
  margin-top: 117px;
`;

const InputBox = styled.div`
  width: 500px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid var(--gray02, #747474);
  background: var(--f8f8f8, #fcfcfc);
  margin-top: 56px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  border: none;
  outline: none;
  padding-left: 21px;
  &::placeholder {
    color: var(--gray02, #747474);
  }
`;

const WrongAlert = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  padding-top: 8px;
  width: 500px;
  text-align: right;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 36px;
  gap: 20px;
  position: absolute;
  bottom: 117px;
`;

const CancelBtn = styled.div`
  width: 240px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid var(--light_black, #232323);
  background: var(--f8f8f8, #fcfcfc);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CancelText = styled.div`
  color: var(--light_black, #232323);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const DecideBtn = styled(CancelBtn)`
  background: var(--light_black, #232323);
`;

const DecideText = styled(CancelText)`
  color: var(--f8f8f8, #fcfcfc);
`;
