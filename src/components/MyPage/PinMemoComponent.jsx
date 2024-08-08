import react, { useEffect, useState } from "react";
import styled from "styled-components";
import albumImgExample from "../../assets/images/MyPage/album-eg.png";
import pinIcon from "../../assets/images/MyPage/vector-icon.svg";
import lockIcon from "../../assets/images/MyPage/lock.svg";
import PinModalBox from "../common/PinModalBox";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { GenreList } from "../../constants/GenreList";
import { useNavigate } from "react-router-dom";

const PinMemoComponent = ({
  songId,
  title,
  artist,
  imgPath,
  listenedDate,
  placeName,
  latitude,
  longitude,
  genreName,
  pinId,
  memo,
  visibility,
}) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };

  const text = memo || "메모가 비어 있습니다";
  const maxLines = 2;
  const showMoreBtn = text.split("\n").length > maxLines;
  const displayText = isTruncated
    ? text.split("\n").slice(0, maxLines).join("\n")
    : text;

  const navigate = useNavigate();
  const goMusicInfoPage = () => {
    navigate(`/details-song/${songId}`);
  };
  const goLocation = () => {
    // 지도 위치 이동 코드 추가
  };

  const formattedDate = format(new Date(listenedDate), "yyyy.MM.dd", {
    locale: ko,
  });

  const getGenreIcon = genreName => {
    const genre = GenreList.find(item => item.EngName === genreName);
    return genre
      ? {
          imgSrc: genre.imgSrc,
          iconSrc: genre.iconSrc,
        }
      : null;
  };

  const { imgSrc, iconSrc } = getGenreIcon(genreName || "");
  const currentIconSrc = isHovered ? iconSrc : imgSrc;

  return (
    <PinBox
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TitleSection>
        <MusicInfo>
          <AlbumImg src={imgPath} />
          <SongInfo onClick={goMusicInfoPage}>
            <SongTitle>
              <SongIcon src={currentIconSrc} />
              <TitleText>{title}</TitleText>
            </SongTitle>
            <Singer>{artist}</Singer>
          </SongInfo>
        </MusicInfo>
        <PinModalBox top="48px" right="12px" pinId={pinId} />
      </TitleSection>
      <DetailsSection>
        <Memo>
          <Text
            onClick={isTruncated ? () => {} : toggleTruncation}
            isTruncated={isTruncated}
            visibility={visibility}
            isEmpty={!memo}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {visibility === "PRIVATE" && <SecretPin src={lockIcon} />}
            {displayText}
            {showMoreBtn && isTruncated && (
              <MoreBtn onClick={toggleTruncation}> ...더보기</MoreBtn>
            )}
          </Text>
        </Memo>
        <Info onClick={goLocation}>
          <PinDate>{formattedDate}</PinDate>
          <Place>{placeName}</Place>
          <PlaceText>에서</PlaceText>
        </Info>
      </DetailsSection>
    </PinBox>
  );
};

export default PinMemoComponent;

const PinBox = styled.div`
  margin: 0 33px 12px 33px;
  padding: 15px 12px 15px 14px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--offwhite, #efefef);
  position: relative;
  width: 436px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 433px;
  justify-content: space-between;
`;

const MusicInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const AlbumImg = styled.img`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 4px;
  margin-top: 1px;
  margin-right: 12px;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

const SongTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const SongIcon = styled.img`
  width: 20px;
  height: 20.005px;
  flex-shrink: 0;
`;

const TitleText = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 306px;
`;

const Singer = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  padding-top: 4px;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 9px;
  padding-right: 9px;
`;

const Memo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  cursor: ${props => (props.isTruncated ? "auto" : "pointer")};
  width: 426px;
  min-height: 27px;
  color: ${props =>
    props.visibility === "PRIVATE" || props.isEmpty
      ? "var(--gray02, #747474)"
      : "#000"};
`;

const SecretPin = styled.img`
  width: 13px;
  height: 16px;
  flex-shrink: 0;
  padding-right: 8px;
  padding-left: 3px;
  vertical-align: calc(-12%);
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

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 4px;
  white-space: nowrap;
  cursor: pointer;
`;

const PinDate = styled.div`
  color: var(--gray02, #747474);
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const Place = styled.div`
  color: var(--gray02, #747474);
  text-align: right;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  max-width: 218px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  padding-left: 8px;
`;

const PlaceText = styled.div`
  color: var(--gray02, #747474);
  text-align: right;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  white-space: nowrap;
  flex-shrink: 0;
  padding-right: 2px;
`;
