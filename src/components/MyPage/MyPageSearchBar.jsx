import React, { useState } from "react";
import styled from "styled-components";
import search from "../../assets/images/MusicSearchPage/search.svg";

const MyPageSearchBar = ({ inputValue, setInputValue, completeSearch }) => {
  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    completeSearch(inputValue);
  };

  const handleEnterKeySearch = event => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <SearchBarComponent>
      <SearchBox>
        <Search>
          <InputBox>
            <Input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="노래 제목, 가수명, 장소명을 검색"
              onKeyPress={handleEnterKeySearch}
            />
          </InputBox>
        </Search>
        <SearchIcon onClick={completeSearch} src={search} alt="검색 아이콘" />
      </SearchBox>
      <Line />
    </SearchBarComponent>
  );
};

export default MyPageSearchBar;

const SearchBarComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 462px;
  flex-wrap: wrap;
  padding-bottom: 29px;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const Search = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputBox = styled.div`
  padding-left: 4px;
`;

const Input = styled.input`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: none;
  outline: none;
  width: 414px;
  &::placeholder {
    color: var(--gray, #bcbcbc);
  }
`;

const SearchIcon = styled.img`
  width: 30px;
  height: 30px;
  display: flex;
  cursor: pointer;
`;

const Line = styled.div`
  width: 462px;
  height: 1px;
  background: var(--light_black, #232323);
  margin-top: 11px;
`;
