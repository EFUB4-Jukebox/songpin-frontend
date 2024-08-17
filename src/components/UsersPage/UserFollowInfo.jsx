import React, { useState } from "react";
import styled from "styled-components";
import UserInfo from "./UserInfo";
import { useNavigate } from "react-router-dom";
import { addFollowing, deleteFollowing } from "../../services/api/myPage";
import { getUserDetail } from "../../services/api/user";
import { getMyProfile } from "../../services/api/myPage";

// myFollowId props 전달 받아야 함
const UserFollowInfo = ({
  profileImg,
  nickname,
  handle,
  isFollowing: initialIsFollowing,
  followId,
  memberId,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const navigate = useNavigate();
  const handleFollow = async () => {
    // UI 먼저 업데이트
    setIsFollowing(prevIsFollowing => !prevIsFollowing);

    try {
      if (isFollowing) {
        const deleteFollowingId = {
          memberId: memberId,
        };
        await deleteFollowing(deleteFollowingId);
      } else {
        const addFollowingId = {
          memberId: memberId,
        };
        await addFollowing(addFollowingId);
      }
    } catch (error) {
      console.error("Error", error);
      setIsFollowing(prevIsFollowing => !prevIsFollowing);
    }
  };

  const handleUserClick = async handle => {
    try {
      // 로그인된 사용자 ID 가져오기
      const myProfile = await getMyProfile();
      const isMe = myProfile.handle === handle;

      // 프로필 정보를 가져오는 API 호출
      const userDetail = isMe ? myProfile : await getUserDetail(handle);

      // 해당 유저 페이지로 이동
      navigate(`/users/${handle}`, { state: { isMe } });
    } catch (err) {
      console.error("Error fetching user detail:", err);
    }
  };

  return (
    <UserFollowInfoBox>
      <UserInfo
        myPage={true}
        profileImg={profileImg}
        nickname={nickname}
        handle={handle}
        onClick={() => handleUserClick(handle)}
      />
      {isFollowing !== null && (
        <FollowBtn onClick={handleFollow} isFollowing={isFollowing}>
          {isFollowing ? "팔로잉" : "팔로우"}
        </FollowBtn>
      )}
    </UserFollowInfoBox>
  );
};

export default UserFollowInfo;

const UserFollowInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FollowBtn = styled.div`
  width: 100px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 43px;
  border: 1px solid var(--gray02, #747474);
  background: ${({ isFollowing }) =>
    isFollowing ? "var(--f8f8f8, #FCFCFC)" : "var(--light_black, #232323)"};
  color: ${({ isFollowing }) =>
    isFollowing ? "var(--light_black, #232323)" : "var(--f8f8f8, #FCFCFC)"};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  cursor: pointer;
`;
