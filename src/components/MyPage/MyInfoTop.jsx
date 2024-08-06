import React from "react";
import styled from "styled-components";
import UserInfo from "./UserInfo";
import Followers from "./Followers";
import settingIcon from "../../assets/images/MyPage/settings.svg";
import { useNavigate } from "react-router-dom";

const MyInfoTop = ({ myProfileData }) => {
  const navigate = useNavigate();
  const goSettingsPage = () => {
    navigate("/settings");
  };

  return (
    <MyInfo>
      <Settings src={settingIcon} onClick={goSettingsPage}></Settings>
      <User>
        <UserInfo myProfileData={myProfileData} />
        <Followers />
      </User>
    </MyInfo>
  );
};

export default MyInfoTop;

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
  padding: 32px 42px 50px 42px;
  justify-content: space-between;
`;
