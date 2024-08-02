import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../../assets/images/MusicSearchPage/arrow_back.svg";
import location from "../../assets/images/MusicSearchPage/location_icon.svg";
import shareButton from "../../assets/images/MusicSearchPage/sharing_button.svg";
import sparkIcon from "../../assets/images/MusicSearchPage/spark_122.svg";
import PinComponent from "../../components/MusicSearchPage/PinComponent";
import SideSection from "../../components/common/SideSection";
import { getPlaceDetails } from "../../services/api/place";
import { GenreList } from "../../constants/GenreList";

const PlaceInfoPage = () => {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const [placeInfo, setPlaceInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleNavigate = () => {
    navigate("/search");
  };

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      if (placeId) {
        try {
          const res = await getPlaceDetails(placeId);
          setPlaceInfo(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPlaceDetails();
  }, [placeId]);

  const getGenreIcon = genreName => {
    const genre = GenreList.find(item => item.EngName === genreName);
    return genre ? genre.imgSrc : null;
  };

  const latestGenresrc = getGenreIcon(placeInfo?.latestGenreName) || sparkIcon;

  const formatDate = dateString => {
    const date = new window.Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  if (loading) {
    return <SideSection />; // 로딩 중
  }

  return (
    <SideSection>
      <PlaceInfo>
        <BackIcon src={backIcon} onClick={handleNavigate} />
        <PlaceDetails>
          <PlaceTitle>
            <LocationIcon src={location} />
            <Name>{placeInfo.placeName}</Name>
          </PlaceTitle>
          <SharingBtn src={shareButton} />
        </PlaceDetails>
        <LocationInfo>{placeInfo.address}</LocationInfo>
        <PinSection>
          <InfoSection>
            <PinCount>
              <PinIcon src={latestGenresrc} />
              <Num>{placeInfo.placePinCount}</Num>
            </PinCount>
            <RecentDate>
              최근 등록 일자: {formatDate(placeInfo.updatedDate)}
            </RecentDate>
          </InfoSection>
          <PinsContainer>
            {placeInfo?.songList.map(song => (
              <PinComponent
                key={song.songId}
                avgGenreName={song.avgGenreName}
                pinCount={song.pinCount}
                songInfo={song.songInfo}
              />
            ))}
          </PinsContainer>
        </PinSection>
      </PlaceInfo>
    </SideSection>
  );
};

export default PlaceInfoPage;

const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 30px 0 30px;
`;

const BackIcon = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  cursor: pointer;
  padding-left: 4px;
`;

const PlaceDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 41px;
`;

const PlaceTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const LocationIcon = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

const Name = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
`;

const SharingBtn = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  cursor: pointer;
`;

const LocationInfo = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  padding-left: 46px;
  padding-top: 8px;
`;

const PinSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PinCount = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const PinIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  padding-left: 5px;
  opacity: 0.8;
`;

const Num = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const RecentDate = styled.div`
  color: var(--gray02, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const PinsContainer = styled.div`
  padding-top: 28px;
`;
