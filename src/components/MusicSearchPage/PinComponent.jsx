import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import mapIconBallad from "../../assets/images/MusicSearchPage/flower.svg";
import mapIconBlack from "../../assets/images/MusicSearchPage/flower_black.svg";
import mapIconGray from "../../assets/images/MusicSearchPage/flower_gray.svg";
import { GenreList } from "../../constants/GenreList";

const PinComponent = ({ songInfo, avgGenreName, pinCount }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/details-song/${songInfo?.songId}`);
  };

  const getGenreIcon = genreName => {
    const genre = GenreList.find(item => item.EngName === genreName);
    return genre
      ? {
          imgSrc: genre.imgSrc,
          iconSrc: genre.iconSrc,
          grayIconSrc: genre.imgSrc,
        }
      : {
          imgSrc: mapIconBlack,
          iconSrc: mapIconBallad,
          grayIconSrc: mapIconGray,
        };
  };

  const { imgSrc, iconSrc, grayIconSrc } = getGenreIcon(avgGenreName || "");
  const currentIconSrc = isHovered ? iconSrc : imgSrc;

  return (
    <PinBox
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigate}
    >
      <PinImg src={songInfo?.imgPath} alt="앨범 이미지" />
      <TextBox>
        <PinTitle>
          <MapIcon src={currentIconSrc} alt="지도 아이콘" />
          <TitleText>{songInfo?.title || null}</TitleText>
        </PinTitle>
        <PinSinger>{songInfo?.artist || null}</PinSinger>
        <PinTimes>
          <MapIconGray src={grayIconSrc} />
          <TimesNum>{pinCount || 0}</TimesNum>
        </PinTimes>
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
  border-radius: 4px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 15px 10px 12px;
  width: 100%;
`;

const PinTitle = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 4px;
  align-items: center;
`;

const MapIcon = styled.img`
  width: 20px;
  height: 22.252px;
  padding-right: 8px;
  /* &:hover {
    fill: #1ddfec;
  } */
`;

const TitleText = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  max-width: 284px;
  white-space: nowrap;
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
  max-width: 312px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PinTimes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const MapIconGray = styled.img`
  width: 16px;
  height: 17.801px;
  padding-right: 8px;
  opacity: 0.6;
`;

const TimesNum = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;
