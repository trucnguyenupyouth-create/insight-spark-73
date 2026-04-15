import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { ErrorAnalysis } from "@/components/ErrorAnalysis";
import { GroupAnalysis } from "@/components/GroupAnalysis";
import { AssistantWelcome } from "@/components/AssistantWelcome";
import { ActionComposer } from "@/components/ActionComposer";
import { ActionTracker } from "@/components/ActionTracker";
import { ErrorDetailModal } from "@/components/ErrorDetailModal";
import { GroupDetailModal } from "@/components/GroupDetailModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  BarChart3, 
  Settings, 
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateActionSuggestions, mockClassData } from "@/utils/actionEngine";
import { classMetrics, commonErrors, studentGroups, sentActions, studentProgress } from "@/data/examData";
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

  // Generate smart suggestions using the action engine
  const suggestions = generateActionSuggestions(mockClassData);

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
    <DashboardLayout>
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-border/50">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-1">
            <span>Các lớp học</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-foreground">Lớp 9A2</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            Bảng phân tích lớp học
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs font-bold px-3">
              Môn Toán - Học kỳ 2
            </Badge>
            <span className="text-xs text-muted-foreground">Cập nhật: 15/04/2026</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 text-xs font-bold border-border shadow-sm">
            <Settings className="w-4 h-4 mr-2" />
            Cấu hình
          </Button>
          <Button variant="default" size="sm" className="h-10 text-xs font-bold bg-primary shadow-lg shadow-primary/20">
            <BookOpen className="w-4 h-4 mr-2" />
            Tạo bài mới
          </Button>
        </div>
      </div>

      {/* Assistant Intelligence Center */}
      <AssistantWelcome 
        suggestions={suggestions} 
        insight="Để khắc phục việc học sinh mất điểm oan do nhầm lẫn cơ bản (sai công thức, nhầm Ω) và trình bày ẩu (quên ĐKXĐ, chứng minh tắt), thầy cô nên dành một tiết thực hành chuyên sâu rèn lại kỹ năng làm bài."
        onActionClick={handleActionClick}
        onComposeAction={handleComposeAction}
      />

      {/* Class Overview Metrics */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight flex items-center">
            <BarChart3 className="w-5 h-5 mr-3 text-primary" />
            Tổng quan lớp
          </h2>
          <Button variant="link" size="sm" className="text-primary font-bold">
            Xem báo cáo chi tiết <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <MetricCard
            title="Sĩ số"
            value={classMetrics.totalStudents}
            subtitle="Tổng số học sinh"
            variant="default"
          />
          <MetricCard
            title="Điểm trung bình"
            value={classMetrics.averageScore}
            subtitle="Tăng 0.3đ so với bài trước"
            trend="up"
            variant="success"
          />
          <MetricCard
            title="Thành tích cao"
            value={classMetrics.highestScore}
            subtitle="Điểm tối đa"
            variant="success"
          />
          <MetricCard
            title="Cần hỗ trợ"
            value={classMetrics.lowestScore}
            subtitle="Mức điểm rủi ro"
            variant="danger"
          />
          <MetricCard
            title="Tỷ lệ làm bài"
            value={`${classMetrics.attendanceRate}%`}
            subtitle="Học sinh đã nộp"
            variant="success"
          />
        </div>
      </div>

      {/* Row 2: Logic Blockers - FULL WIDTH */}
      <div className="mt-12 overflow-hidden">
        <ErrorAnalysis 
          errors={commonErrors} 
          totalStudents={classMetrics.totalStudents}
          onErrorClick={handleErrorClick}
        />
      </div>

      {/* Row 3: Action Tracking & Student Groups - SYMMETRICAL 6:6 */}
      <div className="mt-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Student Groups & Can thiệp */}
          <div className="lg:col-span-6">
            <GroupAnalysis 
              groups={studentGroups}
              totalStudents={classMetrics.totalStudents}
              onGroupClick={handleGroupClick}
            />
          </div>

          {/* Action Tracking */}
          <div className="lg:col-span-6">
            <ActionTracker
              sentActions={sentActions}
              studentProgress={studentProgress}
              onRevoke={handleRevokeAction}
              onViewDetails={(id) => toast({ title: "Chi tiết", description: `Xem chi tiết hành động ${id}` })}
              className="h-full"
            />
          </div>
        </div>
      </div>

      {/* Modals & Composer */}
      <ActionComposer
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        recipients={composerRecipients}
        context={selectedSuggestion?.context}
        onSend={handleSendMessage}
      />

      <ErrorDetailModal
        error={selectedError}
        isOpen={isErrorModalOpen}
        onClose={() => {
          setIsErrorModalOpen(false);
          setSelectedError(null);
        }}
        onAction={(actionType, error) => {
          toast({
            title: "Đã tạo can thiệp",
            description: `Loại: ${actionType} cho lỗi logic`,
            variant: "default"
          });
        }}
      />

      <GroupDetailModal
        group={selectedGroup}
        isOpen={isGroupModalOpen}
        onClose={() => {
          setIsGroupModalOpen(false);
          setSelectedGroup(null);
        }}
        onAction={(actionType, group) => {
          toast({
            title: "Hành động nhóm",
            description: `Gửi tiếp cận ${actionType} cho ${group.name}`,
            variant: "default"
          });
        }}
      />
    </DashboardLayout>
  );
};

export default Index;
