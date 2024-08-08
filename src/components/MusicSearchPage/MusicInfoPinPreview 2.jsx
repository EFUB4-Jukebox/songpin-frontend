import React, { useState } from "react";
import styled from "styled-components";
import lockIcon from "../../assets/images/MyPage/lock.svg";
import { useNavigate } from "react-router-dom";

const MusicInfoPinPreview = () => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };

  const text =
    "사랑하긴 했었나요 스쳐가는 인연이었나요 누가 내 가슴에다 불을 질렀나 누가 내 심장에다 못을 박았나 그대의 눈빛은 날 얼어붙게 하네";
  const maxLength = 59;
  const showMoreBtn = text.length > maxLength;
  const displayText = showMoreBtn && isTruncated ? text.substring(0, 55) : text;

  const navigate = useNavigate();
  const goUsersPage = () => {
    navigate("/users");
  };

  return (
    <PinsContainer>
      <PinPreview>
        <PinContent>
          <UserName onClick={goUsersPage}>채연</UserName>
          <PinMemo
            onClick={isTruncated ? () => {} : toggleTruncation}
            isTruncated={isTruncated}
          >
            <SecretPin src={lockIcon} />
            {displayText}
            {showMoreBtn && isTruncated && (
              <MoreBtn onClick={toggleTruncation}> ...더보기</MoreBtn>
            )}
          </PinMemo>
          <Details>
            <Date>2024.04.04</Date>
            <Place>이화여대 학문관</Place>
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
  padding: 17px 21px 15px 15px;
  display: inline-block;
  width: 426px;
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
  cursor: ${props => (props.isTruncated ? "auto" : "pointer")};
  width: 426px;
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
