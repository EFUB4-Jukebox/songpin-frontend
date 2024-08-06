import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaylistDetail } from "../../services/api/playlist";
import backArrow from "../../assets/images/UsersPage/arrow_back_ios.svg";
import pinImage from "../../assets/images/MusicSearchPage/spark_122.svg";
import shareImg from "../../assets/images/PlaylistPage/share.svg";
import PinComponent from "../../components/PlaylistPage/PinComponent";
import SideSection from "../../components/common/SideSection";
import BookmarkToggle from "../../components/PlaylistPage/BookmarkToggle";
import PlaylistModalBox from "../../components/PlaylistPage/PlaylistModalBox";
// import lock from "../../assets/images/PlaylistPage/detail_lock.svg";

const PlaylistDetailPage = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlistData, setPlaylistData] = useState(null);
  const [showSideBar, setShowSideBar] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  // const isPrivate = playlistData.visibility === "PRIVATE";

  useEffect(() => {
    const fetchPlaylistDetail = async () => {
      try {
        const data = await getPlaylistDetail(playlistId);
        setPlaylistData(data);
      } catch (error) {
        console.error("Error fetching playlist detail:", error);
      }
    };

    fetchPlaylistDetail();
  }, [playlistId]);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  if (!playlistData) {
    return <SideSection />; // 데이터 로딩 중임을 표시
  }

  return (
    <SideSection showSideBar={showSideBar}>
      <DetailContainer>
        <ContentBox>
          <BackBtn src={backArrow} onClick={handleBackClick} />
          {/* 나의 플레이리스트일때만 MoreBtn 보이도록 함  */}
          {playlistData.isMine && (
            <PlaylistModalBox top="44px" right="0px" playlistId={playlistId} />
          )}
        </ContentBox>
        <PlaylistBox>
          <BigBox imageUrl={playlistData.imgPathList[0]} />
          <SmallBoxContainer>
            <SmallBox imageUrl={playlistData.imgPathList[1]} />
            <SmallBox imageUrl={playlistData.imgPathList[2]} />
          </SmallBoxContainer>
        </PlaylistBox>
        <NameContainer>
          {/* {isPrivate && <LockImg src={lock} alt="나만보기 아이콘" />} */}
          <PlaylistName>{playlistData.playlistName}</PlaylistName>
        </NameContainer>
        <NameBox>
          <UserName>by {playlistData.creatorNickname}</UserName>
          <IconBox>
            <BookmarkToggle
              playlistId={playlistId}
              initialBookmarkId={playlistData.bookmarkId}
              color="black"
            />
            <ShareBtn src={shareImg} alt="공유 버튼" />
          </IconBox>
        </NameBox>
        <InfoBox>
          <PinBox>
            <PinImg src={pinImage} alt="핀이미지" />
            <PinNum>{playlistData.pinCount}</PinNum>
          </PinBox>
          {/* 아직 등록된 노래가 없어요 */}
          <UpdatedDate>
            최근 업데이트: {formatDate(playlistData.updatedDate)}
          </UpdatedDate>
        </InfoBox>
        <PinContainer>
          {playlistData.pinList.length > 0 ? (
            playlistData.pinList.map(pin => (
              <PinComponent
                key={pin.playlistPinId}
                pin={pin}
                selectable={false}
                buttonVisible={playlistData.isMine}
                pinId={pin.pinId}
              />
            ))
          ) : (
            <NoPin>아직 담긴 핀이 없습니다.</NoPin>
          )}
        </PinContainer>
      </DetailContainer>
    </SideSection>
  );
};

export default PlaylistDetailPage;

const DetailContainer = styled.div`
  padding: 34px;
  padding-top: 40px;
  justify-content: center;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  align-items: center;
`;

const BackBtn = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  padding-top: 5px;
  cursor: pointer;
`;

const PlaylistBox = styled.div`
  display: flex;
  overflow: hidden;
  margin-bottom: 8px;
  margin-top: 31px;
`;

const BigBox = styled.div`
  width: 310px;
  height: 310px;
  border-radius: 18px 0px 0px 18px;
  border-right: 1px solid var(--f8f8f8, #fcfcfc);
  background: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl}) no-repeat center center` : "#E7E7E7"};
  background-size: cover;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const SmallBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  height: 310px;
`;

const SmallBox = styled.div`
  width: 155px;
  height: 155px;
  background: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl}) no-repeat center center` : "#E7E7E7"};
  background-size: cover;

  &:first-child {
    /* height: 154px; */
    border-radius: 0px 18px 0px 0px;
  }
  &:last-child {
    /* height: 155px; */
    border-radius: 0px 0px 18px 0px;
  }
`;

const PlaylistName = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
  width: 464px;
  padding-left: 3px;
  margin-top: 19px;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 18px;
`;
const UserName = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ShareBtn = styled.img`
  width: 30px;
  height: 30px;
  padding-left: 13px;
  flex-shrink: 0;
  cursor: pointer;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 13px;
`;
const PinBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PinImg = styled.img`
  width: 20px;
  height: 20px;
`;

const PinNum = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: 5px;
`;

const UpdatedDate = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const PinContainer = styled.div`
  margin-top: 32px;
  /* margin-bottom: 32px; */
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LockImg = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`;

const NoPin = styled.div`
  color: var(--gray02, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  margin-top: 145px;
`;
