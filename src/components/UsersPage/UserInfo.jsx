import React, { useEffect, useState } from "react";
import styled from "styled-components";
import userLogoPop from "../../assets/images/UsersPage/user-logo-pop.svg"; //임시 유저 프로필
import { useQuery } from "@tanstack/react-query";
import { ProfileImg } from "../../constants/ProfileImg";
import { getMyProfile } from "../../services/api/myPage";

const UserInfo = ({
  memberId,
  nickname,
  handle,
  profileImg,
  isMe,
  onClick,
  fontSize,
}) => {
  const [userProfileImg, setUserProfileImg] = useState();
  useEffect(() => {
    const res = ProfileImg.find(it => it.EngName === profileImg);
    setUserProfileImg(res.imgSrc);
  }, []);

  return (
    nickname &&
    handle &&
    profileImg && (
      <UserInfoBox onClick={onClick}>
        <UserLogo src={userProfileImg} alt="User logo pop" />
        <UserNameBox>
          <UserName fontSize={fontSize}>{nickname}</UserName>
          <UserId>@{handle}</UserId>
        </UserNameBox>
      </UserInfoBox>
    )
  );
};

export default UserInfo;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  /* margin: 32px 34px; */
  align-items: center;
  cursor: pointer;
`;

const UserLogo = styled.img`
  width: 70px;
  height: 70px;
`;

const UserNameBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-left: 28px;
`;

const UserName = styled.div`
  color: var(--light_black, #232323);

  /* 본문_medium */
  font-family: Pretendard;
  font-size: ${props => props.fontSize || "20px"};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const UserId = styled.div`
  color: var(--gray02, #747474);

  /* comment */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;
