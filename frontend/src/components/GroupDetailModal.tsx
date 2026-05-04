import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Users, TrendingUp, AlertTriangle, FileText, MessageSquare, User } from "lucide-react";
import { StudentProfileModal } from "./StudentProfileModal";
import { groupDetailMap, enhancedStudents } from "@/data/exam177DeepData";

interface GroupStudent {
  id: string;
  name: string;
  score: number;
  riskScore: number;
  group: string;
}

interface Student {
  id: string;
  name: string;
  score: number;
  riskScore: number;
  progress: number;
  group: "Giỏi" | "Khá" | "TB" | "Yếu";
  studentId: string;
  averageScore: number;
  scoreHistory: Array<{ test: string; score: number }>;
  riskBreakdown: {
    averageScore: number;
    severity: number;
    trend: number;
    total: number;
  };
  questionResults: Array<{
    question: number;
    score: number;
    maxScore: number;
    status: "correct" | "incorrect" | "partial";
    topic: string;
  }>;
  progressSteps: Array<{
    step: string;
    score: number;
    maxScore: number;
  }>;
}

interface GroupDetailModalProps {
  group: {
    name: string;
    students: GroupStudent[];
    averageScore: number;
    riskLevel: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onAction?: (actionType: string, group: any) => void;
}

// groupDetailMap and enhancedStudents are imported from exam177DeepData

export function GroupDetailModal({ group, isOpen, onClose, onAction }: GroupDetailModalProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentProfile, setShowStudentProfile] = useState(false);
  
  if (!group) return null;

  const groupKey = group.name.replace("Nhóm ", "");
  const groupData = (groupDetailMap as any)[groupKey] || (groupDetailMap as any)["Yếu"];

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 70) return "text-danger";
    if (riskScore >= 40) return "text-warning";
    return "text-success";
  };

  const getErrorSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-danger text-danger bg-danger/10";
      case "medium": return "border-warning text-warning bg-warning/10";
      case "low": return "border-success text-success bg-success/10";
      default: return "border-muted-foreground text-muted-foreground";
    }
  };

  const handleAction = (actionType: string) => {
    onAction?.(actionType, groupData);
    onClose();
  };

  const handleStudentClick = (student: GroupStudent) => {
    // Look up real data from the analytics enhancedStudents array
    const realData = (enhancedStudents as any[]).find(
      (s: any) => s.id === student.id || s.name === student.name
    );
    const enhancedStudent: Student = realData ? {
      ...realData,
      group: realData.group as "Giỏi" | "Khá" | "TB" | "Yếu",
    } : {
      ...student,
      progress: 0,
      studentId: `HS${student.id}`,
      averageScore: student.score,
      group: student.group as "Giỏi" | "Khá" | "TB" | "Yếu",
      scoreHistory: [{ test: "GK2", score: student.score }],
      riskBreakdown: { averageScore: student.score, severity: student.riskScore * 0.3, trend: 0, total: student.riskScore },
      questionResults: [],
      progressSteps: []
    };
    setSelectedStudent(enhancedStudent);
    setShowStudentProfile(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-danger" />
            Phân tích {groupData.name} ({groupData.count} học sinh)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Group Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-danger">{groupData.count}</div>
              <div className="text-sm text-muted-foreground">Số học sinh</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{groupData.averageScore}</div>
              <div className="text-sm text-muted-foreground">Điểm TB</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-danger">{groupData.riskLevel}</div>
              <div className="text-sm text-muted-foreground">Mức rủi ro</div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Student List */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Danh sách học sinh</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {groupData.students.map((student) => (
                    <div 
                      key={student.id} 
                      className="flex items-center justify-between p-2 rounded border border-border hover:bg-accent/50 transition-colors cursor-pointer group"
                      onClick={() => handleStudentClick(student)}
                      title="Ấn vào để xem chi tiết"
                    >
                      <div>
                        <p className="font-medium text-sm">{student.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {student.id}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{student.score}</span>
                          <Badge 
                            variant="outline" 
                            className={getRiskColor(student.riskScore)}
                          >
                            {student.riskScore}%
                          </Badge>
                          <User className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Common Errors */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Lỗi sai phổ biến trong nhóm
                </h3>
                <div className="space-y-3">
                  {groupData.commonErrors.map((error, index) => (
                    <div key={index} className={cn(
                      "p-3 rounded-lg border",
                      getErrorSeverityColor(error.severity)
                    )}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{error.error}</span>
                        <Badge variant="secondary">
                          {error.count}/{groupData.count}
                        </Badge>
                      </div>
                      <div className="text-xs opacity-80">
                        Mức độ: {error.severity === "high" ? "Nghiêm trọng" : 
                                error.severity === "medium" ? "Trung bình" : "Nhẹ"}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Knowledge Gaps */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Lỗ hổng kiến thức chính
                </h3>
                <div className="space-y-4">
                  {groupData.commonWeaknesses.map((weakness, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{weakness.topic}</span>
                        <Badge variant="outline" className="text-danger border-danger">
                          {weakness.percentage}%
                        </Badge>
                      </div>
                      <Progress value={weakness.percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">{weakness.description}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Intervention Plan */}
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Kế hoạch can thiệp</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-danger">Hành động ngay lập tức</h4>
                    <div className="space-y-1">
                      {groupData.interventionPlan.immediate.map((action, index) => (
                        <div key={index} className="flex items-start space-x-2 text-xs">
                          <div className="w-1 h-1 rounded-full bg-danger mt-1.5 flex-shrink-0"></div>
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2 text-warning">Kế hoạch dài hạn</h4>
                    <div className="space-y-1">
                      {groupData.interventionPlan.longTerm.map((action, index) => (
                        <div key={index} className="flex items-start space-x-2 text-xs">
                          <div className="w-1 h-1 rounded-full bg-warning mt-1.5 flex-shrink-0"></div>
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Thực hiện hành động</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={() => handleAction("group_remediation")}
                className="p-4 h-auto flex-col items-start text-left space-y-2"
              >
                <FileText className="w-5 h-5" />
                <div className="font-medium">Tổ chức phụ đạo nhóm</div>
                <div className="text-xs opacity-80">Lên lịch buổi học bổ trợ cho {groupData.count} học sinh</div>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => handleAction("send_materials")}
                className="p-4 h-auto flex-col items-start text-left space-y-2"
              >
                <MessageSquare className="w-5 h-5" />
                <div className="font-medium">Gửi tài liệu hỗ trợ</div>
                <div className="text-xs text-muted-foreground">Tài liệu ôn tập và bài tập bổ sung</div>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => handleAction("parent_notification")}
                className="p-4 h-auto flex-col items-start text-left space-y-2 border-warning text-warning hover:bg-warning/10"
              >
                <Users className="w-5 h-5" />
                <div className="font-medium">Thông báo phụ huynh</div>
                <div className="text-xs opacity-80">Gửi báo cáo tới {groupData.count} phụ huynh</div>
              </Button>
            </div>
          </Card>
        </div>
      </DialogContent>
      
      <StudentProfileModal
        student={selectedStudent}
        isOpen={showStudentProfile}
        onClose={() => setShowStudentProfile(false)}
        onAction={(actionType, student) => {
          console.log('Student action:', actionType, student);
          // Handle individual student actions
        }}
      />
    </Dialog>
  );
}