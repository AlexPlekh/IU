import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserData } from "../hooks/useUserData";

export interface IPrivateOutletProps {
  navigateUnautorizedTo: string;
}

export const PrivateOutlet: React.FC<IPrivateOutletProps> = ({ navigateUnautorizedTo }) => {
  const isAuth = useUserData().isAuth;
  return isAuth ? <Outlet /> : <Navigate to={navigateUnautorizedTo} />;
};
