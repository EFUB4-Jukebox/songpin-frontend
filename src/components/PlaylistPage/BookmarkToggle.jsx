import React, { useState } from "react";
import styled from "styled-components";
import noBookmarkWhite from "../../assets/images/PlaylistPage/bookmark-no.svg";
import yesBookmarkWhite from "../../assets/images/PlaylistPage/bookmark-yes.svg";
import noBookmarkBlack from "../../assets/images/PlaylistPage/nobookmark_black.svg";
import yesBookmarkBlack from "../../assets/images/PlaylistPage/yesbookmark_black.svg";
import { toggleBookmark } from "../../services/api/playlist";
import useEditStore from "../../store/useProfileEditStore";

const BookmarkToggle = ({ playlistId, isBookmarked, color }) => {
  const [Bookmarked, setBookmarked] = useState(isBookmarked);
  const { setEdit } = useEditStore();
  const isWhite = color === "white";

  const handleToggleBookmark = async event => {
    event.stopPropagation(); // 이벤트 버블링 방지

    // 북마크 상태 즉시 변경
    const newBookmarkStatus = !Bookmarked;
    setBookmarked(newBookmarkStatus);

    // API 요청
    setEdit(true);
    try {
      await toggleBookmark(playlistId);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      // API 요청이 실패하면 상태를 되돌림.
      setBookmarked(!newBookmarkStatus);
    }
  };

  return (
    <BookmarkBtn
      src={
        Bookmarked
          ? isWhite
            ? yesBookmarkWhite
            : yesBookmarkBlack
          : isWhite
            ? noBookmarkWhite
            : noBookmarkBlack
      }
      alt="Bookmark Button"
      onClick={handleToggleBookmark}
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
