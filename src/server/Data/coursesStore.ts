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

  getCoursesDataForUser(ownedCourses: Set<string>) {
    let coursesData: ICourseClientData[] = [];
    for (let course of coursesStore.data) {
      let isBought: boolean;
      let mainContent: string;
      if (ownedCourses.has(course.id)) {
        isBought = true;
        mainContent = course.mainContent;
      } else {
        isBought = false;
        mainContent = "";
      }
      coursesData.push({ ...course, isBought, mainContent });
    }
    return coursesData;
  },
};
