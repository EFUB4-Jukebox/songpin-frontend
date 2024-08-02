import React, { useEffect, useState } from "react";
import styled from "styled-components";
import bookmark from "../../assets/images/MyPage/bookmark-black.svg";
import Playlist from "./Playlist";
import { getMyPlaylistBookmark } from "../../services/api/myPage";
import { useQuery } from "@tanstack/react-query";

const Bookmarks = () => {
  // const [bookmarkCount, setBookmarkCount] = useState();
  // const [bookmarkList, setBookmarkList] = useState([]);

  const { data, refetch } = useQuery({
    queryKey: ["getMyPlaylistBookmark"],
    queryFn: getMyPlaylistBookmark,
  });

  const bookmarkCount = data?.bookmarkCount || 0;
  const bookmarkList = data?.bookmarkList || [];

  // useEffect(() => {
  //   const getBookmark = async () => {
  //     try {
  //       const res = await getMyPlaylistBookmark();
  //       console.log(res);
  //       if (res) {
  //         setBookmarkCount(res.bookmarkCount);
  //         setBookmarkList(res.bookmarkList);
  //       }
  //     } catch (error) {
  //       console.log("데이터 불러오기에 실패했습니다.", error);
  //     }
  //   };
  //   getBookmark();
  // }, []);
  return (
    <BookmarkedContainer>
      <PlaylistOverview>
        <PlaylistIcon src={bookmark} />
        <Num>{bookmarkCount}</Num>
      </PlaylistOverview>
      <PlaylistSection>
        {bookmarkList && bookmarkList.map(it => <Playlist playlist={it} />)}
      </PlaylistSection>
    </BookmarkedContainer>
  );
};

export default Bookmarks;

const BookmarkedContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
  margin-bottom: 30px;
`;

const PlaylistOverview = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 36px;
`;

const PlaylistIcon = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  padding-right: 8px;
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
  padding: 32px 40px 0 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 28px 28px;
`;
