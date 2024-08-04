import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import SideBar from '../../components/HomePage/SideBar';
import EditSection from '../../components/common/SideSection';
import PinComponent from '../../components/CreatePinPage/PinComponent';
import Genre from '../../components/common/Genre';
import { GenreList } from '../../constants/GenreList';
import { ReactComponent as CalendarImg} from '../../assets/images/CreatePin/calendar_month.svg';
import { ReactComponent as LocationImg} from '../../assets/images/CreatePin/location_on.svg';
import PublicToggle from '../../components/common/PublicToggle';
import calendar_selected from '../../assets/images/CreatePin/calendar_selected.svg'
import arrowIcon from '../../assets/images/CreatePin/arrow_back_ios.svg';

const EditPinPage = () => {
    const [inputCount, setInputCount] = useState(0);
    const [isSongSelected, setIsSongSelected] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedPin, setSelectedPin] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState(new Date());
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [isPublic, setIsPublic] = useState(true);

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/details-song');// 곡 ID로 수정
    };

    const handleModal = () => {
        setShowModal(true);
    };

    const onInputHandler = (e) => {
        setInputCount(e.target.value.length);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleGenreClick = (id, EngName) => {
        setSelectedGenre(id, EngName);
    };

    return (
        <MainContainer>
            <SideBar></SideBar>
            <EditSection>
                <Arrow src={arrowIcon} onClick={handleModal}/>
                {/* {showModal && (<EditModal></EditModal>)} */}
                <Content>
                    {!isSongSelected ? (
                        <PinBox>
                            <PinImg></PinImg>
                            <PinText>노래를 선택해주세요.</PinText>
                        </PinBox>
                    ) : (
                        <PinComponent
                            imgPath={selectedPin.image}
                            title={selectedPin.title}
                            artist={selectedPin.singer}
                        />
                    )}
                </Content>
                    <Title>언제</Title>
                    <When>
                        {moment(date).format("YYYY.MM.DD") || "언제 이 노래를 들었나요?"}
                        <CalendarImg onClick={() => setShowCalendar(!showCalendar)}/></When>
                    {showCalendar && (
                        <CalendarContainer>
                            <StyledCalendar
                                calendarType="gregory"
                                value={date}
                                onChange={handleDateChange}
                                formatDay={(locale, date) => moment(date).format("D")}
                                formatYear={(locale, date) => moment(date).format("YYYY")}
                                formatMonthYear={(locale, date) => moment(date).format("YYYY. MMMM")}
                                showNeighboringMonth={true}
                            />
                        </CalendarContainer>
                    )}
                    <Title>어디서</Title>
                    <Where>
                        {selectedPlace || "이 노래를 들었던 장소는 어디였나요?"}
                        <LocationImg />
                    </Where>
                    <Title>장르</Title>
                    <GenreContainer>
                        {GenreList.map((genre) => (
                            <Genre
                                key={genre.id}
                                name={genre.name}
                                img={selectedGenre?.id === genre.id ? genre.whiteImgSrc : genre.imgSrc}
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
                        onChange={onInputHandler}
                    ></MemoArea> 
                    <TextNum>
                        <span>{inputCount}</span>
                        <span>/200</span>
                    </TextNum>
                    <IsPublic>
                        <Title>공개 여부</Title>
                        <PublicToggle isPublic={isPublic} setIsPublic={setIsPublic}/>
                    </IsPublic>
                    {/* 아래 생성 버튼에 핀 위치 주소 연결하기 */}
                    <CreateBtn
                        onClick={handleNavigate}
                    >수정 완료</CreateBtn> 
            </EditSection>
        </MainContainer>
    );
};
const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

// const EditModal = styled.div`
//     width: 600px;
//     height: 300px;
//     flex-shrink: 0;
//     border-radius: 19px;
//     background: var(--f8f8f8, #FCFCFC);
// `; 
// 공용 컴포넌트 사용

const Arrow = styled.img`
    fill: #000000;
    width: 30px;
    height: 30px;
    margin-top: 20px;
    margin-left: 35px;
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
    background: var(--gray, #BCBCBC);
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
    background: var(--offwhite, #EFEFEF);
    color: var(--gray02, #747474);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
`;

const TextNum = styled.p`
    color: var(--gray, #BCBCBC);
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
    margin-top: 26px;
    margin-right: 32px;
`;

const CreateBtn = styled.button`
    display: flex;
    width: 462px;
    padding: 16px 0px;
    margin-left: 30px;
    margin-top: 37px;
    margin-bottom: 45px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--light_black, #232323);
    background: var(--light_black, #232323);
    color: var(--f8f8f8, #FCFCFC);
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
    background: var(--offwhite_, #FCFCFC);
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
        background: #FCFCFC;
        &:hover {
            background: #5452FF;
            color: #FCFCFC;
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
