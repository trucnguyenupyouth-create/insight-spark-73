import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { User, TrendingUp, AlertTriangle, FileText, MessageSquare, Send, Phone } from "lucide-react";

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

interface StudentProfileModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onAction?: (actionType: string, student: Student) => void;
}

const mockStudentData: Student = {
  id: "hs002",
  name: "Trần Thị Bình",
  score: 4.5,
  riskScore: 65,
  progress: -2.5,
  group: "Yếu",
  studentId: "HS002",
  averageScore: 45,
  scoreHistory: [
    { test: "Bài 1", score: 50 },
    { test: "Bài 2", score: 55 },
    { test: "Bài 3", score: 48 },
    { test: "Bài 4", score: 60 },
    { test: "Bài 5", score: 55 }
  ],
  riskBreakdown: {
    averageScore: 27.5,
    severity: 18.0,
    trend: 8.0,
    total: 65
  },
  questionResults: [
    { question: 1, score: 2, maxScore: 2, status: "correct", topic: "Đồng" },
    { question: 2, score: 0, maxScore: 2, status: "incorrect", topic: "Lỗi tính toán" },
    { question: 3, score: 1.5, maxScore: 2, status: "partial", topic: "Đúng" },
    { question: 4, score: 0, maxScore: 2, status: "incorrect", topic: "Không hiểu khái niệm" },
    { question: 5, score: 2, maxScore: 2, status: "correct", topic: "Đúng" }
  ],
  progressSteps: [
    { step: "Bước 4: Kiến tạo ra", score: 4, maxScore: 10 },
    { step: "Bước 3: Hiểu và sử dụng được", score: 7, maxScore: 10 },
    { step: "Bước 2: Nhớ, ghi nhớ được", score: 8, maxScore: 10 },
    { step: "Bước 1: Thấy hiện tượng, phương trình", score: 9, maxScore: 10 }
  ]
};

export function StudentProfileModal({ student, isOpen, onClose, onAction }: StudentProfileModalProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!student) return null;

  // Use mock data for demonstration
  const studentData = { ...mockStudentData, ...student };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "correct": return "bg-success text-success-foreground";
      case "incorrect": return "bg-danger text-danger-foreground";
      case "partial": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getGroupColor = (group: string) => {
    switch (group) {
      case "Giỏi": return "text-success border-success";
      case "Khá": return "text-primary border-primary";
      case "TB": return "text-warning border-warning";
      case "Yếu": return "text-danger border-danger";
      default: return "text-muted-foreground border-border";
    }
  };

  const handleAction = (actionType: string) => {
    onAction?.(actionType, studentData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Chi tiết học sinh: {studentData.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Basic Info */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Thông tin cơ bản</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Mã học sinh</span>
                  <p className="font-medium">{studentData.studentId}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Nhóm</span>
                  <Badge variant="outline" className={getGroupColor(studentData.group)}>
                    {studentData.group}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Điểm trung bình</span>
                  <p className="font-medium">{studentData.averageScore}%</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Risk Score</span>
                  <p className={cn("font-medium", 
                    studentData.riskScore >= 70 ? "text-danger" : 
                    studentData.riskScore >= 40 ? "text-warning" : "text-success"
                  )}>
                    {studentData.riskScore} <span className="text-sm font-normal">Cao</span>
                  </p>
                </div>
              </div>
            </Card>

            {/* Score History Chart */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Lịch sử điểm số</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={studentData.scoreHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="test" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Question Analysis */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Chi tiết câu hỏi</h3>
              <div className="space-y-2">
                {studentData.questionResults.map((result) => (
                  <div key={result.question} className="flex items-center justify-between p-2 rounded border border-border">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">Câu {result.question}</span>
                      <Badge 
                        variant="secondary" 
                        className={getStatusColor(result.status)}
                      >
                        {result.status === "correct" ? "Đúng" : 
                         result.status === "incorrect" ? "Sai" : "Lỗi tính toán"}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">{result.score} điểm</span>
                      <p className="text-xs text-muted-foreground">{result.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Risk Score Breakdown */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Phân tích Risk Score</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Điểm trung bình (50%)</span>
                    <span className="text-sm font-medium">{studentData.riskBreakdown.averageScore}</span>
                  </div>
                  <Progress value={studentData.riskBreakdown.averageScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Mức độ nghiêm trọng (30%)</span>
                    <span className="text-sm font-medium">{studentData.riskBreakdown.severity}</span>
                  </div>
                  <Progress value={studentData.riskBreakdown.severity} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Xu suất hiện lại (20%)</span>
                    <span className="text-sm font-medium">{studentData.riskBreakdown.trend}</span>
                  </div>
                  <Progress value={studentData.riskBreakdown.trend} className="h-2" />
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Tổng Risk Score</span>
                  <span>{studentData.riskBreakdown.total}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Công thức: [(1 - avg_score/100) * 0.5] + [severity/5 * 0.3] + 
                  [(negativeTrend/5) * 0.2]
                </p>
              </div>
            </Card>

            {/* Learning Progress Steps */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Phân tích theo bước</h3>
              <div className="space-y-3">
                {studentData.progressSteps.map((step, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{step.step}</span>
                      <span>{step.score}/{step.maxScore}</span>
                    </div>
                    <div className="flex space-x-2">
                      {Array.from({ length: step.maxScore }, (_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-2 flex-1 rounded",
                            i < step.score ? "bg-primary" : "bg-muted"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <Card className="p-4 mt-6">
          <h3 className="font-semibold mb-3">Đề xuất hành động</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Button 
              onClick={() => handleAction("create_worksheet")}
              className="flex items-center justify-center h-16 flex-col gap-1"
            >
              <FileText className="w-5 h-5" />
              <span className="text-xs">Tạo bài tập cá nhân</span>
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleAction("send_materials")}
              className="flex items-center justify-center h-16 flex-col gap-1"
            >
              <Send className="w-5 h-5" />
              <span className="text-xs">Gửi tài liệu hỗ trợ</span>
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleAction("parent_report")}
              className="flex items-center justify-center h-16 flex-col gap-1"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs">Báo cáo phụ huynh</span>
            </Button>
            <Button 
              onClick={() => handleAction("counseling")}
              className="flex items-center justify-center h-16 flex-col gap-1 bg-success hover:bg-success/90 text-success-foreground"
            >
              <Phone className="w-5 h-5" />
              <span className="text-xs">Tư vấn sương nối dụng</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Dựa trên phân tích, Trần Thị Bình cần đặc biệt tập vào việc hiểu và khái niệm cơ bản của môn hóa chuyển trình. 
            Đề xuất gửi bài tập bổ sung và biến đổi dụng với người đó và kiểm tra nghiệm.
          </p>
        </Card>
      </DialogContent>
    </Dialog>
  );
}