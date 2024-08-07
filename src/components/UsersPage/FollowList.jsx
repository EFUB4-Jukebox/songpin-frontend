import React, { useEffect } from "react";
import styled from "styled-components";
import UserFollowInfo from "./UserFollowInfo";

const sortFollowersOrFollowing = list => {
  return (
    list &&
    list.sort((a, b) => {
      if (a.isFollowing === null && b.isFollowing !== null) return -1;
      if (b.isFollowing === null && a.isFollowing !== null) return 1;
      if (a.isFollowing === null) return -1;
      if (b.isFollowing === null) return 1;

      if (a.isFollowing !== b.isFollowing) return b.isFollowing - a.isFollowing;

      return b.followId - a.followId;
    })
  );
};

const FollowList = ({ followerList, followingList, selectedMenu }) => {
  const sortedList =
    selectedMenu === "followers"
      ? sortFollowersOrFollowing(followerList)
      : sortFollowersOrFollowing(followingList);

  return (
    <ListContainer>
      {sortedList &&
        sortedList.map(it => (
          <ContentBox key={it.memberId}>
            <UserFollowInfo
              profileImg={it.profileImg}
              nickname={it.nickname}
              handle={it.handle}
              isFollowing={it.isFollowing}
              followId={it.followId}
              memberId={it.memberId}
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
