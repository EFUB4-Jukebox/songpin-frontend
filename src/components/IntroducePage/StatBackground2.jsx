import statisticsIcon2 from "../../assets/introduce/statisticsIcon2.svg";
import styled, { keyframes } from "styled-components";
const rotateImage = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
const StatBackground2 = () => {
  return (
    <>
      <Third>
        <Second>
          <First>
            <img src={statisticsIcon2} />
            <img src={statisticsIcon2} />
          </First>
          <First>
            <img src={statisticsIcon2} />
            <img src={statisticsIcon2} />
          </First>
        </Second>
        <Second>
          <First>
            <img src={statisticsIcon2} />
            <img src={statisticsIcon2} />
          </First>
          <First>
            <img src={statisticsIcon2} />
            <img src={statisticsIcon2} />
          </First>
        </Second>
        <Second>
          <First>
            <img src={statisticsIcon2} />
            <img src={statisticsIcon2} />
          </First>
          <First>
            <img src={statisticsIcon2} />
            <img src={statisticsIcon2} />
          </First>
        </Second>
      </Third>
    </>
  );
};
const First = styled.div`
  display: flex;
  gap: 728px;
  justify-content: center;
  img {
    animation: ${rotateImage} 3s linear infinite;
    transform-origin: 50% 50%;
  }
`;
const Second = styled.div`
  display: flex;
  flex-direction: column;
  gap: 405px;
`;
const Third = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1020px;
  margin-top: 39px;
  margin-bottom: 851px;
`;

export default StatBackground2;
