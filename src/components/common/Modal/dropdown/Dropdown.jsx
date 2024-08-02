import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Dropdown = props => {
  const [visiblityAnimation, setVisiblityAnimation] = useState(false);
  const [repeat, setRepeat] = useState(null);

  useEffect(() => {
    if (props.visiblity) {
      clearTimeout(repeat);
      setRepeat(null);
      setVisiblityAnimation(true);
    } else {
      setRepeat(
        setTimeout(() => {
          setVisiblityAnimation(false);
        }, 400),
      );
    }
  }, [props.visiblity]);

  return (
    <Wrapper>
      <div
        className={`components-dropdown ${
          props.visiblity ? "slide-fade-in-dropdown" : "slide-fade-out-dropdown"
        }`}
      >
        {visiblityAnimation && props.children}
      </div>
    </Wrapper>
  ); //단락회로평가
};
const Wrapper = styled.div`
  .components-dropdown {
    position: absolute;
  }
  @keyframes slide-fade-in-dropdown-animation {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }

  .slide-fade-in-dropdown {
    overflow: hidden;
  }

  .slide-fade-in-dropdown > ul {
    animation: slide-fade-in-dropdown-animation 0.4s ease;
  }

  @keyframes slide-fade-out-dropdown-animation {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }

  .slide-fade-out-dropdown {
    overflow: hidden;
  }

  .slide-fade-out-dropdown > ul {
    animation: slide-fade-out-dropdown-animation 0.4s ease;
    animation-fill-mode: forwards;
    /*요소가 애니메이션이 끝난 후에도 특정한 상태를 유지하도록 하고자 할 때 사용
  ex) 드롭다운 메뉴가 화면에서 사라질 때 사용자가 마지막으로 선택한 항목을 유지하고 싶을 때 
  animation-fill-mode: forwards;를 사용하면 애니메이션이 완료된 후에도 드롭다운 메뉴가 마지막으로 선택한 항목의 상태를 유지하게 된다.*/
  }
`;

export default Dropdown;
