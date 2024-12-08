import React, { ReactNode } from "react";
import { Header } from "./header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const ExploreLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex min-h-screen">
      <main className="md:overflow-y-auto max-h-screen w-full">
        <Header session={session} />
        <div className=" p-4 xl:p-10">{children}</div>
      </main>
    </div>
  );
};

export default ExploreLayout;
