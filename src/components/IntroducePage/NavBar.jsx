import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { MenuList } from "../../constants/MenuList";
import LoginModal from "../AuthPage/LoginModal";
import { useState, useEffect } from "react";
import SignupModal from "../AuthPage/SignupModal";
import CompleteLogin from "../AuthPage/CompleteLogin";
import PwResetModal from "../AuthPage/PwResetModal";
import { postLogout } from "../../services/api/auth";

const NavBar = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [completeLogin, setCompleteLogin] = useState(false);
  const [pwResetModal, setPwResetModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoginModal(true);
  };
  const handleSignup = () => {
    setSignupModal(true);
  };

  const handleLogout = async () => {
    await postLogout();
    setIsLoggedIn(false);
  };

  return (
    <>
      <div>
        <Navbar>
          <Menu>
            {MenuList.map(it => (
              <StyledNavLink to={it.to} key={it.id}>
                {it.name}
              </StyledNavLink>
            ))}
          </Menu>
          <Login>
            <ul>
              {isLoggedIn ? (
                <li onClick={handleLogout}>로그아웃</li>
              ) : (
                <>
                  <li onClick={handleLogin}>로그인</li>
                  <li onClick={handleSignup}>회원가입</li>
                </>
              )}
            </ul>
          </Login>
        </Navbar>
      </div>
      {loginModal && (
        <LoginModal
          setPwResetModal={setPwResetModal}
          setCompleteLogin={setCompleteLogin}
          setLoginModal={setLoginModal}
          setSignupModal={setSignupModal}
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
    </>
  );
};

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
  position: relative;
  z-index: 2;
  white-space: nowrap;
`;
const Menu = styled.ul`
  display: flex;
  gap: 101px;
  list-style: none;
  font-weight: bold;
  font-size: 32px;
  padding: 0;
  margin: 0;
  margin-left: 100px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;

  &.active {
    color: #24ee81; // 원하는 색상으로 변경
  }

  &:hover {
    color: #24ee81; // 원하는 색상으로 변경
  }
`;
const Login = styled.nav`
  ul {
    display: flex;
    gap: 101px;
    list-style: none;
    font-weight: normal;
    font-size: 24px;
    padding: 0;
    margin: 0;
    margin-right: 100px;
    cursor: pointer;
  }
  li {
    &.active {
      color: #24ee81; // 원하는 색상으로 변경
    }

    &:hover {
      color: #24ee81; // 원하는 색상으로 변경
    }
  }
`;

export default NavBar;
