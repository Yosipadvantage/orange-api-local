import React from "react";
import DataBase from "../../core/api-data-base/DataBase";
import { ModuleLayout } from "../../layouts";


const index = () => {
  return (
    <>

      <ModuleLayout title="Api - Métodos" />
      <DataBase />
    </>
  );
};

export default index;
