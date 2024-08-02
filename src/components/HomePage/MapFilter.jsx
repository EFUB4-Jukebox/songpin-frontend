import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import open_dropdown from "../../assets/filter/open_dropdown.svg";
import close_dropdown from "../../assets/filter/close_dropdown.svg";
import calendar_selected from "../../assets/filter/calendar_selected.svg";
import Genre from "../common/Genre";
import { GenreList } from "../../constants/GenreList";
import { postRecentMarkers } from "../../services/api/map";

const MapFilter = () => {
  const [selectedOption, setSelectedOption] = useState("All");
  const [showOptions, setShowOptions] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSetTerm, setShowSetTerm] = useState(false);
  const [showGenre, setShowGenre] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDatesText, setSelectedDatesText] = useState(
    "YYYY.MM.DD ~ YYYY.MM.DD",
  );
  const [recentPins, setRecentPins] = useState([]);

  const selectTerm = term => {
    setSelectedOption(term);
    setShowOptions(false);
    if (term === "Userself") {
      setShowSetTerm(true);
    } else {
      setShowSetTerm(false);
    }
    handleRequest(term, selectedGenres);
  };

  const handleDateChange = date => {
    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (!endDate) {
      if (date >= startDate) {
        setEndDate(date);
      } else {
        setEndDate(startDate);
        setStartDate(date);
      }
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const applyDateRange = () => {
    setShowCalendar(false);
    if (startDate && endDate) {
      const formattedStartDate = moment(startDate).format("YYYY.MM.DD");
      const formattedEndDate = moment(endDate).format("YYYY.MM.DD");
      setSelectedOption("Userself");
      setSelectedDatesText(`${formattedStartDate} ~ ${formattedEndDate}`);
    }
  };

  const toggleGenre = genre => {
    console.log("로드");
    setSelectedGenres(prevGenres =>
      prevGenres.includes(genre)
        ? prevGenres.filter(g => g !== genre)
        : [...prevGenres, genre],
    );
  };

  useEffect(() => {
    if (startDate && !endDate) {
      setSelectedDatesText(
        `${moment(startDate).format("YYYY.MM.DD")} ~ YYYY.MM.DD`,
      );
    } else if (startDate && endDate) {
      setSelectedDatesText(
        `${moment(startDate).format("YYYY.MM.DD")} ~ ${moment(endDate).format("YYYY.MM.DD")}`,
      );
    } else {
      setSelectedDatesText("YYYY.MM.DD ~ YYYY.MM.DD");
    }
  }, [startDate, endDate]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (startDate && endDate && date >= startDate && date <= endDate) {
        return "react-calendar__tile--range";
      } else if (startDate && date.getTime() === startDate.getTime()) {
        return "react-calendar__tile--rangeStart";
      } else if (endDate && date.getTime() === endDate.getTime()) {
        return "react-calendar__tile--rangeEnd";
      }
    }
    return null;
  };

  const handleShowOptions = () => {
    setShowOptions(!showOptions);
    setShowCalendar(false);
    setShowGenre(false);
  };

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
    setShowOptions(false);
    setShowGenre(false);
  };

  const handleShowGenre = () => {
    setShowGenre(!showGenre);
    setShowOptions(false);
    setShowCalendar(false);
  };

  const handleRequest = async (term, genres) => {
    const periodMap = {
      //'All': 'all',
      "1week": "week",
      "1month": "month",
      "3months": "three_months",
      // 'Userself': 'custom'
    };
    const periodFilter = periodMap[term];
    const genreNameFilters = genres.map(
      genre => GenreList.find(g => g.id === genre).name,
    );

    const request = {
      boundCoords: {
        swLat: 0,
        swLng: 0,
        neLat: 90,
        neLng: 180,
      },
      genreNameFilters,
      periodFilter,
    };

    console.log("Request:", request);
    const Data = await postRecentMarkers(request);
    console.log("Data:", Data);
  };

  return (
    <FilterContainer>
      <GivenOptions onClick={handleShowOptions}>
        {selectedOption === "All" && <span>전체 기간</span>}
        {selectedOption === "1week" && <span>최근 일주일</span>}
        {selectedOption === "1month" && <span>최근 한 달</span>}
        {selectedOption === "3months" && <span>최근 세 달</span>}
        {selectedOption === "Userself" && <span>기간 직접 설정</span>}
        <DropdownIcon
          src={showOptions ? close_dropdown : open_dropdown}
          alt="dropdown icon"
        />
        {showOptions && (
          <Dropdown>
            <Option onClick={() => selectTerm("All")}>전체 기간</Option>
            <Option onClick={() => selectTerm("1week")}>최근 일주일</Option>
            <Option onClick={() => selectTerm("1month")}>최근 한 달</Option>
            <Option onClick={() => selectTerm("3months")}>최근 세 달</Option>
            <Option onClick={() => selectTerm("Userself")}>
              기간 직접 설정
            </Option>
          </Dropdown>
        )}
      </GivenOptions>
      {showSetTerm && (
        <SetTermWrapper>
          <SetTerm onClick={handleShowCalendar}>
            {selectedDatesText}
            <DropdownIcon
              src={showCalendar ? close_dropdown : open_dropdown}
              alt="dropdown icon"
            />
          </SetTerm>
          {showCalendar && (
            <CalendarContainer>
              <StyledCalendar
                selectRange={false}
                value={[startDate, endDate]}
                onChange={handleDateChange}
                tileClassName={tileClassName}
                formatDay={(locale, date) => moment(date).format("D")}
                formatYear={(locale, date) => moment(date).format("YYYY")}
                formatMonthYear={(locale, date) =>
                  moment(date).format("YYYY. MMMM")
                }
                showNeighboringMonth={true}
              />
              <ApplyContainer>
                <SelectedDates>
                  {startDate && endDate
                    ? `${moment(startDate).format("YYYY.MM.DD")} ~ ${moment(endDate).format("YYYY.MM.DD")}`
                    : "YYYY.MM.DD ~ YYYY.MM.DD"}
                  <ApplyButton onClick={applyDateRange}>적용</ApplyButton>
                </SelectedDates>
              </ApplyContainer>
            </CalendarContainer>
          )}
        </SetTermWrapper>
      )}
      <SetGenre onClick={handleShowGenre}>
        장르별
        <DropdownIcon
          src={showGenre ? close_dropdown : open_dropdown}
          alt="dropdown icon"
        />
      </SetGenre>
      {showGenre && (
        <GenreDropdown>
          {GenreList.map(genre => (
            <Genre
              key={genre.id}
              name={genre.name}
              img={
                selectedGenres.includes(genre.id)
                  ? genre.whiteImgSrc
                  : genre.imgSrc
              }
              bgColor={selectedGenres.includes(genre.id) ? genre.bgColor : null}
              onClick={() => toggleGenre(genre.id)}
            />
          ))}
        </GenreDropdown>
      )}
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 90%;
  height: 44px;
  top: 34px;
  right: 73px;
  border: none;
  background: none;
  z-index: 100; // 지도 위로 출력
`;

const GivenOptions = styled.div`
  position: relative;
  display: flex;
  padding: 10px 16px 10px 20px;
  //width: 120px;
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  border-radius: 24px;
  border: 1px solid var(--gray02, #747474);
  background: var(--offwhite_, #fcfcfc);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
`;

const DropdownIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 4px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  width: 154px;
  padding: 12px 0px;
  flex-direction: column;
  align-items: center;
  border-radius: 24px;
  border: 1px solid var(--gray02, #747474);
  background: var(--f8f8f8, #fcfcfc);
  color: var(--light_black, #232323);
`;

const Option = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: var(--light_black, #232323);
  border: none;
  background: none;
  cursor: pointer;
`;

const SetTermWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SetTerm = styled.div`
  position: relative;
  display: flex;
  padding: 10px 16px 10px 20px;
  /* width: 142px; */
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  border-radius: 24px;
  border: 1px solid var(--gray02, #747474);
  background: var(--offwhite_, #fcfcfc);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
`;

const SetGenre = styled.div`
  position: relative;
  display: flex;
  padding: 10px 16px 10px 20px;
  width: 85px;
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  border-radius: 24px;
  border: 1px solid var(--gray02, #747474);
  background: var(--offwhite_, #fcfcfc);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
`;

const ApplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background: none;
  border: 1px solid var(--gray02, #747474);
  border-radius: 24px;
  background-color: var(--offwhite_, #fcfcfc);
`;

const CalendarContainer = styled.div`
  position: fixed;
  top: 29%;
  left: 71%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border: 1px solid var(--gray02, #747474);
  background: var(--offwhite_, #fcfcfc);
  padding: 10px;
  border-radius: 24px;
  height: 340px;
  .react-calendar {
    border: none;
    border-radius: 24px;
  }
`;

const StyledCalendar = styled(Calendar)`
  font-family: Pretendard;

  .react-calendar__navigation {
    button {
      color: #232323;
      font-size: 1.2em;
      font-weight: bold;
    }
  }

  .react-calendar__tile {
    font-size: 16px;
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

  .react-calendar__tile--range {
    background: rgba(36, 238, 129, 0.15);
    color: black;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
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
    height: 50px;
    width: 40px;
  }
`;

const SelectedDates = styled.div`
  padding: 8px 16px;
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const ApplyButton = styled.button`
  margin-left: 10px;
  padding: 4px 10px;
  margin-left: 20px;
  border: 1px solid var(--gray02, #747474);
  border-radius: 4px;
  background-color: #fcfcfc;
  color: #232323;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #3937b2;
    color: #ffffff;
  }
`;

const GenreDropdown = styled.div`
  position: absolute;
  top: 50px;
  z-index: 10;
  width: 220px;
  height: 204px;
  display: flex;
  justify-content: flex-start;
  gap: 4px;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 24px;
  border: 1px solid var(--gray02, #747474);
  background: var(--f8f8f8, #fcfcfc);
  cursor: pointer;
  padding: 10px 4px;
  padding-left: 10px;
`;

export default MapFilter;
