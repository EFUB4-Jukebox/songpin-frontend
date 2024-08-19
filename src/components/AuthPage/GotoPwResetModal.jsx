import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/api/myPage";
import styled from "styled-components";
import { patchResetPw } from "../../services/api/auth";
import Input from "../common/Input";
import Button from "../common/Button";

const GotoPwResetModal = ({ setPwResetModal }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setPwResetModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [setPwResetModal]);
  const validatePassword = password => {
    const regex = /^[a-zA-Z0-9!@#$%^&*()]+$/;
    return regex.test(password);
  };

  useEffect(() => {
    if (newPassword === "")
      setConfirmPasswordMsg(
        "8~20자 이내, 영문 대소문자, 숫자, 특수문자 !@#$%^&*() 사용 가능",
      );
    else if (newPassword.length > 20 || newPassword.length < 8) {
      setConfirmPasswordMsg("비밀번호는 최소 8자 이상, 20자 이내여야 합니다.");
      setPasswordValid(false);
    } else if (!validatePassword(newPassword)) {
      setConfirmPasswordMsg(
        "비밀번호는 영문 대소문자, 숫자, 특수문자 !@#$%^&*()만 사용 가능합니다.",
      );
      setPasswordValid(false);
    } else if (confirmPassword !== "" && confirmPassword !== newPassword) {
      setConfirmPasswordMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordMsg("");
      setPasswordValid(true);
    }
  }, [newPassword, confirmPassword]);

  const resetComplete = async () => {
    if (passwordValid) {
      const resetPw = {
        password: newPassword,
        confirmPassword: confirmPassword,
      };

      try {
        await resetPassword(resetPw);
        window.alert(
          "비밀번호 변경이 완료되었습니다. 새 비밀번호로 로그인해주세요.",
        );
        localStorage.removeItem("accessToken");
        navigate("/");
      } catch (error) {
        console.error(error);
        alert("비밀번호 변경에 실패하였습니다.");
      }
    } else {
      setHasError(true);
    }
  };

  const handleNewPasswordChange = e => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
    setHasError(newPassword !== e.target.value);
  };

  return (
    <Wrapper>
      <ModalWrapper ref={modalRef}>
        <div className="modalText">비밀번호 재설정</div>
        <InputButton>
          <Input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="새 비밀번호"
          />
          <Input
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            hasError={hasError}
            infoMsg={confirmPasswordMsg ? confirmPasswordMsg : ""}
          />
          <ButtonWrapper>
            <Button
              active={newPassword && confirmPassword && passwordValid}
              onClick={resetComplete}
              name="완료"
            />
          </ButtonWrapper>
        </InputButton>
      </ModalWrapper>
    </Wrapper>
  );
};
export default GotoPwResetModal;

const InputButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 740px;
  height: 518px;
  flex-shrink: 0;
  border-radius: 19px;
  background: var(--f8f8f8, #fcfcfc);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .modalText {
    color: var(--light_black, #232323);
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px; /* 125% */
    margin-bottom: 42px;
    margin-top: 86px;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 86px;
`;
