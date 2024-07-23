import React, { useState } from 'react';
import styled from 'styled-components';
import search from '../../assets/images/MusicSearchPage/search.svg';
import arrow_dropdown from '../../assets/images/MusicSearchPage/arrow_drop_down.svg';

const options = ['노래', '장소'];

const PlainSearchBar = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <SearchBarComponent>
      <SearchBox>
        <Search>
          <InputBox>
            <Input type="text" value={inputValue} onChange={handleChange} />
          </InputBox>
        </Search>
        <SearchIcon src={search} alt="검색 아이콘" />
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

const InputBox = styled.div`
  padding-left: 8px;
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
