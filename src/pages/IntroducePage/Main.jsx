import NavBar from "../../components/IntroducePage/NavBar";
import main_center from "../../assets/introduce/main_center.svg";
import main_bottom from "../../assets/introduce/main_bottom.svg";
import styled from "styled-components";
import Background from "../../components/IntroducePage/Background";
import { useNavigate } from "react-router-dom";
import main_bottom_text from "../../assets/introduce/main_bottom_text.svg";
const Main = () => {
  const navigate = useNavigate();
  const handleGotoHomepage = () => {
    navigate("/home");
  };
  return (
    <>
      <BackgroundWrapper>
        <Background />
      </BackgroundWrapper>

      <Wrapper>
        <NavBar />
        <Center>
          <img src={main_center} alt="main center" />
        </Center>
        <Bottom>
          <img
            onClick={handleGotoHomepage}
            src={main_bottom}
            alt="main_bottom"
          />
        </Bottom>
        <BottomText>
          <img
            onClick={handleGotoHomepage}
            src={main_bottom_text}
            alt="main_bottom_text"
          />
        </BottomText>
      </Wrapper>
    </>
  );
};

const BackgroundWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
`;
const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;
const Center = styled.div`
  position: fixed;
  left: 50%;
  z-index: 1;
  top: 85px;
  transform: translateX(-50%);
`;
const Bottom = styled.div`
  img {
    width: 810.9px;
    height: 366.3px;
    position: fixed;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%);
    cursor: pointer;
  }
`;
const BottomText = styled.div`
  position: fixed;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
  z-index: 2;
  cursor: pointer;
`;

export default Main;
