import { useSyncExternalStore } from "react";
import { IUserClientData } from "types/Interfaces";
import { createStore } from "../store/createStore";

const store = createStore<IUserClientData>({
  name: null,
  surname: null,
  dateOfBirth: null,
  email: null,
  tel: null,
  isAuth: false,
  inFamilyGroup: false,
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
        tel: null,
        isAuth: false,
        inFamilyGroup: false,
      }),
    setState: store.setState,
  };
};
