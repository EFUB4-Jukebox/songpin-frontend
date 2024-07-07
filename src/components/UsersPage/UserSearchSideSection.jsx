import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import UserInfo from './UserInfo';

const UserSearchSideSection = () => {
  return (
    <SideComponent>
      <SideBar></SideBar>
      <SideBox>
        <ContentBox>
          <SearchBar />
        </ContentBox>
        <ContentBox>
          <UserInfo />
        </ContentBox>
      </SideBox>
    </SideComponent>
  );
};

export default UserSearchSideSection;

const SideComponent = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 608px;
`;

const SideBar = styled.div`
  width: 80px;
  border-right: 1px solid var(--gray, #bcbcbc);
`;

const SideBox = styled.div`
  width: 528px;
  border-right: 1px solid var(--gray, #bcbcbc);
  /* padding: 33px; */
`;

const ContentBox = styled.div`
  padding: 33px;
  padding-top: 40px;
  border-bottom: 1px solid var(--gray, #bcbcbc);
`;
