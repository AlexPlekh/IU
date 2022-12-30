"use strict";
import { createHash } from "crypto";
import { Request, Response } from "express";
import { IUser } from "src/client/hooks/useUserData";
import { usersStore, IUserData } from "../Data/usersStore";


export const API_URLS = {
  requestTelCode: "/API/Registration/RequestTelCode",
  checkTelCode: "/API/Registration/CheckTelCode",
  requestEmailCode: "/API/Registration/RequestEmailCode",
  checkEmailCode: "/API/Registration/CheckEmailCode",
  newUser: "/API/Registration/NewUser",
  login: "/API/Login",
  logout: "/API/Logout",
  getUser: "/API/GetUser",
};

/**
 * List of API examples.
 * @route GET /api
 */
// export const getApi = async (req: Request, res: Response) => {
//   return res.status(202).send("Test Api");
// };

// let userData = usersStore.data[0];
let smsCode = "";
let emailCode = "";

export async function RequestTelCode(req: Request, res: Response) {
  const payload = req.body;
  if (payload.telNumber) {
    smsCode = Math.floor(Math.random() * 9000 + 1000).toString();
    res.status(200).send(`SMS on ${payload.telNumber} sent (${smsCode})`);
  } else res.status(400).send(`Bad request`);
}

export async function CheckTelCode(req: Request, res: Response) {
  const payload = req.body;
  if (payload.telCode && smsCode) {
    if (payload.telCode === smsCode) {
      res.status(200).send(`Telephone number is confirmed`);
    } else res.status(200).send(`Wrong code`);
  } else res.status(400).send(`Bad request`);
}

export async function RequestEmailCode(req: Request, res: Response) {
  const payload = req.body;
  if (payload.email) {
    emailCode = Math.floor(Math.random() * 9000 + 1000).toString();
    res.status(200).send(`Code (${emailCode}) on ${payload.email} sent`);
  } else res.status(400).send(`Bad request`);
}

export async function CheckEmailCode(req: Request, res: Response) {
  const payload = req.body;
  if (payload.emailCode && emailCode) {
    if (payload.emailCode === emailCode) {
      res.status(200).send(`Email is confirmed`);
    } else res.status(200).send(`Wrong code`);
  } else res.status(400).send(`Bad request`);
}

export async function Login(req: Request, res: Response) {
  const payload = req.body;
  if (payload.tel || payload.email) {
    let user = usersStore.findUser(payload.tel) || usersStore.findUser(payload.email);
    if (user) {
      if (payload.password === user.password) {
        res
          .status(200)
          .cookie("id", user.id, { httpOnly: true })
          .send({ userData: user, login: true, message: `User ${user.name} ${user.surname} logged in` });
      } else {
        return res.status(401).send(`Wrong telephone, email or password`);
      }
    } else return res.status(401).send(`User not found`);
  } else return res.status(400).send(`Bad request`);
}

// Исправить, чтобы не отправлял пароль и id

export async function GetUser(req: Request, res: Response) {
  const id = req.cookies.id;
  if (id) {
    const userData = usersStore.findUserById(id)
    return res.status(200).send(userData);
  }
  return res.status(400).send("User not found");
}

export async function Logout(req: Request, res: Response) {
  res.status(200).clearCookie("id", { httpOnly: true, maxAge: 1200 }).send("Logout");
}

export async function NewUser(req: Request, res: Response) {
  const payload: IUser = req.body;
  if (payload.tel && usersStore.findUser(payload.tel))
    return res.status(400).send({ message: `User with that telephone already exist` });
  if (payload.email && usersStore.findUser(payload.email))
    return res.status(400).send({ message: `User with that email already exist` });
  usersStore.addUser(payload);
  Login(req, res);
}
