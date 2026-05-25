import { useState, useEffect } from "react";
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
  Loader2,
  RefreshCw,
  ArrowLeft
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useExamAnalytics } from "@/hooks/useExamAnalytics";

const DashboardPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const examId = parseInt(id || '0', 10);
  
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);
  const [composerRecipients, setComposerRecipients] = useState<any[]>([]);
  const [selectedError, setSelectedError] = useState<any>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const { toast } = useToast();

  // Live analytics data from the backend — loads from cache only on mount
  const { data: analyticsData, loading, error: apiError, loadCached, refresh } = useExamAnalytics(examId);

  // Auto-load cached data on mount — does NOT trigger AI computation
  useEffect(() => {
    if (examId) loadCached();
  }, [examId]);

  // Use live data, or empty defaults while loading
  const examMeta = analyticsData?.examMeta ?? { name: "Đang tải...", grade_level: 0, topic: "N/A", computed_at: "" };
  const classMetrics = analyticsData?.classMetrics ?? { totalStudents: 0, averageScore: 0, highestScore: 0, lowestScore: 0, attendanceRate: 0 };
  const commonErrors = analyticsData?.commonErrors ?? [];
  const studentGroups = analyticsData?.studentGroups ?? [];
  const errorDetailMap = analyticsData?.errorDetailMap ?? {};
  const groupDetailMap = analyticsData?.groupDetailMap ?? {};

  // Extract aiInsights from live API data
  const aiInsights = analyticsData?.aiInsights;

  // Build the urgent action suggestion for AssistantWelcome
  const urgentSuggestion = aiInsights?.urgentAction ? {
    id: "ai_urgent_action",
    type: "urgent" as const,
    title: aiInsights.urgentAction.title,
    description: aiInsights.urgentAction.description,
    action: "Phản hồi cá nhân",
    priority: 10
  } : null;
  const suggestions = urgentSuggestion ? [urgentSuggestion] : [];

  // Use aiInsights.suggestedActions for ActionTracker ("Theo dõi hành động")
  const suggestedActions = aiInsights?.suggestedActions ?? [];

  // Event handlers
  const handleErrorClick = (error: any) => {
    // Merge base error with deep data from errorDetailMap
    const detailedError = errorDetailMap[error.id] || { fullDescription: error.tag, commonMistakes: [], affectedStudents: [] };
    setSelectedError({ ...error, ...detailedError });
    setIsErrorModalOpen(true);
  };

  const handleGroupClick = (group: any) => {
    // Look up real group details from map
    const detailedGroup = groupDetailMap[group.level] || groupDetailMap[group.name] || { commonWeaknesses: [], commonErrors: [], interventionPlan: { immediate: [], longTerm: [] } };
    setSelectedGroup({ ...group, ...detailedGroup });
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
    let recipients: any[] = [];
    if (suggestion.triggerRule === "common_error_30_percent") {
      recipients = [{ id: "all", name: `Cả lớp`, type: "class" }];
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
      {/* Back button */}
      <div className="mb-4">
        <button 
          onClick={() => navigate('/exams')}
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Quay lại danh sách
        </button>
      </div>

      {/* Loading / Error Banner */}
      {loading && (
        <div className="flex items-center justify-center gap-2 py-3 mb-4 bg-primary/5 rounded-xl text-sm text-primary font-medium">
          <Loader2 className="w-4 h-4 animate-spin" />
          Đang tải dữ liệu từ máy chủ...
        </div>
      )}
      {apiError && (
        <div className="py-2 px-4 mb-4 bg-destructive/10 text-destructive rounded-xl text-sm">
          ⚠️ Không thể kết nối API: {apiError}
        </div>
      )}

      {/* Not-computed empty state — shown when no cache exists yet */}
      {!loading && analyticsData && (analyticsData as any).status === 'not_computed' && (
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
          <div className="w-20 h-20 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center">
            <BarChart3 className="w-10 h-10 text-primary/40" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight">Chưa có phân tích AI</h2>
            <p className="text-muted-foreground max-w-sm">
              Bài thi <strong>{(analyticsData as any).examMeta?.name || `#${examId}`}</strong> chưa được phân tích. Nhấn nút bên dưới để bắt đầu.
            </p>
          </div>
          <Button
            size="lg"
            onClick={refresh}
            disabled={loading}
            className="bg-primary shadow-lg shadow-primary/20 font-bold"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Chạy phân tích AI ngay
          </Button>
          <p className="text-xs text-muted-foreground">Thời gian xử lý khoảng 1–2 phút</p>
        </div>
      )}

      {/* Main dashboard content — only shown when analytics cache exists */}
      {analyticsData && (analyticsData as any).status !== 'not_computed' && (
        <>
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-border/50">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-1">
            <span>Báo cáo kiểm tra</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-foreground">{examMeta.name}</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            Bảng phân tích bài kiểm tra
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs font-bold px-3">
              Lớp {examMeta.grade_level} - {examMeta.topic || "Không rõ"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Cập nhật: {examMeta.computed_at ? new Date(examMeta.computed_at).toLocaleString('vi-VN') : 'Đang xử lý...'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refresh}
            disabled={loading}
            className="h-10 text-xs font-bold border-border shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Làm mới (AI)
          </Button>
          <Button variant="default" size="sm" className="h-10 text-xs font-bold bg-primary shadow-lg shadow-primary/20">
            <BookOpen className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Assistant Intelligence Center */}
      <AssistantWelcome 
        suggestions={suggestions} 
        insight={aiInsights?.overviewInsight || (commonErrors.length > 0 ? `AI đã phát hiện ${commonErrors.length} mẫu lỗi sai phổ biến. Nhóm Yếu đang gặp khó khăn với các khái niệm căn bản.` : undefined)}
        onActionClick={handleActionClick}
        onComposeAction={handleComposeAction}
      />

      {/* Class Overview Metrics */}
      <div className="mb-12 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight flex items-center">
            <BarChart3 className="w-5 h-5 mr-3 text-primary" />
            Tổng quan lớp
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <MetricCard title="Sĩ số" value={classMetrics.totalStudents} subtitle="Tổng số bài nộp" variant="default" />
          <MetricCard title="Điểm trung bình" value={classMetrics.averageScore} subtitle="Trên thang 10" variant="success" />
          <MetricCard title="Thành tích cao" value={classMetrics.highestScore} subtitle="Điểm tối đa" variant="success" />
          <MetricCard title="Cần hỗ trợ" value={classMetrics.lowestScore} subtitle="Mức điểm thấp nhất" variant="danger" />
          <MetricCard title="Tỷ lệ làm bài" value={`${classMetrics.attendanceRate}%`} subtitle="Học sinh đã nộp" variant="success" />
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
              sentActions={suggestedActions as any[]}
              studentProgress={[]}
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

      {selectedError && (
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
      )}

      {selectedGroup && (
        <GroupDetailModal
          group={selectedGroup}
          allStudents={analyticsData?.students || []}
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
      )}
        </>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
