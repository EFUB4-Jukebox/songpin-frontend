import react from 'react';
import styled from 'styled-components';
import albumImgExample from '../../assets/images/MyPage/album-eg.png';
import pinIcon from '../../assets/images/MyPage/vector-icon.svg';
import PinModalBox from './PinModalBox';

const PinCalendarViewComponent = () => {
  return (
    <PinBox>
      <AlbumImg src={albumImgExample} />
      <Content>
        <TitleSection>
          <SongInfo>
            <SongTitle>
              <SongIcon src={pinIcon} />
              <TitleText>사랑하긴 했었나요 스쳐지나가는 인연이었나요</TitleText>
            </SongTitle>
            <Singer>잔나비</Singer>
          </SongInfo>
          <PinModalBox />
        </TitleSection>
        <Info>
          <Date>2024.04.04</Date>
          <Place>신촌</Place>
          <PlaceText>에서</PlaceText>
        </Info>
      </Content>
    </PinBox>
  );
};

export default PinCalendarViewComponent;

const PinBox = styled.div`
  width: 436px;
  height: 74px;
  margin: 0 33px 12px 33px;
  padding: 11px 12px 15px 14px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--offwhite, #efefef);
  position: relative;
  display: flex;
  flex-direction: row;
`;

const AlbumImg = styled.img`
  width: 78px;
  height: 78px;
  flex-shrink: 0;
  border-radius: 4px;
  padding-right: 25px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 4px;
  justify-content: space-between;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SongTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const SongIcon = styled.img`
  width: 20px;
  height: 20.005px;
  flex-shrink: 0;
`;

const TitleText = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 252px;
`;

const Singer = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  padding-top: 4px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 11px;
  white-space: nowrap;
`;

const Date = styled.div`
  overflow: hidden;
  color: var(--gray02, #747474);
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const Place = styled(Date)`
  max-width: 218px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  padding-left: 8px;
`;

const PlaceText = styled(Date)`
  white-space: nowrap;
  flex-shrink: 0;
`;
