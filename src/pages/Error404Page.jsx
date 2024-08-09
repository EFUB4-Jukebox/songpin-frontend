import React from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import songpinLogo from "../assets/common/songpinLogo.svg";

const Error404Page = () => {
  const navigate = useNavigate();
  const goMain = () => {
    navigate("/");
  };

  return (
    <ErrorPage>
      <SongPinLogo src={songpinLogo} />
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>페이지를 찾을 수 없습니다.</ErrorMessage>
      <Button name="메인 페이지로" onClick={goMain} active={true} />
    </ErrorPage>
  );
};
export default Error404Page;

const ErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SongPinLogo = styled.img`
  width: 336px;
  height: 115px;
  flex-shrink: 0;
  margin-top: 130px;
`;

const ErrorCode = styled.div`
  color: var(--light_black, #232323);
  text-align: center;
  font-family: Pretendard;
  font-size: 128px;
  font-style: normal;
  font-weight: 800;
  margin-top: 105px;
`;

const ErrorMessage = styled.div`
  color: var(--light_black, #232323);
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 125% */
  margin-top: 38px;
  margin-bottom: 120px;
`;
