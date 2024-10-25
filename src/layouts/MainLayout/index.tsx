import React from "react";
import MainContent from "./MainContent";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const Content = MainContent;
  return <Content>{children}</Content>;
};

export default MainLayout;
