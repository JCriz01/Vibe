import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  user: {
    id: string;
    username: string;
    name: string;
    password: string;
    avatar: string;
    bio: string;
  };
};

type Action = {
  updateAccount: (partialUser: Partial<State>) => void;
};

export const useUserStore = create<State & Action>()(
  immer((set) => ({
    user: {
      id: "",
      username: "",
      name: "",
      password: "",
      avatar: "",
      bio: "",
    },
    updateAccount: (partialUser) =>
      set((draft) => {
        //const user = draft.user[id];
        Object.assign(draft.user, partialUser);
      }),
  }))
);
