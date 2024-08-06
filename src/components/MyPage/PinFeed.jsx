import React, { useEffect, useState } from "react";
import styled from "styled-components";
import pinIconSpark from "../../assets/images/MyPage/spark-51.svg";
import calendarIcon from "../../assets/images/MyPage/calendar.svg";
import searchIcon from "../../assets/images/MyPage/search.svg";
import PinMemoComponent from "./PinMemoComponent";
import { useNavigate } from "react-router-dom";
import { getMyPinFeed } from "../../services/api/myPage";
import { useQuery } from "@tanstack/react-query";

const PinFeed = ({ myPinFeedData }) => {
  const [totalPinNum, setTotalPinNum] = useState();
  const [pinFeedList, setPinFeedList] = useState([]);
  const [feedElementTitle, setFeedElementTitle] = useState();
  const [feedElementArtist, setFeedElementArtist] = useState();
  const [feedElementImgPath, setFeedElementImgPath] = useState();
  const [listenedDate, setListenedDate] = useState();
  const [placeName, setPlaceName] = useState();

  const navigate = useNavigate();
  const goCalendar = () => {
    navigate("/calendar");
  };
  const goMySearch = () => {
    navigate("/mypin-search");
  };
  // const { data } = useQuery({
  //   queryKey: ["pinfeed"],
  //   queryFn: getMyPinFeed,
  // });

  // const totalPinNum = data?.totalElements || 0;
  // const pinFeedList = data?.pinFeedList || [];

  useEffect(() => {
    if (myPinFeedData) {
      console.log(myPinFeedData);
      setTotalPinNum(myPinFeedData.totalElements);
      setPinFeedList(myPinFeedData.pinFeedList);
    }
  }, [myPinFeedData]);

  return (
    <PinFeedContainer>
      {myPinFeedData && (
        <>
          <PinShow>
            <PinTimes>
              <PinIcon src={pinIconSpark} />
              <Num>{totalPinNum}</Num>
            </PinTimes>
            <ShowIcons>
              <Calendar src={calendarIcon} onClick={goCalendar} />
              <Search src={searchIcon} onClick={goMySearch} />
            </ShowIcons>
          </PinShow>
          <PinsSection>
            {pinFeedList &&
              pinFeedList.map(it => (
                <PinMemoComponent
                  songId={it.songInfo.songId}
                  title={it.songInfo.title}
                  artist={it.songInfo.artist}
                  imgPath={it.songInfo.imgPath}
                  genreName={it.genreName}
                  listenedDate={it.listenedDate}
                  placeName={it.placeName}
                  pinId={it.pinId}
                  memo={it.memo}
                  visibility={it.visibility}
                  latitude={it.latitude}
                  longitude={it.longitude}
                />
              ))}
          </PinsSection>
        </>
      )}
    </PinFeedContainer>
  );
};

export default PinFeed;

const PinFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  /* width: 528px; */
`;

const PinShow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 40px;
  margin-right: 35px;
`;

const PinTimes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PinIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  //opacity: 0.8;
  padding-right: 8px;
`;

const Num = styled.div`
  color: var(--light_black, #232323);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ShowIcons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const Calendar = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  cursor: pointer;
`;

const Search = styled(Calendar)``;

const PinsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 32px;
  margin-bottom: 13px;
`;
