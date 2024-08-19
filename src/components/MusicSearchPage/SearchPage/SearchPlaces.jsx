import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import PlaceComponent from "./PlaceComponent";
import { getPlaces } from "../../../services/api/place";
import LoadingSpinner from "../../common/LoadingSpinner";

const SearchPlaces = ({ keyword, sortBy }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isInitialSearch, setIsInitialSearch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (keyword.trim()) {
        try {
          setSearchResults([]);
          setIsInitialSearch(false);
          setIsLoading(true);
          setPage(0);

          const data = await getPlaces({
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
        setIsInitialSearch(true);
        setSearchResults([]);
        setHasMore(false);
      }
    };
    fetchPlaces();
  }, [keyword, sortBy]);

  const loadMoreResults = async () => {
    if (!hasMore || isLoading) return;

    try {
      setIsLoading(true);

      const data = await getPlaces({
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
    <PlacesList>
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
          <Line />
          {searchResults.map(result => (
            <PlaceComponent
              placeId={result.placeId}
              placeName={result.placeName}
              placePinCount={result.placePinCount}
            />
          ))}
        </>
      )}

      <div ref={loaderRef} style={{ height: "20px" }}></div>
    </PlacesList>
  );
};

export default SearchPlaces;
const Loading = styled.div`
  position: relative;
  bottom: 130px;
`;

const PlacesList = styled.div`
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

const Line = styled.div`
  width: 480px;
  height: 1px;
  background: var(--gray, #bcbcbc);
`;

const EmptyMessage = styled(BeforeMessage)``;
