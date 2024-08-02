import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { postLogin } from "../../services/api/auth";

const LoginModal = ({
  setPwResetModal,
  setCompleteLogin,
  setSignupModal,
  setLoginModal,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setLoginModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
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
    // setLoginModal(false);
    // setCompleteLogin(true);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  const onLogin = async () => {
    const userData = {
      email,
      password,
    };

    const result = await postLogin(userData);
    console.log(result);
    if (result.token) {
      handleComplete();
      console.log("로그인 성공");
      setInfoMsg("");
    } else if (result.status === 401 || result.status === 404) {
      setInfoMsg("이메일 또는 비밀번호가 다릅니다.");
    } else {
      console.error("로그인 실패");
    }
  };

  return (
    <>
      {
        <Wrapper>
          <LoginWrapper ref={modalRef}>
            <div className="login">로그인하세요</div>
            <Input
              placeholder="이메일"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              infoMsg={infoMsg}
            />
            <Info>
              <div className="loginButton">
                <Button active="true" onClick={onLogin} name="로그인" />
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
            </Info>
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
  position: relative;

  .login {
    color: var(--light_black, #232323);
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
    margin-bottom: 30px;
    margin-top: 104px;
  }
  .loginButton {
    margin-top: 30px;
  }
`;

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 118px;
`;

const SignUpAndPWReSet = styled.div`
  display: flex;
  gap: 18px;
  color: var(--gray02, #747474);
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  margin-top: 74px;
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
