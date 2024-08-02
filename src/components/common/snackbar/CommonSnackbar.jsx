import styled from "styled-components";

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
  background: #62625f;
  color: var(--f8f8f8, #fcfcfc);
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
`;
export default CommonSnackbar;
