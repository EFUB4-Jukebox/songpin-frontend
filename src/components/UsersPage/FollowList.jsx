import React from "react";
import styled from "styled-components";
import UserFollowInfo from "./UserFollowInfo";
import { useQuery } from "@tanstack/react-query";
import { addFollowing, getMyProfile } from "../../services/api/myPage";

const FollowList = ({ followerList, followingList, selectedMenu }) => {
  const { isError, data, error } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
    onSuccess: data => {
      console.log(data);
    },
  });

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  if (isError) {
    console.error("Error fetching user info:", error);
    return <div>오류 발생: {error.message}</div>;
  }

  return (
    <ListContainer>
      {selectedMenu === "followers"
        ? followerList &&
          followerList.map(it => (
            <ContentBox>
              <UserFollowInfo
                profileImg={it.profileImg}
                nickname={it.nickname}
                handle={it.handle}
                isFollowing={it.isFollowing}
                followId={it.followId}
              />
            </ContentBox>
          ))
        : followingList &&
          followingList.map(it => (
            <ContentBox>
              <UserFollowInfo
                profileImg={it.profileImg}
                nickname={it.nickname}
                handle={it.handle}
                isFollowing={it.isFollowing}
                followId={it.followId}
              />
            </ContentBox>
          ))}
    </ListContainer>
  );
};

export default FollowList;
const ListTitle = styled.div``;

const ListContainer = styled.div``;

const ContentBox = styled.div`
  padding: 33px;

  border-bottom: 1px solid var(--gray, #bcbcbc);
  background: var(--f8f8f8, #fcfcfc);
`;
