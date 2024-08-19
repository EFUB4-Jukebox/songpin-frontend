import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import pinImage from "../../assets/images/UsersPage/library_music.svg";
import Playlist from "../PlaylistPage/Playlist";

const PlaylistFeed = ({ handlePageClick, playlists, playlistCount }) => {
  const navigate = useNavigate();

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
    <PlaylistFeedContainer>
      <PinBox>
        <Img>
          <PinImg src={pinImage} alt="핀이미지" />{" "}
        </Img>
        <PinNum>{playlistCount}</PinNum>
      </PinBox>
      {playlists.length === 0 ? (
        <PlaylistListEmpty>플레이리스트가 비어있습니다.</PlaylistListEmpty>
      ) : (
        <PlaylistContainer>
          {playlists.map(playlist => (
            <Playlist
              handlePageClick={handlePageClick}
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
  margin-bottom: 30px;
  /* margin-left: 34px; */
  align-items: center;
  gap: 10px;
  width: 454px;
`;

const PinImg = styled.img`
  flex-shrink: 0;
`;

const Img = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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
