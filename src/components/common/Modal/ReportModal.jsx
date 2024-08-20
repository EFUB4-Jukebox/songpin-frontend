import React from "react";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { reportUsers } from "../../../services/api/user";

const options = [
  "스팸/영리성 홍보",
  "도배",
  "욕설/비방",
  "개인정보노출",
  "불쾌감 조성",
  "기타",
];

const ReportModal = ({ userId, closeModal }) => {
  const [memo, setMemo] = useState("");
  const [active, setActive] = useState(false);
  const [clickedOption, setClickedOption] = useState(null);
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  useEffect(() => {
    setActive(clickedOption !== null);
  }, [memo, clickedOption]);

  const onInputHandler = e => {
    setMemo(e.target.value);
  };

  const handleReportUsers = async () => {
    try {
      let reportType;

      switch (clickedOption) {
        case "스팸/영리성 홍보":
          reportType = "SPAM";
          break;
        case "도배":
          reportType = "FLOODING";
          break;
        case "욕설/비방":
          reportType = "ABUSE";
          break;
        case "개인정보노출":
          reportType = "DOXXING";
          break;
        case "불쾌감 조성":
          reportType = "OFFENSIVE";
          break;
        case "기타":
          reportType = "OTHER";
          break;
      }
      const report = {
        reportedId: userId,
        reportType: reportType,
        reason: memo,
      };
      console.log(report);
      closeModal();
      const res = await reportUsers(report);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleOptionClick = option => {
    if (clickedOption === option) {
      setClickedOption(null);
    } else {
      setClickedOption(option);
    }
  };
  return (
    <BackGround>
      <ModalComponent ref={modalRef}>
        <Message>사용자 신고</Message>
        <ReportContainer>
          <SubMessage>신고 유형</SubMessage>
          <ReportBox>
            {options.map(option => (
              <ReportTypeBox
                key={option}
                onClick={() => handleOptionClick(option)}
                isSelected={clickedOption === option}
              >
                {option}
              </ReportTypeBox>
            ))}
          </ReportBox>
        </ReportContainer>
        <ReportContainer>
          <SubMessage>신고 사유</SubMessage>
          <ReportTextBox>
            <ReportText
              placeholder="신고 내용을 입력해주세요."
              value={memo}
              maxLength={200}
              onChange={onInputHandler}
            ></ReportText>
            <TextNum>{memo.length}/200</TextNum>
          </ReportTextBox>
        </ReportContainer>
        <SubmitBtn active={active} onClick={handleReportUsers}>
          제출
        </SubmitBtn>
      </ModalComponent>
    </BackGround>
  );
};

export default ReportModal;

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 621px;
  height: 710px;
  border-radius: 19px;
  background: var(--f8f8f8, #fcfcfc);
`;

const Message = styled.div`
  color: var(--light_black, #232323);
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
  padding-top: 73px;
  margin-bottom: 40px;
`;

const SubMessage = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
`;
const ReportBox = styled.div`
  display: inline-flex;
  align-items: flex-start;
  align-content: flex-start;
  width: 500px;
  gap: 8px 4px;
  flex-wrap: wrap;
`;
const ReportTypeBox = styled.div`
  display: flex;
  padding: 0px 16px;
  align-items: center;
  height: 40px;
  border-radius: 20px;
  border: 1px solid var(--light_black, #232323);
  color: ${({ isSelected }) =>
    isSelected ? "#FCFCFC" : "var(--light_black, #232323)"};
  background: ${({ isSelected }) =>
    isSelected ? "var(--light_black, #232323)" : "transparent"};

  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;

const ReportTextBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReportText = styled.textarea`
  width: 500px;
  height: 154px;
  box-sizing: border-box;
  padding: 24px 27px;
  resize: none;
  border: none;
  border-radius: 8px;
  background: var(--offwhite, #efefef);
  color: var(--light_black, #232323);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  &::placeholder {
    font-family: Pretendard;
    color: var(--gray02, #747474);
  }
`;
const TextNum = styled.div`
  color: var(--gray, #bcbcbc);
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-top: 4px;
`;
const SubmitBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 60px;
  border: 1px solid
    ${({ active }) =>
      active ? "var(--light_black, #232323)" : "var(--gray, #bcbcbc)"};
  background: ${({ active }) =>
    active ? "var(--light_black, #232323)" : "var(--gray, #bcbcbc)"};
  color: var(--f8f8f8, #fcfcfc);
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 166.667% */
  cursor: pointer;
`;
