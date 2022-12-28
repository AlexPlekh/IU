import { useSyncExternalStore } from "react";
import { createStore } from "../store/createStore";

export interface IRegData {
  username: string | null;
  surname: string | null;
  dateOfBirth: Date | null;
}

const store = createStore<IRegData>({ username: null, surname: null, dateOfBirth: null });

export const useRegData = () => {
  const regData = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  return {
    regData,
    nullifyData: () => store.setState({ username: null, surname: null, dateOfBirth: null }),
    setState: store.setState,
  };
};