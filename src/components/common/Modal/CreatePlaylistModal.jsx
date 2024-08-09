import { useState } from "react";
import ModalCommon from "./ModalCommon";
import { createPlaylist } from "../../../services/api/playlist";
import useSnackbarStore from "../../../store/useSnackbarStore";
import useEditStore from "../../../store/useProfileEditStore";

const CreatePlaylistModal = ({ setModalCommon, setIsAddPlaylistModalOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [active, setActive] = useState(false);
  const { setIsSnackbar } = useSnackbarStore();
  const { setEdit } = useEditStore();
  const handleCreatePlaylist = async () => {
    const isVisibility = isPublic ? "PUBLIC" : "PRIVATE";
    setEdit(true);
    try {
      const createdPlaylist = {
        playlistName: inputValue,
        visibility: isVisibility,
      };
      console.log(createdPlaylist);
      const res = await createPlaylist(createdPlaylist);
      setIsSnackbar("플레이리스트가 생성되었습니다!");
      console.log(res);
      setModalCommon(false);
      setIsAddPlaylistModalOpen(true);
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
