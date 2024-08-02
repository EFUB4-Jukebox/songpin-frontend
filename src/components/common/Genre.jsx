import styled from "styled-components";

const Genre = ({ name, img, bgColor, width, height, text, onClick }) => {
  return (
    <GenreWrapper
      bgColor={bgColor}
      width={width}
      height={height}
      text={text}
      onClick={onClick}
    >
      <span>#{name}</span>
      <span>
        <ImgWrapper className={bgColor ? "colored" : ""}>
          <img src={img} />
        </ImgWrapper>
      </span>
    </GenreWrapper>
  );
};
const GenreWrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height || "25px"};
  font-size: ${props => props.text || "20px"};
  background-color: ${props => props.bgColor || "transparent"};
  color: ${props => props.bgColor && "white"};
  border-radius: 45px;
  border: ${props =>
    props.bgColor
      ? "1px solid rgba(0, 0, 0, 0)"
      : "1px solid var(--light_black, #232323)"};
  display: flex;
  padding: 6px 9px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  cursor: pointer;
`;
const ImgWrapper = styled.span`
  img {
    display: flex;
  }
`;

export default Genre;
