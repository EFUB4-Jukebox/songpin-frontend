import react, { useEffect, useState } from "react";
import styled from "styled-components";
import albumImgExample from "../../assets/images/MyPage/album-eg.png";
import pinIcon from "../../assets/images/MyPage/vector-icon.svg";
import PinModalBox from "../common/PinModalBox";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { GenreList } from "../../constants/GenreList";
import { useNavigate } from "react-router-dom";

const PinCalendarViewComponent = ({
  title,
  artist,
  imgPath,
  listenedDate,
  placeName,
  genreName,
  songId,
  latitude,
  longitude,
  onSelectedLocation = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedCalendarDate = format(new Date(listenedDate), "yyyy.MM.dd", {
    locale: ko,
  });

  const navigate = useNavigate();
  const goMusicInfoPage = songId => {
    const path = window.location.pathname;
    const segments = path.split("/").filter(segment => segment); // 빈 문자열을 필터링

    const firstSegment = segments[0] || "";
    const secondSegment = segments[1] || "";

    const combinedSegments = secondSegment
      ? `${firstSegment}/${secondSegment}`
      : firstSegment;

    navigate(`/details-song/${songId}`, { state: `/${combinedSegments}` });
  };

  const goMapLocation = () => {
    const location = {
      lat: latitude,
      lng: longitude,
    };

    onSelectedLocation(location);
    console.log("보내는 좌표", location);
  };

  const getGenreIcon = genreName => {
    const genre = GenreList.find(item => item.EngName === genreName);
    return genre
      ? {
          imgSrc: genre.imgSrc,
          iconSrc: genre.iconSrc,
        }
      : null;
  };

  const { imgSrc, iconSrc } = getGenreIcon(genreName) || "";
  const currentIconSrc = isHovered ? iconSrc : imgSrc;

  useEffect(() => {
    console.log(listenedDate);
  }, []);

  return (
    <PinBox
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AlbumImg src={imgPath} />
      <Content>
        <TitleSection>
          <SongInfo onClick={() => goMusicInfoPage(songId)}>
            <SongTitle>
              <SongIcon src={currentIconSrc} />
              <TitleText>{title}</TitleText>
            </SongTitle>
            <Singer>{artist}</Singer>
          </SongInfo>
          <PinModalBox top="48px" right="12px" padding="31px" />
        </TitleSection>
        <Info onClick={goMapLocation}>
          <CalendarDate>{formattedCalendarDate}</CalendarDate>
          <Place>{placeName}</Place>
          <PlaceText>에서</PlaceText>
        </Info>
      </Content>
    </PinBox>
  );
};

export default PinCalendarViewComponent;

const PinBox = styled.div`
  width: 436px;
  height: 80px;
  margin: 0 33px 12px 33px;
  padding: 11px 12px 9px 12px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--offwhite, #efefef);
  position: relative;
  display: flex;
  flex-direction: row;
  /* &:hover {
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.2) 100%
      ),
      var(--offwhite, #efefef);
  } */
`;

const AlbumImg = styled.img`
  width: 78px;
  height: 78px;
  flex-shrink: 0;
  border-radius: 4px;
  margin-right: 25px;
  margin-bottom: 2px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 333px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 4px;
  justify-content: space-between;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 252px;
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

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  white-space: nowrap;
  cursor: pointer;
  padding-right: 11px;
`;

const CalendarDate = styled.div`
  overflow: hidden;
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
`;
