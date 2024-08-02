import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../services/api/myPage";
import { useQuery } from "@tanstack/react-query";

const Followers = () => {
  // const [followerCount, setFollowerCount] = useState();
  // const [followingCount, setFollowingCount] = useState();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  const followerCount = data.followerCount;
  const followingCount = data.followingCount;

  // useEffect(() => {
  //   const getProfile = async () => {
  //     try {
  //       const res = await getMyProfile();
  //       console.log(res);
  //       if (res) {
  //         setFollowerCount(res.followerCount);
  //         setFollowingCount(res.followingCount);
  //       }
  //     } catch (error) {
  //       console.log("Login Failed", error);
  //     }
  //   };
  //   getProfile();
  // }, []);

  const handleNavigation = menu => {
    navigate(`/user-follows?menu=${menu}`);
  };

  const goEditPage = () => {
    navigate("/edit");
  };

  return (
    <FollowerComponent>
      <FollowInfoBox>
        <FollowBox onClick={() => handleNavigation("followers")}>
          <FollowNumberBox>{followerCount}</FollowNumberBox>
          <FollowTextBox>팔로워</FollowTextBox>
        </FollowBox>
        <FollowBox onClick={() => handleNavigation("following")}>
          <FollowNumberBox>{followingCount}</FollowNumberBox>
          <FollowTextBox>팔로잉</FollowTextBox>
        </FollowBox>
      </FollowInfoBox>
      <EditBtn onClick={goEditPage}>프로필 편집</EditBtn>
    </FollowerComponent>
  );
};

export default Followers;

const FollowerComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FollowInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 26px;
  margin-bottom: 13px;
`;

const FollowBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const FollowNumberBox = styled.div`
  color: var(--light_black, #232323);
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;

const FollowTextBox = styled.div`
  color: var(--gray02, #747474);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const EditBtn = styled.div`
  width: 159px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 30px;
  border: 1px solid var(--light_black, #232323);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--light_black, #232323);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;
