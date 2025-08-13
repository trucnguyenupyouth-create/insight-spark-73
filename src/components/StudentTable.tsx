import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  score: number;
  riskScore: number;
  progress: number;
  group: "Giỏi" | "Khá" | "TB" | "Yếu";
}

interface StudentTableProps {
  students: Student[];
  onStudentClick?: (student: Student) => void;
}

export function StudentTable({ students, onStudentClick }: StudentTableProps) {
  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 70) return "danger";
    if (riskScore >= 40) return "warning"; 
    return "success";
  };

  const getGroupColor = (group: string) => {
    switch (group) {
      case "Giỏi": return "success";
      case "Khá": return "primary";
      case "TB": return "warning";
      case "Yếu": return "danger";
      default: return "default";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress > 0) return "text-success";
    if (progress < 0) return "text-danger";
    return "text-muted-foreground";
  };

  return (
    <Card className="p-6 shadow-md">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Bảng xếp hạng học sinh</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">
                  Học sinh
                </th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">
                  Điểm
                </th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">
                  Rủi ro
                </th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">
                  Tiến bộ
                </th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">
                  Nhóm
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr 
                  key={student.id}
                  className={cn(
                    "border-b border-border/50 hover:bg-accent/50 transition-colors cursor-pointer"
                  )}
                  onClick={() => onStudentClick?.(student)}
                >
                  <td className="py-3 px-2">
                    <div className="font-medium">{student.name}</div>
                  </td>
                  <td className="text-center py-3 px-2">
                    <span className="font-semibold">{student.score.toFixed(1)}</span>
                  </td>
                  <td className="text-center py-3 px-2">
                    <Badge variant="outline" className={cn(
                      "font-medium",
                      getRiskColor(student.riskScore) === "danger" && "border-danger text-danger",
                      getRiskColor(student.riskScore) === "warning" && "border-warning text-warning",
                      getRiskColor(student.riskScore) === "success" && "border-success text-success"
                    )}>
                      {student.riskScore}%
                    </Badge>
                  </td>
                  <td className="text-center py-3 px-2">
                    <span className={cn("font-medium", getProgressColor(student.progress))}>
                      {student.progress > 0 ? "+" : ""}{student.progress.toFixed(1)}
                    </span>
                  </td>
                  <td className="text-center py-3 px-2">
                    <Badge variant="outline" className={cn(
                      "font-medium",
                      getGroupColor(student.group) === "success" && "border-success text-success",
                      getGroupColor(student.group) === "primary" && "border-primary text-primary",
                      getGroupColor(student.group) === "warning" && "border-warning text-warning",
                      getGroupColor(student.group) === "danger" && "border-danger text-danger"
                    )}>
                      {student.group}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}