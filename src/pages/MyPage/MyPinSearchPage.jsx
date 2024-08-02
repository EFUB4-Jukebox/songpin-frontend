import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SideSection from "../../components/common/SideSection";
import MyPageSearchBar from "../../components/MyPage/MyPageSearchBar";
import backIcon from "../../assets/images/MusicSearchPage/arrow_back.svg";
import PinCalendarViewComponent from "../../components/MyPage/PinCalendarViewComponent";
import { useQuery } from "@tanstack/react-query";
import { searchPin } from "../../services/api/myPage";

const MyPinSearchPage = () => {
  const [inputValue, setInputValue] = useState();
  const [pinList, setPinList] = useState();
  // const [searchTriggered, setSearchTriggered] = useState(false);

  const navigate = useNavigate();
  const goMyPage = () => {
    navigate("/mypage");
  };

  // const handleSearch = () => {
  //   setSearchTriggered(true);
  // };

  // const { isError, data, error } = useQuery({
  //   queryKey: ["searchPin", inputValue],
  //   queryFn: () => searchPin({ keyword: inputValue }),
  //   keepPreviousData: true, // 데이터가 로딩 중에도 이전 데이터를 유지
  //   enabled: searchTriggered && inputValue.length > 0,
  // });

  // if (!data) {
  //   return <div>데이터가 없습니다.</div>;
  // }

  // if (isError) {
  //   console.error("Error fetching user info:", error);
  //   return <div>오류 발생: {error.message}</div>;
  // }

  const completeSearch = async () => {
    const res = await searchPin({ keyword: inputValue });
    console.log(res);
    setPinList(res.myPinList);
  };

  return (
    <SideSection>
      <BackIcon src={backIcon} onClick={goMyPage} />
      <Content>
        <MyPageSearchBar
          inputValue={inputValue}
          setInputValue={setInputValue}
          completeSearch={completeSearch}
        />
        {pinList &&
          pinList.map(it => (
            <PinCalendarViewComponent
              title={it.songInfo.title}
              artist={it.songInfo.artist}
              imgPath={it.songInfo.imgPath}
              genre={it.genreName}
              listenedDate={it.listenedDate}
              placeName={it.placeName}
            />
          ))}
      </Content>
      {/* <Empty>
        <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>
      </Empty> */}
    </SideSection>
  );
};

export default MyPinSearchPage;

const BackIcon = styled.img`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  cursor: pointer;
  padding-left: 34px;
  padding-top: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 22px;
  padding-bottom: 31px;
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
