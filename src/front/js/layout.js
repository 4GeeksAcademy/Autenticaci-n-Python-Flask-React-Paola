import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { ListCard } from "./views/ListCard";
import { Form } from "./views/form";
import { Login } from "./views/Login";

const Layout = () => {
  const basename = process.env.BASENAME || "";
  if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;
  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<ListCard />} />
            <Route path="/form" element={<Form />} />
            <Route path="/form/:id" element={<Form />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
