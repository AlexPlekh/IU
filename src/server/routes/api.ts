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
  getCourseById: "/API/getCourses/:id",
  enableTrialCourse: "/API/enableTrialCourse/:id",
  purchaseCourse: "/API/purchaseCourse",
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
  // Отправка кода подтверждения номера телефона
  async requestTelCode(req: Request, res: Response) {
    const payload = req.body;
    if (payload.telNumber) {
      smsCode = Math.floor(Math.random() * 9000 + 1000).toString();
      res.status(200).send(`SMS on ${payload.telNumber} sent (${smsCode})`);
    } else res.status(400).send(`Bad request`);
  },

  // Проверка кода подтверждения номера телефона
  async checkTelCode(req: Request, res: Response) {
    const payload = req.body;
    if (payload.telCode && smsCode) {
      if (payload.telCode === smsCode) {
        res.status(200).send(`Telephone number is confirmed`);
      } else res.status(200).send(`Wrong code`);
    } else res.status(400).send(`Bad request`);
  },

  // Отправка кода подтверждения email
  async requestEmailCode(req: Request, res: Response) {
    const payload = req.body;
    if (payload.email) {
      emailCode = Math.floor(Math.random() * 9000 + 1000).toString();
      res.status(200).send(`Code (${emailCode}) on ${payload.email} sent`);
    } else res.status(400).send(`Bad request`);
  },

  // Проверка кода подтверждения email
  async checkEmailCode(req: Request, res: Response) {
    const payload = req.body;
    if (payload.emailCode && emailCode) {
      if (payload.emailCode === emailCode) {
        res.status(200).send(`Email is confirmed`);
      } else res.status(200).send(`Wrong code`);
    } else res.status(400).send(`Bad request`);
  },

  // Авторизация
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

  // Получение данных пользователя
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

  // Выход из учетной записи
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

  // Добавление пользователя в семейную группу
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

  // Получение id для приглашения
  async getInviteId(req: Request, res: Response) {
    const id = req.cookies.id;
    if (!id) return res.send({ message: "User not logged in", loginStatus: 3 });

    res.status(200).send({ inviterId: id });
  },

  // Получение массива курсов (включая контент) для конкретного полльзователя
  async getCourses(req: Request, res: Response) {
    const id = req.cookies.id;
    if (!id) return res.send({ message: "User not logged in", loginStatus: 3 });
    const user = usersStore.findUserById(id);
    if (!user) return res.send({ message: "User not found", loginStatus: 2 });

    const coursesData = coursesStore.getCoursesDataForUser(user.ownedCourses, user.trialCourses);
    res.status(200).send({ coursesData, status: 1 });
  },

  // Получение контента курса по id
  async getCourseById(req: Request, res: Response) {
    const userId = req.cookies.id;
    if (!userId) return res.send({ message: "User not logged in", loginStatus: 3 });
    const user = usersStore.findUserById(userId);
    if (!user) return res.send({ message: "User not found", loginStatus: 2 });

    const courseId = req.params.id;
    if (!courseId) return res.status(400).send("Bad request");
    const courseData = coursesStore.findCourse(courseId);
    if (!courseData) return res.send({ message: "Course not found", status: 0 });

    const userCourseData = coursesStore.getCourseDataForUser(courseData, user.ownedCourses, user.trialCourses)

    res.status(200).send({ userCourseData, status: 1 });
  },

  // Активация бесплатной части
  async enableTrialCourse(req: Request, res: Response) {
    const userId: string = req.cookies.id;
    if (!userId) return res.send({ message: "User not logged in", loginStatus: 3 });

    const courseId: string = req.params.id;
    if (!courseId) return res.status(400).send("Bad request");

    usersStore.addCourseTrialPartToUser(userId, courseId);

    res.status(200).send({ data: {}, message: 'Succesfull', status: 1 });
  },

  // Покупка курса
  async purchaseCourse(req: Request, res: Response) {
    const userId: string = req.cookies.id;
    if (!userId) return res.send({ message: "User not logged in", loginStatus: 3 });

    const payload: {courseId: string, shareWithFamily: boolean} = req.body;
    const courseId: string = payload.courseId;
    if (!courseId) return res.status(400).send("Bad request");

    usersStore.addCourseToUser(userId, courseId);

    const shareWithFamily = payload.shareWithFamily
    if (shareWithFamily) {
      usersStore.addCourseToFamilyGroup(userId, courseId)
    }
    res.status(200).send({message: 'Курс оплачен и добавлен пользователю', status: 1});
  },
};

export default api;
