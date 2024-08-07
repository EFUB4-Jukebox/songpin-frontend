import React from "react";
import styled from "styled-components";

const PinComponent = ({ onPinClick, imgPath, title, artist }) => {
  return (
    <PinBox onClick={onPinClick}>
      <PinImg src={imgPath} alt="앨범 이미지" />
      <TextBox>
        <PinTitle>
          <TitleText>{title}</TitleText>
        </PinTitle>
        <PinSinger>{artist}</PinSinger>
      </TextBox>
    </PinBox>
  );
};

export default PinComponent;

const PinBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 462px;
  height: 100px;
  border-radius: 8px;
  background: var(--offwhite, #efefef);
  cursor: pointer;
  margin-bottom: 12px;
  &:active {
    border-radius: 8px;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.2) 100%
      ),
      var(--offwhite, #efefef);
  }
`;

const PinImg = styled.img`
  width: 78px;
  height: 78px;
  margin: 11px;
  margin-left: 12px;
  border-radius: 8px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 15px 10px 16px;
  width: 100%;
  height: 78px;
  overflow: hidden;
`;

const PinTitle = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 4px;
  align-items: center;
`;

const TitleText = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  max-height: 48px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PinSinger = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  max-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
