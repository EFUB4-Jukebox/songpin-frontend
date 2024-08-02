import React, { useState, useEffect } from "react";
import styled from "styled-components";
import lockIcon from "../../assets/images/MyPage/lock.svg";
import { useNavigate } from "react-router-dom";
import PinModalBox from "../common/PinModalBox";
import { postAllMarkers } from "../../services/api/map";

const MusicInfoPinPreview = ({ pin }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const {
    creatorNickname,
    listenedDate,
    memo,
    visibility,
    placeName,
    latitude,
    longitude,
    isMine,
  } = pin;

  const navigate = useNavigate();

  const goUsersPage = () => {
    navigate("/users");
  };

  // const moveToLocation = (latitude, longitude) => {
  //   const request = {
  //     boundCoords: {
  //       swLat: latitude - 0.05, // 대략적인 예시 좌표
  //       swLng: longitude - 0.05,
  //       neLat: latitude + 0.05,
  //       neLng: longitude + 0.05,
  //     },
  //     genreNameFilters: null,
  //   };

  //   postAllMarkers(request)
  //     .then(data => {
  //       console.log("Received pins data:", data);
  //     })
  //     .catch(error => {
  //       console.error("Error loading pins:", error.message);
  //     });
  // };

  // const goMapLocation = () => {
  //   moveToLocation(latitude, longitude);
  // };

  const goMapLocation = () => {
    const location = {
      lat: latitude,
      long: longitude,
    };
  };

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };

  const text = memo || "메모가 비어 있습니다";
  const maxLength = 59;
  const showMoreBtn = text.length > maxLength;
  const displayText = showMoreBtn && isTruncated ? text.substring(0, 55) : text;

  const formatDate = dateString => {
    const date = new window.Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <PinsContainer>
      <PinPreview>
        <PinContent>
          <UserView>
            <UserName onClick={goUsersPage}>{creatorNickname}</UserName>
            {isMine && <PinModalBox top="32px" right="0px" />}
          </UserView>
          <PinMemo
            onClick={isTruncated ? () => {} : toggleTruncation}
            isTruncated={isTruncated}
            visibility={visibility}
            isEmpty={!memo}
          >
            {visibility === "PRIVATE" && <SecretPin src={lockIcon} />}
            {visibility === "PRIVATE" ? "비공개 메모입니다" : displayText}
            {showMoreBtn && isTruncated && (
              <MoreBtn onClick={toggleTruncation}> ...더보기</MoreBtn>
            )}
          </PinMemo>
          <Details onClick={goMapLocation}>
            <Date>{formatDate(listenedDate)}</Date>
            <Place>{placeName}</Place>
            <PlaceText>에서</PlaceText>
          </Details>
        </PinContent>
      </PinPreview>
    </PinsContainer>
  );
};

export default MusicInfoPinPreview;

const PinsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PinPreview = styled.div`
  width: 462px;
  min-height: 113px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--offwhite, #efefef);
  margin-bottom: 12px;
`;

const PinContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px 15px 15px;
  display: inline-block;
`;

const UserView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`;

const UserName = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  cursor: pointer;
  width: auto;
  display: inline-block;
`;

const PinMemo = styled(UserName)`
  line-height: 150%; /* 24px */
  padding-top: 7px;
  padding-right: 8px;
  cursor: ${props => (props.isTruncated ? "auto" : "pointer")};
  width: 426px;
  min-height: 27px;
  color: ${props =>
    props.visibility === "PRIVATE" || props.isEmpty
      ? "var(--gray02, #747474)"
      : "#000"};
`;

const SecretPin = styled.img`
  width: 13px;
  height: 16px;
  flex-shrink: 0;
  padding-right: 8px;
  padding-left: 3px;
  vertical-align: calc(-8%);
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

const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 4px;
  white-space: nowrap;
  padding-right: 10px;
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
  cursor: pointer;
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
