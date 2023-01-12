// Базовая нформация о пользователе, используемая на клиенте

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

export interface IUserServerData extends IUser {
  id: string;
  password: string;
  familyGroup: Set<string>;
  ownedCourses: Set<string>;
  freeCourses: Set<string>;
}


// Информация о курсе, используемая на сервере

export interface ICourse {
  id: string;
  name: string;
  description: string;
  freeContent: string;
  mainContent: string;
}

// Информация о курсе, используемая на клиенте

export interface ICourseClientData {
  id: string;
  name: string;
  description: string;
  freeContent: string;
  mainContent: string;
  isBought: boolean;
  isFree: boolean;
}

