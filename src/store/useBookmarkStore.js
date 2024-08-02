import create from "zustand";

const useBookmarkStore = create(set => ({
  isBookmarked: false,
  setIsBookmarked: newState => set({ bookmarkId: newState }),
}));

export default useBookmarkStore;
