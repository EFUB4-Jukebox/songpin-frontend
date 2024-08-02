import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SideSection from "../../components/common/SideSection";
import { useNavigate } from "react-router-dom";
import { editMyProfile, getMyProfile } from "../../services/api/myPage";
import { GenreList } from "../../constants/GenreList";
import { ProfileImg } from "../../constants/ProfileImg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ProfileEditPage = () => {
  const [nickname, setNickname] = useState();
  const [handle, setHandle] = useState();
  const [selected, setSelected] = useState();
  const [profileImg, setProfileImg] = useState();
  const [email, setEmail] = useState();
  const [originImg, setOriginImg] = useState("");
  const [infoMsgNickname, setInfoMsgNickname] = useState("");
  const [infoMsgHandle, setInfoMsgHandle] = useState("");

  const navigate = useNavigate();

  const completeEditProfile = async () => {
    const selectedGenre = GenreList.find(it => it.id === selected);
    const editProfile = {
      profileImg: selectedGenre ? selectedGenre.EngName : originImg,
      nickname,
      handle,
    };
    console.log(editProfile);
    const res = await editMyProfile(editProfile);
    console.log(res);
    if (res.data && res.data.message) {
      const message = res.data.message;
      if (message.startsWith("nickname")) {
        setInfoMsgNickname(message.slice(9));
      } else {
        setInfoMsgHandle(message.slice(7));
      }
    }
    if (!res.data) navigate("/mypage");
  };
  //if (message.startsWith("handle"))

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await getMyProfile();
        setOriginImg(res.profileImg);
        const img = ProfileImg.find(it => it.EngName === res.profileImg);
        setSelected(img.id);
        console.log(res);
        if (res) {
          setNickname(res.nickname);
          setHandle(res.handle);
          setProfileImg(img.imgSrc);
          setEmail(res.email);
        }
      } catch (error) {
        console.log("데이터 불러오기에 실패했습니다.", error);
      }
    };
    getProfile();
  }, []);

  const changeNickname = event => {
    setNickname(event.target.value);
  };
  const changeHandle = event => {
    setHandle(event.target.value);
  };

  const goBackPage = () => {
    navigate("/mypage");
  };

  const handleProfileImg = id => {
    setSelected(id);
    const res = ProfileImg.find(it => it.id === id);
    setProfileImg(res.imgSrc);
  };

  return (
    <SideSection>
      <ProfileEditComponent>
        <ProfileImgSelect>
          <UserLogo src={profileImg} />
          {GenreList.map((it, index) => (
            <SelectList
              onClick={() => handleProfileImg(index)}
              src={`${selected === index ? it.strokeIconSrc : it.iconSrc}`}
            />
          ))}
        </ProfileImgSelect>
        <EditSection>
          <NickName>
            <Title>닉네임</Title>
            <Edit>
              <EditText
                type="text"
                value={nickname}
                onChange={changeNickname}
                placeholder="닉네임을 입력하세요"
              />
              <Line />
              <AlarmMessage>{infoMsgNickname}</AlarmMessage>
            </Edit>
          </NickName>
          <Handle>
            <Title>핸들</Title>
            <Edit>
              <EditText
                type="text"
                value={handle}
                onChange={changeHandle}
                placeholder="핸들을 입력하세요"
              />
              <Line />
              <AlarmMessage>{infoMsgHandle}</AlarmMessage>
            </Edit>
          </Handle>
          <Email>
            <Title>이메일</Title>
            <MailText>{email}</MailText>
          </Email>
        </EditSection>
        <Spacer />
        <GoOutBtns>
          <Button onClick={goBackPage}>취소</Button>
          <Button onClick={completeEditProfile}>완료</Button>
        </GoOutBtns>
      </ProfileEditComponent>
    </SideSection>
  );
};

export default ProfileEditPage;

const ProfileEditComponent = styled.div`
  padding: 0 45px 0 35px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: space-between;
`;

const ProfileImgSelect = styled.div`
  margin-top: 48px;
  display: flex;
  gap: 12px;
  align-items: center;
`;
const UserLogo = styled.img`
  margin-right: 36px;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
`;

const SelectList = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
const EditSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 56px;
`;

const NickName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Edit = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditText = styled.input`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  border: none;
  outline: none;
`;

const Line = styled.div`
  width: 340px;
  height: 1px;
  background: var(--gray02, #747474);
`;

const AlarmMessage = styled.div`
  color: var(--gray02, #747474);
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const Handle = styled.div`
  display: flex;
  flex-direction: row;
  /* gap: 73px; */
  padding-top: 28px;
  justify-content: space-between;
`;

const Email = styled.div`
  display: flex;
  flex-direction: row;
  gap: 56px;
  padding-top: 35px;
`;

const MailText = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const GoOutBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: 57px;
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
