import SideBar from "../../components/HomePage/SideBar";
import SideSection from "../../components/common/SideSection";
import styled from "styled-components";
import PinComponent from "../../components/PlaylistPage/PinComponent";
import PlaceComponent from "../../components/HomePage/PlaceComponent";
import { getHomeInfo } from "../../services/api/home";
import { useEffect, useState } from "react";
import LoginModal from "../../components/AuthPage/LoginModal";
import SignupModal from "../../components/AuthPage/SignupModal";
import PwResetModal from "../../components/AuthPage/PwResetModal";
import CompleteLogin from "../../components/AuthPage/CompleteLogin";

const HomePage = ({ onSelectedLocation = () => {} }) => {
  const [homeInfo, setHomeInfo] = useState(null);
  const [recentPins, setRecentPins] = useState([]);
  const [recentPlaces, setRecentPlaces] = useState([]);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [completeLogin, setCompleteLogin] = useState(false);
  const [pwResetModal, setPwResetModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handlePageClick = () => {
    if (!isLoggedIn) {
      setLoginModal(true);
    }
  };

  const isModalOpen =
    loginModal || signupModal || completeLogin || pwResetModal;

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token)
        {
          const Data = await getHomeInfo();
          setHomeInfo(Data.nickname);
          setRecentPins(Data.pinList);
          setRecentPlaces(Data.placeList);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };
    fetchHomeData();
    console.log("핀내용", recentPins);
  }, []);

  return (
    <div
      style={{ position: "relative" }}
      onClick={handlePageClick}
      isNotLoggedIn={!isLoggedIn}
    >
      <SideBar
        isNotLoggedIn={!isLoggedIn}
        setLoginModal={setLoginModal}
        isModalOpen={isModalOpen}
      />
      <SideSection isNotLoggedIn={!isLoggedIn}>
        <Title>
          {homeInfo}님, <br />
          무슨 노래 듣고 계세요?
        </Title>
        <SongTxt>사람들은 이 노래를 듣고 있어요</SongTxt>
        <SongListContainer>
          {recentPins &&
            recentPins.map(pin => (
              <PinComponent
                key={pin.SongId}
                pin={pin}
                selectable={false}
                buttonVisible={pin.isMine}
                pinId={pin.pinId}
                onSelectedLocation={onSelectedLocation}
              />
            ))}
        </SongListContainer>
        <PlaceTxt>사람들이 이 장소에서 핀을 등록했어요</PlaceTxt>
        <PlaceListContainer>
          {recentPlaces &&
            recentPlaces.map(place => (
              <PlaceComponent
                id={place.placeId}
                name={place.placeName}
                cnt={place.placePinCount}
              />
            ))}
        </PlaceListContainer>
      </SideSection>
      {loginModal && (
        <LoginModal
          setPwResetModal={setPwResetModal}
          setLoginModal={setLoginModal}
          setSignupModal={setSignupModal}
          onClick={e => e.stopPropagation()}
          disableOutsideClick={true}
        />
      )}
      {signupModal && (
        <SignupModal
          setCompleteLogin={setCompleteLogin}
          setLoginModal={setLoginModal}
          setSignupModal={setSignupModal}
          onClick={e => e.stopPropagation()}
          disableOutsideClick={true}
        />
      )}
      {completeLogin && <CompleteLogin setCompleteLogin={setCompleteLogin} />}
      {pwResetModal && (
        <PwResetModal
          setPwResetModal={setPwResetModal}
          setLoginModal={setLoginModal}
          onClick={e => e.stopPropagation()}
          disableOutsideClick={true}
        />
      )}
    </div>
  );
};

export default HomePage;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
  margin-bottom: 64px;
  margin-left: 38px;
  color: var(--light_black, #232323);
  /* title_bold */
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  white-space: pre-wrap;
  line-height: 1.5em;
`;

const SongTxt = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 32px;
  margin-left: 38px;
  color: var(--light_black, #232323);
  /* semititle_bold */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const PlaceTxt = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 32px;
  margin-left: 38px;
  color: var(--light_black, #232323);
  /* semititle_bold */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SongListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 38px;
  margin-bottom: 70px;
`;

const PlaceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 38px;
`;
