import React, { useState } from "react";
import styled from "styled-components";
import noBookmarkWhite from "../../assets/images/PlaylistPage/bookmark-no.svg";
import yesBookmarkWhite from "../../assets/images/PlaylistPage/bookmark-yes.svg";
import noBookmarkBlack from "../../assets/images/PlaylistPage/nobookmark_black.svg";
import yesBookmarkBlack from "../../assets/images/PlaylistPage/yesbookmark_black.svg";
import { addBookmark, deleteBookmark } from "../../services/api/playlist";

const BookmarkToggle = ({ playlistId, initialBookmarkId, color }) => {
  const [isBookmarked, setIsBookmarked] = useState(!!initialBookmarkId);
  const [bookmarkId, setBookmarkId] = useState(initialBookmarkId);
  const isWhite = color === "white";

  const toggleBookmark = async event => {
    event.stopPropagation();
    try {
      if (isBookmarked) {
        if (bookmarkId) {
          await deleteBookmark(bookmarkId);
          setIsBookmarked(false);
          setBookmarkId(null);
        }
      } else {
        const response = await addBookmark(playlistId);
        if (response?.bookmarkId) {
          setIsBookmarked(true);
          setBookmarkId(response.bookmarkId);
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
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
