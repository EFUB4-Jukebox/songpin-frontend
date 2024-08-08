import create from "zustand";

const useEditStore = create(set => ({
  edit: false,
  setEdit: newState => set({ edit: newState }),
}));

export default useEditStore;
