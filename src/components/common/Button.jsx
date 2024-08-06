import { useEffect, useState } from "react";
import styled from "styled-components";

const Button = ({ name, onClick, active }) => {
  useEffect(() => {
    console.log(active);
  }, []);
  return (
    <>
      <Wrapper>
        <button
          className={active ? "activeButton" : "inactiveButton"}
          onClick={active ? onClick : null}
          disabled={!active}
        >
          {name}
        </button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  .activeButton {
    cursor: pointer;
    border: 1px solid var(--light_black, #232323);
    background: var(--light_black, #232323);
    width: 500px;
    height: 60px;
    flex-shrink: 0;
    color: var(--f8f8f8, #fcfcfc);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px;
  }
  .inactiveButton {
    width: 500px;
    height: 60px;
    flex-shrink: 0;
    border: 1px solid var(--gray, #bcbcbc);
    background: var(--gray, #bcbcbc);
    color: var(--f8f8f8, #fcfcfc);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 40px;
  }
`;
export default Button;
