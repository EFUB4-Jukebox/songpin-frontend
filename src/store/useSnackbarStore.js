import create from "zustand";

const useSnackbarStore = create(set => ({
  isSnackbar: "",
  setIsSnackbar: newState => set({ isSnackbar: newState }),
}));

export default useSnackbarStore;
