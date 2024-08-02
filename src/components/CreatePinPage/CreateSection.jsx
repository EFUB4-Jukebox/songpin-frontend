import React, { useState } from 'react';
import styled from 'styled-components';
import arrowIcon from '../../assets/images/MyPage/arrow.svg';
// import SideBar from '../HomePage/SideBar';

const CreateSection = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SideComponent>
      <SideBar></SideBar>
      <SideBox isOpen={isOpen}>
        <Content>{children}</Content>
      </SideBox>
    </SideComponent>
  );
};

export default CreateSection;

const SideComponent = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  position: absolute;
  z-index: 10;
  /* overflow-y: overlay; */
`;

const SideBar = styled.div`
  width: 80px;
  border-right: 1px solid var(--gray, #bcbcbc);
`;

const SideBox = styled.div`
  width: ${(props) => (props.isOpen ? '528px' : '0')};
  border-right: 1px solid var(--gray, #bcbcbc);
  flex-shrink: 0;
  height: 100vh;
  overflow-x: hidden;
  /* overflow-y: overlay; */

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background: var(--gray, #bcbcbc);
    /* background-clip: padding-box;
    border: 5px solid transparent; */
  }
  &::-webkit-scrollbar-track {
    background: var(--offwhite, #efefef);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;