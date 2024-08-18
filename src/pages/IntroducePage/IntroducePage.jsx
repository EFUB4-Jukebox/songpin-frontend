import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import NavBar from "../../components/IntroducePage/NavBar";
import main_center from "../../assets/introduce/intro_center.svg";
import logo_bottom from "../../assets/introduce/logo_bottom.svg";
import first from "../../assets/introduce/intro_ex_first.svg";
import second from "../../assets/introduce/intro_ex_second.svg";
import third from "../../assets/introduce/intro_ex_third.svg";
import fourth from "../../assets/introduce/intro_ex_fourth.svg";
import Background2 from "../../components/IntroducePage/Background2";
import main_center_text from "../../assets/introduce/intro_center_text.svg";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50%);
  }
  50% {
    opacity: 0;
    transform: translateY(50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const fadeInUp2 = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const IntroducePage = () => {
  const secondImgRef = useRef(null);
  const thirdImgRef = useRef(null);
  const fourthImgRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0, // 10%가 보일 때 트리거
    };

    const handleIntersect = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    if (thirdImgRef.current) observer.observe(thirdImgRef.current);

    // 클린업 함수
    return () => {
      if (thirdImgRef.current) observer.unobserve(thirdImgRef.current);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0, // 10%가 보일 때 트리거
    };

    const handleIntersect = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    //특정 요소가 뷰포트에 들어오거나 나가는 등 가시성의 변화를 감지할 때 콜백 함수를 호출할 수 있도록 함
    if (secondImgRef.current) observer.observe(secondImgRef.current);
    if (fourthImgRef.current) observer.observe(fourthImgRef.current);

    // 클린업 함수
    return () => {
      if (secondImgRef.current) observer.unobserve(secondImgRef.current);
      if (fourthImgRef.current) observer.unobserve(fourthImgRef.current);
    };
  }, []);

  return (
    <div>
      <Background>
        <BackgroundWrapper>
          <Background2 />
        </BackgroundWrapper>
      </Background>
      <Wrapper>
        <NavBar />
        <Center>
          <img src={main_center} alt="main center" />
        </Center>
        <CenterText>
          <img className="mainImg" src={main_center_text} alt="main text" />
        </CenterText>
        <Mid>
          <div className="first">
            <img className="firstImg" src={first} alt="first" />
          </div>
          <div className="second">
            <img
              ref={secondImgRef}
              src={second}
              alt="second"
              className="secondImg"
            />
            <img
              ref={thirdImgRef}
              src={third}
              alt="third"
              className="thirdImg"
            />
            <img
              ref={fourthImgRef}
              src={fourth}
              alt="fourth"
              className="fourthImg"
            />
          </div>
        </Mid>
        <Bottom>
          <img src={logo_bottom} alt="logo bottom" />
        </Bottom>
      </Wrapper>
    </div>
  );
};

export default IntroducePage;
const Background = styled.div`
  display: flex;
  justify-content: center;
  min-width: 1920px;
`;
const BackgroundWrapper = styled.div`
  position: absolute;
  min-width: 1920px;
  top: 0px;
  margin: auto;
  z-index: 0;
`;

const Wrapper = styled.div`
  min-width: 1920px;
  position: relative;
  z-index: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

const Center = styled.div`
  min-width: 1920px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const CenterText = styled.div`
  min-width: 1920px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  top: 10.5%;
  z-index: 2;
  .mainImg {
    animation: ${fadeInUp2} 1.5s ease-in-out forwards;
    opacity: 0;
  }
`;

const Mid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 115px;
  position: relative;

  .second {
    display: flex;
    margin-top: 44px;
    gap: 161px;
  }

  .firstImg {
    animation: ${fadeInUp} 2s ease-in-out forwards;
    opacity: 0;
    transform: translateY(50%);
  }
  .secondImg {
    opacity: 0;
    transform: translateX(-100%);
    transition:
      opacity 1s ease-in-out,
      transform 1s ease-in-out;
  }

  .thirdImg {
    margin-right: 50px;
    opacity: 0;
    transform: translateY(50%);
    transition:
      opacity 1s ease-in-out,
      transform 1s ease-in-out;
  }

  .fourthImg {
    opacity: 0;
    transform: translateX(100%);
    transition:
      opacity 1s ease-in-out,
      transform 1s ease-in-out;
  }

  .in-view.secondImg {
    opacity: 1;
    transform: translateX(0);
  }

  .in-view.thirdImg {
    opacity: 1;
    transform: translateY(0);
  }

  .in-view.fourthImg {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;

  img {
    margin: auto;
  }
`;
