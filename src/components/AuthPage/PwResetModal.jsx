import { useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import back from "../../assets/images/MusicSearchPage/arrow_back.svg";

const PwResetModal = ({ setPwResetModal, setLoginModal }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setPwResetModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [setPwResetModal]);

  const handleSendMail = () => {
    navigate("/resetPassword");
  };

  const handleGotoLoginModal = () => {
    setPwResetModal(false);
    setLoginModal(true);
  };

  return (
    <Wrapper>
      <PwResetWrapper ref={modalRef}>
        <div className="backImg">
          <img src={back} onClick={handleGotoLoginModal} />
        </div>
        <div className="pwResetText">비밀번호를 잊으셨나요?</div>
        <InputWrapper>
          <Input placeholder="이메일" />
          <Button
            active="true"
            name="비밀번호 재설정 메일 발송"
            onClick={handleSendMail}
          />
        </InputWrapper>
        <div className="pwResetMsg">등록되지 않은 이메일입니다.</div>
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
  justify-content: center;
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
