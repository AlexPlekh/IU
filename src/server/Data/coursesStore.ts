"use strict";

import { ICourse, ICourseClientData } from "types/Interfaces";

export const coursesStore = {
  data: <ICourse[]>[
    {
      id: "1",
      name: "Образовательная программа 1",
      description: "Описание образовательной программы 1",
      freeContent: "Бесплатная часть контента",
      mainContent: "Платная часть контента",
    },
    {
      id: "2",
      name: "Образовательная программа 2",
      description: "Описание образовательной программы 2",
      freeContent: "Бесплатная часть контента",
      mainContent: "Платная часть контента",
    },
    {
      id: "3",
      name: "Образовательная программа 3",
      description: "Описание образовательной программы 3",
      freeContent: "Бесплатная часть контента",
      mainContent: "Платная часть контента",
    },
  ],

  findCourse(id: string) {
    const course = coursesStore.data.find(item => item.id === id);
    return course || null;
  },

  getCoursesDataForUser(ownedCourses: Set<string>, trialCourses: Set<string>) {
    let coursesData: ICourseClientData[] = [];

    coursesStore.data.forEach( course => {
      let courseData = coursesStore.getCourseDataForUser(course, ownedCourses, trialCourses)
      coursesData.push(courseData);
    })

    return coursesData;
  },

  getCourseDataForUser(course: ICourse, ownedCourses: Set<string>, trialCourses: Set<string>) {
      let courseData: ICourseClientData = { ...course, mainContent: "", isBought: false, isTrialOpen: false };

      if (ownedCourses.has(course.id)) {
        courseData = { ...courseData, mainContent: course.mainContent, isBought: true };
      }
      if (trialCourses.has(course.id)) {
        courseData = { ...courseData, isTrialOpen: true };
      }

    return courseData;
  },
};
