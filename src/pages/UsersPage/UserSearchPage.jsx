import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import SideSection from "../../components/common/SideSection";
import SearchBar from "../../components/UsersPage/SearchBar";
import UserInfo from "../../components/UsersPage/UserInfo";
import { searchUsers, getUserDetail } from "../../services/api/user";
import { getMyProfile } from "../../services/api/myPage";
import Main from "../IntroducePage/Main";

const UserSearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const navigate = useNavigate();

  const handleUserClick = async memberId => {
    try {
      // 로그인된 사용자 ID 가져오기
      const myProfile = await getMyProfile();
      const isMe = myProfile.memberId === memberId;

      // 프로필 정보를 가져오는 API 호출
      const userDetail = isMe ? myProfile : await getUserDetail(memberId);

      // 해당 유저 페이지로 이동
      navigate(`/users/${memberId}`, { state: { isMe } });
    } catch (err) {
      console.error("Error fetching user detail:", err);
    }
  };

  const handleSearch = async keyword => {
    if (!keyword.trim()) return; // 빈 검색어일 경우 무시

    setSearching(true);
    setError(null);
    setSearched(true);

    try {
      const data = await searchUsers(keyword, 0, 20); // page와 size는 필요에 따라 조정
      setSearchResults(data.memberList || []);
    } catch (err) {
      setError("검색 중 오류가 발생했습니다.");
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };
  return (
    <SideSection showSideBar={showSideBar}>
      <SearchBox>
        <SearchBar
          placeholder="닉네임 또는 핸들을 검색"
          onSearch={handleSearch}
        />
      </SearchBox>
      {!searched && (
        <EmptySearchResult>
          <MainText>다른 사람을 팔로우해보세요.</MainText>
        </EmptySearchResult>
      )}
      {searching ? (
        <div></div>
      ) : searchResults.length > 0 ? (
        <>
          <Line />{" "}
          {searchResults.map(user => (
            <ContentBox key={user.memberId}>
              <UserInfo
                memberId={user.memberId}
                nickname={user.nickname}
                handle={user.handle}
                profileImg={user.profileImg}
                isMe={user.isMe}
                onClick={() => handleUserClick(user.memberId)}
              />
            </ContentBox>
          ))}
        </>
      ) : searched ? (
        <NoUser>검색 결과가 없습니다.</NoUser>
      ) : null}
    </SideSection>
  );
};

export default UserSearchPage;

const ContentBox = styled.div`
  padding: 32px 34px 32px 34px;
  border-bottom: 1px solid var(--gray, #bcbcbc);
`;

const SearchBox = styled.div`
  padding: 40px 34px 10px 34px;
`;

const EmptySearchResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 263px);
  margin-top: 45px;
`;

const MainText = styled.div`
  color: var(--gray02, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  /* margin-top: 448px; */
`;

const NoUser = styled.div`
  color: var(--gray02, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  margin-top: 365px;
`;

const Line = styled.div`
  width: 528px;
  height: 1px;
  background: var(--gray, #bcbcbc);
`;
