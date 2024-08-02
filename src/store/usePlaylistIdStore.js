import create from "zustand";

const usePlaylistIdStore = create(set => ({
  playlistId: "",
  setPlaylistId: newState => set({ playlistId: newState }),
}));

export default usePlaylistIdStore;
