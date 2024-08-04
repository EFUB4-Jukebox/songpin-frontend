import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SideSection from "../../components/common/SideSection";
import SearchBar from "../../components/UsersPage/SearchBar";
import Playlist from "../../components/PlaylistPage/Playlist";
import { getPlaylists } from "../../services/api/playlist";
const PlaylistPage = () => {
  const navigate = useNavigate();
  const [recentPlaylists, setRecentPlaylists] = useState([]);
  const [followingPlaylists, setFollowingPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSideBar, setShowSideBar] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlaylists();
        setRecentPlaylists(data.recentPlaylists || []);
        setFollowingPlaylists(data.followingPlaylists || []);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePlaylistClick = playlistId => {
    navigate(`/playlists/${playlistId}`);
  };

  const handleSearch = keyword => {
    if (keyword.trim()) {
      navigate(`/playlistsearch?query=${keyword}`);
    }
  };
  return (
    <SideSection showSideBar={showSideBar}>
      <ContentBox>
        <SearchBar
          placeholder="플레이리스트 이름을 검색"
          onSearch={handleSearch}
        />
      </ContentBox>
      <TitleText>최근 생성된 플레이리스트</TitleText>
      <PlaylistFeed>
        {recentPlaylists.length > 0 ? (
          recentPlaylists.map(playlist => (
            <Playlist
              key={playlist.playlistId}
              playlist={playlist}
              onClick={() => handlePlaylistClick(playlist.playlistId)}
            />
          ))
        ) : (
          <NoPlaylist>표시할 플레이리스트가 없습니다.</NoPlaylist>
        )}
      </PlaylistFeed>
      <TitleText>팔로잉 중인 사람들의 플레이리스트</TitleText>
      <PlaylistFeed>
        {followingPlaylists.length > 0 ? (
          // <PlaylistFeed>
          followingPlaylists.map(playlist => (
            <Playlist
              key={playlist.playlistId}
              playlist={playlist}
              onClick={() => handlePlaylistClick(playlist.playlistId)}
            />
          ))
        ) : (
          // </PlaylistFeed>
          <NoPlaylist>표시할 플레이리스트가 없습니다.</NoPlaylist>
        )}
      </PlaylistFeed>
    </SideSection>
  );
};

export default PlaylistPage;

const ContentBox = styled.div`
  padding: 33px;
  padding-top: 40px;
  padding-bottom: 15px;
`;

const TitleText = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
  padding-left: 35px;
  margin-bottom: 15px;
`;

const PlaylistFeed = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* grid-gap: 28px 28px; */
  padding: 0px 20px 70px 20px;
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
  padding-top: 260px;
  padding-bottom: 260px;
`;
