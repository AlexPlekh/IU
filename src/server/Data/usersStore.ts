"use strict";

import { IUserClientData, IUserRegData, IUserServerData } from "types/Interfaces";
import crypto from "crypto";
import { coursesStore } from "./coursesStore";

export const usersStore = {
  data: <IUserServerData[]>[
    {
      id: "f0e3676f-481d-4203-aefa-be50d530ea01",
      name: "Admin",
      surname: "Adult",
      tel: "123",
      email: "admin@me.ru",
      dateOfBirth: new Date(2000, 1),
      password: "admin", // по-правильному, тут должен быть хеш пароля
      familyGroup: new Set(["f0e3676f-481d-4203-aefa-be50d530ea01", "8d447fec-86d2-45be-9c35-8ebdd2c9f684"]),
      ownedCourses: new Set(["1"]),
      trialCourses: new Set([]),
    },
    {
      id: "8d447fec-86d2-45be-9c35-8ebdd2c9f684",
      name: "Test",
      surname: "Child",
      tel: "",
      email: "user@me.ru",
      dateOfBirth: new Date(),
      password: "me", // по-правильному, тут должен быть хеш пароля
      familyGroup: new Set(["f0e3676f-481d-4203-aefa-be50d530ea01", "8d447fec-86d2-45be-9c35-8ebdd2c9f684"]),
      ownedCourses: new Set(["1"]),
      trialCourses: new Set([]),
    },
    {
      id: "daf92483-c9f3-491e-885a-124262280bf0",
      name: "Alone",
      surname: "Child",
      tel: "",
      email: "alone@me.ru",
      dateOfBirth: new Date(),
      password: "me",
      familyGroup: new Set(["daf92483-c9f3-491e-885a-124262280bf0"]),
      ownedCourses: new Set(["1", "2"]),
      trialCourses: new Set([]),
    },
  ],

  addUser(user: IUserRegData) {
    const id = crypto.randomUUID();
    const familyGroup = new Set([id]);
    const ownedCourses = new Set([]);
    const trialCourses = new Set([]);
    const { inviterId, ...userData } = { ...user };
    usersStore.data.push({ id, familyGroup, ownedCourses, trialCourses, ...userData });
    if (inviterId) {
      const inviter = this.findUserById(inviterId);
      if (!inviter) throw Error("Inviter not found");
      this.addFamilyMember(inviter.familyGroup, id);
    }
  },

  findUser(username: string | null) {
    if (!username) return null;
    let user = usersStore.data.find(item => item.email === username || item.tel === username);
    return user || null;
  },

  findUserById(id: string) {
    let user = usersStore.data.find(item => item.id === id);
    return user || null;
  },

  getClientDataFromServerData(serverData: IUserServerData) {
    const clientData: IUserClientData = {
      name: serverData.name,
      surname: serverData.surname,
      tel: serverData.tel,
      email: serverData.email,
      dateOfBirth: serverData.dateOfBirth,
      isAuth: true,
      inFamilyGroup: serverData.familyGroup.size > 1 ? true : false,
    };
    return clientData;
  },

  getFamilyMembers(familyGroup: Set<string>) {
    let family = [];
    for (let familyId of familyGroup) {
      const familyMember = this.findUserById(familyId);
      if (!familyMember) continue;
      family.push(familyMember);
    }
    return family || null;
  },

  addFamilyMember(oldFamilyGroup: Set<string>, newMemberId: string) {
    const newMember = this.findUserById(newMemberId);
    if (!newMember) throw Error("User not found for adding in familyGroup");

    const newFamilyGroup = new Set([...oldFamilyGroup, newMemberId]);

    newMember.familyGroup = newFamilyGroup;

    const family = this.getFamilyMembers(oldFamilyGroup);
    for (let familyMember of family) {
      familyMember.familyGroup = newFamilyGroup;
    }
  },

  addCourseToUser(userId: string, courseId: string) {
    const user = usersStore.findUserById(userId);
    if (!user) throw Error("User not found");

    const course = coursesStore.findCourse(courseId);
    if (!course) throw Error("Course not found");

    user.ownedCourses.add(courseId);
  },

  addCourseToFamilyGroup(userId: string, courseId: string) {
    const user = usersStore.findUserById(userId);
    if (!user) throw Error("User not found");

    for (let familyMemberId of user.familyGroup) {
      usersStore.addCourseToUser(familyMemberId, courseId);
    }
  },

  addCourseTrialPartToUser(userId: string, courseId: string) {
    const user = usersStore.findUserById(userId);
    if (!user) throw Error("User not found");

    const course = coursesStore.findCourse(courseId);
    if (!course) throw Error("Course not found");

    user.trialCourses.add(courseId);
  },

};
