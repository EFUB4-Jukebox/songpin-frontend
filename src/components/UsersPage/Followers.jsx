import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import {
  addFollowing,
  deleteFollowing,
  getFollowingList,
  getMyProfile,
} from "../../services/api/myPage";

const Followers = ({ handlePageClick, userData }) => {
  const navigate = useNavigate();
  const { handle } = useParams();
  const [myHandle, setMyHandle] = useState("");
  const [isFollowing, setIsFollowing] = useState(userData.isFollowing);
  const [followerCount, setFollowerCount] = useState(userData.followerCount);
  const [followingCount, setFollowingCount] = useState(userData.followingCount);

  const handleNavigation = menu => {
    const isLoggedIn = localStorage.getItem("accessToken");

    if (isLoggedIn) {
      const path = window.location.pathname;
      const segments = path.split("/").filter(segment => segment); // 빈 문자열을 필터링

      const firstSegment = segments[0] || "";
      const secondSegment = segments[1] || "";

      const combinedSegments = secondSegment
        ? `${firstSegment}/${secondSegment}`
        : firstSegment;

      navigate(`/users/follows?menu=${menu}&handle=${userData.handle}`, {
        state: `/${combinedSegments}`,
      });
    } else {
      handlePageClick();
    }
  };

  const handleFollow = async () => {
    const isLoggedIn = localStorage.getItem("accessToken");
    if (isLoggedIn) {
      // 클릭 시 UI 먼저 업데이트
      setIsFollowing(prev => !prev);
      setFollowerCount(prevCount => prevCount + (isFollowing ? -1 : 1));

      try {
        if (isFollowing) {
          // 팔로우 상태에서 언팔로우 요청
          const deleteFollowingId = {
            memberId: userData.memberId,
          };
          await deleteFollowing(deleteFollowingId);
        } else {
          // 언팔로우 상태에서 팔로우 요청
          const addFollowingId = { memberId: userData.memberId };
          await addFollowing(addFollowingId);
        }
      } catch (error) {
        console.error("Error", error);
        // 에러 발생 시, UI를 원래 상태로 롤백
        setIsFollowing(prev => !prev);
        setFollowerCount(prevCount => prevCount + (isFollowing ? 1 : -1));
      }
    } else {
      handlePageClick();
    }
  };

  return (
    <FollowerComponent>
      <FollowInfoBox>
        <FollowBox onClick={() => handleNavigation("followers")}>
          <FollowNumberBox>{followerCount}</FollowNumberBox>
          <FollowTextBox>팔로워</FollowTextBox>
        </FollowBox>
        <FollowBox onClick={() => handleNavigation("following")}>
          <FollowNumberBox>{followingCount}</FollowNumberBox>
          <FollowTextBox>팔로잉</FollowTextBox>
        </FollowBox>
      </FollowInfoBox>
      <FollowBtn onClick={handleFollow} isFollowing={isFollowing}>
        {isFollowing ? "팔로잉" : "팔로우"}
      </FollowBtn>
    </FollowerComponent>
  );
};

export default Followers;

const FollowerComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FollowInfoBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const FollowBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 13px 13px 13px;
  cursor: pointer;
`;
const FollowNumberBox = styled.div`
  color: var(--light_black, #232323);
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;

const FollowTextBox = styled.div`
  color: var(--gray02, #747474);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const FollowBtn = styled.div`
  width: 159px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 30px;
  border: 1px solid var(--gray02, #747474);
  background: ${({ isFollowing }) =>
    isFollowing ? "var(--f8f8f8, #FCFCFC)" : "var(--light_black, #232323)"};
  color: ${({ isFollowing }) =>
    isFollowing ? "var(--light_black, #232323)" : "var(--f8f8f8, #FCFCFC)"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
