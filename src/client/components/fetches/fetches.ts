import { IUserClientData } from "types/Interfaces";
import { API_URLS } from "../../../server/routes/api";

export class AuthError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AuthError";
  }
}

export async function fetchUserData() {
  let response = await fetch(API_URLS.getUser);
  if (response.ok) {
    let responseData = await response.json();

    if (responseData.loginStatus === 0) {
      const user: IUserClientData = {
        ...responseData.user,
        isAuth: true,
        dateOfBirth: new Date(Date.parse(responseData.user.dateOfBirth)),
      };
      return user;
    }
    throw new AuthError(responseData.message, +responseData.loginStatus);
  }
  throw new Error("Fetch error");
}

export async function fetchLogin(userName: string, password: string) {
  const response = await fetch(API_URLS.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      tel: userName,
      email: userName.toLowerCase(),
      password: password,
    }),
  });

  if (response.ok) {
    const responseData = await response.json();
    if (responseData.loginStatus === 0) {
      const user: IUserClientData = {
        ...responseData.user,
        dateOfBirth: new Date(Date.parse(responseData.user.dateOfBirth)),
      };
      return user;
    }
    throw new AuthError(responseData.message, +responseData.loginStatus);
  }
  throw new Error("Fetch error");
}

export async function fetchLogout() {
  const response = await fetch(API_URLS.logout);
  return;
}

export async function fetchGetInviterId() {
  const response = await fetch(API_URLS.getInviteId);
  if (!response.ok) return;
  const responseData = await response.json();
  if (responseData.loginStatus) throw new AuthError(responseData.message, +responseData.loginStatus);
  return responseData.inviterId;
}


// todo
export async function fetchGetCourses() {
  const response = await fetch(API_URLS.getCourses);
  if (!response.ok) return;
  const responseData = await response.json();
  if (responseData.loginStatus) throw new AuthError(responseData.message, +responseData.loginStatus);
  return responseData;
}
