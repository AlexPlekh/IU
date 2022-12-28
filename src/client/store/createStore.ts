export interface IStore<T> {
  state: T;
  setState: (newValue: T) => void;
  getState: () => T;
  listeners: Set<() => void>;
  subscribe: (callback: () => void) => () => boolean;
}

export function createStore<T>(initialState: T): IStore<T> {
  const store: IStore<T> = {
    state: initialState,
    setState: newValue => {
      store.state = newValue;
      store.listeners.forEach(listener => listener());
    },
    getState: () => {
      return store.state;
    },
    listeners: new Set(),
    subscribe: callback => {
      store.listeners.add(callback);
      return () => store.listeners.delete(callback);
    },
  };

  return store;
}
