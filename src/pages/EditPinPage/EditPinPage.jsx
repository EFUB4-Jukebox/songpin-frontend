import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import SideBar from "../../components/HomePage/SideBar";
import EditSection from "../../components/common/SideSection";
import PinComponent from "../../components/CreatePinPage/PinComponent";
import Genre from "../../components/common/Genre";
import { GenreList } from "../../constants/GenreList";
import { ReactComponent as CalendarImg } from "../../assets/images/CreatePin/calendar_month.svg";
import { ReactComponent as LocationImg } from "../../assets/images/CreatePin/location_on.svg";
import PublicToggle from "../../components/common/PublicToggle";
import calendar_selected from "../../assets/images/CreatePin/calendar_selected.svg";
import arrowIcon from "../../assets/images/CreatePin/arrow_back_ios.svg";
import { getPin, editPin } from "../../services/api/pin";
import SmallModal from "../../components/common/Modal/SmallModal";
import useSnackbarStore from "../../store/useSnackbarStore";

const EditPinPage = () => {
  const [inputCount, setInputCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [pinData, setPinData] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { setIsSnackbar } = useSnackbarStore();

  const handleNavigate = () => {
    navigate("/details-song"); // 곡 ID로 수정
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const onInputHandler = e => {
    setInputCount(e.target.value.length);
    setPinData({ ...pinData, memo: e.target.value });
  };

  const handleDateChange = date => {
    setDate(date);
    setPinData({ ...pinData, listenedDate: date });
  };

  const handleGenreClick = (id, EngName) => {
    setSelectedGenre(prevState => ({ ...prevState, id, EngName }));
    setPinData(prevData => ({ ...prevData, genreName: EngName }));
  };

  useEffect(() => {
    const fetchPinData = async () => {
      try {
        const Data = await getPin(params.pinId);
        setPinData(Data);
        setDate(new Date(Data.listenedDate));
        const genre = GenreList.find(genre => genre.EngName === Data.genreName);
        setSelectedGenre(genre);
        setIsPublic(Data.visibility === "PUBLIC");
        setInputCount(Data.memo.length);
      } catch (error) {
        console.error("Error fetching pin data:", error);
      }
    };
    fetchPinData();
  }, []);

  const handleEditPin = async e => {
    try {
      e.preventDefault();
      const request = {
        listenedDate: moment(pinData.listenedDate).format("YYYY-MM-DD"),
        genreName: selectedGenre?.EngName,
        memo: pinData.memo,
        visibility: isPublic ? "PUBLIC" : "PRIVATE",
      };

      console.log("수정된 핀 정보:", request);
      const res = await editPin(params.pinId, request);
      console.log("수정됐나?", res);

      if (location.state) {
        navigate(location.state);
      } else {
        navigate("/home");
      }
      setIsSnackbar("핀이 수정되었습니다!");
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target) &&
        !e.target.closest(".calendar-area")
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onClose = () => {
    setShowModal(false);
    if (location.state) {
      navigate(location.state);
    } else {
      navigate("/home");
    }
  };

  const onDecide = async () => {
    try {
      const request = {
        listenedDate: moment(pinData.listenedDate).format("YYYY-MM-DD"),
        genreName: selectedGenre?.EngName,
        memo: pinData.memo,
        visibility: isPublic ? "PUBLIC" : "PRIVATE",
      };

      console.log("수정된 핀 정보:", request);
      const res = await editPin(params.pinId, request);
      console.log("수정됐나?", res);
      if (location.state) {
        navigate(location.state);
      } else {
        navigate("/home");
      }
      setIsSnackbar("핀이 수정되었습니다!");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <MainContainer>
        <SideBar></SideBar>
        <EditSection>
          <Arrow src={arrowIcon} onClick={handleModal} />
          <Content>
            <PinComponent
              imgPath={pinData.songImgPath}
              title={pinData.songTitle}
              artist={pinData.songArtist}
            />
          </Content>
          <Title>언제</Title>
          <When
            className="calendar-area"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {moment(pinData.listenedDate).format("YYYY.MM.DD")}
            <CalendarImg />
          </When>
          {showCalendar && (
            <CalendarContainer ref={calendarRef}>
              <StyledCalendar
                calendarType="gregory"
                value={date}
                onChange={handleDateChange}
                formatDay={(locale, date) => moment(date).format("D")}
                formatYear={(locale, date) => moment(date).format("YYYY")}
                formatMonthYear={(locale, date) =>
                  moment(date).format("YYYY. MMMM")
                }
                showNeighboringMonth={true}
              />
            </CalendarContainer>
          )}
          <Title>어디서</Title>
          <Where>
            {pinData.placeName}
            <LocationImg />
          </Where>
          <Title>장르</Title>
          <GenreContainer>
            {GenreList.map(genre => (
              <Genre
                key={genre.id}
                name={genre.name}
                img={
                  selectedGenre?.id === genre.id
                    ? genre.whiteImgSrc
                    : genre.imgSrc
                }
                bgColor={selectedGenre?.id === genre.id ? genre.bgColor : null}
                onClick={() => handleGenreClick(genre.id, genre.EngName)}
                height="24px"
              />
            ))}
          </GenreContainer>
          <Title>메모</Title>
          <MemoArea
            placeholder="이곳에 메모를 남겨주세요."
            maxLength={200}
            value={pinData.memo}
            onChange={onInputHandler}
          ></MemoArea>
          <TextNum>
            <span>{inputCount}</span>
            <span>/200</span>
          </TextNum>
          <IsPublic>
            <Title>메모 공개 여부</Title>
            <PublicToggle isPublic={isPublic} setIsPublic={setIsPublic} />
          </IsPublic>
          <CreateBtn onClick={handleEditPin}>수정 완료</CreateBtn>
        </EditSection>
      </MainContainer>
      {showModal && (
        <SmallModal
          text="편집한 내용을 저장할까요?"
          onClose={onClose}
          onDecide={onDecide}
        />
      )}
    </>
  );
};
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Arrow = styled.img`
  fill: #000000;
  width: 30px;
  height: 30px;
  margin-top: 20px;
  margin-left: 35px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  //margin: 40px;
`;

const PinBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 462px;
  height: 100px;
  border-radius: 8px;
  background: var(--offwhite, #efefef);
  /* cursor: pointer; */
  margin-bottom: 12px;
  /* &:active {
        border-radius: 8px;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), var(--offwhite, #efefef);
    } */
`;

const PinImg = styled.img`
  width: 78px;
  height: 78px;
  margin-left: 13px;
  border-radius: 4px;
  background: var(--gray, #bcbcbc);
`;

const PinText = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 80px;
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
  margin-bottom: 16px;
  margin-left: 32px;
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const When = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-left: 32px;
  padding-bottom: 10px;
  margin-bottom: 17px;
  width: 462px;
  border-bottom: 1px solid #747474;
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  cursor: pointer;
`;

const Where = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 32px;
  padding-bottom: 10px;
  margin-bottom: 17px;
  width: 462px;
  border-bottom: 1px solid #747474;
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  /* cursor: pointer; */
`;

const MemoArea = styled.textarea`
  display: flex;
  margin-left: 32px;
  padding: 20px;
  width: 422px;
  height: 134px;
  resize: none;
  border: none;
  border-radius: 8px;
  background: var(--offwhite, #efefef);
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  &::placeholder {
    color: var(--gray02, #747474);
  }
`;

const TextNum = styled.p`
  color: var(--gray, #bcbcbc);
  margin-right: 32px;
  margin-top: 4px;
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const IsPublic = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
  margin-right: 32px;
`;

const CreateBtn = styled.button`
  display: flex;
  width: 462px;
  padding: 16px 0px;
  margin-left: 30px;
  margin-top: 25px;
  margin-bottom: 45px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--light_black, #232323);
  background: var(--light_black, #232323);
  color: var(--f8f8f8, #fcfcfc);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  cursor: pointer;
`;

const CalendarContainer = styled.div`
  position: absolute;
  top: 27.4%;
  left: 45%;
  z-index: 10;
  border: 1px solid var(--gray02, #747474);
  background: var(--offwhite_, #fcfcfc);
  padding: 8px;
  border-radius: 24px;
  .react-calendar {
    border: none;
    border-radius: 24px;
    //width: 100%;
  }
`;

const StyledCalendar = styled(Calendar)`
  font-family: Pretendard;
  width: 273px;

  .react-calendar__navigation {
    button {
      color: #232323;
      font-size: 1em;
      font-weight: bold;
    }
  }
  .react-calendar__tile {
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: lightgray;
      border-radius: 50%;
    }
  }
  .react-calendar__tile--now {
    background: #fcfcfc;
    &:hover {
      background: #5452ff;
      color: #fcfcfc;
      border-radius: 50%;
    }
  }
  .react-calendar__tile--active {
    background: url(${calendar_selected}) center center no-repeat !important;
    background-size: 15%;
    color: white;
  }
  .react-calendar__month-view__weekdays {
    abbr {
      text-decoration: none;
      font-family: Pretendard;
    }
  }
  .react-calendar__month-view__days__day {
    height: 39px;
    width: 20px;
  }
`;

const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 450px;
  margin-left: 30px;
  margin-bottom: 35px;
  gap: 5px;
`;

export default EditPinPage;
