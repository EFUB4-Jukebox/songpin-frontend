import styled from 'styled-components';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const PwResetCompletePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };
  return (
    <Wrapper>
      <div className="resetCompleteText">
        비밀번호 재설정이 완료되었습니다. <br /> 새 비밀번호로 로그인해주세요.
      </div>

      <Button onClick={handleLogin} name="로그인하러 가기" />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 44px;
  .resetCompleteText {
    color: var(--light_black, #232323);
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px; /* 166.667% */
  }
`;

export default PwResetCompletePage;
