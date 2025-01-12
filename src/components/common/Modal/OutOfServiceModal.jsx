import styled from "styled-components";
import {ReactComponent as Songpin} from "../../../assets/common/songpinLogo.svg";

const OutofServiceModal = ({ onClose }) => {
  return (
    <Wrapper>
      <ModalWrapper>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <LogoWrapper>
          <Songpin />
        </LogoWrapper>
        <Title>SongPin 서비스 종료 안내</Title>
        <Text>
          안녕하세요, SongPin 운영팀입니다. <br /><br />
          저희 SongPin 서비스가 서버 사용 기간 만료로 인해 <br />
          <Date>2025년 1월 4일</Date>부로 부득이하게 종료됨을 안내드립니다.<br /><br />
          그동안 SongPin을 이용해 주신 모든 분들의 <br />
          소중한 관심과 사랑에 진심으로 감사드립니다.<br /><br />
          Team 주크박스 드림
        </Text>
      </ModalWrapper>
    </Wrapper>
  );
};

const ModalWrapper = styled.div`
  width: 621px;
  height: auto;
  max-height: 80%;
  padding: 50px 32px;
  box-sizing: border-box;
  flex-shrink: 0;
  min-width: 364px;
  flex-shrink: 0;
  border-radius: 18px;
  background-color: #fcfcfc;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  position: relative;
  overflow-y: auto;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 250px;
  height: auto;
`;

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #747474;
  cursor: pointer;
  &:hover {
    color: #232323;
  }
`;

const Title = styled.div`
  color: #232323;
  font-family: Pretendard, sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5em;
  text-align: center;
  margin-bottom: 20px;
`;

const Date = styled.div`
  color: #232323;
  font-weight: 700;
  display: inline;
`;

const Text = styled.div`
  color: #747474;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.4em;
  text-align: center;
`;

export default OutofServiceModal;
