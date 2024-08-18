import Background from "../../components/IntroducePage/Background";
import NavBar from "../../components/IntroducePage/NavBar";
import StatBackground1 from "../../components/IntroducePage/StatBackground1";
import StatBackground2 from "../../components/IntroducePage/StatBackground2";
import styled from "styled-components";
import StatBackground3 from "../../components/IntroducePage/StatBackground3";
import Stats from "../../components/IntroducePage/Stats";
const StatisticsPage = () => {
  return (
    <div>
      <Wrapper>
        <NavBar />
        <BackgroundWrapper1>
          <StatBackground1 />
        </BackgroundWrapper1>
        <BackgroundWrapper2>
          <StatBackground2 />
        </BackgroundWrapper2>
        <BackgroundWrapper3>
          <StatBackground3 />
        </BackgroundWrapper3>
        <Statistics>
          <Stats />
        </Statistics>
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  position: relative;
  min-width: 1920px;
`;
const BackgroundWrapper1 = styled.div`
  position: absolute;
  top: 200px;
  /* 화면 세로 중앙 */
  left: 50%; /* 화면 가로 중앙 */
  transform: translate(-50%); /* 가운데 정렬 */
  z-index: 1;
`;
const BackgroundWrapper2 = styled.div`
  position: relative;
  z-index: 2;
`;

const BackgroundWrapper3 = styled.div`
  position: absolute;
  top: 637px;
  z-index: 2;
`;
const Statistics = styled.div`
  position: absolute;
  top: 254px;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
`;
export default StatisticsPage;
