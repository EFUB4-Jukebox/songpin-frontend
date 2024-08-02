import create from "zustand";

const usePlaylistInfoMsgStore = create(set => ({
  playlistInfoMsg: "",
  setPlaylistInfoMsg: newState => set({ playlistInfoMsg: newState }),
}));

export default usePlaylistInfoMsgStore;
