import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import PinComponent from "../PinComponent";
import { getSongs } from "../../../services/api/song";
import LoadingSpinner from "../../common/LoadingSpinner";

const SearchSongs = ({ keyword, sortBy }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchSongs = async () => {
      if (keyword.trim()) {
        try {
          setSearchResults([]);
          setIsLoading(true);
          setPage(0);
          console.log(keyword);
          console.log(sortBy);
          const data = await getSongs({
            keyword,
            sortBy,
            page: 0,
            size: 20,
          });

          console.log(data);
          setSearchResults(data);
          setPage(1);
          setHasMore(data.length === 20);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setHasMore(false);
      }
    };
    fetchSongs();
  }, [keyword, sortBy]);

  const loadMoreResults = async () => {
    if (!hasMore || isLoading) return;

    try {
      setIsLoading(true);

      const data = await getSongs({
        keyword,
        sortBy,
        page,
        size: 20,
      });

      setSearchResults(prevResults => [...prevResults, ...data]);
      setPage(prevPage => prevPage + 1);
      setHasMore(data.length === 20);
    } catch (error) {
      console.error("검색 에러: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreResults(); // 스크롤 끝까지 내릴 때 추가 데이터 요청
        }
      },
      {
        root: null, // 기본값 viewport
        rootMargin: "100px 0px 0px 0px",
        threshold: 1.0, // 100%에서 호출
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [page, keyword, isLoading, hasMore]);

  return (
    <SongsList>
      {isLoading && searchResults.length === 0 ? (
        <Loading>
          <LoadingSpinner />
        </Loading>
      ) : searchResults.length === 0 && !isLoading ? (
        <EmptySearchResult>
          <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>
        </EmptySearchResult>
      ) : (
        <>
          {searchResults.map(result => (
            <PinComponent
              key={result.songInfo?.songId}
              songInfo={result.songInfo}
              avgGenreName={result.avgGenreName}
              pinCount={result.pinCount}
            />
          ))}
        </>
      )}
      <div ref={loaderRef} style={{ height: "15px" }}></div>
    </SongsList>
  );
};

export default SearchSongs;
const Loading = styled.div`
  position: relative;
  bottom: 130px;
`;
const SongsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptySearchResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 263px);
`;

const BeforeMessage = styled.div`
  color: var(--gray, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;

const EmptyMessage = styled(BeforeMessage)``;
