import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SideSection from "../../components/common/SideSection";
import backIcon from "../../assets/images/MusicSearchPage/arrow_back.svg";
import userLogoPop from "../../assets/images/MyPage/user-logo-pop.svg"; //임시 유저 프로필
import OpenQuitModal from "../../components/common/Modal/MemberQuitModal";
import { postLogout } from "../../services/api/auth";
import { getMyProfile } from "../../services/api/myPage";
import { useQuery } from "@tanstack/react-query";
import { ProfileImg } from "../../constants/ProfileImg";
import GotoPwResetModal from "../../components/AuthPage/GotoPwResetModal";

const SettingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const [pwResetModal, setPwResetModal] = useState(false);
  const handleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const handleQuitBtn = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const navigate = useNavigate();

  const goMyPage = () => {
    navigate("/mypage");
  };
  const goEditPage = () => {
    navigate("/edit");
  };
  const goPwEditPage = () => {
    setPwResetModal(true);
  };

  const onLogout = async () => {
    try {
      await postLogout();
    } finally {
      window.location.replace("/");
    }
  };

  const { isError, data, error } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
  });
  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  if (isError) {
    console.error("Error fetching user info:", error);
    return <div>오류 발생: {error.message}</div>;
  }
  const profileData = data;
  const img = ProfileImg.find(it => it.EngName === profileData.profileImg);
  const profileImg = img ? img.imgSrc : userLogoPop; // 기본 이미지 설정
  const nickname = profileData.nickname;
  const handle = profileData.handle;

  return (
    <>
      <SideSection showSideBar={showSideBar}>
        <SettingComponent>
          <BackIcon src={backIcon} onClick={goMyPage} />
          <UserInfoBox>
            <UserInformation>
              <UserLogo src={profileImg} alt="User logo pop" />
              <UserNameBox>
                <UserName>{nickname}</UserName>
                <UserMail>@{handle}</UserMail>
              </UserNameBox>
            </UserInformation>
            <ProfileEditBtn onClick={goEditPage}>프로필 편집</ProfileEditBtn>
          </UserInfoBox>
          <ClickBtnsSection>
            <Button onClick={goPwEditPage}>비밀번호 재설정</Button>
            <Button onClick={onLogout}>로그아웃</Button>
            <Button onClick={handleModal}>회원탈퇴</Button>
            {isModalOpen && (
              <OpenQuitModal
                setIsModalOpen={setIsModalOpen}
                onClose={handleModal}
                onQuit={handleQuitBtn}
              />
            )}
          </ClickBtnsSection>
        </SettingComponent>
      </SideSection>
      {pwResetModal && <GotoPwResetModal setPwResetModal={setPwResetModal} />}
    </>
  );
};

export default SettingsPage;

const SettingComponent = styled.div`
  padding: 40px 34px 0 43px;
  /* padding-top: 36px; */
  display: flex;
  flex-direction: column;
`;

const BackIcon = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  cursor: pointer;
`;

const UserInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 31px;
`;

const UserInformation = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserLogo = styled.img`
  width: 70px;
  height: 70px;
`;

const UserNameBox = styled.div`
  display: flex;
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

const UserMail = styled.div`
  margin-top: 6px;
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const ProfileEditBtn = styled.div`
  color: var(--gray03, #5f5f5f);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  cursor: pointer;
  margin-top: 8px;
`;

const ClickBtnsSection = styled.div`
  padding-top: 72px;
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const Button = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  cursor: pointer;
`;
