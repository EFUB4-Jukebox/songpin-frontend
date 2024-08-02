import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Input from "../Input";
import Button from "../Button";
import PlaylistDropdown from "./dropdown/PlaylistDropdown";
import PublicToggle from "../PublicToggle";
const ModalCommon = ({
  modalText,
  inputPlaceholder,
  buttonName,
  handleButton,
  addPlaylist,
  createPlaylist,
  setModalCommon,
  active,
  setActive,
  inputValue,
  setInputValue,
  isPublic,
  setIsPublic,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalCommon(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [setModalCommon]);

  const handleChange = event => {
    const { value } = event.target;
    if (value.length <= 40) {
      setInputValue(value);
    }
  };

  useEffect(() => {
    createPlaylist && setActive(inputValue.length > 0);
  }, [inputValue, setActive]);

  return (
    <Wrapper>
      <ModalWrapper ref={modalRef}>
        <div className="modalText">{modalText}</div>
        <InputButton>
          {addPlaylist && <PlaylistDropdown placeholder={inputPlaceholder} />}
          {createPlaylist && (
            <CreatePlaylistBox>
              <Edit>
                <EditBox>
                  <EditText
                    type="text"
                    value={inputValue}
                    placeholder={inputPlaceholder}
                    onChange={handleChange}
                  />
                  <AlarmMessage>{inputValue.length}/40</AlarmMessage>
                </EditBox>
              </Edit>
              <PublicToggle isPublic={isPublic} setIsPublic={setIsPublic} />
            </CreatePlaylistBox>
          )}
          <Button active={active} name={buttonName} onClick={handleButton} />
        </InputButton>
      </ModalWrapper>
    </Wrapper>
  );
};

const InputButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
`;

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  inset: 0;
  z-index: 10;
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
  justify-content: center;
  align-items: center;
  position: relative;

  .modalText {
    color: var(--light_black, #232323);
    text-align: center;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px; /* 125% */
    margin-bottom: 56px;
  }
`;
const EditText = styled.input`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  border: none;
  outline: none;
`;
const AlarmMessage = styled.div`
  color: var(--gray02, #747474);
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const EditBox = styled.div`
  width: 500px;
  padding: 23px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Edit = styled.div`
  width: 500px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid var(--light_black, #232323);
  background: var(--f8f8f8, #fcfcfc);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 21px;
`;

const CreatePlaylistBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export default ModalCommon;
