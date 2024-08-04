import { useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const CompleteLogin = ({ setCompleteLogin }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setCompleteLogin(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [setCompleteLogin]);

  const gotoHomePage = () => {
    navigate("/home");
  };

  return (
    <Wrapper>
      <CompleteWrapper ref={modalRef}>
        <div className="welcomeText">환영해요!</div>
        <div className="completeMsg">회원가입이 완료되었어요</div>
        <Button active="true" name="음악지도 보러가기" onClick={gotoHomePage} />
      </CompleteWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CompleteWrapper = styled.div`
  width: 621px;
  height: 396px;
  flex-shrink: 0;
  border-radius: 18px;
  background: var(--offwhite_, #fcfcfc);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  .welcomeText {
    color: var(--light_black, #232323);
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px; /* 125% */
  }
  .completeMsg {
    color: var(--light_black, #232323);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 28px */
    margin-bottom: 46px;
  }
`;
export default CompleteLogin;
