import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import moreButton from "../../assets/images/MyPage/more-icon.svg";
import SmallModal from "./Modal/SmallModal";
import AddPlaylistModal from "./Modal/AddPlaylistModal";
import { useNavigate } from "react-router-dom";
import { deletePin } from "../../services/api/pin";
import CommonSnackbar from "./snackbar/CommonSnackbar";
import useIsCreatePlaylistStore from "../../store/useIsCreatePlaylistStore";
import CreatePlaylistModal from "./Modal/CreatePlaylistModal";

const options = ["담기", "수정", "삭제"];

const PinModalBox = ({ top, right, padding, pinId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedOption, setClickedOption] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddPlaylistModalOpen, setIsAddPlaylistModalOpen] = useState(false);
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] =
    useState(false);

  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const handlePopup = () => {
    setIsOpen(prev => !prev);
  };

  const handleOptionClick = option => {
    setClickedOption(option);
    setIsOpen(false);
    if (option === "삭제") {
      handleDeleteModal();
    } else if (option === "담기") {
      handleAddPlaylistModal();
    } else if (option === "수정") {
      goPinEditPage();
    }
  };

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(prevState => !prevState);
  };

  const handleDeletePin = async () => {
    setIsDeleteModalOpen(false);
    await deletePin(pinId);
    window.location.reload();
  };

  const handleAddPlaylistModal = () => {
    setIsAddPlaylistModalOpen(prevState => !prevState);
  };

  const handleCreatePlaylistModal = () => {
    setIsCreatePlaylistModalOpen(prevState => !prevState);
  };

  const navigate = useNavigate();
  const goPinEditPage = () => {
    navigate(`/pin-edit/${pinId}`);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <PinModal>
      <MoreBtn
        ref={buttonRef}
        src={moreButton}
        onClick={handlePopup}
        setPadding={padding}
      />
      {isOpen && (
        <MorePopup ref={popupRef} positionTop={top} positionRight={right}>
          {options.map(option => (
            <ListItem key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </ListItem>
          ))}
        </MorePopup>
      )}
      {isDeleteModalOpen && clickedOption === "삭제" && (
        <SmallModal
          text="핀을 삭제할까요?"
          onClose={handleDeleteModal}
          onDecide={handleDeletePin}
        />
      )}
      {clickedOption === "담기" &&
        (isCreatePlaylistModalOpen ? (
          <CreatePlaylistModal
            setIsAddPlaylistModalOpen={setIsAddPlaylistModalOpen}
            setModalCommon={handleCreatePlaylistModal}
          />
        ) : (
          isAddPlaylistModalOpen && (
            <AddPlaylistModal
              pinId={pinId}
              setModalCommon={handleAddPlaylistModal}
              setIsCreatePlaylistModalOpen={setIsCreatePlaylistModalOpen}
              setIsAddPlaylistModalOpen={setIsAddPlaylistModalOpen}
            />
          )
        ))}
      {clickedOption === "수정" && { goPinEditPage }}
    </PinModal>
  );
};

export default PinModalBox;

const PinModal = styled.div``;

const MoreBtn = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  padding-left: ${props => props.setPadding};
  cursor: pointer;
`;

const MorePopup = styled.div`
  display: flex;
  padding: 12px 14px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--gray02, #747474);
  background: var(--offwhite_, #fcfcfc);
  position: absolute;
  top: ${props => props.positionTop};
  right: ${props => props.positionRight};
  z-index: 1;
`;

const ListItem = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  cursor: pointer;
  &:hover {
    color: #24ee81;
  }
`;
