import React, { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useUserData } from "../../hooks/useUserData";
import { IModalProps, Modal } from "../../components/Modal";
import { fetchGetInviterId, fetchLogout } from "../../components/fetches/fetches";

export interface IModalPropsInvite extends IModalProps {
  isAdult: boolean;
}

export const ModalSendInvite: React.FC<PropsWithChildren<IModalPropsInvite>> = ({ isVisible, setVisible, isAdult }) => {
  const navigate = useNavigate();
  const userData = useUserData();
  const input = useInput(["validEmail", "validTelephone"]);
  const [isResponsible, setResponsible] = useState(false);
  const [step, setStep] = useState(1);

  function logout() {
    fetchLogout();
    userData.nullifyData();
  }

  function sendInvitation() {
    // Отправляем email или номер телефона на сервер
  }

  return (
    <Modal isVisible={isVisible} setVisible={setVisible}>
      <div hidden={step !== 1}>
        <form
          action=""
          className="flex flex-col justify-center items-center text-center gap-2"
          onKeyDown={e => {
            if (e.key == "Enter") {
              e.preventDefault();
              if (input.isEmailValid || input.isTelValid) {
                sendInvitation();
                setStep(2);
              }
            }
          }}
        >
          <span>
            {isAdult
              ? "Пригласите пользователя в рабочую группу"
              : "Чтобы разблокировать доступ к контенту, необходимо согласие родителя."}
          </span>
          <label className="flex flex-col">
            {isAdult
              ? "Введите номер телефона или email, чтобы пригласить нового участника семейной группы"
              : "Введите номер телефона или email, чтобы пригласить родителя"}
            <input
              type="text"
              className="border-solid border-gray-400 border rounded px-1 "
              value={input.value}
              onChange={input.onChange}
              onBlur={input.onBlur}
            />
          </label>

          {isAdult && (
            <label className="text-center mt-2">
              <input
                className="mx-1"
                type="checkbox"
                checked={isResponsible}
                onChange={() => setResponsible(!isResponsible)}
              />
              Беру всю ответственность на себя
            </label>
          )}

          <div>
            <button
              type="button"
              className="text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg bg-orange-600 mx-2"
              onClick={() => setVisible(false)}
            >
              {isAdult ? "Отмена" : "Продолжить с ограничениями"}
            </button>
            <button
              type="button"
              className="text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg bg-green-600 mx-2 disabled:bg-gray-500"
              onClick={() => {
                sendInvitation();
                setStep(2);
              }}
              disabled={!(input.isEmailValid || input.isTelValid) || (isAdult && !isResponsible)}
            >
              Отправить приглашение
            </button>
          </div>
        </form>
      </div>
      <div hidden={step !== 2}>
        <p>Приглашение отправлено</p>
        <button
          type="button"
          className="text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg bg-orange-600 mx-2"
          onClick={() => {
            logout();
            fetchGetInviterId().then(InviterId =>
              navigate(
                isAdult
                  ? `/Invite?inviterId=${InviterId}&forParent=false`
                  : `/Invite?inviterId=${InviterId}&forParent=true`,
              ),
            );
          }}
        >
          Хорошо
        </button>
      </div>
    </Modal>
  );
};
