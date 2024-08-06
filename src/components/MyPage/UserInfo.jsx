import React, { useEffect, useState } from "react";
import styled from "styled-components";
import userLogoEx from "../../assets/images/MyPage/user-logo-ex.svg"; //임시 유저 프로필
import { getMyProfile } from "../../services/api/myPage";
import { ProfileImg } from "../../constants/ProfileImg";
import { useQuery } from "@tanstack/react-query";

const UserInfo = ({ myProfileData }) => {
  const [profileImg, setProfileImg] = useState();
  const [nickname, setNickname] = useState();
  const [handle, setHandle] = useState();
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

  useEffect(() => {
    if (myProfileData) {
      const img = ProfileImg.find(
        it => it.EngName === myProfileData.profileImg,
      );
      setProfileImg(img.imgSrc);
      setNickname(myProfileData.nickname);
      setHandle(myProfileData.handle);
    }
  }, []);
  return (
    <UserInfoBox>
      <UserLogo src={profileImg ? profileImg : userLogoEx} alt="User logo " />
      <UserNameBox>
        <UserName>{nickname ? nickname : ""}</UserName>
        <UserId>{handle ? `@ ${handle}` : ""}</UserId>
      </UserNameBox>
    </UserInfoBox>
  );
};

export default UserInfo;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserLogo = styled.img`
  width: 70px;
  height: 70px;
`;

const UserNameBox = styled.div`
  flex-direction: column;
  margin-left: 28px;
  margin-top: 8px;
`;

const UserName = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const UserId = styled.div`
  margin-top: 6px;
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;
