import React, { useState, useEffect } from "react";
import styled from "styled-components";
import arrowDown from "../../assets/images/MusicSearchPage/arrow_down.svg";
import SideSection from "../../components/common/SideSection";
import SearchBar from "../../components/MusicSearchPage/SearchPage/SearchBar";
import SearchSongs from "../../components/MusicSearchPage/SearchPage/SearchSongs";
import SearchPlaces from "../../components/MusicSearchPage/SearchPage/SearchPlaces";

const values = ["정확도순", "등록 핀 많은순", "최근 핀 등록순"];

const SearchContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("정확도순");
  const [showSideBar, setShowSideBar] = useState(true);
  const [selectedOption, setSelectedOption] = useState(() => {
    return sessionStorage.getItem("selectedOption") || "노래";
  });
  const [keyword, setKeyword] = useState("");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("selectedOption", selectedOption);
  }, [selectedOption]);

  const onValueClicked = value => () => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const toggling = () => setIsOpen(!isOpen);

  const handleOptionChange = option => {
    setSelectedOption(option);
  };

  const handleSearch = newKeyword => {
    const encodedKeyword = encodeURIComponent(newKeyword);
    setKeyword(encodedKeyword);
    console.log(keyword);
    setSelectedValue("정확도순");
  };

  const sortOptions = {
    정확도순: "ACCURACY",
    "등록 핀 많은순": "COUNT",
    "최근 핀 등록순": "NEWEST",
  };

  return (
    <SideSection showSideBar={showSideBar}>
      <Content>
        <SearchBar
          setShowSortDropdown={setShowSortDropdown}
          optionChange={handleOptionChange}
          onSearch={handleSearch}
        />
        <Sorting>
          {showSortDropdown && (
            <DropdownSorting>
              <DropdownHeader onClick={toggling}>
                <SortingText>{selectedValue}</SortingText>
                <DropIcon src={arrowDown} isOpen={isOpen} />
              </DropdownHeader>
              {isOpen && (
                <DropdownList>
                  {values.map(value => (
                    <ListItem
                      onClick={onValueClicked(value)}
                      style={{
                        fontWeight: selectedValue === value ? "700" : "400",
                      }}
                    >
                      {value}
                    </ListItem>
                  ))}
                </DropdownList>
              )}
            </DropdownSorting>
          )}
        </Sorting>
        <SearchResult>
          {selectedOption === "노래" && keyword && (
            <SearchSongs
              keyword={keyword}
              sortBy={sortOptions[selectedValue]}
            />
          )}
          {selectedOption === "장소" && keyword && (
            <SearchPlaces
              keyword={keyword}
              sortBy={sortOptions[selectedValue]}
            />
          )}
        </SearchResult>
        {!showSortDropdown && (
          <BeforeMessage>
            {`${selectedOption}를 검색해 다른 사람들의 핀을 확인해보세요`}
          </BeforeMessage>
        )}
      </Content>
    </SideSection>
  );
};

export default SearchContainer;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

const Sorting = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 462px;
`;

const DropdownSorting = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 33px;
  align-items: center;
  position: relative;
`;

const DropdownHeader = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SortingText = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  padding-right: 11.69px;
`;

const DropIcon = styled.img`
  width: 10.616px;
  height: 6.016px;
  margin-right: 4.69px;
  cursor: pointer;
  transform: ${props => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownList = styled.div`
  display: flex;
  width: 92px;
  padding: 12px;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  border-radius: 0px 0px 8px 8px;
  border: 1px solid var(--gray02, #747474);
  background: var(--f8f8f8, #fcfcfc);
  z-index: 1000;
  position: absolute;
  top: 60%;
`;

const ListItem = styled.div`
  height: 25px;
  align-self: stretch;
  color: var(--light_black, #232323);
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  cursor: pointer;
`;
const BeforeMessage = styled.div`
  color: var(--gray, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  margin-top: 325px;
`;

const SearchResult = styled.div``;
