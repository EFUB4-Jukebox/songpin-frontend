import statisticsIcon3 from "../../assets/introduce/statisticsIcon3.svg";
import statisticsIcon4 from "../../assets/introduce/statisticsIcon4.svg";
import styled from "styled-components";

const StatBackground3 = () => {
  return (
    <>
      <Second>
        <First>
          <img src={statisticsIcon3} />
          <img src={statisticsIcon3} style={{ transform: "rotate(-180deg)" }} />
        </First>
        <First>
          <img src={statisticsIcon3} />
          <img src={statisticsIcon3} style={{ transform: "rotate(-180deg)" }} />
        </First>
        <First>
          <img src={statisticsIcon4} />
          <img src={statisticsIcon4} style={{ transform: "scaleX(-1)" }} />
        </First>
      </Second>
    </>
  );
};
const First = styled.div`
  display: flex;
  width: 100vw;
  min-width: 1920px;
  justify-content: space-between;
`;
const Second = styled.div`
  display: flex;
  flex-direction: column;
  gap: 860px;
`;

export default StatBackground3;
