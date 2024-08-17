import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SmallModal from "../common/Modal/SmallModal";
import moreButton from "../../assets/images/MyPage/more-icon.svg";
import { useNavigate } from "react-router-dom";
import { deletePlaylist } from "../../services/api/playlist";

const options = ["플레이리스트 편집", "플레이리스트 삭제"];

const PlaylistModalBox = ({ top, right, padding, playlistId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedOption, setClickedOption] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const handlePopup = () => {
    setIsOpen(prev => !prev);
  };

  const handleOptionClick = option => {
    setClickedOption(option);
    setIsOpen(false);
    if (option === "플레이리스트 삭제") {
      handleDeleteModal();
    } else if (option === "플레이리스트 편집") {
      goPlaylistEditPage();
    }
  };

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(prevState => !prevState);
  };

  const handleDeletePlaylist = () => {
    navigate(-1);
    setIsDeleteModalOpen(false);
    deletePlaylist(playlistId);
    navigate("/mypage");
    // window.location.reload();
  };

  const goPlaylistEditPage = () => {
    navigate(`/playlist-edit/${playlistId}`);
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
    <PlaylistModal>
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
      {isDeleteModalOpen && clickedOption === "플레이리스트 삭제" && (
        <SmallModal
          text="플레이리스트를 삭제할까요?"
          onClose={handleDeleteModal}
          onDecide={handleDeletePlaylist}
        />
      )}
      {clickedOption === "플레이리스트 편집" && { goPlaylistEditPage }}
    </PlaylistModal>
  );
};

export default PlaylistModalBox;

const PlaylistModal = styled.div``;

const MoreBtn = styled.img`
  width: 40px;
  height: 40px;
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
