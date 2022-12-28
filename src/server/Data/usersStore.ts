"use strict";
export interface IUserData {
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
      name: "admin",
      surname: "",
      tel: "123",
      email: "admin@me.ru",
      dateOfBirth: new Date(),
      password: "admin", // по-правильному, тут должен быть хеш пароля
    },
    {
      name: "testUser",
      surname: "",
      tel: "+78888888888",
      email: "user@me.ru",
      // dateOfBirth: new Date(), // закоментировано на время теста
      dateOfBirth: new Date(2000, 1), // на время теста
      password: "me", // по-правильному, тут должен быть хеш пароля
    },
  ],

  addUser(user: IUserData) {
    usersStore.data.push(user);
  },

  findUser(username: string) {
    let user = usersStore.data.find((item) => item.email === username || item.tel === username);
    return user || null;
  },
};
