import { useEffect, useState } from "react";
import ModalCommon from "./ModalCommon";
import { addPinPlaylist } from "../../../services/api/playlist";
import { useQuery } from "@tanstack/react-query";
import { getMyPlaylist } from "../../../services/api/myPage";
import usePlaylistIdStore from "../../../store/usePlaylistIdStore";
import usePlaylistInfoMsgStore from "../../../store/usePlaylistInfoMsgStore";
import CommonSnackbar from "../snackbar/CommonSnackbar";
import useSnackbarStore from "../../../store/useSnackbarStore";

const AddPlaylistModal = ({ setModalCommon, pinId }) => {
  const [active, setActive] = useState(false);
  const { playlistId } = usePlaylistIdStore();
  const { setPlaylistInfoMsg } = usePlaylistInfoMsgStore();
  const { setIsSnackbar } = useSnackbarStore();

  const addPlaylist = async () => {
    try {
      const pinPlaylist = {
        playlistId: playlistId,
        pinId: pinId,
      };
      const res = await addPinPlaylist(pinPlaylist);
      console.log(res);
      if (res) {
        setPlaylistInfoMsg(res.message);
      } else {
        setIsSnackbar("핀을 플레이리스트에 담았습니다!");
        setModalCommon(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ModalCommon
        modalText="핀을 플레이리스트에 담기"
        inputPlaceholder="플레이리스트를 선택"
        buttonName="완료"
        handleButton={addPlaylist}
        addPlaylist={true}
        setModalCommon={setModalCommon}
        active={active}
        setActive={setActive}
      />
    </>
  );
};
export default AddPlaylistModal;
