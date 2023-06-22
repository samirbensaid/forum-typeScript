import { create } from "zustand";

const useAuth = create((set) => ({
  user: JSON.parse(window.localStorage.getItem("user")) || {},

  setUser: (x) => {
    set(() => ({ user: x }));

    window.localStorage.setItem("user", JSON.stringify(x));
  },

//   removeUser: () => {
//     set(() => ({ user: {} }));
//     window.localStorage.setItem("user", JSON.stringify({}));
//   },
}));

export default useAuth;
