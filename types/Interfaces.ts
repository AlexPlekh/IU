// Базовая нформация о пользователе, используемая на клиенте

// export interface IAuthData {
//   tel: string | null;
//   email: string | null;
//   password: string;
// }

export interface IUser {
    name: string | null;
    surname: string | null;
    tel: string | null;
    email: string | null;
    dateOfBirth: Date | null;
  }

// Информация о пользователе, отправляемая при регистрации

export interface IUserRegData extends IUser {
  password: string;
  inviterId: string;
}


// Информация о пользователе, используемая на клиенте

export interface IUserClientData extends IUser {
  isAuth: boolean;
  inFamilyGroup: boolean;
}

// Информация о пользователе, используемая на сервере

export interface IUserServerData extends IUserRegData {
  id: string;
  familyGroup: Set<string>;
}
