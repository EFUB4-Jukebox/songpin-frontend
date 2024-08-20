import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moreButton from "../../assets/images/PlaylistPage/more_vert.svg";
import SmallModal from "../common/Modal/SmallModal";
import ReportModal from "../common/Modal/ReportModal";
import { useNavigate, useParams } from "react-router-dom";
import CommonSnackbar from "../common/snackbar/CommonSnackbar";
import { deleteFollower } from "../../services/api/myPage";
import useSnackbarStore from "../../store/useSnackbarStore";

const options = ["팔로워 삭제", "사용자 신고"];
const options2 = ["사용자 신고"];

const UserModalBox = ({ isMyFollower, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedOption, setClickedOption] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReporttModalOpen, setIsReportModalOpen] = useState(false);
  const { setIsSnackbar } = useSnackbarStore();

  const handlePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = option => {
    setClickedOption(option);
    setIsOpen(false);
    if (option === "팔로워 삭제") {
      handleDeleteModal();
    } else if (option === "사용자 신고") {
      handleReport();
    }
  };

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(prevState => !prevState);
  };
  const handleReportModal = () => {
    setIsReportModalOpen(prevState => !prevState);
  };

  const handleDeletePin = async () => {
    setIsDeleteModalOpen(false);

    const res = await deleteFollower(Number(userId));
    setIsSnackbar("팔로워를 삭제했습니다.");
    console.log(res);
  };

  const handleReport = () => {
    setIsReportModalOpen(prevState => !prevState);
  };

  const navigate = useNavigate();

  return (
    <PinModal>
      <MoreBtn src={moreButton} onClick={handlePopup} />
      {isOpen && (
        <MorePopup>
          {isMyFollower
            ? options.map(option => (
                <ListItem
                  key={option}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </ListItem>
              ))
            : options2.map(option => (
                <ListItem
                  key={option}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </ListItem>
              ))}
        </MorePopup>
      )}
      {isDeleteModalOpen && clickedOption === "팔로워 삭제" && (
        <SmallModal
          text="팔로워를 삭제할까요?"
          onClose={handleDeleteModal}
          onDecide={handleDeletePin}
        />
      )}
      {clickedOption === "사용자 신고" && isReporttModalOpen && (
        <ReportModal userId={userId} closeModal={handleReportModal} />
      )}
    </PinModal>
  );
};

export default UserModalBox;

const PinModal = styled.div`
  position: relative;
`;

const MoreBtn = styled.img`
  cursor: pointer;
`;

const MorePopup = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  white-space: nowrap;
  gap: 12px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--gray02, #747474);
  background: var(--offwhite_, #fcfcfc);
  position: absolute;
  right: -8px;
  top: 40px;
  z-index: 1;
`;

const ListItem = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
  &:hover {
    color: #24ee81;
  }
`;
