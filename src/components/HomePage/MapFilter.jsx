import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import open_dropdown from "../../assets/filter/open_dropdown.svg";
import close_dropdown from "../../assets/filter/close_dropdown.svg";
import calendar_selected from "../../assets/filter/calendar_selected.svg";
import more from "../../assets/filter/more_horiz.svg";
import Genre from "../common/Genre";
import { GenreList } from "../../constants/GenreList";

const MapFilter = ({ onFilterChange, onFilterChange2 }) => {
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
  const weekDaysShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const [selectedPeriod, setSelectedPeriod] = useState("All");

  const optionsRef = useRef(null);
  const [dropdownWidth, setDropdownWidth] = useState(0);

  const selectTerm = term => {
    setSelectedOption(term);
    setShowOptions(false);
    if (term === "Userself") {
      setShowSetTerm(true);
    } else {
      setShowSetTerm(false);
    }
    onFilterChange(term, selectedGenres);
    setStartDate(null);
    setEndDate(null);
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
      const formattedStartDateToSend = moment(startDate).format("YYYY-MM-DD");
      const formattedEndDateToSend = moment(endDate).format("YYYY-MM-DD");
      setSelectedOption("Userself");
      setSelectedDatesText(`${formattedStartDate} ~ ${formattedEndDate}`);
      onFilterChange2(selectedGenres, formattedStartDateToSend, formattedEndDateToSend);
    }
  };

  const toggleGenre = genre => {
    setSelectedGenres(prevGenres => {
      const newGenres = prevGenres.includes(genre)
        ? prevGenres.filter(g => g !== genre)
        : [...prevGenres, genre];
      return newGenres;
    });
  };

  const applyGenres = () => {
    setShowGenre(false);
    onFilterChange(selectedOption, selectedGenres);
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

  useEffect(() => {
    if (optionsRef.current) {
      setDropdownWidth(optionsRef.current.offsetWidth);
    }
  }, [selectedOption]);

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

  const handlePeriodChange = e => {
    const newPeriod = e.target.value;
    setSelectedPeriod(newPeriod);
    onFilterChange(newPeriod, selectedGenres);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <FilterContainer>
      <GivenOptions
        onClick={handleShowOptions}
        value={selectedPeriod}
        onChange={handlePeriodChange}
        ref={optionsRef}
      >
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
          <Dropdown style={{ width: dropdownWidth }}>
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
            <SelectedDateText>{selectedDatesText}</SelectedDateText>
            <DropdownIcon
              src={showCalendar ? close_dropdown : open_dropdown}
              alt="dropdown icon"
            />
          </SetTerm>
          {showCalendar && (
            <CalendarContainer>
              <StyledCalendar
                calendarType="gregory"
                selectRange={false}
                value={[startDate, endDate]}
                onChange={handleDateChange}
                tileClassName={tileClassName}
                formatDay={(locale, date) => moment(date).format("D")}
                formatYear={(locale, date) => moment(date).format("YYYY")}
                formatMonthYear={(locale, date) =>
                  moment(date).format("YYYY년 MM월")
                }
                formatShortWeekday={(locale, date) =>
                  weekDaysShort[date.getDay()]
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
      <SetGenre hasGenres={selectedGenres.length > 0} onClick={handleShowGenre}>
        {selectedGenres.length > 0 ? (
          <SelectedGenres>
            <Genre
              name={GenreList.find(genre => genre.id === selectedGenres[0]).name}
              img={
                GenreList.find(genre => genre.id === selectedGenres[0]).whiteImgSrc
              }
              bgColor={
                GenreList.find(genre => genre.id === selectedGenres[0]).bgColor
              }
            />
            {selectedGenres.length > 1 && <MoreIcon src={more} alt="more icon" />}
          </SelectedGenres>
        ) : (
          "장르별"
        )}
        <DropdownIcon
          src={showGenre ? close_dropdown : open_dropdown}
          alt="dropdown icon"
        />
      </SetGenre>
      {showGenre && (
        <GenreDropdown>
          <GenreTotal>
            {GenreList.map(genre => (
              <Genre
                key={genre.id}
                name={genre.name}
                img={
                  selectedGenres.includes(genre.id) ? genre.whiteImgSrc : genre.imgSrc
                }
                bgColor={
                  selectedGenres.includes(genre.id) ? genre.bgColor : null
                }
                onClick={() => toggleGenre(genre.id)}
              />
            ))}
            <GenreApplyButton onClick={applyGenres}>적용</GenreApplyButton>
          </GenreTotal>
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
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  border-radius: 24px;
  border: 1px solid var(--gray02, #747474);
  background: var(--offwhite_, #fcfcfc);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
`;
const DropdownIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 110%;
  left: -2px;
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
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
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
  padding: 10px 14px;
  width: 142px;
  height: 24px;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
  border-radius: 24px;
  width: 290px;
  border: 1px solid var(--gray02, #747474);
  background: var(--offwhite_, #fcfcfc);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
`;
const SelectedDateText = styled.div`
  margin-left: 10px;
  font-size: 18px;
  font-weight: 500;
`;
const SelectedGenres = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  //margin-left: -4px;
`;

const MoreIcon = styled.img`
  //margin-left: 4px;
`;

const SetGenre = styled.div`
  position: relative;
  display: flex;
  /* padding: 10px 16px 10px 20px;
  width: auto;
  height: 24px; */
  padding: ${props => (props.hasGenres ? "10px 16px 10px 16px" : "10px 16px 10px 20px")};
  height: ${props => (props.hasGenres ? "auto" : "24px")};
  width: ${props => (props.hasGenres ? "auto" : "86px")};
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  margin-top: ${props => (props.hasGenres ? "16px" : "0px")};
  /* border-radius: 24px; */
  border-radius: ${props => (props.hasGenres ? "51px" : "24px")};
  border: 1px solid var(--gray02, #747474);
  background: var(--offwhite_, #fcfcfc);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
`;

const ApplyContainer = styled.div`
  position: relative;
  top: 37px;
  left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 17px;
  background: none;
  width: 320px;
  border: 1px solid var(--gray02, #747474);
  border-radius: 24px;
  background-color: var(--offwhite_, #fcfcfc);
`;

const CalendarContainer = styled.div`
  position: absolute;
  .react-calendar {
    position: relative;
    top: 50px;
    right: -10px;
    z-index: 10;
    border: none;
    border-radius: 24px;
    width: 320px;
    border: 1px solid var(--gray02, #747474);
  }
`;

const StyledCalendar = styled(Calendar)`
  font-family: Pretendard;
  padding: 5px;
  padding: 15px;
  .react-calendar__navigation {
    margin: 5px;
    button {
      color: #232323;
      font-size: 16px;
      font-weight: bold;
      padding: 0px;
    }
  }

  .react-calendar__month-view__days__day--weekend {
    &:nth-child(7n) { /* 토요일 */
      color: #00bfff;
    }
  }

  .react-calendar__tile--now {
    background: #fcfcfc;
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

  .react-calendar__tile--range {
    background: rgba(36, 238, 129, 0.15);
    color: black;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    background: url(${calendar_selected}) center center no-repeat !important;
    background-size: 15%;
    color: white;

    &:nth-child(7n) { /* 토요일 */
      color: white;
    }
  }

  .react-calendar__month-view__weekdays {
    margin-bottom: 5px;

    abbr {
      text-decoration: none;
      font-family: Pretendard;
    }
  }

  .react-calendar__month-view__days__day {
    height: 40px;
    width: 40px;
    margin-bottom: 1px;
  }
`;

const SelectedDates = styled.div`
  padding: 8px 16px;
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
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
    background-color: #5452ff;
    color: #ffffff;
  }
`;
const GenreApplyButton = styled.button`
  border-radius: 8px;
  border: 1px solid var(--gray02, #747474);
  background: var(--f8f8f8, #FCFCFC);
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  display: flex;
  width: 213px;
  //padding: 4px;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  cursor: pointer;
  &:hover {
    background-color: #5452ff;
    color: #ffffff;
  }
`;
const GenreTotal = styled.div`
  width: 204px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 4px;
  row-gap: 6px;
`;
const GenreDropdown = styled.div`
  position: absolute;
  top: 110%;
  z-index: 10;
  width: 230px;
  height: 247px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  border: 1px solid var(--gray02, #747474);
  background: var(--f8f8f8, #fcfcfc);
  cursor: pointer;
`;

export default MapFilter;
