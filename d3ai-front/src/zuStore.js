import { create } from "zustand";
import { persist } from "zustand/middleware";

const useZuStore = create(
  persist(
    (set) => ({
      activeUser: {},
      setActiveUser: (user) => set(() => ({ activeUser: user })),
      logOut: () => set(() => ({ activeUser: {} }))
    }),
    {
      name: "d3aiStore", // name of the item in the storage (must be unique)
      onRehydrateStorage: () => (state) => {
        console.log("Rehydrating state:", state);
      }
    }
  )
);

export default useZuStore;
