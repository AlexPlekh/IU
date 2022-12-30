"use strict";

import { IUser } from "src/client/hooks/useUserData";

export interface IUserData {
  id: string;
  name: string | null;
  surname: string | null;
  tel: string | null;
  email: string | null;
  dateOfBirth: Date | null;
  password: string | null;
}

export const usersStore = {
  data: <IUserData[]>[
    {
      id: "f0e3676f-481d-4203-aefa-be50d530ea01",
      name: "admin",
      surname: "",
      tel: "123",
      email: "admin@me.ru",
      dateOfBirth: new Date(2000, 1),
      password: "admin", // по-правильному, тут должен быть хеш пароля
    },
    {
      id: "8d447fec-86d2-45be-9c35-8ebdd2c9f684",
      name: "testUser",
      surname: "child",
      tel: "+78888888888",
      email: "user@me.ru",
      dateOfBirth: new Date(),
      password: "me", // по-правильному, тут должен быть хеш пароля
    },
  ],

  addUser({...user}: IUser) {
    const id = crypto.randomUUID();
    usersStore.data.push({id, ...user});
  },

  findUser(username: string) {
    let user = usersStore.data.find((item) => item.email === username || item.tel === username);
    return user || null;
  },

  findUserById(id: string) {
    let user = usersStore.data.find((item) => item.id === id);
    return user || null;
  },

};
