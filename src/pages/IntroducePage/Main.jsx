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
          <BottomText>음악지도 보러가기</BottomText>
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
  min-width: 1536px;
  position: relative;
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
  position: relative;
  img {
    width: 810.9px;
    height: 366.3px;
    position: fixed;
    left: 50%;
    bottom: 0px;
    z-index: 2;
    transform: translateX(-50%);
    cursor: pointer;
    @media (max-width: 768px) {
      width: 340.578px;
      height: 153.846px;
    }
  }
`;
const BottomText = styled.div`
  position: fixed;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
  z-index: 3;
  color: var(--light_black, #232323);
  text-align: center;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 125% */
  cursor: pointer;
  @media (max-width: 768px) {
    postiion: absolute;
    bottom: 20px;
    font-size: 16px;
  }
`;

export default Main;
