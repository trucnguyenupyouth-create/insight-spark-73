import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Topic {
  name: string;
  masteryRate: number;
  difficulty: "Dễ" | "Trung bình" | "Khó";
}

interface TopicChartProps {
  topics: Topic[];
}

export function TopicChart({ topics }: TopicChartProps) {
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

  return (
    <Card className="p-6 shadow-md">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Tỷ lệ nắm vững theo chủ đề</h3>
        
        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-medium text-sm">{topic.name}</p>
                  <p className={cn("text-xs", getDifficultyColor(topic.difficulty))}>
                    {topic.difficulty}
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "font-bold text-sm",
                    getMasteryColor(topic.masteryRate) === "success" && "text-success",
                    getMasteryColor(topic.masteryRate) === "warning" && "text-warning", 
                    getMasteryColor(topic.masteryRate) === "danger" && "text-danger"
                  )}>
                    {topic.masteryRate}%
                  </p>
                </div>
              </div>
              <Progress 
                value={topic.masteryRate} 
                className={cn(
                  "h-2",
                  getMasteryColor(topic.masteryRate) === "success" && "[&>div]:bg-success",
                  getMasteryColor(topic.masteryRate) === "warning" && "[&>div]:bg-warning",
                  getMasteryColor(topic.masteryRate) === "danger" && "[&>div]:bg-danger"
                )}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-accent/30 rounded-lg">
          <h4 className="font-medium text-sm mb-2 text-danger">Chủ đề cần chú ý:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            {topics
              .filter(topic => topic.masteryRate < 60)
              .map((topic, index) => (
                <li key={index}>• {topic.name} ({topic.masteryRate}%)</li>
              ))
            }
          </ul>
        </div>
      </div>
    </Card>
  );
}