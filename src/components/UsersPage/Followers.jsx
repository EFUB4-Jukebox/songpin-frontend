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
  const { memberId } = useParams();
  const [myId, setMyId] = useState();
  const [isFollowing, setIsFollowing] = useState();
  const [followId, setFollowId] = useState();
  const [followerCount, setFollowerCount] = useState(userData.followerCount);
  const [followingCount, setFollowingCount] = useState(userData.followingCount);

  const handleNavigation = menu => {
    navigate(`/users/${memberId}/follows?menu=${menu}`);
  };

  useEffect(() => {
    const checkMyId = async () => {
      try {
        const res = await getMyProfile();
        setMyId(res.memberId);
      } catch (error) {
        console.error("Error fetching my profile:", error);
      }
    };
    checkMyId();
  }, []);

  useEffect(() => {
    const checkFollowing = async () => {
      const res = await getFollowingList(myId);
      const followingList = res.followingList;
      console.log(memberId);
      const isFollow =
        followingList &&
        followingList.find(it => it.memberId === Number(memberId));
      console.log(isFollow);

      if (isFollow) {
        setIsFollowing(true);
        setFollowId(isFollow.followId);
      }
    };
    checkFollowing();
  }, [myId]);

  const handleFollow = async () => {
    console.log(isFollowing);
    try {
      if (isFollowing) {
        console.log(followId);
        const res = await deleteFollowing(followId);
        console.log(res, " 팔로잉 삭제");
        setIsFollowing(!isFollowing);
        setFollowerCount(prevCount => prevCount - 1);
      } else {
        const addFollowingId = {
          targetMemberId: memberId,
        };
        const res = await addFollowing(addFollowingId);
        console.log(res, "팔로잉 추가");
        setIsFollowing(!isFollowing);
        setFollowerCount(prevCount => prevCount + 1);
      }

      console.log(followerCount, followingCount);
    } catch (error) {
      console.error("Error", error);
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
  width: 142px;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
