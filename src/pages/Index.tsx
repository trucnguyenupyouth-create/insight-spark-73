import { MetricCard } from "@/components/MetricCard";
import { StudentTable } from "@/components/StudentTable";
import { TopicChart } from "@/components/TopicChart";
import { ActionSuggestions } from "@/components/ActionSuggestions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, GraduationCap, BookOpen, Settings } from "lucide-react";

const Index = () => {
  // Mock data - in a real app, this would come from an API
  const classMetrics = {
    totalStudents: 40,
    averageScore: 7.2,
    highestScore: 9.8,
    lowestScore: 3.2,
    attendanceRate: 95
  };

  const students = [
    { id: "1", name: "Nguyễn Văn An", score: 9.5, riskScore: 10, progress: +1.2, group: "Giỏi" as const },
    { id: "2", name: "Trần Thị Bình", score: 8.8, riskScore: 15, progress: +0.8, group: "Giỏi" as const },
    { id: "3", name: "Lê Văn Cường", score: 7.5, riskScore: 25, progress: +0.3, group: "Khá" as const },
    { id: "4", name: "Phạm Thị Dung", score: 6.2, riskScore: 45, progress: -0.5, group: "TB" as const },
    { id: "5", name: "Hoàng Văn Em", score: 4.8, riskScore: 75, progress: -1.2, group: "Yếu" as const },
    { id: "6", name: "Đặng Thị Phượng", score: 3.2, riskScore: 85, progress: -0.8, group: "Yếu" as const },
  ];

  const topics = [
    { name: "Phương trình bậc hai", masteryRate: 95, difficulty: "Trung bình" as const },
    { name: "Hệ phương trình", masteryRate: 82, difficulty: "Khó" as const },
    { name: "Bất đẳng thức", masteryRate: 45, difficulty: "Khó" as const },
    { name: "Hình học không gian", masteryRate: 38, difficulty: "Khó" as const },
    { name: "Đại số cơ bản", masteryRate: 88, difficulty: "Dễ" as const },
  ];

  const suggestions = [
    {
      id: "1",
      type: "urgent" as const,
      title: "Lớp học yếu về Hình học không gian",
      description: "38% học sinh nắm vững - cần giảng dạy lại lý thuyết cơ bản",
      action: "Gửi tài liệu hình học",
      icon: "alert" as const
    },
    {
      id: "2", 
      type: "important" as const,
      title: "6 học sinh có nguy cơ học yếu",
      description: "Risk score > 70% - cần can thiệp hỗ trợ cá nhân",
      action: "Tạo kế hoạch hỗ trợ",
      icon: "users" as const
    },
    {
      id: "3",
      type: "improvement" as const,
      title: "Lớp tiến bộ về Phương trình bậc hai",
      description: "95% nắm vững - có thể nâng cao độ khó bài tập",
      action: "Giao bài tập nâng cao",
      icon: "trend" as const
    }
  ];

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
            {/* Student Rankings */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Bảng xếp hạng học sinh
              </h2>
              <StudentTable students={students} />
            </div>

            {/* Topic Analysis */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Phân tích theo chủ đề
              </h2>
              <TopicChart topics={topics} />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary" />
              Hành động đề xuất
            </h2>
            <ActionSuggestions suggestions={suggestions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;