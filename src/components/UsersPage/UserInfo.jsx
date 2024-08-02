import React, { useEffect, useState } from "react";
import styled from "styled-components";
import userLogoPop from "../../assets/images/UsersPage/user-logo-pop.svg"; //임시 유저 프로필
import { useQuery } from "@tanstack/react-query";
import { ProfileImg } from "../../constants/ProfileImg";
import { getMyProfile } from "../../services/api/myPage";

const UserInfo = ({ profileImg, nickname, handle }) => {
  const [profileUserImg, setProfileUserImg] = useState("");
  useEffect(() => {
    const profileLogoImg = ProfileImg.find(it => it.EngName === profileImg);
    setProfileUserImg(profileLogoImg.imgSrc);
  }, []);
  // const { isError, data, error } = useQuery({
  //   queryKey: ["getMyProfile"],
  //   queryFn: getMyProfile,
  // });
  // if (!data) {
  //   return <div>데이터가 없습니다.</div>;
  // }

  // if (isError) {
  //   console.error("Error fetching user info:", error);
  //   return <div>오류 발생: {error.message}</div>;
  // }
  // const profileData = data;
  // const img = ProfileImg.find(it => it.EngName === profileData.profileImg);
  // const profileImg = img ? img.imgSrc : userLogoPop; // 기본 이미지 설정
  // const nickname = profileData.nickname;
  // const handle = profileData.handle;
  return (
    <UserInfoBox>
      <UserLogo src={profileUserImg} alt="User logo pop" />
      <UserNameBox>
        <UserName>{nickname}</UserName>
        <UserId>@{handle}</UserId>
      </UserNameBox>
    </UserInfoBox>
  );
};

export default UserInfo;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  /* margin: 32px 34px; */
  align-items: center;
`;

const UserLogo = styled.img`
  width: 60px;
  height: 60px;
`;

const UserNameBox = styled.div`
  flex-direction: column;
  margin-left: 28px;
`;

const UserName = styled.div`
  color: var(--light_black, #232323);
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  height: 24px;
  margin-top: 5px;
`;

const UserId = styled.div`
  color: var(--gray02, #747474);

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  height: 24px;
`;
