import React, { useState } from "react";
import styled from "styled-components";
import mapIconBallad from "../../assets/images/MusicSearchPage/flower.svg";
import mapIconBlack from "../../assets/images/MusicSearchPage/flower_black.svg";
import mapIconGray from "../../assets/images/MusicSearchPage/flower_gray.svg";
import PinModalBox from "../common/PinModalBox";
import { useNavigate } from "react-router-dom";

const PinComponent = ({
  pin = {},
  selectable,
  buttonVisible,
  onSelect,
  pinId,
}) => {
  const [image, setImage] = useState(mapIconBlack);
  // const [isSelected, setIsSelected] = useState(false);
  const { songInfo = {} } = pin;
  const navigate = useNavigate();

  const handleClick = () => {
    if (selectable) {
      onSelect(pin.playlistPinId);
    } else {
      navigate(`/details-song/${pin.songInfo.songId}`);
    }
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <PinBox
      onClick={handleClick}
      onMouseEnter={() => setImage(mapIconBallad)}
      onMouseLeave={() => setImage(mapIconBlack)}
      bgColor={
        pin.isSelected
          ? "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), var(--offwhite, #EFEFEF)"
          : "var(--offwhite, #efefef)"
      }
    >
      <SongBox>
        <PinImg src={songInfo.imgPath} alt="앨범 이미지" />
        <TitleBox>
          <PinTitle>
            {/* 장르에 따라 아이콘 변경해야함 */}
            <MapIcon src={image} alt="장르 아이콘" />
            <TitleText>{songInfo.title}</TitleText>
            {buttonVisible && (
              <PinModalBox top="30px" right="0px" pinId={pinId} />
            )}
          </PinTitle>
          <PinSinger>{songInfo.artist}</PinSinger>
          <InfoBox>
            <InfoText>{formatDate(pin.listenedDate)}</InfoText>
            <PlaceText>{pin.placeName}</PlaceText>
            <InfoText>에서</InfoText>
          </InfoBox>
        </TitleBox>
      </SongBox>
    </PinBox>
  );
};

export default PinComponent;

const PinBox = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  width: 462px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 8px;
  /* justify-content: space-around; */

  /* background: linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), var(--offwhite, #EFEFEF); */
  /* background: var(--offwhite, #efefef); */
  background: ${({ bgColor }) => bgColor || "var(--offwhite, #efefef)"};
  cursor: pointer;
  margin-bottom: 12px;
`;

const PinImg = styled.img`
  width: 78px;
  height: 78px;
  flex-shrink: 0;
  padding-left: 12px;
  border-radius: 4px;
`;

const SongBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 11px;
  max-width: 350px;
`;

const PinTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 28px;
`;

const MapIcon = styled.img`
  width: 20px;
  height: 20.005px;
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
  width: 306px;
  height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PinSinger = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  height: 24px;
  margin-top: 4px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  white-space: nowrap;
  /* padding-right: 23px; */
  width: 350px;
`;

const InfoText = styled.div`
  color: var(--gray02, #747474);
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  white-space: nowrap;
  flex-shrink: 0;
`;

const PlaceText = styled.div`
  padding-left: 8px;
  color: var(--gray02, #747474);
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  max-width: 220px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
`;
