import styled from "styled-components";

const Input = ({
  position,
  placeholder,
  infoMsg,
  type,
  value,
  onChange,
  hasError,
  onKeyPress,
}) => {
  return (
    <>
      <InputWrapper hasError={hasError}>
        <InputField
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          hasError={hasError}
          onKeyPress={onKeyPress}
        />
        <div className="input">
          {infoMsg && <div className="infoMsg">{infoMsg}</div>}
        </div>{" "}
      </InputWrapper>
    </>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 5px;

  .infoMsg {
    color: var(--gray02, #747474);
    text-align: right;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
  }
`;
const InputField = styled.input`
  width: 477.87px;
  height: 40px;
  font-size: 20px;
  padding: 10px;
  border: ${props =>
    props.hasError ? "1px solid #FF3844" : "1px solid var(--gray02, #747474)"};
  &::placeholder {
    font-family: Pretendard;
  }
`;

export default Input;
