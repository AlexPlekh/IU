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
  return response;
}

export async function fetchGetInviterId() {
  const response = await fetch(API_URLS.getInviteId);
  if (!response.ok) return;
  const responseData = await response.json();
  if (responseData.loginStatus) throw new AuthError(responseData.message, +responseData.loginStatus);
  return responseData.inviterId;
}

export async function fetchGetCourses() {
  const response = await fetch(API_URLS.getCourses);
  if (!response.ok) return;
  const responseData = await response.json();
  if (responseData.loginStatus) throw new AuthError(responseData.message, +responseData.loginStatus);

  return responseData;
}

export async function fetchGetCourseById(id: string) {
  const response = await fetch('/API/getCourses/' + id)
  if (!response.ok) return;
  const responseData = await response.json();

  return responseData;
}

export async function enableFreePart(id: string) {
  const response = await fetch('/API/enableTrialCourse/' + id);
  if (!response.ok) return;
  const responseData = await response.json();

  return responseData;
}

export async function addCourseToUser(courseId: string, shareWithFamily: boolean) {
  const response = await fetch(API_URLS.purchaseCourse, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      courseId,
      shareWithFamily,
    }),
  });

  if (response.ok) {
    const responseData = await response.json();
    if (responseData.status === 1) {
      return responseData;
    }
  }
}

export async function activatePromocode(promocode: string, shareWithFamily: boolean) {
  const response = await fetch(API_URLS.activatePromocode, {
    method: "POST",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
        promocode,
        shareWithFamily,
    }),
  });
  if (response.ok) {
      const responseData = await response.json();

     // console.log(responseData);
      
      return responseData;
  }
}