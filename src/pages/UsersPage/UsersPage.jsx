import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserDetail,
  getUserPlaylists,
  getUserPins,
  getUserFollowers,
  getUserFollowings,
} from "../../services/api/user";
import UserInfo from "../../components/UsersPage/UserInfo";
import Followers from "../../components/UsersPage/Followers";
import backArrow from "../../assets/images/UsersPage/arrow_back_ios.svg";
import PinFeed from "../../components/UsersPage/PinFeed";
import PlaylistFeed from "../../components/UsersPage/PlaylistFeed";
import SideSection from "../../components/common/SideSection";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import UserModalBox from "../../components/UsersPage/UserModalBox";

const UsersPage = ({ onSelectedLocation = () => {} }) => {
  const { handle } = useParams();
  const [userData, setUserData] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [playlistCount, setPlaylistCount] = useState(0);
  const [pins, setPins] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState("pinFeed");
  const [followersData, setFollowersData] = useState(null);
  const [followingsData, setFollowingsData] = useState(null);
  const [showSideBar, setShowSideBar] = useState(true);
  const [isMyFollower, setIsMyFollower] = useState();
  const [userId, setUserId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserDetail(handle);
        console.log(response);
        setUserData(response.data);

        setIsMyFollower(response.data.isFollower);
        setUserId(response.data.memberId);
        // 타 유저 플레이리스트 가져오기
        const playlistsResponse = await getUserPlaylists(handle);
        setPlaylists(playlistsResponse.playlistList); // 플레이리스트 상태 업데이트
        setPlaylistCount(playlistsResponse.playlistCount);

        //타유저 핀피드 가져오기
        const pinsResponse = await getUserPins(handle);
        setPins(pinsResponse.pinFeedList);
        setTotalElements(pinsResponse.totalElements);

        const followersResponse = await getUserFollowers(handle); // 추가된 API 호출
        setFollowersData(followersResponse);

        const followingsResponse = await getUserFollowings(handle); // 추가된 API 호출
        setFollowingsData(followingsResponse);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [handle]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <SideSection showSideBar={showSideBar}>
      {userData &&
      pins &&
      playlists &&
      (totalElements === 0 || totalElements) &&
      (playlistCount === 0 || playlistCount) ? (
        <>
          <ContentBox>
            <BackBtn src={backArrow} onClick={handleBackClick} />
            <UserModalBox isMyFollower={isMyFollower} userId={userId} />
          </ContentBox>
          <ContentBox2>
            {userData && (
              <>
                <UserInfo
                  nickname={userData.nickname}
                  handle={userData.handle}
                  profileImg={userData.profileImg}
                />
                <Followers myFollowId={userData.followId} userData={userData} />
              </>
            )}
          </ContentBox2>
          <ContentBox>
            <MenuBox>
              <MenuText
                isSelected={selectedMenu === "pinFeed"}
                onClick={() => setSelectedMenu("pinFeed")}
              >
                핀 피드
              </MenuText>
              <MenuText
                isSelected={selectedMenu === "playlist"}
                onClick={() => setSelectedMenu("playlist")}
              >
                플레이리스트
              </MenuText>
            </MenuBox>
          </ContentBox>
          <Line />
          <FeedBox>
            {selectedMenu === "pinFeed" ? (
              <PinFeed
                totalElements={totalElements}
                pins={pins}
                onSelectedLocation={onSelectedLocation}
              />
            ) : (
              <PlaylistFeed
                playlistCount={playlistCount}
                playlists={playlists}
              />
            )}
          </FeedBox>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </SideSection>
  );
};

export default UsersPage;

const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding-left: 41px;
  padding-right: 34px;
  padding-top: 40px;

  align-items: center;
`;
const ContentBox2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding-left: 42px;
  padding-right: 34px;
  padding-top: 15px;

  align-items: center;
`;
const BackBtn = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  cursor: pointer;
`;

const MenuText = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-right: 28px;
  padding-bottom: 9px;
  padding-left: 7px;
  padding-right: 7px;
  cursor: pointer;
  border-bottom: ${props =>
    props.isSelected ? "3px solid var(--light_black, #232323)" : "none"};
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 9px;
`;
const Line = styled.div`
  width: 528px;
  height: 1px;
  background: var(--gray, #bcbcbc);
`;

const FeedBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 30px;
  align-items: center;
`;
