import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import {
  addFollowing,
  deleteFollowing,
  getFollowingList,
  getMyProfile,
} from "../../services/api/myPage";

const Followers = ({ userData }) => {
  const navigate = useNavigate();
  const { handle } = useParams();
  const [myHandle, setMyHandle] = useState("");
  const [isFollowing, setIsFollowing] = useState();
  const [followId, setFollowId] = useState();
  const [followerCount, setFollowerCount] = useState(userData.followerCount);
  const [followingCount, setFollowingCount] = useState(userData.followingCount);

  const handleNavigation = menu => {
    navigate(`/users/follows?menu=${menu}&handle=${userData.handle}`);
  };

  useEffect(() => {
    const checkMyHandle = async () => {
      try {
        const res = await getMyProfile();
        setMyHandle(res.handle);
      } catch (error) {
        console.error("Error fetching my profile:", error);
      }
    };
    checkMyHandle();
  }, []);

  useEffect(() => {
    if (myHandle) {
      const checkFollowing = async () => {
        const res = await getFollowingList(myHandle);
        const followingList = res.followList;
        const isFollow =
          followingList && followingList.find(it => it.handle === handle);
        console.log(followingList);
        if (isFollow) {
          setIsFollowing(true);
          setFollowId(isFollow.followId);
        }
      };
      checkFollowing();
    }
  }, [myHandle]);

  const handleFollow = async () => {
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
        setFollowId(null);
      } else {
        // 언팔로우 상태에서 팔로우 요청
        const addFollowingId = { memberId: userData.memberId };
        const res = await addFollowing(addFollowingId);
        setFollowId(res.bookmarkId); // 새로 생성된 followId를 설정
      }
    } catch (error) {
      console.error("Error", error);
      // 에러 발생 시, UI를 원래 상태로 롤백
      setIsFollowing(prev => !prev);
      setFollowerCount(prevCount => prevCount + (isFollowing ? 1 : -1));
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
  /* margin: 32px 34px; */
`;

const FollowInfoBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const FollowBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 13px;
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
