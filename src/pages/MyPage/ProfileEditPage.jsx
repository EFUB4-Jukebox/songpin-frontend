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
  const [showSideBar, setShowSideBar] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [patchSuccess, setPatchSuccess] = useState(false);
  const [init, setInit] = useState(true);
  const navigate = useNavigate();

  const validateForm = () => {
    const nicknameRegex = /^[가-힣a-zㄱ-ㅎA-Z0-9]{1,8}$/;
    const handleRegex = /^[a-z0-9_]{3,12}$/;

    // 닉네임 검증
    let nicknameMessage = "";
    if (!nickname) {
      nicknameMessage = "닉네임을 입력하세요.";
    } else if (nickname.length > 8) {
      nicknameMessage = "닉네임은 8자 이내여야 합니다.";
    } else if (!nicknameRegex.test(nickname)) {
      nicknameMessage = "닉네임은 한글, 영문 대소문자, 숫자만 사용 가능합니다.";
    }

    // 핸들 검증
    let handleMessage = "";
    if (!handle) {
      handleMessage = "핸들을 입력하세요.";
    } else if (handle.length > 12 || handle.length < 3) {
      handleMessage = "핸들은 최소 3자 이상, 12자 이내여야 합니다.";
    } else if (!handleRegex.test(handle)) {
      handleMessage = "핸들은 영문 소문자, 숫자, 언더바(_)만 사용 가능합니다.";
    }
    setInfoMsgNickname(nicknameMessage);
    setInfoMsgHandle(handleMessage);

    setIsFormValid(nicknameMessage === "" && handleMessage === "");
  };

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
    if (!res.data) setPatchSuccess(true);
  };
  //if (message.startsWith("handle"))

  useEffect(() => {
    if (init) {
      setInit(false);
      return;
    }
    if (patchSuccess) navigate("/mypage");
  }, [patchSuccess]);

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

  useEffect(() => {
    validateForm();
  }, [nickname, handle]);

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
    <SideSection showSideBar={showSideBar}>
      {email ? (
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
                <Line hasError={!!infoMsgNickname} />
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
                <Line hasError={!!infoMsgHandle} />{" "}
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
            <Button isDisabled={!isFormValid} onClick={completeEditProfile}>
              완료
            </Button>
          </GoOutBtns>
        </ProfileEditComponent>
      ) : (
        <></>
      )}
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
  gap: 30px;
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
  position: relative;
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
  width: 345px;
  height: 1px;
  background: ${({ hasError }) =>
    hasError ? "red" : "var(--gray02, #747474)"};
`;

const AlarmMessage = styled.div`
  position: absolute;
  top: 30px;
  right: 0px;
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
  color: ${({ isDisabled }) =>
    isDisabled ? "var(--gray, #BCBCBC)" : "var(--light_black, #232323)"};
  pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "auto")};

  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 28px */
  cursor: pointer;
`;
