import { useEffect, useState } from "react";
import down from "../../../../assets/common/dropdown.svg";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import { useQuery } from "@tanstack/react-query";
import { getMyPlaylist } from "../../../../services/api/myPage";
import usePlaylistIdStore from "../../../../store/usePlaylistIdStore";
import usePlaylistInfoMsgStore from "../../../../store/usePlaylistInfoMsgStore";

const PlaylistDropdown = ({ placeholder, setActive }) => {
  const [DropdownView, setDropdownView] = useState(false);
  const [initState, setInitState] = useState(placeholder);
  const { setPlaylistId } = usePlaylistIdStore();
  const { playlistInfoMsg, setPlaylistInfoMsg } = usePlaylistInfoMsgStore();
  const [playlistList, setPlaylistList] = useState([]);
  useEffect(() => {
    setPlaylistInfoMsg("");
  }, []);
  // const { isError, data, error } = useQuery({
  //   queryKey: ["getMyPlaylist"],
  //   queryFn: getMyPlaylist,
  // });
  // if (!data) {
  //   return <div>데이터가 없습니다.</div>;
  // }

  // if (isError) {
  //   console.error("Error fetching user info:", error);
  //   return <div>오류 발생: {error.message}</div>;
  // }
  // const playlistData = data;
  // const playlistList = playlistData.playlistList;

  useEffect(() => {
    const getPlaylist = async () => {
      const res = await getMyPlaylist();
      if (res) {
        setPlaylistList(res.playlistList);
      }
    };
    getPlaylist();
  }, []);

  const handleClickDropdown = () => {
    setDropdownView(!DropdownView);
  };

  const handleSelect = (playlistName, playlistId) => {
    setPlaylistId(playlistId);
    setInitState(playlistName); // 선택된 항목으로 초기 상태 설정
    setDropdownView(false); // 드롭다운 숨기기
  };

  return (
    <InfoWrapper>
      <DropDownWrapper>
        <button className="dropdownButton" onClick={handleClickDropdown}>
          <div className="placeholder">{initState}</div>
          <img src={down} alt="dropdown_icon" />
        </button>
        <Wrapper>
          <Dropdown visiblity={DropdownView}>
            <ul>
              {playlistList.map(it => (
                <li
                  onClick={() => handleSelect(it.playlistName, it.playlistId)}
                >
                  {it.playlistName}
                </li>
              ))}
            </ul>
          </Dropdown>
        </Wrapper>
      </DropDownWrapper>
      <div className="info">{playlistInfoMsg}</div>
    </InfoWrapper>
  );
};

const InfoWrapper = styled.div`
  .info {
    color: var(--gray02, #747474);
    text-align: right;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    margin-top: 12px;
    margin-bottom: 5px;
  }
`;
const DropDownWrapper = styled.div`
  .dropdownButton {
    width: 500px;
    height: 60px;
    flex-shrink: 0;
    border: 1px solid var(--light_black, #232323);
    background: var(--f8f8f8, #fcfcfc);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .placeholder {
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 28px */
    margin-left: 20px;
  }
`;
const Wrapper = styled.div`
  ul {
    width: 500px;
    max-height: 200px;
    list-style: none;
    flex-shrink: 0;
    border: 1px solid var(--light_black, #232323);
    background: var(--f8f8f8, #fcfcfc);
    margin: 0;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
    box-sizing: border-box;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 7px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 30px;
      background: var(--gray, #bcbcbc);
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      margin-top: 13px;
      margin-bottom: 13px;
      background: transparent;
    }
  }
  li {
    width: 369px;
    color: var(--light_black, #232323);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 28px */
    margin-top: 30px;
    cursor: pointer;
  }
  li:hover {
    color: red;
  }
`;
export default PlaylistDropdown;
