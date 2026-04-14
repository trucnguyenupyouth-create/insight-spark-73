import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface Topic {
  name: string;
  masteryRate: number;
  difficulty: "Dễ" | "Trung bình" | "Khó";
}

interface TopicChartProps {
  topics: Topic[];
}

export function TopicChart({ topics }: TopicChartProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ": return "text-success";
      case "Trung bình": return "text-warning";
      case "Khó": return "text-danger";
      default: return "text-muted-foreground";
    }
  };

  const getMasteryColor = (rate: number) => {
    if (rate >= 80) return "success";
    if (rate >= 60) return "warning";
    return "danger";
  };

  const generateSummary = () => {
    const lowMastery = topics.filter(t => t.masteryRate < 50).map(t => t.name);
    const highMastery = topics.filter(t => t.masteryRate > 80).map(t => t.name);
    
    let summary = "";
    if (lowMastery.length > 0) {
      summary += `Lớp đang gặp rào cản lớn tại **${lowMastery.slice(0, 2).join(", ")}**. `;
    }
    if (highMastery.length > 0) {
      summary += `Tuy nhiên, học sinh thể hiện sự nắm vững rất tốt ở phần **${highMastery.slice(0, 2).join(", ")}**.`;
    }
    return summary || "Các chủ đề đang được duy trì ổn định.";
  };

  // Sort by mastery rate (ascending) to show critical topics first
  const sortedTopics = [...topics].sort((a, b) => a.masteryRate - b.masteryRate);
  const displayedTopics = isExpanded ? sortedTopics : sortedTopics.slice(0, 5);

  return (
    <Card className="p-6 shadow-md border-none bg-white relative overflow-hidden">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight">Tỷ lệ nắm vững theo chủ đề</h3>
          <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-50 tracking-widest">{topics.length} Chủ đề</span>
        </div>

        {/* Dynamic Balanced Summary */}
        <div className="p-4 rounded-xl bg-primary/[0.03] border border-primary/10 relative">
          <Sparkles className="absolute top-3 right-3 w-4 h-4 text-primary opacity-30" />
          <h4 className="text-[10px] font-black uppercase tracking-tighter text-primary mb-1">Tóm tắt sư phạm</h4>
          <p className="text-sm text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: generateSummary() }} />
        </div>
        
        <div className={cn(
          "transition-all duration-700 ease-in-out",
          isExpanded ? "space-y-3" : "space-y-11"
        )}>
          {displayedTopics.map((topic, index) => (
            <div 
              key={index} 
              className={cn(
                "group transition-all duration-300",
                isExpanded ? "py-1" : "py-3"
              )}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex-1">
                  <p className={cn(
                    "font-bold text-foreground group-hover:text-primary transition-colors",
                    isExpanded ? "text-sm" : "text-base"
                  )}>
                    {topic.name}
                  </p>
                  <p className={cn(
                    "uppercase font-black tracking-widest mt-0.5",
                    getDifficultyColor(topic.difficulty),
                    isExpanded ? "text-[8px]" : "text-[10px]"
                  )}>
                    {topic.difficulty}
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-black tabular-nums tracking-tighter",
                    getMasteryColor(topic.masteryRate) === "success" && "text-success",
                    getMasteryColor(topic.masteryRate) === "warning" && "text-warning", 
                    getMasteryColor(topic.masteryRate) === "danger" && "text-danger",
                    isExpanded ? "text-sm" : "text-lg pt-1"
                  )}>
                    {topic.masteryRate}%
                  </p>
                </div>
              </div>
              <Progress 
                value={topic.masteryRate} 
                className={cn(
                  "bg-muted/50 rounded-full",
                  isExpanded ? "h-1" : "h-2",
                  getMasteryColor(topic.masteryRate) === "success" && "[&>div]:bg-success",
                  getMasteryColor(topic.masteryRate) === "warning" && "[&>div]:bg-warning",
                  getMasteryColor(topic.masteryRate) === "danger" && "[&>div]:bg-danger"
                )}
              />
            </div>
          ))}
        </div>

        {topics.length > 5 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-xs font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 h-10 border-t border-border/50 rounded-none -mx-6 w-[calc(100%+3rem)] mt-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <><ChevronUp className="w-4 h-4 mr-2" /> Thu gọn</>
            ) : (
              <><ChevronDown className="w-4 h-4 mr-2" /> Xem thêm {topics.length - 5} chủ đề khác</>
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}