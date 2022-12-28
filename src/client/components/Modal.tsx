import React, { PropsWithChildren, ReactElement } from "react";

export interface IModalProps {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: React.FC<PropsWithChildren<IModalProps>> = ({ isVisible, setVisible, children }) => {
  if (!isVisible) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={e => {
        setVisible(false);
      }}
    >
      <div
        onClick={e => {
          e.stopPropagation();
        }}
        className="bg-white max-w-160 rounded-lg p-7 m-4 flex flex-col justify-center items-center text-center gap-2"
      >
        {children}
      </div>
    </div>
  );
};
