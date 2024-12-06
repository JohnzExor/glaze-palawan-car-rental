import React, { ReactNode } from "react";
import SideNavigations from "./side-nav";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <SideNavigations />
      <main className="md:overflow-y-auto max-h-screen w-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
