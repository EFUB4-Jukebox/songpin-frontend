import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../../components/UsersPage/SearchBar";
import arrowDown from "../../assets/images/MusicSearchPage/arrow_down.svg";
import Playlist from "../../components/PlaylistPage/Playlist";
import SideSection from "../../components/common/SideSection";
import { searchPlaylists } from "../../services/api/playlist";
import queryString from "query-string";

const values = ["정확도순", "담긴 핀 많은순", "업데이트순"];
const sortByMap = {
  정확도순: "ACCURACY",
  "담긴 핀 많은순": "COUNT",
  업데이트순: "NEWEST",
};
const PlaylistSearchPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("정확도순");
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태 추가
  const [loading, setLoading] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const onValueClicked = value => () => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const toggling = () => setIsOpen(!isOpen);

  useEffect(() => {
    // URL 쿼리 파라미터에서 검색어를 읽어옴
    const { query } = queryString.parse(location.search);
    if (query) {
      setSearchKeyword(query);
      handleSearch(query, sortByMap[selectedValue]);
    }
  }, [location.search, selectedValue]); // location.search가 변경될 때마다 실행
  const handleSearch = async (keyword, sortBy) => {
    setLoading(true);
    setSearchKeyword(keyword); // 검색어 업데이트
    try {
      const results = await searchPlaylists(keyword, sortBy, 0, 20);
      setSearchResults(results.playlists);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchKeyword) {
      handleSearch(searchKeyword, sortByMap[selectedValue]);
    }
  }, [selectedValue]); // 정렬 기준이 변경될 때마다 검색 수행

  const handlePlaylistClick = id => {
    const path = window.location.pathname;
    const segments = path.split("/").filter(segment => segment); // 빈 문자열을 필터링

    const firstSegment = segments[0] || "";
    const secondSegment = segments[1] || "";

    const combinedSegments = secondSegment
      ? `${firstSegment}/${secondSegment}`
      : firstSegment;

    navigate(`/playlists/${id}`, { state: `/${combinedSegments}` });
  };

  return (
    <SideSection showSideBar={showSideBar}>
      <ContentBox>
        {/* 검색된 문구가 남아있어야 함  */}
        <SearchBar
          placeholder="플레이리스트 이름을 검색"
          value={searchKeyword} // 검색어를 SearchBar에 설정
          onSearch={handleSearch}
        />
      </ContentBox>
      <Sorting>
        <DropdownSorting>
          <DropdownHeader onClick={toggling}>
            <SortingText>{selectedValue}</SortingText>
            <DropIcon src={arrowDown} isOpen={isOpen} />
          </DropdownHeader>
          {isOpen && (
            <DropdownList>
              {values.map(value => (
                <ListItem
                  onClick={onValueClicked(value)}
                  style={{
                    fontWeight: selectedValue === value ? "700" : "400",
                  }}
                >
                  {value}
                </ListItem>
              ))}
            </DropdownList>
          )}
        </DropdownSorting>
      </Sorting>
      {loading ? (
        <NoPlaylist></NoPlaylist>
      ) : (
        <PlaylistFeed>
          {searchResults.length > 0 ? (
            searchResults.map(playlist => (
              <Playlist
                key={playlist.playlistId}
                playlist={playlist}
                onClick={() => handlePlaylistClick(playlist.playlistId)}
              />
            ))
          ) : (
            <NoPlaylist>검색된 플레이리스트가 없습니다.</NoPlaylist>
          )}
        </PlaylistFeed>
      )}
    </SideSection>
  );
};

export default PlaylistSearchPage;

const ContentBox = styled.div`
  padding: 33px;
  padding-top: 40px;
  padding-bottom: 0px;
`;

const PlaylistFeed = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0px 20px 70px 20px; */
  margin: auto;
  width: 480px;
  margin-top: 34px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 28px 0;
  justify-items: center;
  align-items: center;
`;

const NoPlaylist = styled.div`
  color: var(--gray02, #747474);
  width: 488px;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  display: flex;
  justify-content: center;
  margin-top: 400px;
  padding-bottom: 130px;
`;

const Sorting = styled.div`
  display: flex;
  justify-content: flex-end;
  /* width: 528px; */
  padding: 0px 33px 9px 33px;
`;

const DropdownSorting = styled.div`
  display: flex;
  justify-content: flex-end;

  align-items: center;
  position: relative;
`;

const DropdownHeader = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SortingText = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  padding-right: 11.69px;
`;

const DropIcon = styled.img`
  width: 10.616px;
  height: 6.016px;
  margin-right: 4.69px;
  cursor: pointer;
  transform: ${props => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownList = styled.div`
  display: flex;
  width: 92px;
  padding: 12px;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  border-radius: 0px 0px 8px 8px;
  border: 1px solid var(--gray02, #747474);
  background: var(--f8f8f8, #fcfcfc);
  z-index: 1000;
  position: absolute;
  top: 36.5px;
`;

const ListItem = styled.div`
  height: 25px;
  align-self: stretch;
  color: var(--light_black, #232323);
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  cursor: pointer;
`;
