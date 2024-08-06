import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import MyInfoTop from "../../components/MyPage/MyInfoTop";
import PinFeed from "../../components/MyPage/PinFeed";
import MyPlaylists from "../../components/MyPage/MyPlaylists";
import Bookmarks from "../../components/MyPage/Bookmarks";
import SideSection from "../../components/common/SideSection";
import spinner from "../../assets/common/spinner.svg";
import {
  getMyPinFeed,
  getMyPlaylist,
  getMyPlaylistBookmark,
  getMyProfile,
} from "../../services/api/myPage";

const spin = keyframes`
  0% {

    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

const MyPage = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [clickedPage, setClickedPage] = useState(
    localStorage.getItem("clickedPage") || "pinfeed",
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myPinFeedData, setMypinFeedData] = useState();
  const [myPlaylistData, setMyPlaylistData] = useState();
  const [myBookmarkData, setMyBookmarkData] = useState();
  const [myProfileData, setMyProfileData] = useState();

  const handlePageClick = page => {
    setClickedPage(page);
  };

  useEffect(() => {
    localStorage.setItem("clickedPage", clickedPage);
  }, [clickedPage]);

  useEffect(() => {
    const savedPage = localStorage.getItem("clickedPage");
    if (savedPage) {
      setClickedPage(savedPage);
    }
  }, []);

  useEffect(() => {
    const getMyFeed = async () => {
      try {
        const res = await getMyPinFeed();
        const res2 = await getMyPlaylist();
        const res3 = await getMyPlaylistBookmark();
        const profileData = await getMyProfile();
        console.log(res);
        console.log(res2);
        console.log(res3);
        console.log(profileData);

        if (res && res2 && res3 && profileData) {
          setMypinFeedData(res);
          setMyPlaylistData(res2);
          setMyBookmarkData(res3);
          setMyProfileData(profileData);
        }
      } catch (error) {
        console.log("데이터 불러오기에 실패했습니다.", error);
      }
    };
    getMyFeed();
  }, []);

  return (
    <SideSection showSideBar={showSideBar}>
      {myPinFeedData ? (
        <>
          <MyInfoTop myProfileData={myProfileData && myProfileData} />
          <TopBar>
            <PageSelect>
              <PageItem
                onClick={() => handlePageClick("pinfeed")}
                isActive={clickedPage === "pinfeed"}
              >
                핀 피드
              </PageItem>
              <PageItem
                onClick={() => handlePageClick("playlist")}
                isActive={clickedPage === "playlist"}
              >
                플레이리스트
              </PageItem>
              <PageItem
                onClick={() => handlePageClick("bookmark")}
                isActive={clickedPage === "bookmark"}
              >
                북마크
              </PageItem>
            </PageSelect>
            <Line />
          </TopBar>
          {clickedPage === "playlist" && (
            <MyPlaylists myPlaylistData={myPlaylistData && myPlaylistData} />
          )}
          {clickedPage === "bookmark" && (
            <Bookmarks myBookmarkData={myBookmarkData && myBookmarkData} />
          )}
          {clickedPage === "pinfeed" && (
            <PinFeed myPinFeedData={myPinFeedData && myPinFeedData} />
          )}
        </>
      ) : (
        <Loading>
          데이터를 로딩중입니다.
          <Spinner src={spinner} />
        </Loading>
      )}
    </SideSection>
  );
};

export default MyPage;

// const MyPageContainer = styled.div`
//   position: relative;
// `;

// const ChosenPage = styled.div`
//   position: relative;
//   top: -636px;
//   right: -81px;
//   width: 700px;
//   height: calc(100vh - 308px);
//   overflow-y: auto;
//   overflow-x: hidden;
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  align-items: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  gap: 20px;
`;

const Spinner = styled.img`
  width: 50px;
  height: 50px;
  animation: ${spin} 1s infinite;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageSelect = styled.div`
  display: flex;
  flex-direction: row;
  gap: 36px;
  padding-left: 41px;
`;

const PageItem = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  padding: 6px;
  padding-bottom: 9px;
  ${props =>
    props.isActive && "border-bottom: 3px solid var(--light_black, #232323);"}
`;

const Line = styled.div`
  width: 528px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--gray, #bcbcbc);
`;
