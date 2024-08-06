import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import SideBar from "../../components/HomePage/SideBar";
import CreateSection from "../../components/common/SideSection";
import SearchSongContainer from "../../components/CreatePinPage/SearchSongContainer";
import SearchPlaceContainer from "../../components/CreatePinPage/SearchPlaceContainer";
import PinComponent from "../../components/CreatePinPage/PinComponent";
import Genre from "../../components/common/Genre";
import { GenreList } from "../../constants/GenreList";
import { ReactComponent as CalendarImg } from "../../assets/images/CreatePin/calendar_month.svg";
import { ReactComponent as LocationImg } from "../../assets/images/CreatePin/location_on.svg";
import PublicToggle from "../../components/common/PublicToggle";
import calendar_selected from "../../assets/images/CreatePin/calendar_selected.svg";
import { postNewPin } from "../../services/api/pin";

const CreatePinPage = () => {
  const [inputCount, setInputCount] = useState(0);
  const [isSongSelected, setIsSongSelected] = useState(false);
  const [showSearchSongContainer, setShowSearchSongContainer] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [showSearchPlaceContainer, setShowSearchPlaceContainer] =
    useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [memo, setMemo] = useState("");

  const navigate = useNavigate();

  const handleNavigate = location => {
    const params = location.split("/");
    const songId = params[2];
    navigate(`/details-song/${songId}`);
  };

  const onInputHandler = e => {
    setInputCount(e.target.value.length);
    setMemo(e.target.value);
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
    setShowSearchPlaceContainer(!showSearchPlaceContainer);
  };

  const handlePlaceSelect = place => {
    setSelectedPlace(place);
    setShowSearchPlaceContainer(false);
  };

  const handleDateChange = date => {
    setDate(date);
  };

  const handleGenreClick = (id, EngName) => {
    setSelectedGenre({ id, EngName });
  };

  const handlePostPin = async e => {
    e.preventDefault();
    const request = {
      song: {
        title: selectedPin.title,
        artist: selectedPin.singer,
        imgPath: selectedPin.image,
        providerTrackCode: selectedPin.key,
      },
      listenedDate: moment(date).format("YYYY-MM-DD"),
      place: {
        placeName: selectedPlace.place_name,
        address: selectedPlace.address_name,
        providerAddressId: Number(selectedPlace.id),
        latitude: parseFloat(selectedPlace.y),
        longitude: parseFloat(selectedPlace.x),
      },
      genreName: selectedGenre?.EngName,
      memo: memo,
      visibility: isPublic ? "PUBLIC" : "PRIVATE",
    };
    console.log("핀 정보:", selectedPin);
    console.log("Posting data:", request);
    const res = await postNewPin(request);
    console.log(res.headers.location.slice(7));
    const songInfo = res.headers.location.slice(7);
    if (songInfo) {
      const songId = Number(songInfo);
      console.log(songId);
      navigate(`/details-song/${songId}`);
    }
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
                moment(date).format("YYYY년 MM월")
              }
              showNeighboringMonth={true}
            />
          </CalendarContainer>
        )}
        <Title>어디서</Title>
        <Where onClick={handlePlaceClick}>
          {selectedPlace ? (
            <div>
              <div>{selectedPlace.place_name}</div>
            </div>
          ) : (
            "이 노래를 들었던 장소는 어디였나요?"
          )}
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
          value={memo}
          maxLength={200}
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
        <CreateBtn onClick={handlePostPin}>핀 생성하기</CreateBtn>
      </CreateSection>
      {showSearchSongContainer && (
        <SearchSongContainerWrapper>
          <SearchSongContainer onPinSelect={handlePinSelect} />
        </SearchSongContainerWrapper>
      )}
      {showSearchPlaceContainer && (
        <SearchPlaceContainerWrapper>
          <SearchPlaceContainer onPlaceSelect={handlePlaceSelect} />
        </SearchPlaceContainerWrapper>
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
  margin-bottom: 17px;
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
  top: 25.4%;
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
      font-size: 0.9em;
      font-weight: bold;
    }
  }

  .react-calendar__month-view__days__day--weekend {
    &:nth-child(7n) {
      /* 토요일 */
      color: #00bfff;
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

    &:nth-child(7n) {
      /* 토요일 */
      color: white;
    }
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

const SearchSongContainerWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 528px;
  width: 50%;
  height: 100%;
  z-index: 10;
`;

const SearchPlaceContainerWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 528px;
  width: 50%;
  height: 100%;
  z-index: 10;
`;

export default CreatePinPage;
