import React, { useEffect, useState } from "react";
import styled from "styled-components";
import bookmark from "../../assets/images/MyPage/bookmark-black.svg";
import Playlist from "./Playlist";
import { getMyPlaylistBookmark } from "../../services/api/myPage";
import { useQuery } from "@tanstack/react-query";

const Bookmarks = ({ myBookmarkData }) => {
  const [bookmarkCount, setBookmarkCount] = useState();
  const [bookmarkList, setBookmarkList] = useState([]);

  // const { data } = useQuery({
  //   queryKey: ["getMyPlaylistBookmark"],
  //   queryFn: getMyPlaylistBookmark,
  // });

  // const bookmarkCount = data?.bookmarkCount || 0;
  // const bookmarkList = data?.bookmarkList || [];

  useEffect(() => {
    if (myBookmarkData) {
      setBookmarkCount(myBookmarkData.bookmarkCount);
      setBookmarkList(myBookmarkData.bookmarkList);
    }
  }, [myBookmarkData]);

  return (
    <BookmarkedContainer>
      {myBookmarkData && (
        <>
          <PlaylistOverview>
            <PlaylistIcon src={bookmark} />
            <Num>{bookmarkCount}</Num>
          </PlaylistOverview>
          {bookmarkList.length === 0 ? (
            <BookmarkListEmpty>
              아직 북마크한 플레이리스트가 없습니다.
            </BookmarkListEmpty>
          ) : (
            <PlaylistSection>
              {bookmarkList.map(it => (
                <Playlist
                  bookmarkCount={bookmarkCount}
                  setBookmarkCount={setBookmarkCount}
                  playlist={it}
                />
              ))}
            </PlaylistSection>
          )}
        </>
      )}
    </BookmarkedContainer>
  );
};

export default Bookmarks;

const BookmarkedContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const PlaylistOverview = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 34px;
  align-items: center;
  gap: 10px;
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

const BookmarkListEmpty = styled.div`
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
