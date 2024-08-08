import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SideSection from '../../components/common/SideSection';
import MyPageSearchBar from '../../components/MyPage/MyPageSearchBar';
import backIcon from '../../assets/images/MusicSearchPage/arrow_back.svg';
import PinCalendarViewComponent from '../../components/MyPage/PinCalendarViewComponent';

const MyPinSearchPage = () => {
  const navigate = useNavigate();
  const goMyPage = () => {
    navigate('/mypage');
  };

  return (
    <SideSection>
      <BackIcon src={backIcon} onClick={goMyPage} />
      <Content>
        <MyPageSearchBar />
        <PinCalendarViewComponent />
        <PinCalendarViewComponent />
        <PinCalendarViewComponent />
        <PinCalendarViewComponent />
      </Content>
      {/* <Empty>
        <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>
      </Empty> */}
    </SideSection>
  );
};

export default MyPinSearchPage;

const BackIcon = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  cursor: pointer;
  padding-left: 34px;
  padding-top: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 22px;
  padding-bottom: 31px;
`;

const Empty = styled.div`
  height: calc(100vh - 285px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyMessage = styled.div`
  color: var(--gray02, rgb(116, 116, 116));
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;
