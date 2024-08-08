import create from "zustand";

const useMyPageClickStore = create(set => ({
  myPageClick: true,
  setMyPageClick: newState => set({ myPageClick: newState }),
}));

export default useMyPageClickStore;
