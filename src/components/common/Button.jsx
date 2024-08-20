import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const Button = ({ name, onClick, active, loading }) => {
  useEffect(() => {
    console.log(active);
  }, []);
  return (
    <>
      <Wrapper>
        <button
          className={active ? "activeButton" : "inactiveButton"}
          onClick={active && !loading ? onClick : null}
          disabled={!active || loading}
        >
          {loading ? (
            <LoadingDots>
              <div />
              <div />
              <div />
            </LoadingDots>
          ) : (
            name
          )}
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

const loading = keyframes`
0%,100% {
opacity:0;
transform: scale(0.5);
}
50% {
  opacity:1;
  transform: scale(1.2);
}
`;

const LoadingDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;

  div {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: gray;
    border-radius: 50%;
    animation: ${loading} 1s linear infinite;

    &:nth-child(1) {
      animation-delay: 0s;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
      margin: 0px 10px;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

export default Button;
