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
      <PinContainer>
        {pins.map(pin => (
          <PinComponent
            key={pin.pinId}
            // onClick={() => handlePlaylistClick(playlist.playlistId)}
            pin={pin} // 플레이리스트 정보를 전달
          />
        ))}
        {/* <PinComponent />
        <PinComponent /> */}
      </PinContainer>
    </div>
  );
};

export default PinFeed;

const PinBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 34px;
  margin-left: 34px;
  align-items: center;
`;

const PinImg = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-left: 9px;
`;

const PinNum = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 8px;
`;

const PinContainer = styled.div`
  margin-left: 32px;
`;
