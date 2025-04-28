import React from "react";
import UserRouter from "./Router/EmployeeRouter";
import { Toaster } from "react-hot-toast";
import EmployerRouter from "./Router/EmployerRouter";
import AdminRouter from "./Router/AdminRouter";

const App = () => {
  return (
    <>
      <UserRouter />
      <EmployerRouter />
      <AdminRouter />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
