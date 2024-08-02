import React, { useState } from "react";
import styled from "styled-components";
import search from "../../assets/images/MusicSearchPage/search.svg";

const PlainSearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
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
              placeholder="노래 제목 또는 가수명을 검색"
              onKeyPress={handleEnterKeySearch}
            />
          </InputBox>
        </Search>
        <SearchIcon
          src={search}
          alt="검색 아이콘"
          onClick={handleSearchClick}
        />
      </SearchBox>
      <Line />
    </SearchBarComponent>
  );
};

export default PlainSearchBar;

const SearchBarComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 462px;
  flex-wrap: wrap;
  padding-bottom: 20px;
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

const InputBox = styled.div``;

const Input = styled.input`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: none;
  outline: none;
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
