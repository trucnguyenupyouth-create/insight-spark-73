import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import assistantAvatar from "@/assets/assistant-avatar.png";

interface Suggestion {
  id: string;
  type: "urgent" | "important" | "improvement" | "opportunity";
  title: string;
  description: string;
  action: string;
  priority: number;
}

interface AssistantWelcomeProps {
  suggestions: Suggestion[];
  insight?: string;
  onActionClick?: (suggestion: Suggestion) => void;
  onComposeAction?: (suggestion: Suggestion) => void;
}

export function AssistantWelcome({ suggestions, insight, onActionClick, onComposeAction }: AssistantWelcomeProps) {
  const primarySuggestion = suggestions[0];
  
  return (
    <div className="relative mb-12">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Assistant Avatar Section */}
        <div className="flex flex-col items-center gap-3 shrink-0 pt-4">
          <div className="relative group">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-28 h-28 lg:w-36 lg:h-36 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2">
              <img 
                src={assistantAvatar} 
                alt="Wizzdom Assistant" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online Indicator */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-success border-4 border-white rounded-full shadow-sm" />
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">AI Assistant</p>
            <p className="font-bold text-sm">Wizzdom Bot</p>
          </div>
        </div>
        
        {/* Conversational Area */}
        <div className="flex-1 space-y-6 w-full">
          {/* Greeting Bubble */}
          <div className="relative animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div className="absolute -left-3 top-6 w-4 h-4 bg-primary rotate-45 rounded-sm hidden lg:block" />
             <div className="bg-primary text-primary-foreground p-6 rounded-3xl rounded-tl-sm shadow-xl shadow-primary/10">
                <h2 className="text-xl md:text-2xl font-bold leading-tight">
                  Chào giáo viên! Tôi đã phân tích kết quả bài thi của lớp 9A2. 
                  <span className="opacity-80 block text-sm mt-1 font-medium">Dưới đây là một số lưu ý quan trọng để điều chỉnh bài giảng:</span>
                </h2>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Bubble 1: Pedagogical Insight */}
            {insight && (
              <div className="relative animate-in fade-in slide-in-from-left-4 duration-700 delay-100 h-full">
                <div className="bg-white border border-primary/10 p-6 rounded-3xl rounded-tl-sm shadow-lg hover:shadow-xl transition-shadow relative h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4 text-primary">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Tổng quan</span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <p className="text-sm text-foreground leading-relaxed font-medium italic italic">
                      "{insight}"
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 opacity-40">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-[9px] font-bold uppercase">Strategic Insight</span>
                  </div>
                </div>
              </div>
            )}
 
            {/* Bubble 2: Action Suggestion */}
            {primarySuggestion && (
              <div className="relative animate-in fade-in slide-in-from-left-4 duration-700 delay-200 h-full">
                <div className="bg-white border border-amber-200 p-6 rounded-3xl rounded-tl-sm shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-amber-500 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 text-[10px] h-5">
                          {primarySuggestion.priority >= 8 ? "Khẩn cấp" : "Quan trọng"}
                        </Badge>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                          <Zap className="w-3 h-3 fill-amber-500 text-amber-500" /> Hành động
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                        {primarySuggestion.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {primarySuggestion.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onActionClick?.(primarySuggestion)}
                      className="flex-1 font-bold text-xs h-9 border-amber-100 hover:bg-amber-50"
                    >
                      Chi tiết
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => onComposeAction?.(primarySuggestion)}
                      className="flex-[2] bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/20 font-bold text-xs h-9"
                    >
                      Soạn hành động
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
