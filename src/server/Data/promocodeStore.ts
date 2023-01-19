"use strict";

import { PromocodeData } from "types/Interfaces";

export const promocodeStore = {
  data: <PromocodeData[]>[
    {
      id: "1",
      promocode: "promo1",
      relativeCourse: "1",
      isActivated: false,
    },
    {
      id: "2",
      promocode: "promo2",
      relativeCourse: "2",
      isActivated: false,
    },
    {
      id: "3",
      promocode: "promo3",
      relativeCourse: "3",
      isActivated: false,
    },
  ],

  findPromo(promocode: string) {
    const promocodeData = promocodeStore.data.find(item => item.promocode === promocode);
    return promocodeData || null;
  },

  checkPromo(promocode: string) {
    const promocodeData = promocodeStore.findPromo(promocode);

    if (promocodeData && !promocodeData.isActivated) {
      return promocodeData.relativeCourse;
    }
  },

  activatePromo(promocode: string) {
    const promocodeData = promocodeStore.findPromo(promocode);

    if (promocodeData) {
      promocodeData.isActivated = true
    }
  },
}