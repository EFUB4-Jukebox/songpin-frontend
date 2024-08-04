import React from "react";
import styled from "styled-components";
import UserFollowInfo from "./UserFollowInfo";

const FollowList = ({ followerList, followingList, selectedMenu }) => {
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
