import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { isAdult } from "../components/functions/isAdult";
// import { useAppContext } from "../Context";
import { ModalSendInvite } from "../components/ModalSendInvite";
import { useUserData } from "../hooks/useUserData";

const Main = () => {
  // const { name, setName } = useAppContext();
  const userData = useUserData();
  const [isInvited] = useSearchParams();
  const isNewUser = isInvited.get("newUser") === "true";
  // let isAdult = false;
  // if (userData.dateOfBirth) isAdult = new Date(Date.now() - +userData.dateOfBirth).getFullYear() - 1970 >= 18;
  const [isModalVisible, setModalVisible] = useState(isNewUser && !isAdult(userData.dateOfBirth));

  return (
    <>
      <ModalSendInvite isVisible={isModalVisible} setVisible={setModalVisible} isAdult={isAdult(userData.dateOfBirth)}></ModalSendInvite>
      <main className="bg-blue-300 flex flex-col items-center relative">
        <div className="my-40 p-10 bg-white rounded">
          <h1 className="text-orange-500 text-5xl font-bold text-center">Университет будущего</h1>
          <h1 className="text-5xl font-bold text-center">для детей и взрослых</h1>
          <p className="text-lg uppercase text-center max-w-[1030px] mt-4">Контент</p>
          <div className="flex mt-10 justify-evenly">
            <button
              className="text-white text-base leading-6 font-normal py-2 px-3 rounded-lg w-40 bg-orange-600"
              onClick={() => setModalVisible(true)}
            >
              {isAdult(userData.dateOfBirth) ? "Пригласить в семейную группу" : "Пригласить родителя"}
            </button>
            {isAdult(userData.dateOfBirth) && (
              <button
                className="text-white text-base leading-6 font-normal py-2 px-3 rounded-lg w-40 bg-orange-600"
                onClick={() => {}}
              >
                Купить
              </button>
            )}{" "}
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
