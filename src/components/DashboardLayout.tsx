import { ReactNode } from "react";
import { WizzdomHeader } from "./WizzdomHeader";

interface LayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary transition-all duration-500">
      {/* Horizontal Header */}
      <WizzdomHeader />
      
      {/* Main Content Area */}
      <main className="flex flex-col min-w-0">
        <div className="p-8 mx-auto w-full max-w-[1600px] animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  );
};
