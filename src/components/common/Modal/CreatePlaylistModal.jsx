import { useState } from "react";
import ModalCommon from "./ModalCommon";
import { createPlaylist } from "../../../services/api/playlist";

const CreatePlaylistModal = ({ setModalCommon }) => {
  const [inputValue, setInputValue] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [active, setActive] = useState(false);

  const handleCreatePlaylist = async () => {
    const isVisibility = isPublic ? "PUBLIC" : "PRIVATE";
    try {
      const createdPlaylist = {
        playlistName: inputValue,
        visibility: isVisibility,
      };
      console.log(createdPlaylist);
      const res = await createPlaylist(createdPlaylist);
      console.log(res);
      setModalCommon(false);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  return (
    <ModalCommon
      modalText="플레이리스트 생성"
      inputPlaceholder="플레이리스트 이름"
      buttonName="완료"
      handleButton={handleCreatePlaylist}
      addPlaylist={false}
      createPlaylist={true}
      setModalCommon={setModalCommon}
      active={active}
      setActive={setActive}
      inputValue={inputValue}
      setInputValue={setInputValue}
      isPublic={isPublic}
      setIsPublic={setIsPublic}
    />
  );
};
export default CreatePlaylistModal;
