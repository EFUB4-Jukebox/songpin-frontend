import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginModal = ({ setPwResetModal, setCompleteLogin, setSignupModal, setLoginModal }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setLoginModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [setLoginModal]);

  const handleSignup = () => {
    setLoginModal(false);
    setSignupModal(true);
  };
  const handlePwReset = () => {
    setLoginModal(false);
    setPwResetModal(true);
  };
  const handleComplete = () => {
    setLoginModal(false);
    setCompleteLogin(true);
  };

  return (
    <>
      {
        <Wrapper>
          <LoginWrapper ref={modalRef}>
            <div className="login">로그인하세요</div>
            <Input placeholder="이메일" />
            <Input placeholder="비밀번호" />
            <div className="loginButton">
              <Button onClick={handleComplete} name="로그인" />
            </div>
            <SignUpAndPWReSet>
              <SignUpAndPWReSetText>
                <div>회원이 아니신가요?</div>
                <div>비밀번호를 잊으셨나요?</div>
              </SignUpAndPWReSetText>
              <SignUpAndPWReSetButton>
                <div onClick={handleSignup}>가입하기</div>
                <div onClick={handlePwReset}>비밀번호 재설정</div>
              </SignUpAndPWReSetButton>
            </SignUpAndPWReSet>
          </LoginWrapper>
        </Wrapper>
      }
    </>
  );
};

const LoginWrapper = styled.div`
  width: 621px;
  height: 728px;
  flex-shrink: 0;
  min-width: 364px;
  min-height: 562px;
  flex-shrink: 0;
  border-radius: 18px;
  background-color: var(--f8f8f8, #fcfcfc);
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;

  .login {
    color: var(--light_black, #232323);
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
    margin-bottom: 30px;
  }
  .loginButton {
    margin-top: 30px;
  }
`;

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpAndPWReSet = styled.div`
  display: flex;
  gap: 18px;
  color: var(--gray02, #747474);
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  margin-top: 30px;
`;
const SignUpAndPWReSetText = styled.div`
  color: var(--gray02, #747474);
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 16px;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal; /* 28px */
`;
const SignUpAndPWReSetButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  color: var(--light_black, #232323);
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;
export default LoginModal;
