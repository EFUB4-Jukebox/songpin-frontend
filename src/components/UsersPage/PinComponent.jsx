import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import mapIconBallad from "../../assets/images/MusicSearchPage/flower.svg";
import mapIconBlack from "../../assets/images/MusicSearchPage/flower_black.svg";
import lock from "../../assets/images/UsersPage/lock.svg";
import { GenreList } from "../../constants/GenreList";

const PinComponent = ({ pin, onSelectedLocation = () => {} }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { songInfo = {} } = pin;
  const goSongInfo = () => {
    navigate(`/details-song/${songInfo?.songId}`);
  };

  const isPrivate = pin.visibility === "PRIVATE";
  const text =
    isPrivate && !pin.isMine
      ? "비공개인 메모입니다."
      : pin.memo || "메모가 비어 있습니다.";
  const maxLines = 2;
  const showMoreBtn = text.split("\n").length > maxLines;
  const displayText = isTruncated
    ? text.split("\n").slice(0, maxLines).join("\n")
    : text;

  const getGenreIcon = genreName => {
    const genre = GenreList.find(item => item.EngName === genreName);
    return genre
      ? { imgSrc: genre.imgSrc, iconSrc: genre.iconSrc }
      : { imgSrc: mapIconBlack, iconSrc: mapIconBallad };
  };

  const { imgSrc, iconSrc } = getGenreIcon(pin.genreName || "");
  const currentIconSrc = isHovered ? iconSrc : imgSrc;

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const goMapLocation = () => {
    const location = {
      lat: pin.latitude,
      lng: pin.longitude,
    };

    onSelectedLocation(location);
    console.log("보내는 좌표", location);
  };

  return (
    <PinBox
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TextBox>
        <SongBox onClick={goSongInfo}>
          <PinImg src={pin.songInfo.imgPath} alt="앨범 이미지" />
          <TitleBox>
            <PinTitle>
              <MapIcon src={currentIconSrc} alt="지도 아이콘" />
              <TitleText>{pin.songInfo.title}</TitleText>
            </PinTitle>
            <PinSinger>{pin.songInfo.artist}</PinSinger>
          </TitleBox>
          {/* <MoreIcon src={moreMenu} alt="더보기 아이콘" /> */}
        </SongBox>
        <ContentBox>
          <LyricText
            onClick={isTruncated && !isPrivate ? () => {} : toggleTruncation}
            isTruncated={isTruncated}
            style={{ whiteSpace: "pre-wrap" }}
            isPrivate={isPrivate}
            isMine={pin.isMine}
          >
            {isPrivate && <LockImg src={lock} alt="나만보기 아이콘" />}
            {displayText}
            {showMoreBtn && isTruncated && (
              <MoreBtn onClick={toggleTruncation}> ...더보기</MoreBtn>
            )}
          </LyricText>
          <InfoBox onClick={goMapLocation}>
            <InfoText>{formatDate(pin.listenedDate)}</InfoText>
            <PlaceText>{pin.placeName}</PlaceText>
            <InfoText>에서</InfoText>
          </InfoBox>
        </ContentBox>
      </TextBox>
    </PinBox>
  );
};

export default PinComponent;

const PinBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 462px;
  min-height: 174px;
  flex-shrink: 0;
  border-radius: 8px;

  background: var(--offwhite, #efefef);
  cursor: pointer;
  margin-bottom: 12px;
`;

const PinImg = styled.img`
  width: 60px;
  height: 60px;
  /* padding-left: 12px; */
  border-radius: 4px;
`;

const SongBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 14px;
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 11px;
  margin-top: 4px;
  width: 334px;
  height: 52px;
  flex-shrink: 0;
  justify-content: space-around;
`;
const PinTitle = styled.div`
  display: flex;
  flex-direction: row;

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
  max-width: 312px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MoreIcon = styled.img`
  width: 24px;
  height: 24px;
  padding-right: 12px;
`;

const LockImg = styled.img`
  width: 13px;
  height: 16px;
  flex-shrink: 0;
  fill: var(--gray02, #747474);

  padding-left: 3px;
  padding-right: 7px;
`;

const LyricText = styled.div`
  width: 426px;
  min-height: 48px;
  flex-shrink: 0;

  overflow: hidden;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */

  margin-top: 11px;
  cursor: ${props => (props.isTruncated ? "auto" : "pointer")};
  color: ${props =>
    (props.isPrivate && !props.isMine) || props.isEmpty
      ? "var(--gray02, #747474)"
      : "var(--light_black, #232323)"};
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 426px;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const MapIconGray = styled.img`
  width: 16px;
  height: 17.801px;
  padding-right: 8px;
`;

const InfoText = styled.div`
  color: var(--gray02, #747474);
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  padding-right: 12px;
  white-space: nowrap;
  flex-shrink: 0;
`;

const PlaceText = styled.div`
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

const MoreBtn = styled.span`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  cursor: pointer;
`;
