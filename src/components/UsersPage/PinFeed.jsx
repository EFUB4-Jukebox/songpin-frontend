import React from "react";
import styled from "styled-components";
import PinComponent from "./PinComponent";
import pinImage from "../../assets/images/MusicSearchPage/spark_122.svg";

const PinFeed = ({ pins = [], totalElements }) => {
  return (
    <div>
      <PinBox>
        <PinImg src={pinImage} alt="핀이미지" />
        <PinNum>{totalElements}</PinNum>
      </PinBox>
      {pins.length === 0 ? (
        <PinfeedEmpty>아직 추가한 핀이 없습니다.</PinfeedEmpty>
      ) : (
        <PinContainer>
          {pins.map(pin => (
            <PinComponent
              key={pin.pinId}
              // onClick={() => handlePlaylistClick(playlist.playlistId)}
              pin={pin} // 플레이리스트 정보를 전달
            />
          ))}
        </PinContainer>
      )}
    </div>
  );
};

export default PinFeed;

const PinBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  /* margin-left: 34px; */
  align-items: center;
  gap: 10px;
`;

const PinImg = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const PinNum = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PinContainer = styled.div`
  /* margin-left: 32px; */
`;
const PinfeedEmpty = styled.div`
  width: 528px;
  display: flex;
  justify-content: center;
  margin-top: 250px;
  color: var(--gray02, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;
