import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import FollowList from "../../components/UsersPage/FollowList";
import backArrow from "../../assets/images/UsersPage/arrow_back_ios.svg";
import SideSection from "../../components/common/SideSection";
import { useQuery } from "@tanstack/react-query";
import {
  getFollowerList,
  getFollowingList,
  getMyProfile,
} from "../../services/api/myPage";
import { getUserDetail } from "../../services/api/user";

const UserFollowPage = () => {
  const navigate = useNavigate();
  const handle = new URL(window.location.href).searchParams.get("handle");
  const [selectedMenu, setSelectedMenu] = useState(
    new URL(window.location.href).searchParams.get("menu"),
  );

  // const [followerList, setFollowerList] = useState([]);
  // const [followingList, setFollowingList] = useState([]);
  // const [profileData, setProfileData] = useState(null);
  const [showSideBar] = useState(true);

  // useEffect(() => {
  //   setProfileData(urlMemberId);
  //   if (urlMemberId) {
  //     // URL에서 memberId가 있으면 해당 사용자 프로필을 가져옴
  //     setProfileData({ memberId: urlMemberId }); // 직접 설정하여 API 호출
  //   } else if (data) {
  //     // URL memberId가 없으면 getMyProfile 데이터 사용
  //     setProfileData(data);
  //   }
  //   console.log("Profile Data:", profileData); // 디버깅
  // }, [urlMemberId]);

  const { data: followerData } = useQuery({
    queryKey: ["getFollowerList", handle],
    queryFn: () => getFollowerList(handle),
    enabled: selectedMenu === "followers",
  });

  const { data: followingData } = useQuery({
    queryKey: ["getFollowingList", handle],
    queryFn: () => getFollowingList(handle),
    enabled: selectedMenu === "following",
  });
  const followerList = followerData?.followList || [];
  const followingList = followingData?.followList || [];

  // useEffect(() => {
  //   const fetchFollowersOrFollowing =  () => {
  //     if (profileData) {
  //         if (selectedMenu === "followers") {
  //           const {  data: getFollower } = useQuery({
  //             queryKey: ["getFollowerList"],
  //             queryFn: getFollowerList,
  //           });
  //           const followerList = getFollower.followerList;
  //         }
  //          else {
  //           const {  data: getFollowing } = useQuery({
  //             queryKey: ["getFollowerList"],
  //             queryFn: getFollowerList,
  //           });
  //           const followingList = getFollowing.followingList;

  //         }
  //         if (!profileData.handle) {
  //           setProfileData(prev => ({ ...prev, handle: res.handle }));
  //         }
  //       }

  //   };
  //   fetchFollowersOrFollowing();
  // }, [profileData, selectedMenu]);

  // if (!profileData) return <div>데이터가 없습니다.</div>;
  // if (isError) return <div>오류 발생: {error.message}</div>;

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <SideSection showSideBar={showSideBar}>
      <ContentBox>
        <TopBox>
          <BackBtn src={backArrow} onClick={handleBackClick} />
          <UserId>{handle && `@${handle}`}</UserId>
        </TopBox>
        <MenuBox>
          <MenuText
            isSelected={selectedMenu === "followers"}
            onClick={() => setSelectedMenu("followers")}
          >
            팔로워
          </MenuText>
          <MenuText
            isSelected={selectedMenu === "following"}
            onClick={() => setSelectedMenu("following")}
          >
            팔로잉
          </MenuText>
        </MenuBox>
      </ContentBox>
      {selectedMenu === "followers" && followerList.length === 0 && (
        <NoDataMessage>팔로워가 없습니다.</NoDataMessage>
      )}
      {selectedMenu === "following" &&
        followingList &&
        followingList.length === 0 && (
          <NoDataMessage>팔로잉이 없습니다.</NoDataMessage>
        )}
      <FollowList
        followerList={followerList && followerList}
        followingList={followingList && followingList}
        selectedMenu={selectedMenu}
      />
    </SideSection>
  );
};

export default UserFollowPage;

const ContentBox = styled.div`
  padding: 34px;
  padding-top: 40px;
  padding-bottom: 0px;
  border-bottom: 1px solid var(--gray, #bcbcbc);
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const BackBtn = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  cursor: pointer;
`;

const UserId = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 166.667% */
  margin-left: 10px;
`;

const MenuText = styled.div`
  color: ${props =>
    props.isSelected ? "var(--light_black, #232323)" : "var(--gray, #BCBCBC)"};
  /* color: var(--light_black, #232323); */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 263px;
  height: 27px;
  padding-top: 22px;
  padding-bottom: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-bottom: ${props =>
    props.isSelected ? "3px solid var(--light_black, #232323)" : "none"};
`;

const MenuBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const NoDataMessage = styled.div`
  color: var(--gray, #bcbcbc);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  margin-top: 374px;
`;
