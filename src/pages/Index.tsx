import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { TopicChart } from "@/components/TopicChart";
import { ErrorAnalysis } from "@/components/ErrorAnalysis";
import { GroupAnalysis } from "@/components/GroupAnalysis";
import { KnowledgeGapAnalysis } from "@/components/KnowledgeGapAnalysis";
import { ActionSuggestions } from "@/components/ActionSuggestions";
import { ActionComposer } from "@/components/ActionComposer";
import { ActionTracker } from "@/components/ActionTracker";
import { ErrorDetailModal } from "@/components/ErrorDetailModal";
import { GroupDetailModal } from "@/components/GroupDetailModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, GraduationCap, BookOpen, Settings, AlertTriangle, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateActionSuggestions, mockClassData } from "@/utils/actionEngine";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);
  const [composerRecipients, setComposerRecipients] = useState<any[]>([]);
  const [selectedError, setSelectedError] = useState<any>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from an API
  const classMetrics = {
    totalStudents: 40,
    averageScore: 7.2,
    highestScore: 9.8,
    lowestScore: 3.2,
    attendanceRate: 95
  };

  // Mock student data for backward compatibility
  const students = [
    { 
      id: "1", 
      name: "Nguyễn Văn An", 
      score: 9.5, 
      riskScore: 10, 
      progress: +1.2, 
      group: "Giỏi" as const,
      studentId: "HS001",
      averageScore: 9.5,
      scoreHistory: [{ test: "Kiểm tra 1", score: 9.2 }, { test: "Kiểm tra 2", score: 9.8 }],
      riskBreakdown: { averageScore: 9.5, severity: 10, trend: 1.2, total: 20.7 },
      questionResults: [],
      progressSteps: []
    },
    { 
      id: "2", 
      name: "Trần Thị Bình", 
      score: 8.8, 
      riskScore: 15, 
      progress: +0.8, 
      group: "Giỏi" as const,
      studentId: "HS002",
      averageScore: 8.8,
      scoreHistory: [{ test: "Kiểm tra 1", score: 8.5 }, { test: "Kiểm tra 2", score: 9.1 }],
      riskBreakdown: { averageScore: 8.8, severity: 15, trend: 0.8, total: 24.6 },
      questionResults: [],
      progressSteps: []
    },
    { 
      id: "3", 
      name: "Lê Văn Cường", 
      score: 7.5, 
      riskScore: 25, 
      progress: +0.3, 
      group: "Khá" as const,
      studentId: "HS003",
      averageScore: 7.5,
      scoreHistory: [{ test: "Kiểm tra 1", score: 7.2 }, { test: "Kiểm tra 2", score: 7.8 }],
      riskBreakdown: { averageScore: 7.5, severity: 25, trend: 0.3, total: 32.8 },
      questionResults: [],
      progressSteps: []
    },
    { 
      id: "4", 
      name: "Phạm Thị Dung", 
      score: 6.2, 
      riskScore: 45, 
      progress: -0.5, 
      group: "TB" as const,
      studentId: "HS004",
      averageScore: 6.2,
      scoreHistory: [{ test: "Kiểm tra 1", score: 6.7 }, { test: "Kiểm tra 2", score: 5.7 }],
      riskBreakdown: { averageScore: 6.2, severity: 45, trend: -0.5, total: 50.7 },
      questionResults: [],
      progressSteps: []
    },
    { 
      id: "5", 
      name: "Hoàng Văn Em", 
      score: 4.8, 
      riskScore: 75, 
      progress: -1.2, 
      group: "Yếu" as const,
      studentId: "HS005",
      averageScore: 4.8,
      scoreHistory: [{ test: "Kiểm tra 1", score: 6.0 }, { test: "Kiểm tra 2", score: 3.6 }],
      riskBreakdown: { averageScore: 4.8, severity: 75, trend: -1.2, total: 78.6 },
      questionResults: [],
      progressSteps: []
    },
    { 
      id: "6", 
      name: "Đặng Thị Phượng", 
      score: 3.2, 
      riskScore: 85, 
      progress: -0.8, 
      group: "Yếu" as const,
      studentId: "HS006",
      averageScore: 3.2,
      scoreHistory: [{ test: "Kiểm tra 1", score: 4.0 }, { test: "Kiểm tra 2", score: 2.4 }],
      riskBreakdown: { averageScore: 3.2, severity: 85, trend: -0.8, total: 88 },
      questionResults: [],
      progressSteps: []
    },
  ];

  // Enhanced error analysis data
  const commonErrors = [
    {
      id: "1",
      tag: "Nhầm lẫn chân kề/chân đối",
      count: 15,
      percentage: 37.5,
      severity: "high" as const,
      example: "sin30° = chân đối/chân kề (sai) → sin30° = chân đối/cạnh huyền (đúng)",
      affectedStudents: ["Trần Thị Bình", "Lê Văn Cường", "Phạm Thị Dung"],
      questionIds: [3, 7, 12]
    },
    {
      id: "2", 
      tag: "Sai dấu khi chuyển vế",
      count: 8,
      percentage: 20,
      severity: "medium" as const,
      example: "2x = 6 → x = 6 + 2 (sai) → x = 6 - 2 (đúng)",
      affectedStudents: ["Hoàng Văn Em", "Đặng Thị Phượng"],
      questionIds: [5, 9]
    },
    {
      id: "3",
      tag: "Quên đổi đơn vị",
      count: 6,
      percentage: 15,
      severity: "low" as const,
      example: "Tính từ mm nhưng không đổi ra m",
      affectedStudents: ["Nguyễn Văn An", "Lê Văn Cường"],
      questionIds: [2, 11]
    }
  ];

  // Student groups analysis
  const studentGroups = [
    {
      id: "1",
      name: "Nhóm Giỏi",
      level: "Giỏi" as const,
      count: 8,
      percentage: 20,
      averageScore: 8.9,
      commonErrors: ["Tính toán cẩu thả"],
      knowledgeGaps: [],
      riskLevel: "low" as const
    },
    {
      id: "2",
      name: "Nhóm Khá", 
      level: "Khá" as const,
      count: 15,
      percentage: 37.5,
      averageScore: 7.2,
      commonErrors: ["Nhầm công thức", "Sai dấu"],
      knowledgeGaps: ["Lượng giác nâng cao"],
      riskLevel: "medium" as const
    },
    {
      id: "3",
      name: "Nhóm TB",
      level: "TB" as const,
      count: 12,
      percentage: 30,
      averageScore: 5.8,
      commonErrors: ["Không nhớ công thức", "Sai bước giải"],
      knowledgeGaps: ["Hình học không gian", "Phương trình bậc cao"],
      riskLevel: "medium" as const
    },
    {
      id: "4",
      name: "Nhóm Yếu",
      level: "Yếu" as const,
      count: 5,
      percentage: 12.5,
      averageScore: 3.2,
      commonErrors: ["Không hiểu đề", "Thiếu kiến thức nền"],
      knowledgeGaps: ["Đại số cơ bản", "Hình học phẳng", "Lượng giác"],
      riskLevel: "high" as const
    }
  ];

  // Mock topic data for knowledge mastery
  const mockTopics = [
    { name: "Định nghĩa sin/cos/tan", masteryRate: 75, difficulty: "Dễ" as const },
    { name: "Tỉ số cạnh đối/chân kề/huyền", masteryRate: 62, difficulty: "Trung bình" as const },
    { name: "Bài toán vận dụng", masteryRate: 45, difficulty: "Khó" as const },
    { name: "Góc và cung", masteryRate: 58, difficulty: "Trung bình" as const }
  ];

  // Generate smart suggestions using the action engine
  const suggestions = generateActionSuggestions(mockClassData);

  // Mock tracking data
  const sentActions = [
    {
      id: "1",
      type: "class" as const,
      subject: "Thông báo: Lỗi sai phổ biến về lượng giác",
      content: "Chào cả lớp, cô thấy nhiều em nhầm lẫn chân kề và chân đối...",
      recipients: ["all"],
      recipientNames: ["Cả lớp 9A2"],
      sentAt: "2025-08-14T08:30:00Z",
      status: "delivered" as const,
      canRevoke: true
    },
    {
      id: "2",
      type: "parent" as const,
      subject: "Cập nhật học tập của em Phạm Thị Dung",
      content: "Chào Anh/Chị, em Dung cần hỗ trợ thêm về kiến thức cơ bản...",
      recipients: ["parent_4"],
      recipientNames: ["Phụ huynh Phạm Thị Dung"],
      sentAt: "2025-08-14T09:15:00Z",
      status: "read" as const,
      canRevoke: false
    }
  ];

  const studentProgress = [
    {
      studentId: "4",
      studentName: "Phạm Thị Dung",
      assignedTasks: [
        {
          id: "1",
          title: "Bài tập lượng giác cơ bản",
          status: "in_progress" as const,
          assignedAt: "2025-08-14T10:00:00Z"
        },
        {
          id: "2", 
          title: "Video ôn tập chân kề/chân đối",
          status: "completed" as const,
          assignedAt: "2025-08-14T10:00:00Z",
          completedAt: "2025-08-14T11:30:00Z",
          score: 7
        }
      ]
    },
    {
      studentId: "5",
      studentName: "Hoàng Văn Em",
      assignedTasks: [
        {
          id: "3",
          title: "Luyện tập đổi dấu",
          status: "pending" as const,
          assignedAt: "2025-08-14T10:00:00Z"
        }
      ]
    }
  ];

  // Event handlers
  const handleErrorClick = (error: any) => {
    setSelectedError(error);
    setIsErrorModalOpen(true);
  };

  const handleGroupClick = (group: any) => {
    setSelectedGroup(group);
    setIsGroupModalOpen(true);
  };

  const handleActionClick = (suggestion: any) => {
    toast({
      title: "Thực hiện hành động", 
      description: suggestion.title,
      variant: "default"
    });
  };

  const handleComposeAction = (suggestion: any) => {
    // Determine recipients based on suggestion type
    let recipients: any[] = [];
    
    if (suggestion.triggerRule === "common_error_30_percent") {
      recipients = [{ id: "all", name: "Cả lớp 9A2", type: "class" }];
    } else if (suggestion.triggerRule === "group_specific_error") {
      recipients = [{ id: "group_weak", name: "Nhóm Yếu", type: "group" }];
    } else {
      recipients = [{ id: "student_1", name: "Học sinh cần can thiệp", type: "student" }];
    }

    setComposerRecipients(recipients);
    setSelectedSuggestion(suggestion);
    setIsComposerOpen(true);
  };

  const handleSendMessage = (message: any) => {
    toast({
      title: "Đã gửi thành công",
      description: `Tin nhắn "${message.subject}" đã được gửi`,
      variant: "default"
    });
  };

  const handleRevokeAction = (actionId: string) => {
    toast({
      title: "Đã thu hồi",
      description: "Hành động đã được thu hồi thành công",
      variant: "default"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Dashboard Phân Tích</h1>
              </div>
              <Badge variant="outline" className="bg-primary-glow text-primary border-primary">
                Lớp 9A2 - Toán
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Cài đặt
              </Button>
              <Button variant="default" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Tạo bài kiểm tra mới
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Class Overview Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary" />
            Tổng quan lớp học
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <MetricCard
              title="Số học sinh"
              value={classMetrics.totalStudents}
              subtitle="Tổng số học sinh"
              variant="default"
            />
            <MetricCard
              title="Điểm trung bình"
              value={classMetrics.averageScore}
              subtitle="Điểm trung bình lớp"
              trend="up"
              trendValue="+0.3 so với bài trước"
              variant="success"
            />
            <MetricCard
              title="Điểm cao nhất"
              value={classMetrics.highestScore}
              subtitle="Thành tích tốt nhất"
              variant="success"
            />
            <MetricCard
              title="Điểm thấp nhất"
              value={classMetrics.lowestScore}
              subtitle="Cần hỗ trợ"
              variant="danger"
            />
            <MetricCard
              title="Tỷ lệ tham gia"
              value={`${classMetrics.attendanceRate}%`}
              subtitle="Học sinh làm bài"
              variant="success"
            />
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Topic Mastery & Error Analysis */}
            <div className="grid gap-6 md:grid-cols-2">
              <TopicChart topics={mockTopics} />
              <ErrorAnalysis 
                errors={commonErrors} 
                totalStudents={classMetrics.totalStudents}
                onErrorClick={handleErrorClick}
              />
            </div>

            {/* Knowledge Gap Analysis */}
            <KnowledgeGapAnalysis topics={[]} />

            {/* Group Analysis */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Phân tích nhóm học sinh
              </h2>
              <GroupAnalysis 
                groups={studentGroups}
                totalStudents={classMetrics.totalStudents}
                onGroupClick={handleGroupClick}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Action Entry */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                Hành động giáo dục
              </h2>
              <div className="flex justify-center">
                <Button 
                  onClick={() => navigate("/action-flow")}
                  className="w-full h-auto p-6 flex-col space-y-2"
                  size="lg"
                >
                  <div className="text-lg font-semibold">Trung tâm hành động</div>
                  <div className="text-sm opacity-90">Tạo và theo dõi các can thiệp giáo dục</div>
                </Button>
              </div>
            </div>

            {/* Quick Action Suggestions */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                Gợi ý nhanh
              </h2>
              <ActionSuggestions 
                suggestions={suggestions.slice(0, 3)}
                onActionClick={handleActionClick}
                onComposeAction={handleComposeAction}
              />
            </div>

            {/* Action Tracker */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                Theo dõi hành động
              </h2>
              <ActionTracker
                sentActions={sentActions}
                studentProgress={studentProgress}
                onRevoke={handleRevokeAction}
                onViewDetails={(id) => toast({ title: "Chi tiết", description: `Xem chi tiết hành động ${id}` })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Composer Modal */}
      <ActionComposer
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        recipients={composerRecipients}
        context={selectedSuggestion?.context}
        onSend={handleSendMessage}
      />

      {/* Error Detail Modal */}
      <ErrorDetailModal
        error={selectedError}
        isOpen={isErrorModalOpen}
        onClose={() => {
          setIsErrorModalOpen(false);
          setSelectedError(null);
        }}
        onAction={(actionType, error) => {
          toast({
            title: "Hành động đã tạo",
            description: `Đã tạo ${actionType} cho lỗi: ${error.tag}`,
            variant: "default"
          });
        }}
      />

      {/* Group Detail Modal */}
      <GroupDetailModal
        group={selectedGroup}
        isOpen={isGroupModalOpen}
        onClose={() => {
          setIsGroupModalOpen(false);
          setSelectedGroup(null);
        }}
        onAction={(actionType, group) => {
          toast({
            title: "Hành động đã tạo",
            description: `Đã tạo ${actionType} cho ${group.name}`,
            variant: "default"
          });
        }}
      />
    </div>
  );
};

export default Index;