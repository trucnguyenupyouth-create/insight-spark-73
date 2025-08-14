// Action Engine - Contains the logic for generating smart action suggestions
// Based on the trigger rules defined in PRD v2.0

export interface TriggerRule {
  id: string;
  condition: string;
  suggestion: string;
  actionType: "class" | "group" | "individual" | "parent";
  priority: number;
  estimatedImpact: "high" | "medium" | "low";
}

export interface ClassData {
  totalStudents: number;
  averageScore: number;
  students: Array<{
    id: string;
    name: string;
    score: number;
    group: string;
    errors: string[];
    previousScores?: number[];
  }>;
  commonErrors: Array<{
    tag: string;
    count: number;
    percentage: number;
  }>;
}

// PRD v2.0 Trigger Rules
export const triggerRules: TriggerRule[] = [
  {
    id: "common_error_30_percent",
    condition: "≥ 30% học sinh toàn lớp mắc cùng 1 lỗi cơ bản",
    suggestion: "Phần lớn lớp đang yếu về {error}. Cân nhắc giảng lại & gửi tài liệu cho cả lớp.",
    actionType: "class",
    priority: 9,
    estimatedImpact: "high"
  },
  {
    id: "high_score_variance",
    condition: "Độ phân hóa điểm của lớp quá cao (dựa trên độ lệch chuẩn)",
    suggestion: "Lớp có sự chênh lệch lớn. Cân nhắc chia nhóm học tập hỗ trợ nhau.",
    actionType: "class",
    priority: 7,
    estimatedImpact: "medium"
  },
  {
    id: "group_specific_error",
    condition: "≥ 40% học sinh trong một nhóm mắc cùng 1 lỗi",
    suggestion: "Nhiều học sinh trong nhóm {group} đang gặp vấn đề với {error}. Gửi bài luyện tập cho nhóm này.",
    actionType: "group",
    priority: 8,
    estimatedImpact: "high"
  },
  {
    id: "at_risk_student",
    condition: "Học sinh có điểm < 4 VÀ lặp lại cùng 1 lỗi ≥ 2 lần",
    suggestion: "{student} có nguy cơ cao. Cần gửi phản hồi chi tiết và thông báo cho phụ huynh.",
    actionType: "individual",
    priority: 10,
    estimatedImpact: "high"
  },
  {
    id: "significant_improvement",
    condition: "Học sinh có tiến bộ vượt bậc (tăng > 2 điểm so với bài trước)",
    suggestion: "{student} đã rất tiến bộ. Gửi lời khen ngợi để động viên em.",
    actionType: "individual",
    priority: 5,
    estimatedImpact: "medium"
  },
  {
    id: "topic_mastery_high",
    condition: "≥ 90% học sinh nắm vững một chủ đề",
    suggestion: "Lớp tiến bộ về {topic}. Có thể nâng cao độ khó bài tập.",
    actionType: "class",
    priority: 4,
    estimatedImpact: "medium"
  }
];

// Calculate standard deviation for score variance
function calculateStandardDeviation(scores: number[]): number {
  const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
  return Math.sqrt(variance);
}

// Group students by performance level
function groupStudents(students: any[]) {
  return {
    "Giỏi": students.filter(s => s.score >= 8),
    "Khá": students.filter(s => s.score >= 6.5 && s.score < 8),
    "TB": students.filter(s => s.score >= 5 && s.score < 6.5),
    "Yếu": students.filter(s => s.score < 5)
  };
}

