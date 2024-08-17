import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../services/api/myPage";
import { useQuery } from "@tanstack/react-query";

const Followers = ({ memberId, followerCount, followingCount, handle }) => {
  // const [followerCount, setFollowerCount] = useState();
  // const [followingCount, setFollowingCount] = useState();
  // const [memberId, setMemberId] = useState();
  const navigate = useNavigate();

  // const { data: profileData } = useQuery({
  //   queryKey: ["getMyProfile"],
  //   queryFn: getMyProfile,
  // });

  // const followerCount = profileData && profileData.followerCount;
  // const followingCount = profileData && profileData.followingCount;
  // const memberId = profileData && profileData.memberId;
  // const handle = profileData && profileData.handle;

  // useEffect(() => {
  //   const getProfile = async () => {
  //     try {
  //       const res = await getMyProfile();
  //       console.log(res);
  //       if (res) {
  //         setFollowerCount(res.followerCount);
  //         setFollowingCount(res.followingCount);
  //         setMemberId(res.memberId);
  //       }
  //     } catch (error) {
  //       console.log("Login Failed", error);
  //     }
  //   };
  //   getProfile();
  // }, []);

  // useEffect(() => {
  //   setData(true);
  // }, [setFollowerCount, setFollowingCount]);

  const handleNavigation = menu => {
    if (handle) navigate(`/users/follows?menu=${menu}&handle=${handle}`);
  };

  const goEditPage = () => {
    navigate("/edit");
  };

  return (
    <>
      {
        <FollowerComponent>
          <FollowInfoBox>
            <FollowBox onClick={() => handleNavigation("followers")}>
              <FollowNumberBox>
                {followerCount ? followerCount : 0}
              </FollowNumberBox>
              <FollowTextBox>팔로워</FollowTextBox>
            </FollowBox>
            <FollowBox onClick={() => handleNavigation("following")}>
              <FollowNumberBox>
                {followingCount ? followingCount : 0}
              </FollowNumberBox>
              <FollowTextBox>팔로잉</FollowTextBox>
            </FollowBox>
          </FollowInfoBox>

          <EditBtn onClick={goEditPage}>프로필 편집</EditBtn>
        </FollowerComponent>
      }
    </>
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
