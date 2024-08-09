import React, { useState } from "react";
import styled from "styled-components";
import noBookmarkWhite from "../../assets/images/PlaylistPage/bookmark-no.svg";
import yesBookmarkWhite from "../../assets/images/PlaylistPage/bookmark-yes.svg";
import noBookmarkBlack from "../../assets/images/PlaylistPage/nobookmark_black.svg";
import yesBookmarkBlack from "../../assets/images/PlaylistPage/yesbookmark_black.svg";
import { addBookmark, deleteBookmark } from "../../services/api/playlist";
import useEditStore from "../../store/useProfileEditStore";

const BookmarkToggle = ({ playlistId, initialBookmarkId, color }) => {
  const [isBookmarked, setIsBookmarked] = useState(!!initialBookmarkId);
  const [bookmarkId, setBookmarkId] = useState(initialBookmarkId);
  const { setEdit } = useEditStore();
  const isWhite = color === "white";

  const toggleBookmark = async event => {
    event.stopPropagation();

    // 로컬 상태를 즉시 변경
    const newBookmarkStatus = !isBookmarked;
    setIsBookmarked(newBookmarkStatus);

    // API 요청
    setEdit(true);
    try {
      if (newBookmarkStatus) {
        const response = await addBookmark(playlistId);
        if (response?.bookmarkId) {
          setBookmarkId(response.bookmarkId);
        } else {
          // 실패 시 상태 롤백
          setIsBookmarked(false);
        }
      } else {
        if (bookmarkId) {
          await deleteBookmark(bookmarkId);
          setBookmarkId(null);
        } else {
          // 실패 시 상태 롤백
          setIsBookmarked(true);
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      setIsBookmarked(!newBookmarkStatus);
    }
  };

  return (
    <BookmarkBtn
      src={
        isBookmarked
          ? isWhite
            ? yesBookmarkWhite
            : yesBookmarkBlack
          : isWhite
            ? noBookmarkWhite
            : noBookmarkBlack
      }
      alt="Bookmark Button"
      onClick={toggleBookmark}
      isWhite={isWhite}
    />
  );
};

export default BookmarkToggle;

const BookmarkBtn = styled.img`
  width: ${({ isWhite }) => (isWhite ? "30px" : "19px")};
  height: ${({ isWhite }) => (isWhite ? "30px" : "25px")};
  flex-shrink: 0;
  padding: ${({ isWhite }) => (isWhite ? "10px" : "0")};
  cursor: pointer;
`;
