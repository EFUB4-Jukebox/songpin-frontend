import styled from "styled-components";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../../services/api/myPage";

const PwResetPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const resetComplete = async () => {
    if (newPassword === confirmPassword) {
      const resetPw = {
        password: newPassword,
        confirmPassword: confirmPassword,
      };
      try {
        await resetPassword(resetPw);
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
        infoMsg={hasError ? "비밀번호가 일치하지 않습니다." : ""}
      />
      <ButtonWrapper>
        <Button
          active={newPassword && confirmPassword && !hasError}
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
