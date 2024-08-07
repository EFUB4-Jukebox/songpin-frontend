import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";

import IntroducePage from "./pages/IntroducePage/IntroducePage";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/MusicSearchPage/SearchPage";
import MusicInfoPage from "./pages/MusicSearchPage/MusicInfoPage";
import PlaceInfoPage from "./pages/MusicSearchPage/PlaceInfoPage";
import CreatePinPage from "./pages/CreatePinPage/CreatePinPage";
import EditPinPage from "./pages/EditPinPage/EditPinPage";
import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";
import UserSearchPage from "./pages/UsersPage/UserSearchPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserFollowPage from "./pages/UsersPage/UserFollowPage";
import MyPage from "./pages/MyPage/MyPage";
import ProfileEditPage from "./pages/MyPage/ProfileEditPage";
import SettingsPage from "./pages/MyPage/SettingsPage";
import CalendarViewPage from "./pages/MyPage/CalendarViewPage";
import PlaylistSearchPage from "./pages/PlaylistPage/PlaylistSearchPage";
import PlaylistDetailPage from "./pages/PlaylistPage/PlaylistDetailPage";
import PlaylistEditPage from "./pages/PlaylistPage/PlaylistEditPage";
import StatisticsPage from "./pages/IntroducePage/StatisticsPage";
import Main from "./pages/IntroducePage/Main";
import MyPinSearchPage from "./pages/MyPage/MyPinSearchPage";
import PwResetPage from "./pages/AuthPages/PwResetPage";
import PwResetCompletePage from "./pages/AuthPages/PwResetCompletePage";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import Notification from "./components/common/Notification";
import LoginModal from "../src/components/AuthPage/LoginModal";
import SignupModal from "./components/AuthPage/SignupModal";
import PwResetModal from "./components/AuthPage/PwResetModal";
import CompleteLogin from "./components/AuthPage/CompleteLogin";

import {
  postAllMarkers,
  postRecentMarkers,
  postCustomPeriodMarkers,
} from "./services/api/map";

import pop from "./assets/map/glowing_map_pop.svg";
import ballad from "./assets/map/glowing_map_ballad.svg";
import dance from "./assets/map/glowing_map_dance.svg";
import hiphop from "./assets/map/glowing_map_hiphop.svg";
import jazz from "./assets/map/glowing_map_jazz.svg";
import lofi from "./assets/map/glowing_map_lofi.svg";
import rock from "./assets/map/glowing_map_rock.svg";
import extra from "./assets/map/glowing_map_extra.svg";
import { GenreList } from "./constants/GenreList";
import MapFilter from "./components/HomePage/MapFilter";
import CommonSnackbar from "./components/common/snackbar/CommonSnackbar";
import useSnackbarStore from "./store/useSnackbarStore";

const genreImages = {
  POP: pop,
  BALLAD: ballad,
  DANCE: dance,
  HIPHOP: hiphop,
  JAZZ: jazz,
  LOFI: lofi,
  ROCK: rock,
  EXTRA: extra,
};

