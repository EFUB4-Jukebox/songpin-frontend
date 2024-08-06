import styled from "styled-components";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { resetPassword } from "../../services/api/myPage";
import { patchResetPw } from "../../services/api/auth";

const PwResetPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

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
      const uuidResetPw = {
        uuid: uuid || "",
        password: newPassword,
        confirmPassword: confirmPassword,
      };

      try {
        if (uuid) {
          await patchResetPw(uuidResetPw); // UUID가 있는 경로
          console.log(uuid);
        } else {
          await resetPassword(resetPw);
        }
        navigate("/resetPasswordComplete");
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
      <div className="resetText">비밀번호 재설정</div>
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
