import NavBar from "../../components/IntroducePage/NavBar";
import main_center from "../../assets/introduce/main_center.svg";
import styled from "styled-components";
import Background from "../../components/IntroducePage/Background";
import logo_bottom from "../../assets/introduce/logo_bottom.svg";
import first from "../../assets/introduce/intro_ex_first.svg";
import second from "../../assets/introduce/intro_ex_second.svg";
import third from "../../assets/introduce/intro_ex_third.svg";
import fourth from "../../assets/introduce/intro_ex_fourth.svg";

const IntroducePage = () => {
  return (
    <div>
      <BackgroundWrapper>
        <Background />
      </BackgroundWrapper>
      <Wrapper>
        <NavBar />
        <Center>
          <img src={main_center} alt="main center" />
        </Center>
        <Mid>
          <div className="first">
            <img src={first} />
          </div>
          <div className="second">
            <img src={second} />
            <img src={third} />
            <img src={fourth} />
          </div>
        </Mid>
        <Bottom>
          <img src={logo_bottom} />
        </Bottom>
      </Wrapper>
    </div>
  );
};

export default IntroducePage;

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  top: -15px;
`;
const Mid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 115px;
  .second {
    display: flex;
    margin-top: 44px;
    gap: 161px;
  }
`;
const Bottom = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
`;
