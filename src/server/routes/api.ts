"use strict";
import { Request, Response } from "express";
import { IUserRegData } from "types/Interfaces";
import { coursesStore } from "../Data/coursesStore";
import { usersStore } from "../Data/usersStore";

export const API_URLS = {
  requestTelCode: "/API/Registration/RequestTelCode",
  checkTelCode: "/API/Registration/CheckTelCode",
  requestEmailCode: "/API/Registration/RequestEmailCode",
  checkEmailCode: "/API/Registration/CheckEmailCode",
  newUser: "/API/Registration/NewUser",
  login: "/API/Login",
  logout: "/API/Logout",
  getUser: "/API/GetUser",
  isInFamilyGroup: "/API/isInFamilyGroup",
  addInFamilyGroup: "/API/addInFamilyGroup",
  getInviteId: "/API/getInviteId",
  getCourses: "/API/getCourses",
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

const api = {
  async requestTelCode(req: Request, res: Response) {
    const payload = req.body;
    if (payload.telNumber) {
      smsCode = Math.floor(Math.random() * 9000 + 1000).toString();
      res.status(200).send(`SMS on ${payload.telNumber} sent (${smsCode})`);
    } else res.status(400).send(`Bad request`);
  },

  async checkTelCode(req: Request, res: Response) {
    const payload = req.body;
    if (payload.telCode && smsCode) {
      if (payload.telCode === smsCode) {
        res.status(200).send(`Telephone number is confirmed`);
      } else res.status(200).send(`Wrong code`);
    } else res.status(400).send(`Bad request`);
  },

  async requestEmailCode(req: Request, res: Response) {
    const payload = req.body;
    if (payload.email) {
      emailCode = Math.floor(Math.random() * 9000 + 1000).toString();
      res.status(200).send(`Code (${emailCode}) on ${payload.email} sent`);
    } else res.status(400).send(`Bad request`);
  },

  async checkEmailCode(req: Request, res: Response) {
    const payload = req.body;
    if (payload.emailCode && emailCode) {
      if (payload.emailCode === emailCode) {
        res.status(200).send(`Email is confirmed`);
      } else res.status(200).send(`Wrong code`);
    } else res.status(400).send(`Bad request`);
  },

  async login(req: Request, res: Response) {
    const payload = req.body;
    if (payload.tel || payload.email) {
      let userServerData = usersStore.findUser(payload.tel) || usersStore.findUser(payload.email);
      if (userServerData) {
        const user = usersStore.getClientDataFromServerData(userServerData);
        if (payload.password === userServerData.password) {
          res
            .status(200)
            .cookie("id", userServerData.id, { httpOnly: true })
            .send({ user, loginStatus: 0, message: "User logged in" });
        } else {
          return res.send({ message: `Wrong telephone, email or password`, loginStatus: 1 });
        }
      } else return res.send({ message: "User not found", loginStatus: 2 });
    } else return res.status(400).send(`Bad request`);
  },

  async getUser(req: Request, res: Response) {
    const id = req.cookies.id;
    if (id) {
      const userServerData = usersStore.findUserById(id);
      if (userServerData) {
        const user = usersStore.getClientDataFromServerData(userServerData);
        return res.status(200).send({ user, loginStatus: 0, message: "User logged in" });
      }
      return res.send({ message: "User not found", loginStatus: 2 });
    }
    return res.send({ message: "User not logged in", loginStatus: 3 });
  },

  async logout(req: Request, res: Response) {
    res.status(200).clearCookie("id", { httpOnly: true, maxAge: 1200 }).send("Logout");
  },

  // Регистрация нового пользователя
  async newUser(req: Request, res: Response) {
    const payload: IUserRegData = req.body;

    if (payload.tel && usersStore.findUser(payload.tel))
      return res.status(400).send({ message: `User with that telephone already exist` });
    if (payload.email && usersStore.findUser(payload.email))
      return res.status(400).send({ message: `User with that email already exist` });

    usersStore.addUser(payload);
    api.login(req, res);
  },

  async addInFamilyGroup(req: Request, res: Response) {
    const id = req.cookies.id;
    if (!id) return res.send({ message: "User not logged in", loginStatus: 3 });

    const payload = req.body;
    if (!payload.inviterId) return res.status(400).send(`Bad request`);

    const inviter = usersStore.findUserById(id);
    if (!inviter) return res.send(`Invitation not found`);

    usersStore.addFamilyMember(inviter.familyGroup, id);
    res.status(200).send("Added in family group");
  },

  async getInviteId(req: Request, res: Response) {
    const id = req.cookies.id;
    if (!id) return res.send({ message: "User not logged in", loginStatus: 3 });

    res.status(200).send({ inviterId: id });
  },

  async getCourses(req: Request, res: Response) {
    const id = req.cookies.id;
    if (!id) return res.send({ message: "User not logged in", loginStatus: 3 });
    const user = usersStore.findUserById(id);
    if (!user) return res.send({ message: "User not found", loginStatus: 2 });

    // const courseId = req.params.id
    // console.log(req.params);
    
    const coursesData = coursesStore.getCoursesDataForUser(user.ownedCourses, user.trialCourses);
    res.status(200).send(coursesData);
    
  },

  async activateCourseTrialPart(req: Request, res: Response) {
    const id = req.cookies.id;
    if (!id) return res.send({ message: "User not logged in", loginStatus: 3 });
    const user = usersStore.findUserById(id);
    if (!user) return res.send({ message: "User not found", loginStatus: 2 });

    const payload = req.body;

    if (payload.courseId) {
      // 
    }

    // const coursesData = usersStore.addCourseTrialPartToUser(id, courseId);
    // res.status(200).send(coursesData);
  }
};

export default api;
