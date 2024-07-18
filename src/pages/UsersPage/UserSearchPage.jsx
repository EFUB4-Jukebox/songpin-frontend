import React from 'react';
import styled from 'styled-components';
import SideSection from '../../components/common/SideSection';
import SearchBar from '../../components/UsersPage/SearchBar';
import UserInfo from '../../components/UsersPage/UserInfo';



const UserSearchPage = () => {
  return (
    <SideSection>
        <ContentBox>
          <SearchBar placeholder="핸들 또는 닉네임을 검색" />
        </ContentBox>
        <ContentBox>
          <UserInfo />
        </ContentBox>
    </SideSection>
  );
};

export default UserSearchPage;

const ContentBox = styled.div`
  padding: 34px;
  padding-top: 40px;
  border-bottom: 1px solid var(--gray, #bcbcbc);
`;


