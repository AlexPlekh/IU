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

  getCoursesDataForUser(ownedCourses: Set<string>, freeCourses: Set<string>) {
    let coursesData: ICourseClientData[] = [];
    coursesStore.data.forEach( course => {
      
      if (ownedCourses.has(course.id)) {
        coursesData.push({ ...course, isBought: true });
      } else {
        coursesData.push({ ...course, isBought: false, mainContent: '' });
      }

      if (freeCourses.has(course.id)) {
        coursesData.push({ ...course, isFree: true });
      } else {
        coursesData.push({ ...course, isFree: false });
      }
    }) //!
    return coursesData;
  },
};
