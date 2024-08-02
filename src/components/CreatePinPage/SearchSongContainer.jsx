import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SideSection from "./SideSection";
import PlainSearchBar from "./PlainSearchBar";
import PinComponent from "./PinComponent";
import { getExSpotify } from "../../services/api/spotify";

const SearchSongContainer = ({ onPinSelect }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [offset, setOffset] = useState(0);
  const [isInitialSearch, setIsInitialSearch] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  const handleSearch = async query => {
    try {
      setKeyword(query.trim());
      setOffset(0);
      setSearchResults([]); // 검색 결과 초기화
      setIsInitialSearch(false);
      setHasMore(true);
      setIsLoading(true);

      const data = await getExSpotify({
        keyword: query.trim(),
        offset: 0,
      });

      console.log(data);
      setSearchResults(data);
      setHasMore(data.length > 0);
      setIsLoading(false);
    } catch (error) {
      console.error("검색 에러: ", error);
      setIsLoading(false);
    }
  };

  const handlePinClick = result => {
    const pinInfo = {
      title: result.title,
      singer: result.artist,
      image: result.imgPath,
    };
    onPinSelect(pinInfo);
  };

  const loadMoreResults = async () => {
    if (!hasMore || isLoading) return;

    try {
      const data = await getExSpotify({
        keyword,
        offset,
      });

      setSearchResults(prevResults => [...prevResults, ...data]);
      setOffset(prevOffset => prevOffset + 20); // offset 20 증가
      setHasMore(data.length > 0);
      setIsLoading(false);
    } catch (error) {
      console.error("검색 에러: ", error);
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
  }, [offset, keyword, hasMore, isLoading]);

  return (
    <SideSection>
      <Content>
        <PlainSearchBar onSearch={handleSearch} />
        <SearchResult>
          {searchResults.map(result => (
            <PinComponent
              key={result.providerTrackCode}
              imgPath={result.imgPath}
              title={result.title}
              artist={result.artist}
              onPinClick={() => handlePinClick(result)}
            />
          ))}
          {searchResults.length === 0 && isInitialSearch && (
            <EmptySearchResult>
              <BeforeMessage>
                노래를 검색해 다른 사람들의 핀을 확인해보세요
              </BeforeMessage>
            </EmptySearchResult>
          )}
          {searchResults.length === 0 && !isInitialSearch && !isLoading && (
            <EmptySearchResult>
              <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>
            </EmptySearchResult>
          )}
          <div ref={loaderRef} style={{ height: "20px" }}></div>
        </SearchResult>
      </Content>
    </SideSection>
  );
};

export default SearchSongContainer;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

const SearchResult = styled.div``;

const EmptySearchResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 213px);
`;

const BeforeMessage = styled.div`
  color: var(--gray, #bcbcbc);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;

const EmptyMessage = styled(BeforeMessage)`
  color: var(--gray02, #747474);
`;
