import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import sidebar_logo from "../../assets/sidebar/sidebar_logo.svg";
import sidebar_home from "../../assets/sidebar/sidebar_home.svg";
import sidebar_search from "../../assets/sidebar/sidebar_search.svg";
import sidebar_create from "../../assets/sidebar/sidebar_create.svg";
import sidebar_playlist from "../../assets/sidebar/sidebar_playlist.svg";
import sidebar_usersearch from "../../assets/sidebar/sidebar_usersearch.svg";
import sidebar_mypage from "../../assets/sidebar/sidebar_mypage.svg";
import useMyPageClickStore from "../../store/useMyPageClickStore";

const SideBar = ({ isNotLoggedIn, setLoginModal, isModalOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = React.useState(location.pathname);
  const { setMyPageClick } = useMyPageClickStore();

  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const onItemClick = path => {
    if (isNotLoggedIn) {
      setLoginModal(true);
    } else {
      setActivePath(path);
      navigate(path);
    }
  };

  const onFirstItemClick = path => {
    setActivePath(path);
    navigate(path);
  };

  const handleMyPage = () => {
    setMyPageClick(true);
    onItemClick("/mypage");
  };

  return (
    <SideBarContainer isModalOpen={isModalOpen}>
      <PinFeatures>
        <StyledButton
          onClick={() => onFirstItemClick("/")}
          noBackground={activePath === "/"}
        >
          <HomeLogo src={sidebar_logo} alt="Home Logo" />
        </StyledButton>
        <StyledButton
          isNotLoggedIn={isNotLoggedIn}
          onClick={() => onItemClick("/home")}
          isActive={activePath === "/home"}
        >
          <Home src={sidebar_home} alt="Home" />
        </StyledButton>
        <StyledButton
          isNotLoggedIn={isNotLoggedIn}
          onClick={() => onItemClick("/search")}
          isActive={activePath === "/search"}
        >
          <Search src={sidebar_search} alt="Search" />
        </StyledButton>
        <StyledButton
          isNotLoggedIn={isNotLoggedIn}
          onClick={() => onItemClick("/create")}
          isActive={activePath === "/create"}
        >
          <Create src={sidebar_create} alt="Create" />
        </StyledButton>
        <StyledButton
          isNotLoggedIn={isNotLoggedIn}
          onClick={() => onItemClick("/playlists")}
          isActive={activePath === "/playlists"}
        >
          <Playlist src={sidebar_playlist} alt="Playlist" />
        </StyledButton>
      </PinFeatures>
      <UserFeatures>
        <StyledButton
          isNotLoggedIn={isNotLoggedIn}
          onClick={() => onItemClick("/usersearch")}
          isActive={activePath === "/usersearch"}
        >
          <UserSearch src={sidebar_usersearch} alt="Search User" />
        </StyledButton>
        <StyledButton
          isNotLoggedIn={isNotLoggedIn}
          onClick={handleMyPage}
          isActive={activePath === "/mypage"}
        >
          <MyPage src={sidebar_mypage} alt="MyPage" />
        </StyledButton>
      </UserFeatures>
    </SideBarContainer>
  );
};

const SideBarContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  height: 100%;
  background: var(--f8f8f8, #fcfcfc);
  z-index: 10; // 지도 위로 출력
  background-color: ${props =>
    props.isModalOpen ? "#cacaca" : "var(--f8f8f8, #fcfcfc)"};
`;

const PinFeatures = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const UserFeatures = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const StyledButton = styled.button`
  width: 60px;
  height: 60px;
  background: ${({ isActive, noBackground }) =>
    isActive && !noBackground ? "var(--light_black, #232323)" : "none"};
  border: none;
  padding: 0;
  margin: 15px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: ${({ isActive }) => (isActive ? "50%" : "none")};

  &:focus {
    outline: none;
  }

  ${props =>
    props.isActive &&
    `
        & img {
            filter: brightness(0) invert(1);
        }
    `}

  ${props =>
    props.isNotLoggedIn &&
    `cursor: default;
    pointer-events: none;
  `}
`;

const HomeLogo = styled.img`
  width: 40px;
  height: 40px;
`;

const Home = styled.img`
  width: 40px;
  height: 40px;
  transition: filter 0.3s ease;

  ${StyledButton}:focus & {
    filter: brightness(0) invert(0.7);
  }
`;

const Search = styled.img`
  width: 27.308px;
  height: 27.308px;
  padding: 16px;
  transition: filter 0.3s ease;

  ${StyledButton}:focus & {
    filter: brightness(0) invert(0.7);
  }
`;

const Create = styled.img`
  width: 40px;
  height: 40px;
  transition: filter 0.3s ease;

  ${StyledButton}:focus & {
    filter: brightness(0) invert(0.7);
  }
`;

const Playlist = styled.img`
  width: 43px;
  height: 43px;
  transition: filter 0.3s ease;

  ${StyledButton}:focus & {
    filter: brightness(0) invert(0.7);
  }
`;

const UserSearch = styled.img`
  width: 40px;
  height: 40px;
  transition: filter 0.3s ease;

  ${StyledButton}:focus & {
    filter: brightness(0) invert(0.7);
  }
`;

const MyPage = styled.img`
  width: 30px;
  height: 28px;
  transition: filter 0.3s ease;

  ${StyledButton}:focus & {
    filter: brightness(0) invert(0.7);
  }
`;

export default SideBar;
