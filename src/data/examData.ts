export const classMetrics = {
  totalStudents: 17,
  averageScore: 5.3,
  highestScore: 9.65,
  lowestScore: 0,
  attendanceRate: 100
};

export const students = [
  {
    id: "1",
    name: "Hải An",
    score: 7.9,
    riskScore: 21,
    progress: 0,
    group: "Khá" as const,
    studentId: "HS1025",
    averageScore: 7.9,
    scoreHistory: [{ test: "GK2", score: 7.9 }],
    riskBreakdown: { averageScore: 7.9, severity: 21, trend: 0, total: 21 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "2",
    name: "Ngô Tuấn Anh",
    score: 8.9,
    riskScore: 11,
    progress: 0,
    group: "Giỏi" as const,
    studentId: "HS1027",
    averageScore: 8.9,
    scoreHistory: [{ test: "GK2", score: 8.9 }],
    riskBreakdown: { averageScore: 8.9, severity: 11, trend: 0, total: 11 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "3",
    name: "Diễm My",
    score: 3.85,
    riskScore: 62,
    progress: 0,
    group: "Yếu" as const,
    studentId: "HS1030",
    averageScore: 3.85,
    scoreHistory: [{ test: "GK2", score: 3.85 }],
    riskBreakdown: { averageScore: 3.85, severity: 62, trend: 0, total: 62 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "4",
    name: "Nguyễn Kim Khánh",
    score: 1.5,
    riskScore: 85,
    progress: 0,
    group: "Yếu" as const,
    studentId: "HS1028",
    averageScore: 1.5,
    scoreHistory: [{ test: "GK2", score: 1.5 }],
    riskBreakdown: { averageScore: 1.5, severity: 85, trend: 0, total: 85 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "5",
    name: "Đặng Minh Sơn",
    score: 9.65,
    riskScore: 4,
    progress: 0,
    group: "Giỏi" as const,
    studentId: "HS1032",
    averageScore: 9.65,
    scoreHistory: [{ test: "GK2", score: 9.65 }],
    riskBreakdown: { averageScore: 9.65, severity: 4, trend: 0, total: 4 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "6",
    name: "Trúc Anh",
    score: 4.75,
    riskScore: 53,
    progress: 0,
    group: "Yếu" as const,
    studentId: "HS1031",
    averageScore: 4.75,
    scoreHistory: [{ test: "GK2", score: 4.75 }],
    riskBreakdown: { averageScore: 4.75, severity: 53, trend: 0, total: 53 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "7",
    name: "Trần Lý Quân",
    score: 0,
    riskScore: 100,
    progress: 0,
    group: "Yếu" as const,
    studentId: "HS1026",
    averageScore: 0,
    scoreHistory: [{ test: "GK2", score: 0 }],
    riskBreakdown: { averageScore: 0, severity: 100, trend: 0, total: 100 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "8",
    name: "Nguyễn Minh Hường",
    score: 1.25,
    riskScore: 88,
    progress: 0,
    group: "Yếu" as const,
    studentId: "HS1029",
    averageScore: 1.25,
    scoreHistory: [{ test: "GK2", score: 1.25 }],
    riskBreakdown: { averageScore: 1.25, severity: 88, trend: 0, total: 88 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "9",
    name: "Hoàng Phương Nhi",
    score: 1.9,
    riskScore: 81,
    progress: 0,
    group: "Yếu" as const,
    studentId: "HS1023",
    averageScore: 1.9,
    scoreHistory: [{ test: "GK2", score: 1.9 }],
    riskBreakdown: { averageScore: 1.9, severity: 81, trend: 0, total: 81 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "10",
    name: "Nguyễn Phương Linh",
    score: 8.0,
    riskScore: 20,
    progress: 0,
    group: "Giỏi" as const,
    studentId: "HS1016",
    averageScore: 8.0,
    scoreHistory: [{ test: "GK2", score: 8.0 }],
    riskBreakdown: { averageScore: 8.0, severity: 20, trend: 0, total: 20 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "11",
    name: "Ngọc Diệp",
    score: 4.65,
    riskScore: 54,
    progress: 0,
    group: "Yếu" as const,
    studentId: "HS1018",
    averageScore: 4.65,
    scoreHistory: [{ test: "GK2", score: 4.65 }],
    riskBreakdown: { averageScore: 4.65, severity: 54, trend: 0, total: 54 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "12",
    name: "Nguyễn Hoàng Mai",
    score: 7.25,
    riskScore: 28,
    progress: 0,
    group: "Khá" as const,
    studentId: "HS1020",
    averageScore: 7.25,
    scoreHistory: [{ test: "GK2", score: 7.25 }],
    riskBreakdown: { averageScore: 7.25, severity: 28, trend: 0, total: 28 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "13",
    name: "Nguyễn Đức Tuấn",
    score: 5.4,
    riskScore: 46,
    progress: 0,
    group: "TB" as const,
    studentId: "HS1022",
    averageScore: 5.4,
    scoreHistory: [{ test: "GK2", score: 5.4 }],
    riskBreakdown: { averageScore: 5.4, severity: 46, trend: 0, total: 46 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "14",
    name: "Nguyễn Thục Quyên",
    score: 5.35,
    riskScore: 47,
    progress: 0,
    group: "TB" as const,
    studentId: "HS1017",
    averageScore: 5.35,
    scoreHistory: [{ test: "GK2", score: 5.35 }],
    riskBreakdown: { averageScore: 5.35, severity: 47, trend: 0, total: 47 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "15",
    name: "Hiếu Nhân",
    score: 9.25,
    riskScore: 8,
    progress: 0,
    group: "Giỏi" as const,
    studentId: "HS1019",
    averageScore: 9.25,
    scoreHistory: [{ test: "GK2", score: 9.25 }],
    riskBreakdown: { averageScore: 9.25, severity: 8, trend: 0, total: 8 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "16",
    name: "Nguyễn Công Minh",
    score: 4.55,
    riskScore: 55,
    progress: 0,
    group: "Yếu" as const,
    studentId: "HS1021",
    averageScore: 4.55,
    scoreHistory: [{ test: "GK2", score: 4.55 }],
    riskBreakdown: { averageScore: 4.55, severity: 55, trend: 0, total: 55 },
    questionResults: [],
    progressSteps: []
  },
  {
    id: "17",
    name: "Nguyễn Cảnh Vân",
    score: 5.9,
    riskScore: 41,
    progress: 0,
    group: "TB" as const,
    studentId: "HS1024",
    averageScore: 5.9,
    scoreHistory: [{ test: "GK2", score: 5.9 }],
    riskBreakdown: { averageScore: 5.9, severity: 41, trend: 0, total: 41 },
    questionResults: [],
    progressSteps: []
  },
];

export const commonErrors = [
  {
    id: "ERR_002",
    tag: "Viết sai Không gian mẫu",
    count: 10,
    percentage: 59,
    severity: "high" as const,
    rootCause: "Học sinh không phân biệt được 'Không gian mẫu' (tập hợp có {}) và 'Số phần tử không gian mẫu' (con số). Viết n(Ω)=12 thay vì liệt kê Ω={1,2,...,12}.",
    example: "Viết n(Ω) = 12 thay vì Ω = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}.",
    affectedStudents: ["Nguyễn Minh Hường", "Nguyễn Kim Khánh", "Diễm My", "Nguyễn Công Minh", "Ngọc Diệp", "Trúc Anh", "Nguyễn Đức Tuấn", "Nguyễn Cảnh Vân", "Hải An", "Nguyễn Phương Linh"],
    questionIds: ["1.2a"]
  },
  {
    id: "ERR_004",
    tag: "Thiếu kiểm tra ĐKXĐ",
    count: 7,
    percentage: 41,
    severity: "medium" as const,
    rootCause: "Học sinh tính đúng kết quả nhưng bỏ qua hoàn toàn bước đối chiếu điều kiện xác định — lỗi mất điểm oan đặc biệt ở nhóm TB-Giỏi.",
    example: "Câu 3.0a: Thay x=16 vào tính kết quả nhưng không ghi '(Thỏa mãn ĐKXĐ)'.",
    affectedStudents: ["Nguyễn Minh Hường", "Nguyễn Công Minh", "Nguyễn Đức Tuấn", "Nguyễn Cảnh Vân", "Nguyễn Hoàng Mai", "Ngô Tuấn Anh", "Hiếu Nhân"],
    questionIds: ["3.0a"]
  },
  {
    id: "ERR_005",
    tag: "Chứng minh P>1 chưa hoàn thiện",
    count: 7,
    percentage: 41,
    severity: "high" as const,
    rootCause: "Học sinh rút gọn được biểu thức nhưng không có tư duy 'Xét hiệu' để chứng minh BĐT — thiếu bước A-B rồi xét dấu.",
    example: "Câu 3.0c: Rút gọn P = (√x+1)/√x thành công nhưng kết luận bừa P>1 mà không chứng minh.",
    affectedStudents: ["Nguyễn Minh Hường", "Nguyễn Kim Khánh", "Diễm My", "Ngọc Diệp", "Trúc Anh", "Nguyễn Thục Quyên", "Nguyễn Hoàng Mai"],
    questionIds: ["3.0c"]
  },
  {
    id: "ERR_006",
    tag: "Sai công thức chu vi hình tròn",
    count: 6,
    percentage: 35,
    severity: "high" as const,
    rootCause: "Học sinh lẫn lộn công thức Chu vi (2πr) và Diện tích (πr²) — hổng kiến thức gốc do trí nhớ.",
    example: "Câu 4.1a: Dùng S=πr² để tính chu vi, hoặc tính C=πr (quên nhân 2).",
    affectedStudents: ["Hoàng Phương Nhi", "Nguyễn Công Minh", "Trúc Anh", "Nguyễn Đức Tuấn", "Nguyễn Hoàng Mai", "Nguyễn Phương Linh"],
    questionIds: ["4.1a"]
  },
  {
    id: "ERR_001",
    tag: "Nhầm Tần số & Tần suất",
    count: 5,
    percentage: 29,
    severity: "medium" as const,
    rootCause: "Học sinh gộp chung định nghĩa Tần số (số đếm) và Tần suất (tỉ lệ %). Tính 15/60=25% thay vì chỉ viết số 15.",
    example: "Câu 1.1a: Viết 15/60 = 25% thay vì chỉ viết con số đếm 15.",
    affectedStudents: ["Hoàng Phương Nhi", "Nguyễn Công Minh", "Nguyễn Đức Tuấn", "Hải An", "Đặng Minh Sơn"],
    questionIds: ["1.1a", "1.1b"]
  }
];

export const studentGroups = [
  {
    id: "1",
    name: "Nhóm Giỏi",
    level: "Giỏi" as const,
    count: 4,
    percentage: 23.5,
    averageScore: 8.9,
    commonErrors: [],
    knowledgeGaps: [],
    riskLevel: "low" as const
  },
  {
    id: "2",
    name: "Nhóm Khá",
    level: "Khá" as const,
    count: 2,
    percentage: 11.8,
    averageScore: 7.6,
    commonErrors: [],
    knowledgeGaps: [],
    riskLevel: "low" as const
  },
  {
    id: "3",
    name: "Nhóm TB",
    level: "TB" as const,
    count: 3,
    percentage: 17.6,
    averageScore: 5.5,
    commonErrors: [],
    knowledgeGaps: [],
    riskLevel: "medium" as const
  },
  {
    id: "4",
    name: "Nhóm Yếu",
    level: "Yếu" as const,
    count: 8,
    percentage: 47.1,
    averageScore: 2.8,
    commonErrors: [],
    knowledgeGaps: [],
    riskLevel: "high" as const
  },
];

import { realTopics } from "./exam177Topics";
export const mockTopics = realTopics;

export const sentActions = [
  {
    id: "1",
    type: "class" as const,
    subject: "Thông báo: Nhầm Tần số & Tần suất",
    content: "Cô thấy nhiều bạn lớp mình vẫn nhầm số đếm với tỷ lệ phần trăm...",
    recipients: ["all"],
    recipientNames: ["Cả lớp 9A2"],
    sentAt: "2026-04-14T08:30:00Z",
    status: "delivered" as const,
    canRevoke: true
  },
  {
    id: "2",
    type: "parent" as const,
    subject: "Cập nhật học tập của Trúc Anh",
    content: "Xin chào phụ huynh, Trúc Anh đang gặp khó khăn ở các câu hình học và khái niệm số nguyên tố...",
    recipients: ["parent_1031"],
    recipientNames: ["Phụ huynh Trúc Anh"],
    sentAt: "2026-04-14T10:15:00Z",
    status: "read" as const,
    canRevoke: false
  }
];

export const studentProgress = [
  {
    studentId: "HS1031",
    studentName: "Trúc Anh",
    assignedTasks: [
      {
        id: "1",
        title: "Ôn tập lại Số nguyên tố",
        status: "in_progress" as const,
        assignedAt: "2026-04-14T10:00:00Z"
      }
    ]
  },
  {
    studentId: "HS1030",
    studentName: "Diễm My",
    assignedTasks: [
      {
        id: "2",
        title: "Luyện cách trình bày Hình học",
        status: "pending" as const,
        assignedAt: "2026-04-14T10:30:00Z"
      }
    ]
  }
];

export const exam177ClassData = {
  totalStudents: 17,
  averageScore: 5.3,
  students: [
    {
      id: "1",
      name: "Hải An",
      score: 7.9,
      group: "Khá",
      errors: ["Nhầm Tần số & Tần suất", "Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [6.4, 7.9]
    },
    {
      id: "2",
      name: "Ngô Tuấn Anh",
      score: 8.9,
      group: "Giỏi",
      errors: [],
      previousScores: [7.4, 8.9]
    },
    {
      id: "3",
      name: "Diễm My",
      score: 3.85,
      group: "Yếu",
      errors: ["Ngộ nhận & Bỏ dở Chứng minh", "Ngộ nhận & Bỏ dở Chứng minh", "Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [2.35, 3.85]
    },
    {
      id: "4",
      name: "Nguyễn Kim Khánh",
      score: 1.5,
      group: "Yếu",
      errors: ["Ngộ nhận & Bỏ dở Chứng minh", "Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [0, 1.5]
    },
    {
      id: "5",
      name: "Đặng Minh Sơn",
      score: 9.65,
      group: "Giỏi",
      errors: ["Nhầm Tần số & Tần suất", "Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [8.15, 9.65]
    },
    {
      id: "6",
      name: "Trúc Anh",
      score: 4.75,
      group: "Yếu",
      errors: ["Hổng kiến thức Số nguyên tố", "Hổng kiến thức Số nguyên tố", "Ngộ nhận & Bỏ dở Chứng minh", "Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [3.25, 4.75]
    },
    {
      id: "7",
      name: "Trần Lý Quân",
      score: 0,
      group: "Yếu",
      errors: [],
      previousScores: [0, 0]
    },
    {
      id: "8",
      name: "Nguyễn Minh Hường",
      score: 1.25,
      group: "Yếu",
      errors: ["Hổng kiến thức Số nguyên tố", "Ngộ nhận & Bỏ dở Chứng minh", "Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [0, 1.25]
    },
    {
      id: "9",
      name: "Hoàng Phương Nhi",
      score: 1.9,
      group: "Yếu",
      errors: ["Hổng kiến thức Số nguyên tố", "Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [0.3999999999999999, 1.9]
    },
    {
      id: "10",
      name: "Nguyễn Phương Linh",
      score: 8.0,
      group: "Giỏi",
      errors: ["Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [6.5, 8.0]
    },
    {
      id: "11",
      name: "Ngọc Diệp",
      score: 4.65,
      group: "Yếu",
      errors: ["Hổng kiến thức Số nguyên tố", "Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [3.1500000000000004, 4.65]
    },
    {
      id: "12",
      name: "Nguyễn Hoàng Mai",
      score: 7.25,
      group: "Khá",
      errors: ["Hổng kiến thức Số nguyên tố", "Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [5.75, 7.25]
    },
    {
      id: "13",
      name: "Nguyễn Đức Tuấn",
      score: 5.4,
      group: "TB",
      errors: ["Nhầm Tần số & Tần suất", "Hổng kiến thức Số nguyên tố", "Ngộ nhận & Bỏ dở Chứng minh", "Ngộ nhận & Bỏ dở Chứng minh", "Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [3.9000000000000004, 5.4]
    },
    {
      id: "14",
      name: "Nguyễn Thục Quyên",
      score: 5.35,
      group: "TB",
      errors: ["Hổng kiến thức Số nguyên tố", "Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [3.8499999999999996, 5.35]
    },
    {
      id: "15",
      name: "Hiếu Nhân",
      score: 9.25,
      group: "Giỏi",
      errors: ["Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [7.75, 9.25]
    },
    {
      id: "16",
      name: "Nguyễn Công Minh",
      score: 4.55,
      group: "Yếu",
      errors: ["Ngộ nhận & Bỏ dở Chứng minh", "Ngộ nhận & Bỏ dở Chứng minh", "Ngộ nhận & Bỏ dở Chứng minh", "Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [3.05, 4.55]
    },
    {
      id: "17",
      name: "Nguyễn Cảnh Vân",
      score: 5.9,
      group: "TB",
      errors: ["Hổng kiến thức Số nguyên tố", "Ngộ nhận & Bỏ dở Chứng minh"],
      previousScores: [4.4, 5.9]
    }
  ],
  commonErrors: [
    { tag: "Nhầm Tần số & Tần suất", count: 8, percentage: 47 },
    { tag: "Hổng kiến thức Số nguyên tố", count: 6, percentage: 35 },
    { tag: "Ngộ nhận & Bỏ dở Chứng minh", count: 5, percentage: 29 }
  ]
};
