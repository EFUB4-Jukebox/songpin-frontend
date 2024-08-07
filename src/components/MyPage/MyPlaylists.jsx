import React, { useEffect, useState } from "react";
import styled from "styled-components";
import musicLibraryIcon from "../../assets/images/MyPage/music-library.svg";
import Playlist from "./Playlist";
import CreatePlaylistModal from "../common/Modal/CreatePlaylistModal";
import { getMyPlaylist } from "../../services/api/myPage";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const MyPlaylists = ({ myPlaylistData }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [myPlaylistCount, setMyPlaylistCount] = useState();
  const [myPlaylist, setMyPlaylist] = useState([]);
  const openCreatePlaylist = () => {
    setIsOpen(prevState => !prevState);
  };
  const handlePlaylistClick = playlistId => {
    navigate(`/playlists/${playlistId}`);
  };
  // const { data, refetch } = useQuery({
  //   queryKey: ["getMyPlaylist"],
  //   queryFn: getMyPlaylist,
  // });

  // const myPlaylistCount = data.playlistCount;
  // const myPlaylist = data.playlistList;

  useEffect(() => {
    if (myPlaylistData) {
      setMyPlaylistCount(myPlaylistData.playlistCount);
      setMyPlaylist(myPlaylistData.playlistList);
    }
  }, [myPlaylistData]);

  return (
    <PlaylistsContainer>
      {myPlaylistData && (
        <>
          <PlaylistOverview>
            <PlaylistTimes>
              <Img>
                <PlaylistIcon src={musicLibraryIcon} />
              </Img>
              <Num>{myPlaylistCount}</Num>
            </PlaylistTimes>
            <CreateNewPlaylist onClick={openCreatePlaylist}>
              새 플레이리스트 만들기
            </CreateNewPlaylist>
            {isOpen && (
              <CreatePlaylistModal setModalCommon={openCreatePlaylist} />
            )}
          </PlaylistOverview>
          {myPlaylist.length === 0 ? (
            <PlaylistListEmpty>플레이리스트가 비어있습니다.</PlaylistListEmpty>
          ) : (
            <PlaylistSection>
              {myPlaylist.map(playlist => (
                <Playlist
                  // key={it.playlistId}
                  // playlistId={it.playlistId}
                  // playlistName={it.playlistName}
                  // creatorNickname={it.creatorNickname}
                  // pinCount={it.pinCount}
                  // updateDate={it.updatedDate}
                  // bookmarkId={it.bookmarkId}
                  key={playlist.playlistId}
                  playlist={playlist}
                  onClick={() => handlePlaylistClick(playlist.playlistId)}
                />
              ))}
            </PlaylistSection>
          )}
        </>
      )}
    </PlaylistsContainer>
  );
};

export default MyPlaylists;

const PlaylistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const PlaylistOverview = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 34px;
  margin-right: 40px;
`;

const PlaylistTimes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const Img = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaylistIcon = styled.img`
  flex-shrink: 0;
`;

const Num = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const CreateNewPlaylist = styled.div`
  color: var(--light_black, #232323);
  text-align: right;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  padding-top: 3px;
`;

const PlaylistSection = styled.div`
  margin: auto;
  width: 480px;
  margin-top: 34px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 28px 0;
  justify-items: center;
  align-items: center;
`;
const PlaylistListEmpty = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 250px;
  color: var(--gray02, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;
