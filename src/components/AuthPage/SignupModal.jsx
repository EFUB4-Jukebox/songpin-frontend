import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { postSignup } from "../../services/api/auth";
import { postLogin } from "../../services/api/auth";

const SignupModal = ({ setCompleteLogin, setLoginModal, setSignupModal }) => {
  const modalRef = useRef(null);
  const [personalInfoConsent, setPersonalInfoConsent] = useState(false);
  const [redConsent, setRedConsent] = useState(false);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSignupModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [setSignupModal]);

  const handlePersonalInfoConsent = () => {
    setPersonalInfoConsent(!personalInfoConsent);
    setRedConsent(false);
  };

  const handleSignup = () => {
    setSignupModal(false);
    setLoginModal(true);
  };

  const handleComplete = () => {
    setSignupModal(false);
    setCompleteLogin(true);
  };

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState(
    "비밀번호는 20자 이내여야 합니다.",
  );
  const [emailMsg, setEmailMsg] = useState("이메일은 50자 이내여야 합니다.");
  const [emailValid, setEmailValid] = useState(false);
  const [nicknameMsg, setNicknameMsg] = useState(
    "닉네임은 8자 이내, 한글 문자, 영어 대소문자, 숫자 조합만 허용됩니다.",
  );
  const [nicknameValid, setNicknameValid] = useState(false);
  //const [hasError, setHasError] = useState(false);

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateNickname = nickname => {
    const regex = /^[가-힣a-zA-Z0-9]{1,8}$/;
    return regex.test(nickname);
  };

  useEffect(() => {
    if (email === "" || email.length > 50) {
      setEmailMsg("이메일은 50자 이내여야 합니다.");
    } else if (!validateEmail(email)) {
      setEmailMsg("유효한 이메일 형식이 아닙니다.");
      setEmailValid(false);
    } else {
      setEmailMsg("사용 가능한 이메일입니다.");
      setEmailValid(true);
    }
  }, [email]);

  useEffect(() => {
    if (nickname === "" || !validateNickname(nickname)) {
      setNicknameMsg(
        "닉네임은 8자 이내, 한글 문자, 영어 대소문자, 숫자 조합만 허용됩니다.",
      );
      setNicknameValid(false);
    } else {
      setNicknameMsg("사용 가능한 닉네임입니다.");
      setNicknameValid(true);
    }
  }, [nickname]);

  useEffect(() => {
    if (password === "" || password.length > 20) {
      setConfirmPasswordMsg("비밀번호는 20자 이내여야 합니다.");
    } else if (password.length < 8) {
      setConfirmPasswordMsg("비밀번호는 최소 8자 이상이어야 합니다.");
    } else if (confirmPassword !== "" && confirmPassword !== password) {
      setConfirmPasswordMsg("비밀번호가 일치하지 않습니다.");
    } else setConfirmPasswordMsg("");
  }, [password, confirmPassword]);

  const onSubmit = async e => {
    e.preventDefault();
    if (!personalInfoConsent) {
      setRedConsent(true);
      return;
    }

    const userData = {
      email,
      nickname,
      password,
      confirmPassword,
    };

    // let hasErrors = false;
    // if (email === "" || nickname === "" || password === "") {
    //   setHasError(true);
    // }
    // setHasError(hasErrors);
    // if (hasErrors) {
    //   return;
    // }

    // postSignup(userData)
    //   .then(data => {
    //     handleComplete();
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    try {
      const res = await postSignup(userData);

      const token = await postLogin({ email, password });

      if (token.error || res === null) {
        console.error(token.error, "로그인 실패");
      } else {
        handleComplete();
        console.log("로그인 성공");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {
        <Wrapper>
          <SignupWrapper ref={modalRef}>
            <div className="signup">회원가입</div>
            <Input
              placeholder="이메일"
              infoMsg={emailMsg}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              hasError={!emailValid && email !== ""}
            />
            <Input
              placeholder="닉네임"
              infoMsg={nicknameMsg}
              type="text"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              hasError={!nicknameValid && nickname !== ""}
            />

            <Input
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              hasError={
                (password.length < 8 || password.length > 20) && password !== ""
              }
            />
            <Input
              placeholder="비밀번호 확인"
              infoMsg={confirmPasswordMsg}
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              hasError={confirmPassword !== "" && password !== confirmPassword}
            />

            <PersonalInfoConsent>
              <div className="personalInfoConsentCheck">
                <div>위치정보 및 개인정보 수집에 동의합니다. (필수)</div>
                <HiddenCheckbox
                  checked={personalInfoConsent}
                  onChange={handlePersonalInfoConsent}
                />
                <StyledCheckbox
                  checked={personalInfoConsent}
                  highlight={redConsent}
                  onClick={handlePersonalInfoConsent}
                />
              </div>
              <div className="personalInfoConsentMsg">
                개인정보 수집에 동의 시에만 서비스를 이용할 수 있습니다.
              </div>
            </PersonalInfoConsent>
            <div className="signupButton">
              <Button
                active="true"
                onClick={onSubmit}
                name="회원가입"
                disabled={!personalInfoConsent}
              />
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
  z-index: 50;
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

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${props => (props.checked ? "#232323" : "white")};
  border: 1px solid
    ${props =>
      props.checked ? "#232323" : props.highlight ? "#FF3844" : "#747474"};
  border-radius: 3px;
  transition: all 150ms;
  cursor: pointer;
  position: relative;

  ${props =>
    props.checked &&
    `&:after {
      content: '✔';
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%); 
      color: white;
      font-size: 14px;
    }`}
`;

export default SignupModal;
