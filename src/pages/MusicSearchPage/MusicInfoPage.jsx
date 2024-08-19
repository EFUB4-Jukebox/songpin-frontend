import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import {
  useParams,
  useLocation,
  useNavigate,
  useLoaderData,
} from "react-router-dom";
import backIcon from "../../assets/images/MusicSearchPage/arrow_back.svg";
import mapIconSparkBlack from "../../assets/images/MusicSearchPage/spark_black.svg";
import uncheckedBox from "../../assets/images/MusicSearchPage/checkbox.svg";
import checkedBox from "../../assets/images/MusicSearchPage/checkbox-oncheck.svg";
import MusicInfoPinPreview from "../../components/MusicSearchPage/MusicInfoPinPreview";
import SideSection from "../../components/common/SideSection";
import { getMySongPins, getSongDetails } from "../../services/api/song";
import { getSongPins } from "../../services/api/song";
import { GenreList } from "../../constants/GenreList";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const MusicInfoPage = ({ onSelectedLocation = () => {} }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [title, setTitle] = useState("");
  const [titleWidth, setTitleWidth] = useState(0);
  const titleRef = useRef(null);
  const { songId } = useParams();
  const [songInfo, setSongInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState([]);
  const [myPins, setMyPins] = useState([]);
  const [showSideBar, setShowSideBar] = useState(true);
  const location = useLocation();
  const [pinLoading, setPinLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const loaderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (songInfo?.title) {
      setTitle(songInfo.title);
    }
  }, [songInfo]);

  useEffect(() => {
    if (titleRef.current) {
      const width = titleRef.current.offsetWidth;
      setTitleWidth(width);
    }
  }, [title]);

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setPinLoading(true);
      await fetchMySongPins();
      setPinLoading(false);
    }
  };

  const goPreviousPage = () => {
    if (location.state) {
      navigate(location.state);
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    const fetchSongDetails = async () => {
      setLoading(true);
      if (songId) {
        try {
          const res = await getSongDetails(songId);
          setSongInfo(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchSongDetails();
  }, [songId]);

  useEffect(() => {
    const fetchSongPins = async () => {
      if (songId) {
        try {
          // setPinLoading(true);
          setPage(0);

          const pinsRes = await getSongPins({ songId, page: 0, size: 15 });

          setPins(pinsRes);
          setPage(1);
          setHasMore(pinsRes.length === 15);
        } catch (err) {
          console.error(err);
          setPins([]);
        }
      }
    };
    fetchSongPins();
  }, [songId]);

  const fetchMySongPins = async () => {
    if (songId) {
      try {
        // setPinLoading(true);
        setPage(0);

        const myPinsRes = await getMySongPins({ songId, page: 0, size: 15 });

        setMyPins(myPinsRes);
        setPage(1);
        setHasMore(myPinsRes.length === 15);
      } catch (err) {
        console.error(err);
        setMyPins([]);
      }
    }
  };

  const loadMoreResults = async () => {
    if (!hasMore || pinLoading) return;

    try {
      const data = isChecked
        ? await getMySongPins({ songId, page, size: 15 })
        : await getSongPins({ songId, page, size: 15 });

      isChecked
        ? setMyPins(prevResults => [...prevResults, ...data])
        : setPins(prevResults => [...prevResults, ...data]);
      setPage(prevPage => prevPage + 1);
      setHasMore(data.length === 15);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreResults(); // 스크롤 끝까지 내릴 때 추가 데이터 요청
        }
      },
      {
        root: null, // 기본값 viewport
        rootMargin: "100px 0px 0px 0px",
        threshold: 1.0, // 100%에서 호출
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [page, pinLoading, hasMore]);

  useEffect(() => {
    setIsChecked(false);
  }, [songId]);

  const displayedPins = isChecked ? myPins : pins;

  const getGenreIcon = genreName => {
    const genre = GenreList.find(item => item.EngName === genreName);
    return genre ? genre.strokeIconSrc : null;
  };

  const iconSrc = getGenreIcon(songInfo?.avgGenreName || null);

  const formatDate = dateString => {
    const date = new window.Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  if (loading) {
    return (
      <SideSection showSideBar={showSideBar}>
        <LoadingSpinner />
      </SideSection>
    ); // 로딩 중
  }

  return (
    <SideSection showSideBar={showSideBar} key={`${songId}-${location.key}`}>
      <MusicInfo>
        <SongInfo>
          <BackIcon src={backIcon} onClick={goPreviousPage} />
          <AlbumImg src={songInfo?.imgPath} alt="앨범 이미지" />
          <SongDetail>
            <SongTitle>
              <MapIcon src={iconSrc} alt="장르 아이콘" />
              <RotateBox
                onMouseEnter={() => {
                  if (titleWidth > 424) setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}
              >
                <TitleText ref={titleRef} isHovered={isHovered}>
                  {titleWidth > 424
                    ? `${title} ${String.fromCharCode(8195)} ${String.fromCharCode(8195)} ${title}`
                    : title}
                </TitleText>
                {titleWidth > 424 && <FadeOut />}
              </RotateBox>
            </SongTitle>
            <Singer>{songInfo?.artist}</Singer>
            <PinCount>
              <MapIconBlack src={mapIconSparkBlack} />
              <Num>{songInfo?.pinCount}</Num>
            </PinCount>
          </SongDetail>
          <PinInfo>
            <ListenedTimes>
              {songInfo?.lastListenedDate
                ? `최근 들은 날짜: ${formatDate(songInfo.lastListenedDate)}`
                : "아직 듣지 않았어요"}
            </ListenedTimes>
            <CheckMyPin>
              <CheckText>나의 핀 보기</CheckText>
              <Checkbox
                src={isChecked ? checkedBox : uncheckedBox}
                onClick={handleCheckboxChange}
              />
            </CheckMyPin>
          </PinInfo>
          {pinLoading ? (
            <></>
          ) : displayedPins.length > 0 ? (
            displayedPins.map(pin => (
              <MusicInfoPinPreview
                key={pin.pinId}
                pin={pin}
                onSelectedLocation={onSelectedLocation}
              />
            ))
          ) : (
            <NoPinMessage>아직 생성된 핀이 없습니다.</NoPinMessage>
          )}
        </SongInfo>
      </MusicInfo>
      <div ref={loaderRef} style={{ height: "5px" }}></div>
    </SideSection>
  );
};

export default MusicInfoPage;

const MusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 12px;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackIcon = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  cursor: pointer;
`;

const AlbumImg = styled.img`
  width: 462px;
  height: 450px;
  flex-shrink: 0;
  border-radius: 18px;
  margin-top: 34px;
`;

const SongDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const SongTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
  width: 462px;
`;

const MapIcon = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  padding-right: 8px;
`;

const RotateBox = styled.div`
  height: 40px;
  width: 462px;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
`;

const rotateText = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const TitleText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
  display: inline-block;
  animation: ${props => (props.isHovered ? rotateText : "none")} 9s linear
    infinite;
`;

const FadeOut = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
  width: 40px;
  background: linear-gradient(to left, white, rgba(255, 255, 255, 0));
`;

const Singer = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 11px;
  width: 462px;
`;

const PinCount = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3px;
`;

const MapIconBlack = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  opacity: 0.8;
  margin-right: 8px;
`;

const Num = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PinInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ListenedTimes = styled.div`
  color: var(--gray02, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  margin-bottom: 12px;
`;

const CheckMyPin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 28px;
`;

const CheckText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  padding-right: 8px;
`;

const Checkbox = styled.img`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  cursor: pointer;
`;

const NoPinMessage = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  padding: 126px 125px 170px 126px;
`;
