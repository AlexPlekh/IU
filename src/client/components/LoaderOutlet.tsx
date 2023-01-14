import React from "react";
import { Outlet } from "react-router-dom";
import Loader from "./UI/Loader/Loader";

export interface ILoaderOutletProps {
  isLoading: boolean;
}

const LoaderOutlet: React.FC<ILoaderOutletProps> = ({ isLoading }) => {
  return !isLoading ? <Outlet /> : <Loader />;
};

export default LoaderOutlet;
