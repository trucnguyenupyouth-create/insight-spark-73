import { useState } from "react";
import { 
  cn 
} from "@/lib/utils";
import { 
  Brain, 
  LayoutDashboard, 
  FileText, 
  Upload, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  User, 
  Settings,
  GraduationCap
} from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  className?: string;
}

export const WizzdomSidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
    { icon: FileText, label: "Quản lý đề thi", href: "#" },
    { icon: Upload, label: "Bài nộp", href: "#" },
    { icon: CheckCircle, label: "Chấm bài", href: "#" },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-screen border-r border-border bg-sidebar transition-all duration-300 ease-in-out z-40 sticky top-0",
        collapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Branding Header */}
      <div className={cn(
        "flex h-20 items-center border-b border-border transition-all duration-300",
        collapsed ? "justify-center px-0" : "px-6"
      )}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Brain className="h-6 w-6" />
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-lg font-bold truncate leading-tight">Wizzdom</span>
              <span className="text-[10px] text-muted-foreground truncate uppercase tracking-wider font-semibold">Vision Grading AI</span>
            </div>
          )}
        </div>
        
        {!collapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto text-muted-foreground hover:bg-muted"
            onClick={() => setCollapsed(true)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {collapsed && (
        <div className="flex justify-center p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:bg-muted"
            onClick={() => setCollapsed(false)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {!collapsed && (
          <p className="px-3 mb-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Điều hướng
          </p>
        )}
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                item.active 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110", item.active ? "text-primary-foreground" : "text-muted-foreground")} />
              {!collapsed && <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>

      {/* User Area */}
      <div className={cn(
        "p-4 border-t border-border mt-auto",
        collapsed ? "items-center" : ""
      )}>
        {!collapsed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-secondary/50 border border-border/50">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
                <User className="h-5 w-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold truncate text-foreground">Giảng viên 9A</span>
                <span className="text-[11px] text-muted-foreground truncate">wizzdom@gmail.com</span>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="flex-1 justify-start gap-2 h-9 text-muted-foreground">
                <Settings className="h-4 w-4" />
                {!collapsed && <span className="text-xs">Cài đặt</span>}
              </Button>
              <Button variant="ghost" size="sm" className="flex-none w-9 h-9 p-0 text-destructive hover:bg-destructive/10">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <User className="text-primary h-5 w-5" />
            </div>
            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};
