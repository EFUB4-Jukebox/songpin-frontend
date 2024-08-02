import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PinCalendarViewComponent from "../../components/MyPage/PinCalendarViewComponent";
import SideSection from "../../components/common/SideSection";
import backIcon from "../../assets/images/MusicSearchPage/arrow_back.svg";
import dropdownIcon from "../../assets/images/MyPage/arrow-down.svg";
import { getCalendarPin } from "../../services/api/myPage";
import { useQuery } from "@tanstack/react-query";

const startYear = 1980;
const endYear = 2024;
const years = [...Array(endYear - startYear + 1).keys()].map(
  i => i + startYear,
);
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const CalendarViewPage = () => {
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2024); // 현재 날짜 반영
  const [selectedMonth, setSelectedMonth] = useState(7); // 현재 날짜 반영
  const navigate = useNavigate();

  const { isError, data, error } = useQuery({
    queryKey: ["getCalendarPin", selectedYear, selectedMonth],
    queryFn: () => getCalendarPin({ year: selectedYear, month: selectedMonth }),
    keepPreviousData: true, // 데이터가 로딩 중에도 이전 데이터를 유지
  });

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  if (isError) {
    console.error("Error fetching user info:", error);
    return <div>오류 발생: {error.message}</div>;
  }

  const calendarData = data;
  const pinList = calendarData.pinList;

  const togglingYear = () => {
    setIsYearOpen(!isYearOpen);
  };
  const onYearClicked = value => () => {
    setSelectedYear(value);
    setIsYearOpen(false);
  };

  const togglingMonth = () => {
    setIsMonthOpen(!isMonthOpen);
  };
  const onMonthClicked = value => () => {
    setSelectedMonth(value);
    setIsMonthOpen(false);
  };

  const goMyPage = () => {
    navigate("/mypage");
  };

  return (
    <SideSection>
      <CalendarView>
        <BackIcon src={backIcon} onClick={goMyPage} />
        <Content>
          <Calendar>
            <DateChoice>
              <DateSet onClick={togglingYear}>
                <Date>{selectedYear}년</Date>
                <Dropdown src={dropdownIcon} isOpen={isYearOpen} />
              </DateSet>
              {isYearOpen && (
                <YearCalendarDropdown>
                  <DatesList>
                    {years.map(year => (
                      <ListItem
                        key={year}
                        value={year}
                        onClick={onYearClicked(year)}
                        style={{
                          color:
                            selectedYear === year
                              ? "var(--light_black, #232323)"
                              : "auto",
                        }}
                      >
                        {year}년
                      </ListItem>
                    ))}
                  </DatesList>
                </YearCalendarDropdown>
              )}
            </DateChoice>
            <DateChoice>
              <DateSet onClick={togglingMonth}>
                <Date>{selectedMonth}월</Date>
                <Dropdown src={dropdownIcon} isOpen={isMonthOpen} />
              </DateSet>
              {isMonthOpen && (
                <MonthCalendarDropdown>
                  <DatesList>
                    {months.map(month => (
                      <ListItem
                        onClick={onMonthClicked(month)}
                        style={{
                          color:
                            selectedMonth === month
                              ? "var(--light_black, #232323)"
                              : "auto",
                        }}
                      >
                        {month}월
                      </ListItem>
                    ))}
                  </DatesList>
                </MonthCalendarDropdown>
              )}
            </DateChoice>
          </Calendar>
          {pinList.length === 0 ? (
            <Empty>
              <EmptyMessage>"해당 월에 들은 송핀이 없습니다"</EmptyMessage>
            </Empty>
          ) : (
            pinList.map(it => (
              <PinCalendarViewComponent
                title={it.songInfo.title}
                artist={it.songInfo.artist}
                imgPath={it.songInfo.imgPath}
                genre={it.genreName}
                listenedDate={it.listenedDate}
                placeName={it.placeName}
              />
            ))
          )}
        </Content>
      </CalendarView>
    </SideSection>
  );
};

export default CalendarViewPage;

const CalendarView = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  padding-bottom: 31px;
`;

const BackIcon = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  cursor: pointer;
  padding-left: 34px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Calendar = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 46px;
  gap: 8px;
`;

const DateChoice = styled.div`
  position: relative;
`;

const DateSet = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const Date = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Dropdown = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-left: 4px;
  transform: ${props => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const YearCalendarDropdown = styled.div`
  width: 98px;
  height: 112px;
  flex-shrink: 0;
  border-radius: 0px 0px 8px 8px;
  border: 1px solid var(--gray02, #747474);
  background: var(--f8f8f8, #fcfcfc);
  z-index: 1000;
  position: absolute;
  top: 41px;
  right: 8px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: var(--gray, #bcbcbc);
  }
`;

const MonthCalendarDropdown = styled(YearCalendarDropdown)`
  width: 62px;
`;

const DatesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  justify-content: center;
  align-items: center;
`;

const ListItem = styled.div`
  color: #9d9d9d;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
`;

const Empty = styled.div`
  height: calc(100vh - 285px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyMessage = styled.div`
  color: var(--gray02, rgb(116, 116, 116));
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;
