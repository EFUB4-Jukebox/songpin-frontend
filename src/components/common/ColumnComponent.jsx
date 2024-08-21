import React, { useState } from "react";
import styled from "styled-components";

const ColumnComponent = (alarm ={}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  const goToProfile = (handle) => {
    if(handle){
      window.location.href = `/users/${handle}`;
    }
  };

  const formatTimeAgo = (time) => {
    const now = new Date();
    const alarmDate = new Date(time);
    const diff = Math.floor((now - alarmDate) / 1000);

    if (diff < 60) {
      return `${diff}초 전`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)}분 전`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)}시간 전`;
    } else {
      return `${Math.floor(diff / 86400)}일 전`;
    }
  };

  const formattedTime = formatTimeAgo(alarm.time);
  
  return (
    <Column onClick={handleClick} isClicked={isClicked} read={alarm.read}>
      <Alarm isClicked={isClicked} read={alarm.read} onClick={() => goToProfile(alarm.handle)}>
        {alarm.message}
      </Alarm>
      <Time>{formattedTime}</Time>
    </Column>
  );
};

export default ColumnComponent;

const Column = styled.div`
  display: flex;
  width: 362px;
  padding: 12px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  max-height: 76px;
  min-height: 52px;
  padding-right: 34px;
  padding-left: 34px;
  cursor: pointer;
  background: ${props =>
    props.read ? "var(--offwhite, #EFEFEF)" : "var(--f8f8f8, #FCFCFC)"};
`;

const Alarm = styled.div`
  color: ${props =>
    props.read
      ? " var(--gray02, #747474)"
      : "var(--light_black, #232323)"};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Time = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;
