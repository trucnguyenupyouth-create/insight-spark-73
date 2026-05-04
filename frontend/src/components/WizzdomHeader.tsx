import { Brain } from "lucide-react";

export const WizzdomHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-8 max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Brain className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight leading-tight">Wizzdom</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Vision Grading AI</span>
          </div>
        </div>
        
        <nav className="ml-auto flex items-center gap-6">
          <a href="#" className="text-xs font-bold text-primary border-b-2 border-primary pb-1">Dashboard</a>
          <a href="#" className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors pb-1">Đề thi</a>
          <a href="#" className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors pb-1">Bài nộp</a>
          <a href="#" className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors pb-1">Chấm bài</a>
        </nav>
      </div>
    </header>
  );
};
