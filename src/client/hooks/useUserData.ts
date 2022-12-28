import { useSyncExternalStore } from "react";
import { createStore } from "../store/createStore";

export interface IUser {
  name: string | null;
  surname: string | null;
  tel: string | null;
  email: string | null;
  dateOfBirth: Date | null;
  password: string | null;
  isAuth: boolean,
}

const store = createStore<IUser>({
  name: null,
  surname: null,
  dateOfBirth: null,
  email: null,
  password: null,
  tel: null,
  isAuth: false,
});

export const useUserData = () => {
  const data = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  return {
    ...data,
    nullifyData: () =>
      store.setState({
        name: null,
        surname: null,
        dateOfBirth: null,
        email: null,
        password: null,
        tel: null,
        isAuth: false,
      }),
    setState: store.setState,
  };
};
