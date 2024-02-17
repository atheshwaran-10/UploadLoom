import { create } from 'zustand';

interface HeaderTitleStore {
  title:string,
  setTitle:(newTitle:string)=>void
}

const useHeaderTitle = create<HeaderTitleStore>((set) => ({
  title: "Uploads",
  setTitle: (newTitle) => set({ title: newTitle }),
}));


export default useHeaderTitle;
