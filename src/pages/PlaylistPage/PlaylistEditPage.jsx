import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import backArrow from "../../assets/images/UsersPage/arrow_back_ios.svg";
import checked from "../../assets/images/PlaylistPage/checkbox_checked.svg";
import unchecked from "../../assets/images/PlaylistPage/checkbox_unchecked.svg";
import PinComponent from "../../components/PlaylistPage/PinComponent";
import SideSection from "../../components/common/SideSection";
import PublicToggle from "../../components/common/PublicToggle";
import SmallModal from "../../components/common/Modal/SmallModal";
import { getPlaylistDetail, editPlaylist } from "../../services/api/playlist";
import useProfileEditStore from "../../store/useProfileEditStore";
import useEditStore from "../../store/useProfileEditStore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const PlaylistEditPage = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [playlistData, setPlaylistData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isPublic, setIsPublic] = useState(true); // 추가: 공개 여부 상태
  const [inputValue, setInputValue] = useState("");
  const [pinList, setPinList] = useState([]); // 추가: 핀 리스트 상태
  const [showSideBar, setShowSideBar] = useState(true);
  const [back, setBack] = useState(false);
  const { setEdit } = useEditStore();
  const location = useLocation();
  useEffect(() => {
    const fetchPlaylistDetail = async () => {
      try {
        const data = await getPlaylistDetail(playlistId);
        setPlaylistData(data);
        setInputValue(data.playlistName);
        setIsPublic(data.visibility === "PUBLIC");
        setPinList(data.pinList.map(pin => ({ ...pin, isSelected: false }))); // 핀 데이터에 isSelected 추가
      } catch (error) {
        console.error("Error fetching playlist detail:", error);
      }
    };

    fetchPlaylistDetail();
  }, [playlistId]);

  const handleChange = event => {
    const { value } = event.target;
    if (value.length <= 40) {
      setInputValue(value);
    }
  };

  const handlePopup = () => {
    if (back) {
      if (location.state) {
        console.log(location.state);
        navigate(location.state);
      } else {
        navigate("/home");
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleBackClick = () => {
    setIsOpen(true);
    setBack(true);
  };

  const handleCheckClicked = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    setPinList(pinList.map(pin => ({ ...pin, isSelected: newIsChecked }))); // 모든 핀의 isSelected 상태 업데이트
  };

  const handleEditPlaylist = async () => {
    try {
      // const selectedPins = pinList.map((pin, index) => ({
      //   playlistPinId: pin.playlistPinId,
      //   pinIndex: pin.pinIndex,
      // }));
      const sortedPins = pinList.map((pin, index) => ({
        playlistPinId: pin.playlistPinId,
        pinIndex: pinList.length - index - 1, // 내림차순으로 핀 인덱스를 설정
      }));

      const res = await editPlaylist(
        playlistId,
        inputValue,
        isPublic ? "PUBLIC" : "PRIVATE",
        sortedPins, // 수정된 핀 리스트
      );

      console.log(pinList);
      if (!res) {
        setEdit(true);
        console.log(location.state);
        if (location.state) {
          navigate(location.state);
        } else {
          navigate("/mypage");
        }
      }
    } catch (error) {
      console.error("Error updating playlist!", error);
    }
  };

  // useEffect(() => {
  //   if (edit) {
  //     navigate(-1);
  //   }
  // }, [edit]);

  const handlePinSelect = id => {
    setPinList(prev =>
      prev.map(pin =>
        pin.playlistPinId === id
          ? { ...pin, isSelected: !pin.isSelected }
          : pin,
      ),
    );
  };
  const handleDeleteSelectedPins = () => {
    setPinList(prev => prev.filter(pin => !pin.isSelected));
  };

  // 핀 리스트 드래그 앤 드롭 핸들러
  const handleOnDragEnd = result => {
    if (!result.destination) return;

    const items = Array.from(pinList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // pinIndex 업데이트
    const updatedItems = items.map((pin, index) => ({
      ...pin,
      pinIndex: items.length - index - 1, // 새로운 인덱스 할당(내림차순)
    }));

    setPinList(updatedItems);
  };

  return (
    <SideSection showSideBar={showSideBar}>
      <EditContainer>
        <ContentBox>
          <BackBtn src={backArrow} onClick={handleBackClick} />
          <MainText>플레이리스트 편집</MainText>
          <BtnText isDisabled={!inputValue} onClick={handlePopup}>
            완료
          </BtnText>
          {isOpen && (
            <SmallModal
              text="편집한 내용을 저장할까요?"
              onClose={handlePopup}
              onDecide={handleEditPlaylist}
            />
          )}
        </ContentBox>
        <ContentBox>
          <BodyText>플레이리스트 이름</BodyText>
          <Edit>
            <EditBox>
              <EditText
                type="text"
                value={inputValue}
                onChange={handleChange}
              />
              <AlarmMessage>{inputValue.length}/40</AlarmMessage>
            </EditBox>
            <Line />
          </Edit>
        </ContentBox>
        <ContentBox>
          <BodyText>공개 여부</BodyText>
          <PublicToggle isPublic={isPublic} setIsPublic={setIsPublic} />
        </ContentBox>
        <ContentBox>
          <SelectBox>
            <TotalIcon
              src={isChecked ? checked : unchecked}
              alt="전체선택 버튼"
              onClick={handleCheckClicked}
            />
            <SelectText onClick={handleCheckClicked}>전체선택</SelectText>
          </SelectBox>
          <BtnText onClick={handleDeleteSelectedPins}>삭제</BtnText>
        </ContentBox>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="pins">
            {provided => (
              <PinContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {pinList.map((pin, index) => (
                  <Draggable
                    key={pin.playlistPinId}
                    draggableId={String(pin.playlistPinId)}
                    index={index}
                  >
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <PinComponent
                          key={pin.playlistPinId}
                          pin={pin}
                          selectable={true}
                          buttonVisible={false}
                          onSelect={handlePinSelect}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </PinContainer>
            )}
          </Droppable>
        </DragDropContext>
      </EditContainer>
    </SideSection>
  );
};

export default PlaylistEditPage;

const EditContainer = styled.div`
  padding: 34px;
  padding-top: 40px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 45px;
`;

const BackBtn = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  padding-top: 5px;
  cursor: pointer;
`;

const MainText = styled.div`
  color: var(--light_black, #232323);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px; /* 166.667% */
`;

const BtnText = styled.div`
  color: ${({ isDisabled }) =>
    isDisabled ? "var(--gray, #BCBCBC)" : "var(--light_black, #232323)"};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-right: 4px;
  cursor: pointer;
`;

const BodyText = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TotalIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const SelectText = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  padding-left: 9px;
  cursor: pointer;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PinContainer = styled.div``;

const Edit = styled.div`
  width: 305px;
  display: flex;
  flex-direction: column;
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
  width: 265px;
`;

const Line = styled.div`
  width: 312px;
  height: 1px;
  background: var(--gray02, #747474);
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
  width: 305px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
