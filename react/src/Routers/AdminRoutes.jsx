import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminPannel from "../Admin/AdminPannel";
// import Admin from "../Admin/componets/createProduct/CreateProductFrom";
import DemoAdmin from "../Admin/Views/DemoAdmin";
import CreateProductForm from "../Admin/componets/createProduct/CreateProductFrom";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<AdminPannel />}></Route> */}
        {/* <Route path="/demo" element={<DemoAdmin />}></Route> */}
        {/* <Route path="/product/create" element={<CreateProductForm/>}></Route> */}
      </Routes>
    </div>
  );
};

export default AdminRoutes;
