import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

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
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Notification from "./components/common/Notification";
import { postMarkers } from './services/api/map';

import pop from './assets/map/glowing_map_pop.svg';
import ballad from './assets/map/glowing_map_ballad.svg';
import dance from './assets/map/glowing_map_dance.svg';
import hiphop from './assets/map/glowing_map_hiphop.svg';
import jazz from './assets/map/glowing_map_jazz.svg';
import lofi from './assets/map/glowing_map_lofi.svg';
import rock from './assets/map/glowing_map_rock.svg';
import extra from './assets/map/glowing_map_extra.svg';

const genreImages = {
  "POP": pop,
  "BALLAD": ballad,
  "DANCE": dance,
  "HIPHOP": hiphop,
  "JAZZ": jazz,
  "LOFI": lofi,
  "ROCK": rock,
  "EXTRA": extra,
};

function App() {

  const [allPins, setAllPins] = useState([]);

  useEffect(()=> {
    const fetchAllPinData = async () => {
      try {
      const Data = await postMarkers();
      setAllPins(Data.mapPlaceSet);
      } catch (error) {
      console.error("Error fetching all pin data:", error);
      }
    };
    fetchAllPinData();
    console.log(allPins);
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/introduce" element={<IntroducePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/resetPassword" element={<PwResetPage />} />
        <Route
          path="/resetPasswordComplete"
          element={<PwResetCompletePage />}
        />
        <Route path="*" element={<h1>Not Found</h1>} />

        <Route element={<MapLayout allPins = {allPins}/>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/details-song/:songId" element={<MusicInfoPage />} />
          <Route path="/details-place/:placeId" element={<PlaceInfoPage />} />
          <Route path="/create" element={<CreatePinPage />} />
          <Route path="/pin-edit" element={<EditPinPage />} />
          <Route path="/playlists" element={<PlaylistPage />} />
          <Route path="/usersearch" element={<UserSearchPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/user-follows" element={<UserFollowPage />} />
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
    </Router>
  );
}

export default App;

function MapLayout({ allPins }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Map
        center={{ lat: 37.56011030387691, lng: 126.94585449321849 }}
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
        {allPins.map(pin => (
          <MapMarker 
            key={pin.id}
            position={{ lat: pin.latitude, lng: pin.longitude }}
            image={{
              src: genreImages[pin.latestGenreName] || extra,
              size: {
                width: 85,
                height: 85,
              },
            }}
            onClick={() => {
              if (pin.placePinCount >= 2) {
                navigate(`/details-place/${pin.placeId}`);
              } else {
                navigate(`/details-song/${pin.latestSongId}`);
              }
            }}>
            {/* <div style={{color:"#000"}}>{pin.name}</div> */}
          </MapMarker>
        ))}
      </Map>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "80px",
          height: "100%",
          zIndex: 1,
          // pointerEvents: "none",
        }}
      >
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/details-song" element={<MusicInfoPage />} />
          <Route path="/details-place" element={<PlaceInfoPage />} />
          <Route path="/create" element={<CreatePinPage />} />
          <Route path="/pin-edit" element={<EditPinPage />} />
          <Route path="/playlists" element={<PlaylistPage />} />
          <Route path="/usersearch" element={<UserSearchPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/user-follows" element={<UserFollowPage />} />
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
      <Notification></Notification>
    </div>
  );
}
