import { useEffect, useState } from "react";
import ModalCommon from "./ModalCommon";
import { addPinPlaylist } from "../../../services/api/playlist";
import { useQuery } from "@tanstack/react-query";
import { getMyPlaylist } from "../../../services/api/myPage";
import usePlaylistIdStore from "../../../store/usePlaylistIdStore";
import usePlaylistInfoMsgStore from "../../../store/usePlaylistInfoMsgStore";
import CommonSnackbar from "../snackbar/CommonSnackbar";

const AddPlaylistModal = ({ setModalCommon, pinId }) => {
  const [active, setActive] = useState(false);
  const { playlistId } = usePlaylistIdStore();
  const { setPlaylistInfoMsg } = usePlaylistInfoMsgStore();
  const [snackbarActive, setSnackbarActive] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [init, setInit] = useState(true);
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
        setSnackbarActive(true);
        setTimeout(() => {
          setSnackbarActive(false);
          setModalCommon(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (init) {
  //     setInit(false);
  //     return;
  //   }
  //   !snackbarActive && setModalCommon(false);
  // }, [snackbarActive]);

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
      {snackbarActive && (
        <CommonSnackbar
          text="핀이 플레이리스트에 담겼습니다!"
          className={fadeOut ? "fade-out" : ""}
        />
      )}
    </>
  );
};
export default AddPlaylistModal;
