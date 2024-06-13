import React from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[rgba(16,16,16,1)]">
      <Header />

      <div className="flex flex-col-reverse justify-between md:flex-row h-[calc(100vh-80px)]">
        <NavBar />
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
