import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const SignupModal = ({ setCompleteLogin, setLoginModal, setSignupModal }) => {
  const modalRef = useRef(null);
  const [personalInfoConsent, setPersonalInfoConsent] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSignupModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [setSignupModal]);

  const handlePersonalInfoConsent = () => {
    setPersonalInfoConsent(!personalInfoConsent);
  };

  const handleSignup = () => {
    setSignupModal(false);
    setLoginModal(true);
  };

  const handleComplete = () => {
    setSignupModal(false);
    setCompleteLogin(true);
  };

  return (
    <>
      {
        <Wrapper>
          <SignupWrapper ref={modalRef}>
            <div className="signup">회원가입</div>
            <Input placeholder="이메일" infoMsg="이메일은 50자 이내여야 합니다." />
            <Input
              placeholder="닉네임"
              infoMsg="닉네임은 8자 이내, 한글 문자, 영어 대소문자, 숫자 조합만 허용됩니다."
            />

            <Input placeholder="비밀번호" />
            <Input placeholder="비밀번호 확인" infoMsg="비밀번호는 20자 이내여야 합니다." />

            <PersonalInfoConsent>
              <div className="personalInfoConsentCheck">
                <div>위치정보 및 개인정보 수집에 동의합니다. (필수)</div>
                <input type="checkbox" checked={personalInfoConsent} onChange={handlePersonalInfoConsent}></input>
              </div>
              <div className="personalInfoConsentMsg">개인정보 수집에 동의 시에만 서비스를 이용할 수 있습니다.</div>
            </PersonalInfoConsent>
            <div className="signupButton">
              <Button onClick={handleComplete} name="회원가입" />
            </div>
            <CheckingMember>
              <div className="checkingText">이미 회원이신가요?</div>
              <div onClick={handleSignup} className="gotoLoginButton">
                로그인
              </div>
            </CheckingMember>
          </SignupWrapper>
        </Wrapper>
      }
    </>
  );
};

const SignupWrapper = styled.div`
  width: 621px;
  height: 800px;
  flex-shrink: 0;
  min-width: 364px;
  min-height: 562px;
  flex-shrink: 0;
  border-radius: 18px;
  background-color: var(--f8f8f8, #fcfcfc);
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .signup {
    color: var(--light_black, #232323);
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
    margin-bottom: 20px;
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

const CheckingMember = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  margin-top: 10px;
  .checkingText {
    color: var(--gray02, #747474);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 28px */
  }
  .gotoLoginButton {
    color: var(--light_black, #232323);
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
  }
`;
const PersonalInfoConsent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 15px;
  .personalInfoConsentCheck {
    width: 500px;
    display: flex;
    justify-content: space-between;
    color: var(--light_black, #232323);
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .personalInfoConsentMsg {
    color: var(--gray02, #747474);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
  }
`;

export default SignupModal;
