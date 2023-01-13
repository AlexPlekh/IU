import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { isAdult } from "../../components/functions/isAdult";
import { ModalSendInvite } from "./ModalSendInvite";
import { useUserData } from "../../hooks/useUserData";

const Main = () => {
  const userData = useUserData();
  const [isInvited] = useSearchParams();
  const isNewUser = isInvited.get("newUser") === "true";
  let isUserAdult = isAdult(userData.dateOfBirth);
  const [isModalVisible, setModalVisible] = useState(isNewUser && !isUserAdult && !userData.inFamilyGroup);

  return (
    <>
      <ModalSendInvite isVisible={isModalVisible} setVisible={setModalVisible} isAdult={isUserAdult}></ModalSendInvite>
      <main className="bg-blue-300 flex flex-col items-center relative">
        <div className="my-40 p-10 bg-white rounded">
          <h1 className="text-orange-500 text-5xl font-bold text-center">Университет будущего</h1>
          <h1 className="text-5xl font-bold text-center">для детей и взрослых</h1>
          <p className="text-lg uppercase text-center max-w-[1030px] mt-4">Приветствие!</p>
          {!isUserAdult && !userData.inFamilyGroup && (
            <p className="text-center text-red-400">! Часть контента недоступна для несовершеннолеетних !</p>
          )}
          <div className="flex mt-10 justify-evenly">
            {!userData.inFamilyGroup && (
              <button
                type="button"
                className="text-white text-base leading-6 font-normal py-2 px-3 rounded-lg w-40 bg-orange-600"
                onClick={() => setModalVisible(true)}
              >
                {isUserAdult ? "Пригласить в семейную группу" : "Пригласить родителя"}
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
