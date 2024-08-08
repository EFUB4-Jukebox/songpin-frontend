import statisticsIcon1 from "../../assets/introduce/statisticsIcon1.svg";
import styled, { keyframes } from "styled-components";

const roll = keyframes`
  0% {

    transform: translateX(0%) rotate(0deg);
  }
  
  100% {
    opacity: 1;
    transform: translateX(390%) rotate(360deg);
  }
`;
const roll2 = keyframes`
  0% {

    transform: translateX(0%) rotate(0deg);
  }
  
  100% {
    opacity: 1;
    transform: translateX(-390%) rotate(360deg);
  }
`;
const StatBackground1 = () => {
  return (
    <>
      <Second>
        <First>
          <img className="first-first" src={statisticsIcon1} />
          <img className="first-second" src={statisticsIcon1} />
        </First>
        <First>
          <img src={statisticsIcon1} />
          <img src={statisticsIcon1} />
        </First>
        <First>
          <img src={statisticsIcon1} />
          <img src={statisticsIcon1} />
        </First>
      </Second>
    </>
  );
};
const First = styled.div`
  display: flex;
  gap: 800px;
  justify-content: center;
  .first-first {
    animation: ${roll} 2.5s ease-in forwards;
  }
  .first-second {
    animation: ${roll2} 2.5s ease-in forwards;
  }
`;
const Second = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1300px;
  justify-content: center;
  align-items: center;
`;
export default StatBackground1;
