import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import back from "../../assets/images/MusicSearchPage/arrow_back.svg";
import { postMail } from "../../services/api/auth";

const PwResetModal = ({
  setPwResetModal,
  setLoginModal,
  disableOutsideClick = false,
}) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [email, setEmail] = useState("");
  const [mailMsg, setMailMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setPwResetModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [setPwResetModal]);

  const handleSendMail = async () => {
    setLoading(true);
    try {
      const response = await postMail(email);
      const responseMsg = response.data.message || "";
      setMailMsg(
        responseMsg || "비밀번호 재설정을 위한 메일이 발송되었습니다.",
      );
    } catch (error) {
      console.error(error);

      if (error.status === 400) {
        const responseMsg = error.message || "";
        if (
          error.errorCode === "INVALID_INPUT_VALUE" ||
          error.errorCode === "INVALID_INPUT_FORMAT"
        ) {
          const errorMessage = responseMsg.replace(/^email:\s*/, "");
          setMailMsg(errorMessage);
        } else if (error.errorCode === "ERROR") {
          handleSendMail();
        } else {
          setMailMsg(responseMsg);
        }
      } else if (error.status === 401 || error.status === 404) {
        setMailMsg(error.message);
      } else {
        setMailMsg("메일 전송 중 문제가 발생했습니다. 다시 시도해 주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGotoLoginModal = () => {
    setPwResetModal(false);
    setLoginModal(true);
  };

  return (
    <Wrapper onClick={e => e.stopPropagation()}>
      <PwResetWrapper ref={modalRef}>
        <div className="backImg">
          <img src={back} onClick={handleGotoLoginModal} />
        </div>
        <div className="pwResetText">비밀번호를 잊으셨나요?</div>
        <InputWrapper>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            active="true"
            name="비밀번호 재설정 메일 발송"
            onClick={handleSendMail}
            loading={loading}
          />
        </InputWrapper>
        {mailMsg && <div className="pwResetMsg">{mailMsg}</div>}
      </PwResetWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PwResetWrapper = styled.div`
  width: 740px;
  height: 518px;
  flex-shrink: 0;
  border-radius: 18px;
  background: var(--offwhite_, #fcfcfc);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
  .backImg {
    display: flex;
    position: absolute;
    left: 35px;
    top: 35px;
  }
  .pwResetText {
    color: var(--light_black, #232323);
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px; /* 125% */
    margin-bottom: 36px;
    margin-top: 111px;
  }
  .pwResetMsg {
    color: var(--light_black, #232323);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 28px */
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
export default PwResetModal;
