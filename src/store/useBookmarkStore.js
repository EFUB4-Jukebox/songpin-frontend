import create from "zustand";

const useBookmarkStore = create(set => ({
  isBookmarkClick: false,
  setIsBookmarkClick: newState => set({ bookmarkId: newState }),
}));

export default useBookmarkStore;
