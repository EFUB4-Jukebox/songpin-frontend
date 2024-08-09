import React, { useState, useEffect } from "react";
import styled from "styled-components";
import search from "../../assets/images/MusicSearchPage/search.svg";

const SearchBar = ({ placeholder, value, onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]); // value가 변경될 때마다 inputValue 업데이트

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      handleSearch(); // Enter 키가 눌렸을 때 검색 수행
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
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
            />
          </InputBox>
        </Search>
        <SearchIcon src={search} alt="검색 아이콘" onClick={handleSearch} />
      </SearchBox>
      <Line />
    </SearchBarComponent>
  );
};

export default SearchBar;

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

const InputBox = styled.div`
  padding-left: 8px;
`;

const Input = styled.input`
  color: var(--light_black, #232323);
  width: 414px;

  &::placeholder {
    color: var(--gray, #bcbcbc);
  }
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: none;
  outline: none;
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
