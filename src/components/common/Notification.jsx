import React, { useState, useEffect } from "react";
import styled from "styled-components";
import alarmIcon from "../../assets/notification/alarm.svg";
import ColumnComponent from "./ColumnComponent";
import { showAlarms, postNewAlarms } from "../../services/api/alarm";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [isNewAlarm, setIsNewAlarm] = useState(false);

  const handleNotice = () => {
    setIsOpen(!isOpen);
    setIsNewAlarm(false);
  };

  useEffect(() => {
    const fetchAlarmData = async () => {
      try {
        const Data = await showAlarms();
        setAlarms(Data.data.alarmList);
      } catch (error) {
        console.error("Error fetching alarm data:", error);
      }
    };
    fetchAlarmData();

    const eventSource = new EventSource(
      "https://api.songpin.n-e.kr/alarms/subscribe",
    );

    eventSource.onopen = async () => {
      console.log("sse opened!");
    };

    eventSource.addEventListener("sse-alarm", event => {
      console.log("sse-alarm");
      const data = JSON.parse(event.data);
      console.log(data);
      setIsNewAlarm(true);
    });

    eventSource.onerror = async e => {
      console.log(e);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <NotifComponent>
      <NotifBtn src={alarmIcon} onClick={handleNotice} />
      {isNewAlarm && <RedDot />}
      {isOpen && (
        <NoticePopup>
          <NoticeBox>
            <AlarmTitle>알림</AlarmTitle>
            <ContentSection>
            {alarms.length === 0 ? (
                <NoAlarmsMessage>받은 알림이 없습니다.</NoAlarmsMessage>
              ) : (
                alarms.map(alarm => (
                  <ColumnComponent
                    key={alarm.alarmId}
                    read={alarm.isRead}
                    message={alarm.message}
                    time={alarm.createdTime}
                    id={alarm.senderId}
                  />
                ))
              )}
            </ContentSection>
          </NoticeBox>
        </NoticePopup>
      )}
    </NotifComponent>
  );
};

export default Notification;

const NotifComponent = styled.div`
  z-index: 1000;
  position: fixed;
  bottom: 40px;
  right: 80px;
`;

const NotifBtn = styled.img`
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  cursor: pointer;
`;

const RedDot = styled.div`
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  border-radius: 17px;
  background: #ff3844;
  position: absolute;
  top: 2px;
  left: 60px;
`;

const NoticePopup = styled.div`
  width: 430px;
  height: 407px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid var(--gray02, #747474);
  background: var(--f8f8f8, #fcfcfc);
  position: absolute;
  bottom: 101px;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background: var(--gray, #bcbcbc);
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    margin-top: 13px;
    margin-bottom: 13px;
    background: transparent;
  }
`;

const NoticeBox = styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
`;

const AlarmTitle = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-left: 34px;
`;

const ContentSection = styled.div`
  padding-top: 18.69px;
`;

const NoAlarmsMessage = styled.div`
  padding-top: 130px;
  color: var(--gray02, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;
