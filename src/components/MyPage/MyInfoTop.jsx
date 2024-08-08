import React, { useEffect } from "react";
import styled from "styled-components";
import UserInfo from "./UserInfo";
import Followers from "./Followers";
import settingIcon from "../../assets/images/MyPage/settings.svg";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/images/MusicSearchPage/arrow_back.svg";
import useMyPageClickStore from "../../store/useMyPageClickStore";
const MyInfoTop = ({
  handle,
  nickname,
  imgSrc,
  followerCount,
  followingCount,
  memberId,
}) => {
  const navigate = useNavigate();
  const goSettingsPage = () => {
    navigate("/settings");
  };
  const { myPageClick, setMyPageClick } = useMyPageClickStore();

  return (
    <MyInfo>
      <Wrapper>
        {!myPageClick && (
          <BackIcon src={backIcon} onClick={() => navigate(-1)}></BackIcon>
        )}
        <Settings src={settingIcon} onClick={goSettingsPage}></Settings>
      </Wrapper>
      <User>
        <UserInfo handle={handle} nickname={nickname} imgSrc={imgSrc} />
        <Followers
          handle={handle}
          followerCount={followerCount}
          followingCount={followingCount}
          memberId={memberId}
        />
      </User>
    </MyInfo>
  );
};

export default MyInfoTop;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackIcon = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  margin-left: 40px;
  cursor: pointer;
`;
const MyInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
`;

const Settings = styled.img`
  width: 29.141px;
  height: 30px;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  margin-left: auto;
  padding-right: 30.86px;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 42px 20px 42px;
  justify-content: space-between;
`;
