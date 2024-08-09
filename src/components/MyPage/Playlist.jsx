import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import nobookmark from "../../assets/images/MyPage/bookmark-no.svg";
import yesbookmark from "../../assets/images/MyPage/bookmark-yes.svg";
import pinImage from "../../assets/images/MusicSearchPage/spark_122.svg";
import lock from "../../assets/images/UsersPage/lock.svg";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { addBookmarkOne, deleteBookmarkOne } from "../../services/api/myPage";
import { useNavigate } from "react-router-dom";
import useEditStore from "../../store/useProfileEditStore";
import useBookmarkStore from "../../store/useBookmarkStore";

const Playlist = ({
  isPlaylist,
  playlist,
  bookmarkCount,
  setBookmarkCount,
}) => {
  const {
    playlistName,
    creatorNickname,
    pinCount,
    updatedDate,
    imgPathList,
    bookmarkId,
    playlistId,
  } = playlist;

  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(bookmarkId ? true : false);
  const isPrivate = playlist.visibility === "PRIVATE";
  const [title, setTitle] = useState(playlistName);
  const [titleWidth, setTitleWidth] = useState(0);
  const titleRef = useRef(null);
  const { setIsBookmarkClick } = useBookmarkStore();
  useEffect(() => {
    if (titleRef.current) {
      const width = titleRef.current.offsetWidth;
      setTitleWidth(width);
    }
  }, [title]);

  const toggleBookmark = async event => {
    event.stopPropagation();
    const newBookmarkStatus = !isBookmarked;
    setIsBookmarked(newBookmarkStatus);
    if (!isPlaylist) {
      if (newBookmarkStatus) {
        setBookmarkCount(prev => prev + 1);
      } else {
        setBookmarkCount(prev => prev - 1);
      }
    }
    setIsBookmarkClick(true);
    try {
      if (isBookmarked) {
        await deleteBookmarkOne(bookmarkId);
      } else {
        await addBookmarkOne({ playlistId });
      }
    } catch (error) {
      console.error("북마크 변경에 실패했습니다.", error);
    }
  };

  const handlePlaylistClick = () => {
    navigate(`/playlists/${playlistId}`);
  };

  const formattedUpdateDate = format(new Date(updatedDate), "20yy.MM.dd", {
    locale: ko,
  });

  return (
    <PlaylistContainer>
      <PlaylistBox onClick={handlePlaylistClick}>
        <BigBox imageUrl={imgPathList[0]}>
          <BookmarkBtn
            src={isBookmarked ? yesbookmark : nobookmark}
            alt="북마크 버튼"
            onClick={toggleBookmark}
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
          onClick={handlePlaylistClick}
        >
          <PlaylistName
            ref={titleRef}
            onClick={handlePlaylistClick}
            isHovered={isHovered}
          >
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
      <UpdatedDate>최근 업데이트: {formattedUpdateDate}</UpdatedDate>
    </PlaylistContainer>
  );
};

export default Playlist;

const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 212px;
`;

const PlaylistBox = styled.div`
  display: flex;
  overflow: hidden;
  margin-bottom: 12px;
  cursor: pointer;
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

const BookmarkBtn = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  padding: 10px;
  cursor: pointer;
  fill: #f8f8f8;
`;

const PlaylistNameContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 210px;
  overflow: hidden;
  cursor: pointer;
`;

const scrollText = keyframes`
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
  white-space: nowrap;
  animation: ${props => (props.isHovered ? scrollText : "none")} 9s linear
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
  padding-top: 5px;
  padding-bottom: 5px;
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
  padding-left: 5px;
`;

const UpdatedDate = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  height: 24px;
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
