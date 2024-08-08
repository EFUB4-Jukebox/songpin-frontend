import styled from 'styled-components';

const Input = ({ placeholder, infoMsg }) => {
  return (
    <>
      <InputWrapper>
        <input type="text" placeholder={placeholder} />
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
