import styled, { keyframes } from "styled-components";
import spinner from "../../assets/common/spinner.svg";
const spin = keyframes`
  0% {

    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;
const LoadingSpinner = () => {
  return (
    <Loading>
      <Spinner src={spinner} />
    </Loading>
  );
};

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  align-items: center;
  gap: 20px;
  color: var(--gray02, rgb(116, 116, 116));
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;

const Spinner = styled.img`
  width: 50px;
  height: 50px;
  animation: ${spin} 1s infinite;
`;

export default LoadingSpinner;
