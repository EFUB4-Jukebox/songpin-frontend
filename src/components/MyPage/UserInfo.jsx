import React, { useEffect, useState } from "react";
import styled from "styled-components";
import userLogoEx from "../../assets/images/MyPage/user-logo-ex.svg"; //임시 유저 프로필
import { ProfileImg } from "../../constants/ProfileImg";

const UserInfo = ({ handle, nickname, imgSrc }) => {
  const [profileImg, setProfileImg] = useState();
  const [userNickname, setUserNickname] = useState();
  const [userHandle, setUserHandle] = useState();
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
    if (handle && nickname && imgSrc) {
      const img = ProfileImg.find(it => it.EngName === imgSrc);
      setProfileImg(img.imgSrc);
      setUserNickname(nickname);
      setUserHandle(handle);
    }
  }, []);
  return (
    <UserInfoBox>
      <UserLogo src={profileImg ? profileImg : userLogoEx} alt="User logo " />
      <UserNameBox>
        <UserName>{userNickname ? userNickname : ""}</UserName>
        <UserId>{userHandle ? `@${userHandle}` : ""}</UserId>
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
