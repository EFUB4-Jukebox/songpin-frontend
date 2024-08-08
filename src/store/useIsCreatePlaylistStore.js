import create from "zustand";

const useIsCreatePlaylistStore = create(set => ({
  isCreatePlaylist: false,
  setIsCreatePlaylist: newState => set({ isCreatePlaylist: newState }),
}));

export default useIsCreatePlaylistStore;
