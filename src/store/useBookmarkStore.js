import create from "zustand";

const useBookmarkStore = create(set => ({
  isBookmarkClick: false,
  setIsBookmarkClick: newState => set({ isBookmarkClick: newState }),
}));

export default useBookmarkStore;
