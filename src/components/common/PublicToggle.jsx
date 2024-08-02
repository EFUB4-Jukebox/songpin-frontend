import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactSwitch from "react-switch";

const PublicToggle = ({ isPublic, setIsPublic }) => {
  const handleToggle = checked => {
    setIsPublic(checked);
  };
  return (
    <Switch>
      <ToggleText>{isPublic ? "공개" : "비공개"}</ToggleText>
      <StyledSwitch
        onChange={handleToggle}
        checked={isPublic}
        onColor="#FFFFFF"
        onHandleColor="#000000"
        offColor="#000000"
        offHandleColor="#FFFFFF"
        handleDiameter={20}
        uncheckedIcon={false}
        checkedIcon={false}
        // boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        // activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={30}
        width={60}
        className="react-switch"
      />
    </Switch>
  );
};

const Switch = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleText = styled.span`
  margin-right: 10px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: var(--gray02, #747474);
  margin-right: 16px;
`;

const StyledSwitch = styled(ReactSwitch)`
  &.react-switch {
    border: ${({ checked }) =>
      checked ? "1px solid #000000" : "1px solid #000000"};
  }
`;

export default PublicToggle;