function App() {
  const [allPins, setAllPins] = useState([]);
  const [recentPins, setRecentPins] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [completeLogin, setCompleteLogin] = useState(false);
  const [pwResetModal, setPwResetModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handlePageClick = () => {
    if (!isLoggedIn) {
      setLoginModal(true);
    }
  };

  useEffect(() => {
    const fetchAllPinData = async () => {
      try {
        const data = await postAllMarkers();
        setAllPins(data.mapPlaceSet || []);
      } catch (error) {
        console.error("Error fetching all pin data:", error);
      }
    };
    fetchAllPinData();
  }, []);

  const handleFilterChange = async (term, genres) => {
    if (term === "All") {
      const data = await postAllMarkers();
      setAllPins(data.mapPlaceSet || []);
      setRecentPins([]);
    } else {
      const periodMap = {
        "1week": "week",
        "1month": "month",
        "3months": "three_months",
      };
      const periodFilter = periodMap[term];
      const genreNameFilters = genres.map(
        genre => GenreList.find(g => g.id === genre).EngName,
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
      const data = await postRecentMarkers(request);
      setRecentPins(data.mapPlaceSet || []);
    }
  };

  const handleFilterChange2 = async (genres, startDate, endDate) => {
    const genreNameFilters = genres.map(
      genre => GenreList.find(g => g.id === genre).EngName,
    );
    const request = {
      boundCoords: {
        swLat: 0,
        swLng: 0,
        neLat: 90,
        neLng: 180,
      },
      genreNameFilters: genreNameFilters,
      startDate: startDate,
      endDate: endDate,
    };
    const data = await postCustomPeriodMarkers(request);
    setRecentPins(data.mapPlaceSet || []);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/introduce" element={<IntroducePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/resetPassword" element={<PwResetPage />} />
        <Route path="/resetPassword/:uuid" element={<PwResetPage />} />
        <Route
          path="/resetPasswordComplete"
          element={<PwResetCompletePage />}
        />
        <Route path="*" element={<h1>Not Found</h1>} />

        <Route
          element={
            <MapLayout
              allPins={allPins}
              recentPins={recentPins}
              handleFilterChange={handleFilterChange}
              handleFilterChange2={handleFilterChange2}
              isLoggedIn={isLoggedIn}
              setLoginModal={setLoginModal}
            />
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/details-song/:songId" element={<MusicInfoPage />} />
          <Route path="/details-place/:placeId" element={<PlaceInfoPage />} />
          <Route path="/create" element={<CreatePinPage />} />
          <Route path="/pin-edit/:pinId" element={<EditPinPage />} />
          <Route path="/playlists" element={<PlaylistPage />} />
          <Route path="/usersearch" element={<UserSearchPage />} />
          <Route path="/users/:memberId" element={<UsersPage />} />
          <Route path="/users/:memberId/follows" element={<UserFollowPage />} />
          <Route path="/playlistsearch" element={<PlaylistSearchPage />} />
          <Route
            path="/playlists/:playlistId"
            element={<PlaylistDetailPage />}
          />
          <Route
            path="/playlist-edit/:playlistId"
            element={<PlaylistEditPage />}
          />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/edit" element={<ProfileEditPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/calendar" element={<CalendarViewPage />} />
          <Route path="/mypin-search" element={<MyPinSearchPage />} />
        </Route>
      </Routes>
      {loginModal && (
        <LoginModal
          setPwResetModal={setPwResetModal}
          setCompleteLogin={setCompleteLogin}
          setLoginModal={setLoginModal}
          setSignupModal={setSignupModal}
          onClick={e => e.stopPropagation()}
        />
      )}
      {signupModal && (
        <SignupModal
          setCompleteLogin={setCompleteLogin}
          setLoginModal={setLoginModal}
          setSignupModal={setSignupModal}
        />
      )}
      {completeLogin && <CompleteLogin setCompleteLogin={setCompleteLogin} />}
      {pwResetModal && (
        <PwResetModal
          setPwResetModal={setPwResetModal}
          setLoginModal={setLoginModal}
        />
      )}
    </Router>
  );
}

export default App;

function MapLayout({
  allPins,
  recentPins,
  handleFilterChange,
  handleFilterChange2,
  isLoggedIn,
  setLoginModal,
}) {
  const navigate = useNavigate();
  const defaultCenter = { lat: 37.55745148592845, lng: 126.92525404340768 }; //홍대입구역
  const [lat, setLat] = useState(defaultCenter.lat);
  const [lng, setLng] = useState(defaultCenter.lng);

  const location = useLocation();
  const pinsToDisplay = recentPins.length > 0 ? recentPins : allPins;
  const { isSnackbar, setIsSnackbar } = useSnackbarStore();
  const [fadeOut, setFadeOut] = useState(false);

  const handleMapClick = pin => {
    if (!isLoggedIn) {
      setLoginModal(true);
      return;
    }

    if (pin.placePinCount > 1) {
      console.log(pin);
      navigate(`/details-place/${pin.placeId}`);
    } else {
      console.log("핀 정보:", pin);
      console.log("곡 정보:", pin.latestSongId);
      navigate(`/details-song/${pin.latestSongId}`);
    }
  };

  // const groupPinsByLocation = (pins) => {
  //   const groupedPins = pins.reduce((acc, pin) => {
  //     const key = `${pin.latitude},${pin.longitude}`;
  //     if (!acc[key]) {
  //       acc[key] = [];
  //     }
  //     acc[key].push(pin);
  //     return acc;
  //   }, {});
  //   return groupedPins;
  // };

  // const groupedPins = groupPinsByLocation(pinsToDisplay);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          const isValidLocation =
            latitude >= 33.0 &&
            latitude <= 38.0 &&
            longitude >= 124.0 &&
            longitude <= 132.0;

          if (isValidLocation) {
            setLat(latitude);
            setLng(longitude);
          } else {
            setLat(defaultCenter.lat);
            setLng(defaultCenter.lng);
          }
        },
        function () {
          setLat(defaultCenter.lat);
          setLng(defaultCenter.lng);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    } else {
      setLat(defaultCenter.lat);
      setLng(defaultCenter.lng);
    }
  }, [defaultCenter.lat, defaultCenter.lng]);

  useEffect(() => {
    if (isSnackbar) {
      const timer = setTimeout(() => {
        setIsSnackbar("");
      }, 2000); // 2초
      return () => clearTimeout(timer);
    }
  }, [isSnackbar]);

  return (
    <div
    // style={{
    //   position: "relative",
    //   width: "100vw",
    //   height: "100vh",
    // }}
    >
      <Map
        center={{ lat, lng }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "auto",
        }}
      >
        {/* {Object.entries(groupedPins).map(([key, pins]) => {
          if (pins.length === 0) return null; // 핀이 없으면 건너뜀
          const pin = pins[0]; // 대표로 사용할 핀 데이터
          const pinCount = pins.length; */}
        {pinsToDisplay.map(pin => {
          const pinCount = pinsToDisplay.filter(
            p => p.latitude === pin.latitude && p.longitude === pin.longitude,
          ).length;

          return (
            <Wrapper onClick={() => handleMapClick(pin)}>
              <React.Fragment key={`${pin.latitude},${pin.longitude}`}>
                <MapMarker onClick={() => handleMapClick(pin)}
                  position={{ lat: pin.latitude, lng: pin.longitude }}
                  image={{
                    src: genreImages[pin.latestGenreName] || extra,
                    size: { width: 114, height: 114 },
                    options: { offset: { x: 57, y: 57 } },
                  }}
                />
                {pin.placePinCount > 1 && (
                  <CustomOverlayMap
                    position={{ lat: pin.latitude, lng: pin.longitude }}
                  >
                    <PinNum>{pin.placePinCount}</PinNum>
                  </CustomOverlayMap>
                )}
              </React.Fragment>
            </Wrapper>
          );
        })}
      </Map>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "80px",
          height: "100%",
          zIndex: 2,
        }}
      >
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/details-song/:songId" element={<MusicInfoPage />} />
          <Route path="/details-place/:placeId" element={<PlaceInfoPage />} />
          <Route path="/create" element={<CreatePinPage />} />
          <Route path="/pin-edit/:pinId" element={<EditPinPage />} />
          <Route path="/playlists" element={<PlaylistPage />} />
          <Route path="/usersearch" element={<UserSearchPage />} />
          <Route path="/users/:memberId" element={<UsersPage />} />
          <Route path="/users/:memberId/follows" element={<UserFollowPage />} />
          <Route path="/playlistsearch" element={<PlaylistSearchPage />} />
          <Route
            path="/playlists/:playlistId"
            element={<PlaylistDetailPage />}
          />
          <Route
            path="/playlist-edit/:playlistId"
            element={<PlaylistEditPage />}
          />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/edit" element={<ProfileEditPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/calendar" element={<CalendarViewPage />} />
          <Route path="/mypin-search" element={<MyPinSearchPage />} />
        </Routes>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          zIndex: 1,
        }}
      >
        {location.pathname === "/home" && (
          <MapFilter
            onFilterChange={handleFilterChange}
            onFilterChange2={handleFilterChange2}
          />
        )}
      </div>
      {isSnackbar && (
        <CommonSnackbar
          text={isSnackbar}
          className={fadeOut ? "fade-out" : ""}
        />
      )}
      <Notification />
    </div>
  );
}

const Wrapper = styled.div`
  cursor: pointer;
`;

const PinNum = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0%);
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--f8f8f8, #fcfcfc);
  text-align: center;
  text-shadow:
    -1.5px 0px #232323,
    0px 1.5px #232323,
    1.5px 0px #232323,
    0px -1.5px #232323;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;
