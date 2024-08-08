import styled from 'styled-components';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const PwResetPage = () => {
  const navigate = useNavigate();
  const resetComplete = () => {
    navigate('/resetPasswordComplete');
  };
  return (
    <Wrapper>
      <div className="resetText">비밀번호 재설정</div>
      <Input placeholder="새 비밀번호" />
      <Input placeholder="새 비밀번호 확인" infoMsg="비밀번호가 일치하지 않습니다." />
      <ButtonWrapper>
        <Button onClick={resetComplete} name="완료" />
      </ButtonWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 16px;
  .resetText {
    color: var(--light_black, #232323);
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px; /* 125% */
    margin-bottom: 26px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 43px;
`;
export default PwResetPage;
