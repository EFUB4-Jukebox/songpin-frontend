import react, { useEffect, useState } from "react";
import styled from "styled-components";
import albumImgExample from "../../assets/images/MyPage/album-eg.png";
import pinIcon from "../../assets/images/MyPage/vector-icon.svg";
import lockIcon from "../../assets/images/MyPage/lock.svg";
import PinModalBox from "../common/PinModalBox";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { GenreList } from "../../constants/GenreList";
import { useNavigate } from "react-router-dom";

const PinMemoComponent = ({
  title,
  artist,
  imgPath,
  listenedDate,
  placeName,
  genre,
  pinId,
}) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };
  const text =
    "사랑하긴 했었나요 스쳐가는 인연이었나요 누가 내 가슴에다 불을 질렀나 누가 내 심장에다 못을 박았나 그대의 눈빛은 날 얼어붙게 하네 사랑하긴 했었나요 스쳐가는 인연이었나요 누가 내 가슴에다 불을 질렀나 누가 내 심장에다 못을 박았나 그대의 눈빛은 날 얼어붙게 하네 \n사랑하긴 했었나요 스쳐가는 인연이었나요 누가 내 가슴에다 불을 질렀나 누가 내 심장에다 못을 박았나 그대의 눈빛은 날 얼어붙게 하네";
  const maxLength = 59;
  const showMoreBtn = text.length > maxLength;
  const displayText = showMoreBtn && isTruncated ? text.substring(0, 55) : text;

  // const getLineLength = event => {
  //   const { lines } = event.nativeEvent;
  // };

  const navigate = useNavigate();
  const goMusicInfoPage = () => {
    navigate("/details-song");
  };
  const goLocation = () => {
    // 지도 위치 이동 코드 추가
  };

  const formattedDate = format(new Date(listenedDate), "yy.MM.dd", {
    locale: ko,
  });

  const genreIcon = GenreList.find(it => it.EngName === genre)?.imgSrc;
  return (
    <PinBox>
      <TitleSection>
        <AlbumImg src={imgPath} />
        <SongInfo>
          <SongTitle>
            <SongIcon src={genreIcon} />
            <TitleText>{title}</TitleText>
          </SongTitle>
          <Singer>{artist}</Singer>
        </SongInfo>
        <PinModalBox top="48px" right="12px" pinId={pinId} />
      </TitleSection>
      <DetailsSection>
        <Memo>
          <Text
            onClick={isTruncated ? () => {} : toggleTruncation}
            isTruncated={isTruncated}
            style={{ whiteSpace: "pre-wrap" }}
            // onTextLayout={getLineLength}
          >
            <SecretPin src={lockIcon} />
            {displayText}
            {showMoreBtn && isTruncated && (
              <MoreBtn onClick={toggleTruncation}> ...더보기</MoreBtn>
            )}
          </Text>
        </Memo>
        <Info onClick={goLocation}>
          <PinDate>{formattedDate}</PinDate>
          <Place>{placeName}</Place>
          <PlaceText>에서</PlaceText>
        </Info>
      </DetailsSection>
    </PinBox>
  );
};

export default PinMemoComponent;

const PinBox = styled.div`
  margin: 0 33px 12px 33px;
  padding: 15px 12px 15px 14px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--offwhite, #efefef);
  position: relative;
  width: 436px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const AlbumImg = styled.img`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 4px;
  padding-top: 1px;
  padding-right: 12px;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 250px;
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
  height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 306px;
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

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 9px;
  padding-right: 9px;
`;

const Memo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
`;

const SecretPin = styled.img`
  width: 13px;
  height: 16px;
  flex-shrink: 0;
  padding-right: 8px;
  padding-left: 3px;
  vertical-align: calc(-12%);
`;

const MoreBtn = styled.span`
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 4px;
  white-space: nowrap;
`;

const PinDate = styled.div`
  color: var(--gray02, #747474);
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const Place = styled.div`
  color: var(--gray02, #747474);
  text-align: right;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  max-width: 218px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  padding-left: 8px;
`;

const PlaceText = styled.div`
  color: var(--gray02, #747474);
  text-align: right;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  white-space: nowrap;
  flex-shrink: 0;
  padding-right: 2px;
`;
