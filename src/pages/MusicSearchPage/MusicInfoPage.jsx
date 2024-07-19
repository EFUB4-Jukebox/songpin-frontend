import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/images/MusicSearchPage/arrow_back.svg';
import mapIconSpark from '../../assets/images/MusicSearchPage/spark_green.svg';
import mapIconSparkBlack from '../../assets/images/MusicSearchPage/spark_black.svg';
import uncheckedBox from '../../assets/images/MusicSearchPage/checkbox.svg';
import checkedBox from '../../assets/images/MusicSearchPage/checkbox-oncheck.svg';
import MusicInfoPinPreview from '../../components/MusicSearchPage/MusicInfoPinPreview';
import SideSection from '../../components/common/SideSection';

const MusicInfoPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [title, setTitle] = useState('Yes, and? aaaaaaaaaaaaaaaaaa');
  const [titleWidth, setTitleWidth] = useState(0);
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const width = titleRef.current.offsetWidth;
      setTitleWidth(width);
    }
  }, [title]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const navigate = useNavigate();
  const goSearchPage = () => {
    navigate('/search');
  };

  return (
    <SideSection>
      <MusicInfo>
        <SongInfo>
          <BackIcon src={backIcon} onClick={goSearchPage} />
          <AlbumImg src="https://s3-alpha-sig.figma.com/img/676f/30fc/fd783e275b3ebcc7a70f49a291035300?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=epOzyXB0QMYKi8SRhdRvKZzyq58YSvoNaJMLg5VD4PIP6zYLrTOk5-N-m3LlpmMlVR7sLVNT4wRpabkXf9P9t~4xLPLerwxPrC8EMAR7GviyOGXwVxblJpAqq4T5Do2jjUmZqwz8TzzWl196AIz6~obC1gCyQqY-ZySx8b2b-77qhxSQJuXFo6ivLTsgQ9c2YtvTr6hLA~JFhwrkuRnBBy0Ip1310J-WCl4TTAvgVu7qH3NeSbQAtKjACccyFkrBGkPF5Gf9URd2qXP37uK7COCblCKbvvwosb86TAARTglVtwSCJRaFlKS0HRsBYIOS51Gn0gjdT9W~LoTrMEDT8Q__" />
          <SongDetail>
            <SongTitle>
              <MapIcon src={mapIconSpark} />
              <RotateBox
                onMouseEnter={() => {
                  if (titleWidth > 424) setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}
              >
                <TitleText ref={titleRef} isHovered={isHovered}>
                  {titleWidth > 424
                    ? `${title} ${String.fromCharCode(8195)} ${String.fromCharCode(8195)} ${title}`
                    : title}
                </TitleText>
                {titleWidth > 424 && <FadeOut />}
              </RotateBox>
            </SongTitle>
            <Singer>Ariana Grande</Singer>
            <PinCount>
              <MapIconBlack src={mapIconSparkBlack} />
              <Num>50</Num>
            </PinCount>
          </SongDetail>
          <PinInfo>
            <ListenedTimes>최근 들은 날짜: 2020.3.20</ListenedTimes>
            <CheckMyPin>
              <CheckText>나의 핀 보기</CheckText>
              <Checkbox src={isChecked ? checkedBox : uncheckedBox} onClick={handleCheckboxChange} />
            </CheckMyPin>
          </PinInfo>
          <MusicInfoPinPreview />
          <MusicInfoPinPreview />
          {/* <NoPinMessage>아직 공개된 핀 메모가 없습니다.</NoPinMessage> */}
          {/* <NoMyPinMessage>아직 이 음악에 대해 핀을 등록하지 않았습니다.</NoMyPinMessage> */}
        </SongInfo>
      </MusicInfo>
    </SideSection>
  );
};

export default MusicInfoPage;

const MusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 12px;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackIcon = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  cursor: pointer;
`;

const AlbumImg = styled.img`
  width: 462px;
  height: 450px;
  flex-shrink: 0;
  border-radius: 18px;
  /* background:
    linear-gradient(0deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%),
    url(<path-to-image>) lightgray 50% / cover no-repeat; */
  margin-top: 34px;
`;

const SongDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const SongTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
  width: 462px;
`;

const MapIcon = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  padding-right: 8px;
`;

const RotateBox = styled.div`
  height: 40px;
  width: 462px;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
`;

const rotateText = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const TitleText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
  display: inline-block;
  animation: ${(props) => (props.isHovered ? rotateText : 'none')} 9s linear infinite;
`;

const FadeOut = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
  width: 40px;
  background: linear-gradient(to left, white, rgba(255, 255, 255, 0));
`;

const Singer = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 11px;
`;

const PinCount = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3px;
`;

const MapIconBlack = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  /* opacity: 0.8; */
  margin-right: 8px;
`;

const Num = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const PinInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ListenedTimes = styled.div`
  color: var(--gray02, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  margin-bottom: 12px;
`;

const CheckMyPin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 28px;
`;

const CheckText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  padding-right: 8px;
`;

const Checkbox = styled.img`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  cursor: pointer;
`;

const NoPinMessage = styled.div`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  margin: 142px 107px 142px 105px;
`;

const NoMyPinMessage = styled(NoPinMessage)`
  margin: 142px 49px 142px 49px;
`;
