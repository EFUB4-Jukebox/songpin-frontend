import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import pinImage from "../../assets/images/UsersPage/library_music.svg";
import Playlist from "../PlaylistPage/Playlist";

const PlaylistFeed = ({ playlists, playlistCount }) => {
  const navigate = useNavigate();

  const handlePlaylistClick = id => {
    navigate(`/playlists/${id}`);
  };
  return (
    <PlaylistFeedContainer>
      <PinBox>
        <Img>
          <PinImg src={pinImage} alt="핀이미지" />
        </Img>
        <PinNum>{playlistCount}</PinNum>
      </PinBox>

      {playlists.length === 0 ? (
        <PlaylistListEmpty>플레이리스트가 비어있습니다.</PlaylistListEmpty>
      ) : (
        <PlaylistContainer>
          {playlists.map(playlist => (
            <Playlist
              key={playlist.playlistId}
              onClick={() => handlePlaylistClick(playlist.playlistId)}
              playlist={playlist} // 플레이리스트 정보를 전달
            />
          ))}
        </PlaylistContainer>
      )}
    </PlaylistFeedContainer>
  );
};

export default PlaylistFeed;

const PlaylistFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PinBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 22px;
  margin-left: 34px;
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
const PinImg = styled.img`
  flex-shrink: 0;
`;

const PinNum = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PlaylistContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0px 20px 70px 20px;
`;
const PlaylistListEmpty = styled.div`
  width: 528px;
  display: flex;
  justify-content: center;
  margin-top: 230px;
  color: var(--gray02, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;
