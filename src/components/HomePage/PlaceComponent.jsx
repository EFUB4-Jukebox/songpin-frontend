import React from "react";
import styled from "styled-components";
import mapIconSpark from "../../assets/images/MusicSearchPage/spark_gray.svg";
import { ReactComponent as LocationMark } from "../../assets/images/HomePage/location_on.svg";
import { useNavigate } from "react-router-dom";

const PlaceComponent = (place = {}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/details-place/${place.id}`);
  };

  return (
    <PlaceBox onClick={handleNavigate}>
      <Mark>
        <LocationMark />
      </Mark>
      <PlaceName>{place.name}</PlaceName>
      <PinTimes>
        <MapIcon src={mapIconSpark} />
        <TimesNum>{place.cnt}</TimesNum>
      </PinTimes>
    </PlaceBox>
  );
};

export default PlaceComponent;

const PlaceBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 462px;
  height: 72px;
  border-radius: 8px;
  background: var(--offwhite, #efefef);
  flex-shrink: 0;
  margin-bottom: 12px;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  cursor: pointer;
`;

const Mark = styled.div`
  margin-left: 18.15px;
  margin-right: 8.44px;
`;

const PlaceName = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 320px;
`;

const PinTimes = styled.div`
  display: flex;
  flex-direction: row;
`;

const MapIcon = styled.img`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-right: 8px;
`;

const TimesNum = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;