// Check if a trigger condition is met
function checkTrigger(rule: TriggerRule, data: ClassData): any {
  const { students, commonErrors, totalStudents } = data;
  const groups = groupStudents(students);

  switch (rule.id) {
    case "common_error_30_percent":
      const criticalError = commonErrors.find(error => error.percentage >= 30);
      if (criticalError) {
        return {
          met: true,
          context: { error: criticalError.tag, count: criticalError.count }
        };
      }
      break;

    case "high_score_variance":
      const scores = students.map(s => s.score);
      const stdDev = calculateStandardDeviation(scores);
      if (stdDev > 2.5) { // High variance threshold
        return {
          met: true,
          context: { variance: stdDev.toFixed(2) }
        };
      }
      break;

    case "group_specific_error":
      for (const [groupName, groupStudents] of Object.entries(groups)) {
        if (groupStudents.length === 0) continue;
        
        // Check for common errors within the group
        const errorCounts: Record<string, number> = {};
        groupStudents.forEach(student => {
          student.errors.forEach((error: string) => {
            errorCounts[error] = (errorCounts[error] || 0) + 1;
          });
        });

        for (const [error, count] of Object.entries(errorCounts)) {
          const percentage = (count / groupStudents.length) * 100;
          if (percentage >= 40) {
            return {
              met: true,
              context: { group: groupName, error, count, percentage: percentage.toFixed(0) }
            };
          }
        }
      }
      break;

    case "at_risk_student":
      const atRiskStudents = students.filter(student => {
        // Check if score < 4 and has repeated errors
        if (student.score >= 4) return false;
        
        const errorCounts: Record<string, number> = {};
        student.errors.forEach(error => {
          errorCounts[error] = (errorCounts[error] || 0) + 1;
        });
        
        return Object.values(errorCounts).some(count => count >= 2);
      });

      if (atRiskStudents.length > 0) {
        return {
          met: true,
          context: { students: atRiskStudents, count: atRiskStudents.length }
        };
      }
      break;

    case "significant_improvement":
      const improvedStudents = students.filter(student => {
        if (!student.previousScores || student.previousScores.length === 0) return false;
        const lastScore = student.previousScores[student.previousScores.length - 1];
        return student.score - lastScore > 2;
      });

      if (improvedStudents.length > 0) {
        return {
          met: true,
          context: { students: improvedStudents, count: improvedStudents.length }
        };
      }
      break;

    case "topic_mastery_high":
      // This would need topic-specific data, using a mock for now
      const mockTopicMastery = 95; // 95% mastery rate
      if (mockTopicMastery >= 90) {
        return {
          met: true,
          context: { topic: "Phương trình bậc hai", mastery: mockTopicMastery }
        };
      }
      break;
  }

  return { met: false };
}

// Generate action suggestions based on class data
export function generateActionSuggestions(data: ClassData) {
  const suggestions: any[] = [];

  triggerRules.forEach(rule => {
    const result = checkTrigger(rule, data);
    
    if (result.met) {
      let suggestion = rule.suggestion;
      let affectedCount = 0;
      
      // Replace placeholders with actual data
      if (result.context) {
        Object.entries(result.context).forEach(([key, value]) => {
          suggestion = suggestion.replace(`{${key}}`, String(value));
        });
        
        // Calculate affected count
        if (result.context.count) {
          affectedCount = result.context.count;
        } else if (result.context.students) {
          affectedCount = result.context.students.length;
        }
      }

      suggestions.push({
        id: `${rule.id}_${Date.now()}`,
        type: rule.actionType === "class" ? "important" : 
              rule.actionType === "individual" ? "urgent" : "improvement",
        title: suggestion.split('.')[0], // First sentence as title
        description: suggestion,
        action: getActionLabel(rule.actionType),
        icon: getActionIcon(rule.actionType),
        priority: rule.priority,
        triggerRule: rule.id,
        affectedCount,
        estimatedImpact: rule.estimatedImpact,
        autoGenerated: true
      });
    }
  });

  return suggestions.sort((a, b) => b.priority - a.priority);
}

function getActionLabel(actionType: string): string {
  switch (actionType) {
    case "class": return "Thông báo lớp";
    case "group": return "Can thiệp nhóm";
    case "individual": return "Phản hồi cá nhân";
    case "parent": return "Liên hệ phụ huynh";
    default: return "Thực hiện";
  }
}

function getActionIcon(actionType: string): string {
  switch (actionType) {
    case "class": return "book";
    case "group": return "users";
    case "individual": return "alert";
    case "parent": return "trend";
    default: return "book";
  }
}

// Mock data for testing
export const mockClassData: ClassData = {
  totalStudents: 40,
  averageScore: 7.2,
  students: [
    {
      id: "1",
      name: "Nguyễn Văn An",
      score: 9.5,
      group: "Giỏi",
      errors: [],
      previousScores: [7.0, 8.2]
    },
    {
      id: "2",
      name: "Trần Thị Bình",
      score: 8.8,
      group: "Giỏi",
      errors: ["Không tách nhân tử"],
      previousScores: [8.5, 8.6]
    },
    {
      id: "3",
      name: "Lê Văn Cường",
      score: 7.5,
      group: "Khá",
      errors: ["Sai dấu khi chuyển vế"],
      previousScores: [7.2, 7.3]
    },
    {
      id: "4",
      name: "Phạm Thị Dung",
      score: 3.2,
      group: "Yếu",
      errors: ["Nhầm chân đối/chân kề", "Nhầm chân đối/chân kề", "Quên đổi đơn vị"],
      previousScores: [4.1, 3.8]
    },
    {
      id: "5",
      name: "Hoàng Văn Em",
      score: 2.8,
      group: "Yếu",
      errors: ["Nhầm chân đối/chân kề", "Sai công thức", "Sai công thức"],
      previousScores: [3.2, 2.9]
    }
  ],
  commonErrors: [
    { tag: "Nhầm chân đối/chân kề", count: 15, percentage: 37.5 },
    { tag: "Sai dấu khi chuyển vế", count: 8, percentage: 20 },
    { tag: "Quên đổi đơn vị", count: 6, percentage: 15 }
  ]
};