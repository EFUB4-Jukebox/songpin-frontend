import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import NavBar from "../../components/IntroducePage/NavBar";
import main_center from "../../assets/introduce/intro_center.svg";
import logo_bottom from "../../assets/introduce/logo_bottom.svg";
import first from "../../assets/introduce/intro_ex_first.svg";
import second from "../../assets/introduce/intro_ex_second.svg";
import third from "../../assets/introduce/intro_ex_third.svg";
import fourth from "../../assets/introduce/intro_ex_fourth.svg";
import Background2 from "../../components/IntroducePage/Background2";

const IntroducePage = () => {
  const firstImgRef = useRef(null);
  const secondImgRef = useRef(null);
  const thirdImgRef = useRef(null);
  const fourthImgRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1, // 10%가 보일 때 트리거
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
    if (firstImgRef.current) observer.observe(firstImgRef.current);
    if (secondImgRef.current) observer.observe(secondImgRef.current);
    if (thirdImgRef.current) observer.observe(thirdImgRef.current);
    if (fourthImgRef.current) observer.observe(fourthImgRef.current);

    // 클린업 함수
    return () => {
      if (firstImgRef.current) observer.unobserve(firstImgRef.current);
      if (secondImgRef.current) observer.unobserve(secondImgRef.current);
      if (thirdImgRef.current) observer.unobserve(thirdImgRef.current);
      if (fourthImgRef.current) observer.unobserve(fourthImgRef.current);
    };
  }, []);

  return (
    <div>
      <BackgroundWrapper>
        <Background2 />
      </BackgroundWrapper>
      <Wrapper>
        <NavBar />
        <Center>
          <img src={main_center} alt="main center" />
        </Center>
        <Mid>
          <div className="first">
            <img
              className="firstImg"
              ref={firstImgRef}
              src={first}
              alt="first"
            />
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

  .firstImg {
    opacity: 0;
    transform: translateY(-50%);
    transition:
      opacity 1s ease-in-out,
      transform 1s ease-in-out;
  }

  .secondImg {
    opacity: 0;
    transform: translateX(-100%);
    transition:
      opacity 1s ease-in-out,
      transform 1s ease-in-out;
  }

  .thirdImg {
    margin-top: 50px;
    height: 263px;
    opacity: 0;
    transform: translateY(100%);
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

  .in-view.firstImg {
    opacity: 1;
    transform: translateY(0);
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
  position: relative;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
`;
