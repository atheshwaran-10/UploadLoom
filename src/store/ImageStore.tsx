import { create } from "zustand";

interface ImageStore {
  title: string;
  setTitle: (newTitle: string) => void;
}

const useImageStore = create<ImageStore>((set) => ({
  title: "Uploads",
  setTitle: (newTitle) => set({ title: newTitle }),
}));

export default useImageStore;
