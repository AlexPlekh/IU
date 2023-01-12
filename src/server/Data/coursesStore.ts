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
      let isBought = false;
      let isTrialOpen = false;
      if (ownedCourses.has(course.id)) {
        isBought = true
      }
      if (trialCourses.has(course.id)) {
        isTrialOpen = true
      }
      coursesData.push({ ...course, isBought, isTrialOpen });
    })

    return coursesData;
  },
};
