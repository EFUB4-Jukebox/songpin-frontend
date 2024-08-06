import styled from "styled-components";

const Input = ({ placeholder, infoMsg, type, value, onChange, hasError }) => {
  return (
    <>
      <InputWrapper hasError={hasError}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {infoMsg && <div className="infoMsg">{infoMsg}</div>}
      </InputWrapper>
    </>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 5px;

  input {
    width: 475px;
    height: 40px;
    font-size: 20px;
    padding: 10px;
    border: ${props =>
      props.hasError
        ? "1px solid #FF3844"
        : "1px solid var(--gray02, #747474)"};
    input:focus {
      border-color: #007bff; /* 원하는 색상으로 변경 */
    }
  }

  .infoMsg {
    color: var(--gray02, #747474);
    text-align: right;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
  }
`;

export default Input;
