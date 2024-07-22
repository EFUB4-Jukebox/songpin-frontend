import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/UsersPage/SearchBar';
import arrowDown from '../../assets/images/MusicSearchPage/arrow_down.svg';
import Playlist from '../../components/PlaylistPage/Playlist';
import SideSection from '../../components/common/SideSection';

const values = ['정확도순', '핀 등록 많은순', '업데이트순'];

const PlaylistSearchPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('정확도순');
  const navigate = useNavigate();

  const onValueClicked = (value) => () => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const toggling = () => setIsOpen(!isOpen);

  const handlePlaylistClick = (id) => {
    navigate(`/playlist/${id}`);
  };

  return (
    <SideSection>
    <ContentBox>
          {/* 검색된 문구가 남아있어야 함  */}
          <SearchBar placeholder="플레이리스트 이름을 검색" />
        </ContentBox>
        <Sorting>
          <DropdownSorting>
            <DropdownHeader onClick={toggling}>
              <SortingText>{selectedValue}</SortingText>
              <DropIcon src={arrowDown} isOpen={isOpen} />
            </DropdownHeader>
            {isOpen && (
              <DropdownList>
                {values.map((value) => (
                  <ListItem
                    onClick={onValueClicked(value)}
                    style={{ fontWeight: selectedValue === value ? '700' : '400' }}
                  >
                    {value}
                  </ListItem>
                ))}
              </DropdownList>
            )}
          </DropdownSorting>
        </Sorting>
        <PlaylistFeed>
          <Playlist onClick={() => handlePlaylistClick(1)} />
          <Playlist onClick={() => handlePlaylistClick(2)} />
          <Playlist onClick={() => handlePlaylistClick(3)} />
        </PlaylistFeed>
        </SideSection>
  );
};

export default PlaylistSearchPage;


const ContentBox = styled.div`
  padding: 33px;
  padding-top: 40px;
  padding-bottom: 15px;
`;

const PlaylistFeed = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0px 20px 70px 20px;
`;

const NoPlaylist = styled.div`
  color: var(--gray02, #747474);
  width: 528px;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  display: flex;
  justify-content: center;
  padding-top: 130px;
  padding-bottom: 130px;
`;

const Sorting = styled.div`
  display: flex;
  justify-content: flex-end;
  /* width: 528px; */
  padding: 0px 33px 9px 33px;
`;

const DropdownSorting = styled.div`
  display: flex;
  justify-content: flex-end;

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
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
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
  top: 100%;
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
