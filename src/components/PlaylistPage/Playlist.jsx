import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import pinImage from "../../assets/images/MusicSearchPage/spark_122.svg";
import BookmarkToggle from "./BookmarkToggle";
import lock from "../../assets/images/UsersPage/lock.svg";

const Playlist = ({ playlist, onClick }) => {
  const {
    playlistName,
    creatorNickname,
    pinCount,
    updatedDate,
    imgPathList,
    bookmarkId,
    playlistId,
  } = playlist;
  const [isHovered, setIsHovered] = useState(false);
  const [title, setTitle] = useState(playlistName);
  const [titleWidth, setTitleWidth] = useState(0);
  const titleRef = useRef(null);
  const isPrivate = playlist.visibility === "PRIVATE";

  useEffect(() => {
    if (titleRef.current) {
      const width = titleRef.current.offsetWidth;
      setTitleWidth(width);
    }
  }, [title]);
  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };
  return (
    <PlaylistContainer>
      <PlaylistBox onClick={onClick}>
        <BigBox imageUrl={imgPathList[0]}>
          <BookmarkToggle
            playlistId={playlistId}
            initialBookmarkId={bookmarkId}
            color="white"
          />
        </BigBox>
        <SmallBoxContainer>
          <SmallBox imageUrl={imgPathList[1]} />
          <SmallBox imageUrl={imgPathList[2]} />
        </SmallBoxContainer>
      </PlaylistBox>
      <PlaylistNameBox>
        {isPrivate && <LockImg src={lock} alt="나만보기 아이콘" />}
        <PlaylistNameContainer
          onMouseEnter={() => {
            if (titleWidth > 210) setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
        >
          <PlaylistName ref={titleRef} isHovered={isHovered} onClick={onClick}>
            {titleWidth > 210
              ? `${title} ${String.fromCharCode(8195)} ${String.fromCharCode(8195)} ${title}`
              : title}
          </PlaylistName>
          {titleWidth > 210 && <FadeOut />}
        </PlaylistNameContainer>
      </PlaylistNameBox>
      <NameBox>
        <UserName>by {creatorNickname}</UserName>
        <PinBox>
          <PinImg src={pinImage} alt="핀이미지" />
          <PinNum>{pinCount}</PinNum>
        </PinBox>
      </NameBox>
      <UpdatedDate>최근 업데이트: {formatDate(updatedDate)}</UpdatedDate>
    </PlaylistContainer>
  );
};

export default Playlist;

const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 15px; */
  cursor: pointer;
  width: 212px;
`;
const PlaylistBox = styled.div`
  display: flex;
  overflow: hidden;
  margin-bottom: 12px;
`;

const BigBox = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 8px 0px 0px 8px;
  border-right: 1px solid var(--f8f8f8, #fcfcfc);
  background: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl}) no-repeat center center` : "#E7E7E7"};
  background-size: cover;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const SmallBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 140px;
  gap: 1px;
`;

const SmallBox = styled.div`
  width: 70px;
  height: 70px;
  background: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl}) no-repeat center center` : "#E7E7E7"};
  background-size: cover;
  &:first-child {
    border-radius: 0px 8px 0px 0px;
  }
  &:last-child {
    border-radius: 0px 0px 8px 0px;
  }
`;

const PlaylistNameContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  white-space: nowrap;
  width: 210px;
  overflow: hidden;
`;

const rotateText = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const PlaylistName = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 6px 6px 6px 2px;
  white-space: nowrap;
  display: inline-block;
  animation: ${props => (props.isHovered ? rotateText : "none")} 9s linear
    infinite;
`;

const FadeOut = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  background: linear-gradient(to left, white, rgba(255, 255, 255, 0));
`;

const NameBox = styled.div`
  width: 210px;
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const UserName = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  margin-left: 2px;
`;

const PinBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PinImg = styled.img`
  width: 15px;
  height: 15px;
  opacity: 0.8;
`;

const PinNum = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  padding: 5px;
`;

const UpdatedDate = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  height: 24px;
  padding: 8px 8px 8px 2px;
`;

const LockImg = styled.img`
  width: 13px;
  height: 16px;
  flex-shrink: 0;
  fill: var(--gray02, #747474);

  padding-left: 3px;
  padding-right: 7px;
`;

const PlaylistNameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
