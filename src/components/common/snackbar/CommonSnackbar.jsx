import styled, { keyframes } from "styled-components";

const fadeout = keyframes`
0%{
  opacity:1;
}


100%{
  opacity:0
}
`;
const CommonSnackbar = ({ text }) => {
  return <Wrapper>{text}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  width: 460px;
  height: 44px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50px;
  background: #232323b3;
  color: var(--f8f8f8, #fcfcfc);
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  opacity: 1;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 100px;
  z-index: 1000;
  animation: ${fadeout} 6s ease-in-out;
`;
export default CommonSnackbar;
