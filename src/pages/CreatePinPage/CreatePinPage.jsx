import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import SideBar from "../../components/HomePage/SideBar";
import CreateSection from "../../components/CreatePinPage/CreateSection";
import SearchSongContainer from "../../components/CreatePinPage/SearchSongContainer";
import SearchPlaceContainer from "../../components/CreatePinPage/SearchPlaceContainer";
import PinComponent from "../../components/CreatePinPage/PinComponent";
import Genre from "../../components/common/Genre";
import { GenreList } from "../../constants/GenreList";
import { ReactComponent as CalendarImg } from "../../assets/images/CreatePin/calendar_month.svg";
import { ReactComponent as LocationImg } from "../../assets/images/CreatePin/location_on.svg";
import PublicToggle from "../../components/common/PublicToggle";
import calendar_selected from "../../assets/images/CreatePin/calendar_selected.svg";

const CreatePinPage = () => {
  const [inputCount, setInputCount] = useState(0);
  const [isSongSelected, setIsSongSelected] = useState(false);
  const [showSearchSongContainer, setShowSearchSongContainer] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [showSearchPlaceContainer, setShowSearchPlaceContainer] =
    useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedGenre, setSelectedGenre] = useState(null);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/details-song");
  };

  const onInputHandler = e => {
    setInputCount(e.target.value.length);
  };

  const handlePinClick = () => {
    setShowSearchSongContainer(!showSearchSongContainer);
  };

  const handlePinSelect = pinInfo => {
    setSelectedPin(pinInfo);
    setIsSongSelected(true);
    setShowSearchSongContainer(false);
  };

  const handlePlaceClick = () => {
    setShowSearchPlaceContainer(true);
  };

  const handlePlaceSelect = placeName => {
    setSelectedPlace(placeName);
    setShowSearchPlaceContainer(false);
  };

  const handleDateChange = date => {
    setDate(date);
  };

  const handleGenreClick = id => {
    setSelectedGenre(id);
  };

  return (
    <MainContainer>
      <SideBar></SideBar>
      <CreateSection>
        <Content>
          {!isSongSelected ? (
            <PinBox onClick={handlePinClick}>
              <PinImg></PinImg>
              <PinText>노래를 선택해주세요.</PinText>
            </PinBox>
          ) : (
            <PinComponent
              onPinClick={handlePinClick}
              imgPath={selectedPin.image}
              title={selectedPin.title}
              artist={selectedPin.singer}
            />
          )}
        </Content>
        <Title>언제</Title>
        <When>
          {moment(date).format("YYYY.MM.DD") || "언제 이 노래를 들었나요?"}
          <CalendarImg onClick={() => setShowCalendar(!showCalendar)} />
        </When>
        {showCalendar && (
          <CalendarContainer>
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
        <Where onClick={handlePlaceClick}>
          {selectedPlace || "이 노래를 들었던 장소는 어디였나요?"}
          <LocationImg />
        </Where>
        <Title>장르</Title>
        <GenreContainer>
          {GenreList.map(genre => (
            <Genre
              key={genre.id}
              name={genre.name}
              img={
                selectedGenre === genre.id ? genre.whiteImgSrc : genre.imgSrc
              }
              bgColor={selectedGenre === genre.id ? genre.bgColor : null}
              onClick={() => handleGenreClick(genre.id)}
              height="24px"
            />
          ))}
        </GenreContainer>
        <Title>메모</Title>
        <MemoArea
          placeholder="이곳에 메모를 남겨주세요."
          maxLength={200}
          onChange={onInputHandler}
        ></MemoArea>
        <TextNum>
          <span>{inputCount}</span>
          <span>/200</span>
        </TextNum>
        <IsPublic>
          <Title>공개 여부</Title>
          <PublicToggle />
        </IsPublic>
        <CreateBtn onClick={handleNavigate}>핀 생성하기</CreateBtn>
      </CreateSection>
      {showSearchSongContainer && (
        <SearchSongContainer onPinSelect={handlePinSelect} />
      )}
      {showSearchPlaceContainer && (
        <SearchPlaceContainer onPlaceSelect={handlePlaceSelect} />
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const PinBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 462px;
  height: 100px;
  border-radius: 8px;
  background: var(--offwhite, #efefef);
  cursor: pointer;
  margin-bottom: 12px;
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
  margin-bottom: 15px;
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
  width: 462px;
  border-bottom: 1px solid #747474;
  color: var(--gray02, #747474);
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
  width: 462px;
  border-bottom: 1px solid #747474;
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  cursor: pointer;
`;

const MemoArea = styled.textarea`
  display: flex;
  margin-left: 30px;
  padding: 20px;
  width: 442px;
  height: 134px;
  resize: none;
  border: none;
  border-radius: 8px;
  background: var(--offwhite, #efefef);
  color: var(--gray02, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const TextNum = styled.p`
  color: var(--gray, #bcbcbc);
  margin-right: 20px;
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
`;

const CreateBtn = styled.button`
  display: flex;
  width: 462px;
  padding: 16px 0px;
  margin-left: 30px;
  margin-top: 53px;
  margin-bottom: 42px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  background: var(--black, #000000);
  color: var(--white, #ffffff);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  cursor: pointer;
`;

const CalendarContainer = styled.div`
  position: absolute;
  top: 25%;
  left: 16%;
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
  margin-left: 30px;
  gap: 5px;
`;

export default CreatePinPage;
