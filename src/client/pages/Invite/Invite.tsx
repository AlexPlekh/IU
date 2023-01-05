import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Invite = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isInviteForParent = params.get("forParent") === "true";
  const inviterId = params.get("inviterId");

  return (
    <div className="p-5 bg-blue-100">
      <label className="flex flex-col items-center p-5 bg-white w-max m-auto">
        Пользователь приглашает Вас в семейную группу.
        <button
          type="button"
          className="text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg bg-orange-600 my-2"
          onClick={() =>
            navigate(
              isInviteForParent
                ? `/Registration?inviterId=${inviterId}&isInvitedForParent=true`
                : `/Registration?inviterId=${inviterId}`,
            )
          }
        >
          Принять приглашение
        </button>
      </label>
    </div>
  );
};
