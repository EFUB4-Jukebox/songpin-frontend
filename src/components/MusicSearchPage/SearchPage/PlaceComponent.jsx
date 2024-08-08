import React from "react";
import styled from "styled-components";
import mapIconSpark from "../../../assets/images/MusicSearchPage/spark_gray.svg";
import { useNavigate } from "react-router-dom";

const PlaceComponent = ({ placeId, placeName, placePinCount }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/details-place/${placeId}`);
  };

  return (
    <PlaceBox onClick={handleNavigate}>
      <Content>
        <PlaceName>{placeName}</PlaceName>
        <PinTimes>
          <MapIcon src={mapIconSpark} />
          <TimesNum>{placePinCount}</TimesNum>
        </PinTimes>
      </Content>
      <Line />
    </PlaceBox>
  );
};

export default PlaceComponent;

const PlaceBox = styled.div`
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Content = styled.div`
  display: flex;
  width: 466px;
  padding: 32px 7px;
  justify-content: space-between;
  align-items: center;
  opacity: 0.8;
`;

const PlaceName = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PinTimes = styled.div`
  display: flex;
  flex-direction: row;
`;

const MapIcon = styled.img`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-right: 4px;
`;

const TimesNum = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const Line = styled.div`
  width: 480px;
  height: 1px;
  background: var(--gray, #bcbcbc);
`;
