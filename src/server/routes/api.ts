"use strict";
import { Request, Response } from "express";
import { usersStore, IUserData } from "../Data/usersStore";

export const API_URLS = {
  requestTelCode: "/Registration/RequestTelCode",
  checkTelCode: "/Registration/CheckTelCode",
  requestEmailCode: "/Registration/RequestEmailCode",
  checkEmailCode: "/Registration/CheckEmailCode",
  login: "/Auth/Login",
  newUser: "/Registration/NewUser",
  logout: "/Auth/Logout",
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
/* let userData: IuserData[] = [{
  name: "admin",
  surname: "",
  tel: "123",
  email: "admin@me.ru",
  // dateOfBirth: new Date(), // закоментировано на время теста
  dateOfBirth: new Date(2010, 1), // на время теста
  password: "admin", // по-правильному, тут должен быть хеш пароля
}]; */

export const RequestTelCode = async (req: Request, res: Response) => {
  const payload = req.body;
  // console.log(payload);
  if (payload.telNumber) {
    smsCode = Math.floor(Math.random() * 9000 + 1000).toString();
    res.status(200).send(`SMS on ${payload.telNumber} sent (${smsCode})`);
  } else res.status(400).send(`Bad request`);
};

export const CheckTelCode = async (req: Request, res: Response) => {
  const payload = req.body;
  // console.log(payload);
  if (payload.telCode && smsCode) {
    if (payload.telCode === smsCode) {
      res.status(200).send(`Telephone number is confirmed`);
    } else res.status(200).send(`Wrong code`);
  } else res.status(400).send(`Bad request`);
};

export const RequestEmailCode = async (req: Request, res: Response) => {
  const payload = req.body;
  // console.log(payload);
  if (payload.email) {
    emailCode = Math.floor(Math.random() * 9000 + 1000).toString();
    res.status(200).send(`Code (${emailCode}) on ${payload.email} sent`);
  } else res.status(400).send(`Bad request`);
};

export const CheckEmailCode = async (req: Request, res: Response) => {
  const payload = req.body;
  // console.log(payload);
  if (payload.emailCode && emailCode) {
    if (payload.emailCode === emailCode) {
      res.status(200).send(`Email is confirmed`);
    } else res.status(200).send(`Wrong code`);
  } else res.status(400).send(`Bad request`);
};

export const Login = async (req: Request, res: Response) => {
  const payload = req.body;
  if (payload.tel || payload.email) {
    let user = usersStore.findUser(payload.tel) || usersStore.findUser(payload.email);
    if (user) {
      if (payload.password === user.password) {
        res.status(200).send({ userData: user, login: true, message: `User ${user.name} ${user.surname} logged in` });
      } else {
        return res.status(401).send(`Wrong telephone, email or password`);
      }
    } else return res.status(401).send(`User not found`);
  } else return res.status(400).send(`Bad request`);
};

export const NewUser = async (req: Request, res: Response) => {
  const payload: IUserData = req.body;
  if (payload.tel && usersStore.findUser(payload.tel))
    return res.status(400).send({ message: `User with that telephone already exist` });
  if (payload.email && usersStore.findUser(payload.email))
    return res.status(400).send({ message: `User with that email already exist` });
  usersStore.addUser(payload);
  Login(req, res);
};

export const Logout = async (req: Request, res: Response) => {
  // const payload: IuserData = req.body;
  // console.log(payload);
  // userData = payload;
};
