import NavBar from "../../components/IntroducePage/NavBar";
import main_center from "../../assets/introduce/main_center.svg";
import main_bottom from "../../assets/introduce/bottom.png";
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
  min-width: 1000px;
  z-index: 1;
`;
const Center = styled.div`
  position: absolute;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  @media (min-width: 1024px) {
    img {
      width: 100%; /*1024px보다 클 때 width 100%*/
    }
  }
  @media (max-width: 1024px) {
    img {
      width: 100%; /*1024px보다 작을 때 width 10%*/
    }
  }
`;
const Bottom = styled.div`
  img {
    width: 684x;
    height: 357.2px;
    position: absolute;
    bottom: 0px;
    left: 50%;

    z-index: 0;
    transform: translateX(-50%);
    cursor: pointer;

    @media (max-width: 800px) {
      width: 70%;
      height: auto;
    }
  }
`;

export default Main;
