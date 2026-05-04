export const exam177DeepData = {
  "_meta": {
    "exam": "Đề GK2 Nguyễn Bỉnh Khiêm – Lớp 9A2",
    "examId": 177,
    "totalStudents": 17,
    "averageScore": 5.297,
    "highestScore": 9.65,
    "lowestScore": 0.0,
    "dataFlaws": [
      "max_score=0.0 for all questions in exam_177_data.json – used max observed scores as fallback",
      "progress and scoreHistory contain only 1 data point (no prior exam data available)",
      "progressSteps (KST) not available in source data",
      "Trần Lý Quân (ID 1026): score=0 with no question-level detail in MD report"
    ],
    "maxScoresUsed": {
      "1.1a": 1.0,
      "1.1b": 1.0,
      "1.2a": 0.5,
      "1.2b": 1.0,
      "1.2c": 1.0,
      "2.0": 1.0,
      "3.0a": 0.5,
      "3.0b": 1.0,
      "3.0c": 0.5,
      "4.1a": 0.5,
      "4.1b": 0.5,
      "4.2a": 1.0,
      "4.2b": 1.0,
      "4.2c": 1.0,
      "5.0": 0.5
    }
  },
  "errorDetailMap": {
  "ERR_002": {
    "fullDescription": "Đề bài yêu cầu: Viết tập hợp không gian mẫu Ω (liệt kê các kết quả có thể xảy ra).\n- Học sinh làm: Không liệt kê, ghi thẳng con số n(Ω) = 12.\n- Tắc ở bước: Sai thuật ngữ. Các con không phân biệt được 'Không gian mẫu' (là tập hợp phải có {}) và 'Số phần tử' (là một con số).",
    "commonMistakes": [
      "Viết n(Ω) = 12 thay vì liệt kê Ω = {1, 2, 3, ..., 12}",
      "Bỏ ngoặc nhọn của tập hợp"
    ],
    "affectedStudents": [
      { "id": "1029", "name": "Nguyễn Minh Hường", "group": "Yếu", "score": 1.25, "errors": ["1.2a"] },
      { "id": "1028", "name": "Nguyễn Kim Khánh", "group": "Yếu", "score": 1.5, "errors": ["1.2a"] },
      { "id": "1030", "name": "Diễm My", "group": "Yếu", "score": 3.85, "errors": ["1.2a"] },
      { "id": "1021", "name": "Nguyễn Công Minh", "group": "Yếu", "score": 4.55, "errors": ["1.2a"] },
      { "id": "1018", "name": "Ngọc Diệp", "group": "Yếu", "score": 4.65, "errors": ["1.2a"] },
      { "id": "1031", "name": "Trúc Anh", "group": "Yếu", "score": 4.75, "errors": ["1.2a"] },
      { "id": "1022", "name": "Nguyễn Đức Tuấn", "group": "TB", "score": 5.4, "errors": ["1.2a"] },
      { "id": "1024", "name": "Nguyễn Cảnh Vân", "group": "TB", "score": 5.9, "errors": ["1.2a"] },
      { "id": "1025", "name": "Hải An", "group": "Khá", "score": 7.9, "errors": ["1.2a"] },
      { "id": "1016", "name": "Nguyễn Phương Linh", "group": "Giỏi", "score": 8.0, "errors": ["1.2a"] }
    ],
    "relatedTopics": [
      "Xác suất – Không gian mẫu"
    ],
    "suggestedActions": [
      {
        "type": "review_concept",
        "title": "Chữa lỗi trực tiếp trên bảng",
        "description": "Viết to 'Ω = {1, 2...}' và 'n(Ω) = 12' cạnh nhau trên bảng để học sinh đối chiếu trực quan sự khác biệt."
      },
      {
        "type": "practice_exercises",
        "title": "Luyện thói quen dùng ngoặc nhọn",
        "description": "Giao 3 câu phép thử cơ bản (gieo súc sắc, bốc bi) yêu cầu chỉ viết không gian mẫu, bắt buộc kiểm tra xem có dấu {} hay không."
      }
    ]
  },
  "ERR_004": {
    "fullDescription": "Đề bài yêu cầu: Tính giá trị biểu thức căn khi cho trước x = 16.\n- Học sinh làm: Thay thẳng x=16 vào tính ra kết quả cuối.\n- Tắc ở bước: Bỏ quên hoàn toàn bước 1 (kiểm tra điều kiện xác định). Không ghi dòng chữ '(Thỏa mãn ĐKXĐ)'.",
    "commonMistakes": [
      "Không kiểm tra xem x=16 có thỏa mãn x>0, x≠4 hay không",
      "Có kiểm tra nháp nhưng không ghi câu kết luận vào bài thi"
    ],
    "affectedStudents": [
      { "id": "1029", "name": "Nguyễn Minh Hường", "group": "Yếu", "score": 1.25, "errors": ["3.0a"] },
      { "id": "1021", "name": "Nguyễn Công Minh", "group": "Yếu", "score": 4.55, "errors": ["3.0a"] },
      { "id": "1022", "name": "Nguyễn Đức Tuấn", "group": "TB", "score": 5.4, "errors": ["3.0a"] },
      { "id": "1024", "name": "Nguyễn Cảnh Vân", "group": "TB", "score": 5.9, "errors": ["3.0a"] },
      { "id": "1020", "name": "Nguyễn Hoàng Mai", "group": "Khá", "score": 7.25, "errors": ["3.0a"] },
      { "id": "1027", "name": "Ngô Tuấn Anh", "group": "Giỏi", "score": 8.9, "errors": ["3.0a"] },
      { "id": "1019", "name": "Hiếu Nhân", "group": "Giỏi", "score": 9.25, "errors": ["3.0a"] }
    ],
    "relatedTopics": [
      "Căn thức – Tính giá trị biểu thức"
    ],
    "suggestedActions": [
      {
        "type": "review_concept",
        "title": "Nhắc nhở barem điểm thi vào 10",
        "description": "Quán triệt luật thi: 'Không đối chiếu ĐK = Mất 0.25 điểm'. Đây là lỗi mất điểm oan cực kỳ lãng phí của nhóm TB-Giỏi."
      },
      {
        "type": "practice_exercises",
        "title": "Tạo phản xạ viết nháp",
        "description": "Yêu cầu học sinh tạo thói quen: Cứ đọc thấy đề bài 'Tính giá trị' là nháp ngay chữ TMĐK ra lề giấy."
      }
    ]
  },
  "ERR_005": {
    "fullDescription": "Đề bài yêu cầu: Chứng minh biểu thức P > 1.\n- Học sinh làm: Rút gọn xong P = (√x+1)/√x rồi để trống, hoặc kết luận bừa P>1 mà không chứng minh.\n- Tắc ở bước: Không có tư duy giải BĐT. Các con không nhớ quy tắc 'Xét hiệu': muốn chứng minh A > B thì phải lấy A - B rồi xét dấu.",
    "commonMistakes": [
      "Dừng lại ở bước rút gọn",
      "Lập luận vòng tròn: 'P > 1 vì tử lớn hơn mẫu' (chưa đủ chặt chẽ)"
    ],
    "affectedStudents": [
      { "id": "1029", "name": "Nguyễn Minh Hường", "group": "Yếu", "score": 1.25, "errors": ["3.0c"] },
      { "id": "1028", "name": "Nguyễn Kim Khánh", "group": "Yếu", "score": 1.5, "errors": ["3.0c"] },
      { "id": "1030", "name": "Diễm My", "group": "Yếu", "score": 3.85, "errors": ["3.0c"] },
      { "id": "1018", "name": "Ngọc Diệp", "group": "Yếu", "score": 4.65, "errors": ["3.0c"] },
      { "id": "1031", "name": "Trúc Anh", "group": "Yếu", "score": 4.75, "errors": ["3.0c"] },
      { "id": "1017", "name": "Nguyễn Thục Quyên", "group": "TB", "score": 5.35, "errors": ["3.0c"] },
      { "id": "1020", "name": "Nguyễn Hoàng Mai", "group": "Khá", "score": 7.25, "errors": ["3.0c"] }
    ],
    "relatedTopics": [
      "Căn thức – Chứng minh bất đẳng thức"
    ],
    "suggestedActions": [
      {
        "type": "review_concept",
        "title": "Dạy lại công thức tư duy Xét Hiệu",
        "description": "Công thức hóa trên bảng: 'Đề kêu chứng minh A > B => Việc đầu tiên phải làm: Lấy A - B'."
      },
      {
        "type": "practice_exercises",
        "title": "Thực hành tại chỗ bước 1",
        "description": "Gọi 2 học sinh nhóm Yếu/TB lên bảng, yêu cầu chỉ làm đúng 1 thao tác: Lập phép tính hiệu số P - 1 = 1/√x."
      }
    ]
  },
  "ERR_006": {
    "fullDescription": "Đề bài yêu cầu: Tính chu vi bánh xe.\n- Học sinh làm: Áp dụng công thức S=πr² để tính ra diện tích, hoặc tính ra nửa chu vi (C=πr).\n- Tắc ở bước: Hỏng kiến thức gốc do trí nhớ. Lẫn lộn giữa công thức tính Chu vi và Diện tích hình tròn.",
    "commonMistakes": [
      "Dùng πr² thay vì 2πr",
      "Tính C = πr (quên nhân 2 nếu dùng bán kính r)"
    ],
    "affectedStudents": [
      { "id": "1023", "name": "Hoàng Phương Nhi", "group": "Yếu", "score": 1.9, "errors": ["4.1a"] },
      { "id": "1021", "name": "Nguyễn Công Minh", "group": "Yếu", "score": 4.55, "errors": ["4.1a"] },
      { "id": "1031", "name": "Trúc Anh", "group": "Yếu", "score": 4.75, "errors": ["4.1a"] },
      { "id": "1022", "name": "Nguyễn Đức Tuấn", "group": "TB", "score": 5.4, "errors": ["4.1a"] },
      { "id": "1020", "name": "Nguyễn Hoàng Mai", "group": "Khá", "score": 7.25, "errors": ["4.1a"] },
      { "id": "1016", "name": "Nguyễn Phương Linh", "group": "Giỏi", "score": 8.0, "errors": ["4.1a"] }
    ],
    "relatedTopics": [
      "Hình học – Chu vi hình tròn"
    ],
    "suggestedActions": [
      {
        "type": "review_concept",
        "title": "Chốt lại bản chất Chu vi vs Diện tích",
        "description": "Vẽ 1 hình tròn: Tô màu viền ngoài = Chu vi (2πr). Tô màu phần bên trong = Diện tích (πr²)."
      },
      {
        "type": "practice_exercises",
        "title": "Mini-test so sánh",
        "description": "Cho d=10, yêu cầu cả lớp tính nhanh ra nháp cả Chu vi và Diện tích để tự nhận thấy sự khác biệt về số và đơn vị."
      }
    ]
  },
  "ERR_001": {
    "fullDescription": "Đề bài yêu cầu: Nhìn biểu đồ và tìm 'Tần số' (số lượng đếm được) của một nhóm.\n- Học sinh làm: Lấy 15 chia cho tổng 60 để tính ra tỉ lệ phần trăm (25%).\n- Tắc ở bước: Sai ở bước hiểu khái niệm thống kê cơ bản. Đang gộp chung định nghĩa giữa Tần số và Tần suất.",
    "commonMistakes": [
      "Viết 15/60 = 25% thay vì chỉ viết số 15",
      "Ghi kết quả là số thập phân 0.25"
    ],
    "affectedStudents": [
      { "id": "1023", "name": "Hoàng Phương Nhi", "group": "Yếu", "score": 1.9, "errors": ["1.1a", "1.1b"] },
      { "id": "1021", "name": "Nguyễn Công Minh", "group": "Yếu", "score": 4.55, "errors": ["1.1a", "1.1b"] },
      { "id": "1022", "name": "Nguyễn Đức Tuấn", "group": "TB", "score": 5.4, "errors": ["1.1a"] },
      { "id": "1025", "name": "Hải An", "group": "Khá", "score": 7.9, "errors": ["1.1a"] },
      { "id": "1032", "name": "Đặng Minh Sơn", "group": "Giỏi", "score": 9.65, "errors": ["1.1a"] }
    ],
    "relatedTopics": [
      "Thống kê – Biểu đồ tần số ghép nhóm"
    ],
    "suggestedActions": [
      {
        "type": "review_concept",
        "title": "Mẹo ghi nhớ từ ngữ",
        "description": "Đọc lại thần chú: 'Tần SỐ = đếm lấy con SỐ nguyên. Tần SUẤT = tính tỉ SUẤT (phải chia cho tổng lấy %)'."
      },
      {
        "type": "group_support",
        "title": "Kiểm tra phản xạ nhanh",
        "description": "Chiếu 1 biểu đồ lên bảng, chỉ vào 1 cột ngẫu nhiên và gọi học sinh nhóm TB-Khá trả lời nhanh 2 câu: Tần số là gì? Tần suất là gì?"
      }
    ]
  }
},
  "groupDetailMap": {
    "Khá": {
      "name": "Nhóm Khá",
      "count": 2,
      "averageScore": 7.58,
      "riskLevel": "Thấp",
      "students": [
        {
          "id": "1020",
          "name": "Nguyễn Hoàng Mai",
          "score": 7.25,
          "riskScore": 27,
          "group": "Khá"
        },
        {
          "id": "1025",
          "name": "Hải An",
          "score": 7.9,
          "riskScore": 19,
          "group": "Khá"
        }
      ],
      "commonWeaknesses": [
        {
          "topic": "Câu 5.0 – Tối ưu hóa",
          "percentage": 100,
          "description": "2/2 học sinh Khá không làm được câu 5"
        },
        {
          "topic": "Câu 4.2c – Chứng minh vuông góc",
          "percentage": 100,
          "description": "2/2 học sinh Khá không làm được 4.2c"
        },
        {
          "topic": "Sai kiến thức số nguyên tố (1.2c)",
          "percentage": 50,
          "description": "1/2 học sinh Khá bị sai kiến thức số nguyên tố"
        }
      ],
      "commonErrors": [
        {
          "error": "ERR_003 – Sai kiến thức số nguyên tố",
          "count": 1,
          "severity": "medium"
        },
        {
          "error": "ERR_006 – Sai công thức chu vi",
          "count": 1,
          "severity": "medium"
        },
        {
          "error": "ERR_007 – Sai lập phương trình chuyển động",
          "count": 1,
          "severity": "high"
        }
      ],
      "interventionPlan": {
        "immediate": [
          "Chữa kỹ câu 2.0 (phương trình chuyển động)",
          "Ôn lại công thức chu vi hình tròn"
        ],
        "longTerm": [
          "Nâng cao với bài toán hình học câu 4.2c và 5.0"
        ]
      }
    },
    "Giỏi": {
      "name": "Nhóm Giỏi",
      "count": 4,
      "averageScore": 8.95,
      "riskLevel": "Thấp",
      "students": [
        {
          "id": "1016",
          "name": "Nguyễn Phương Linh",
          "score": 8.0,
          "riskScore": 21,
          "group": "Giỏi"
        },
        {
          "id": "1027",
          "name": "Ngô Tuấn Anh",
          "score": 8.9,
          "riskScore": 12,
          "group": "Giỏi"
        },
        {
          "id": "1019",
          "name": "Hiếu Nhân",
          "score": 9.25,
          "riskScore": 8,
          "group": "Giỏi"
        },
        {
          "id": "1032",
          "name": "Đặng Minh Sơn",
          "score": 9.65,
          "riskScore": 5,
          "group": "Giỏi"
        }
      ],
      "commonWeaknesses": [
        {
          "topic": "Chứng minh DF⊥AC (4.2c)",
          "percentage": 75,
          "description": "3/4 học sinh giỏi bỏ qua hoặc không hoàn thành câu hình học khó nhất"
        },
        {
          "topic": "Câu 5.0 – Tối ưu hóa BĐT Cauchy",
          "percentage": 75,
          "description": "3/4 học sinh giỏi không làm được câu 5"
        },
        {
          "topic": "Thiếu bước TMĐK (3.0a)",
          "percentage": 50,
          "description": "2/4 học sinh giỏi mất điểm trình bày do không ghi đối chiếu điều kiện"
        }
      ],
      "commonErrors": [
        {
          "error": "ERR_008 – Không hoàn thành 4.2c",
          "count": 3,
          "severity": "medium"
        },
        {
          "error": "ERR_004 – Thiếu bước TMĐK",
          "count": 2,
          "severity": "low"
        },
        {
          "error": "ERR_001 – Nhầm tần số/tần suất",
          "count": 1,
          "severity": "low"
        }
      ],
      "interventionPlan": {
        "immediate": [
          "Khai thác câu 4.2c và 5.0 qua bài tập nâng cao",
          "Nhắc nhở thói quen trình bày TMĐK"
        ],
        "longTerm": [
          "Bổ sung bài tập hình học tổng hợp với đường tròn nội tiếp",
          "Luyện tập BĐT Cauchy và tối ưu hóa"
        ]
      }
    },
    "Yếu": {
      "name": "Nhóm Yếu",
      "count": 8,
      "averageScore": 2.81,
      "riskLevel": "Cao",
      "students": [
        {
          "id": "1026",
          "name": "Trần Lý Quân",
          "score": 0.0,
          "riskScore": 85,
          "group": "Yếu"
        },
        {
          "id": "1029",
          "name": "Nguyễn Minh Hường",
          "score": 1.25,
          "riskScore": 76,
          "group": "Yếu"
        },
        {
          "id": "1028",
          "name": "Nguyễn Kim Khánh",
          "score": 1.5,
          "riskScore": 72,
          "group": "Yếu"
        },
        {
          "id": "1023",
          "name": "Hoàng Phương Nhi",
          "score": 1.9,
          "riskScore": 68,
          "group": "Yếu"
        },
        {
          "id": "1030",
          "name": "Diễm My",
          "score": 3.85,
          "riskScore": 50,
          "group": "Yếu"
        },
        {
          "id": "1021",
          "name": "Nguyễn Công Minh",
          "score": 4.55,
          "riskScore": 45,
          "group": "Yếu"
        },
        {
          "id": "1018",
          "name": "Ngọc Diệp",
          "score": 4.65,
          "riskScore": 44,
          "group": "Yếu"
        },
        {
          "id": "1031",
          "name": "Trúc Anh",
          "score": 4.75,
          "riskScore": 43,
          "group": "Yếu"
        }
      ],
      "commonWeaknesses": [
        {
          "topic": "Câu 4.1a, 4.1b – Hình học hình tròn",
          "percentage": 88,
          "description": "7/8 học sinh Yếu không làm được 4.1a hoặc 4.1b"
        },
        {
          "topic": "Câu 2.0 – Phương trình chuyển động",
          "percentage": 75,
          "description": "6/8 học sinh Yếu không giải được câu 2.0"
        },
        {
          "topic": "Câu 1.2a – Không gian mẫu",
          "percentage": 88,
          "description": "7/8 học sinh Yếu viết sai hoặc không làm câu 1.2a"
        },
        {
          "topic": "Câu 5.0 – Tối ưu hóa",
          "percentage": 100,
          "description": "8/8 học sinh Yếu không làm câu 5.0"
        },
        {
          "topic": "Câu 4.2b, 4.2c – Hình học nâng cao",
          "percentage": 100,
          "description": "8/8 học sinh Yếu không làm được 4.2b và 4.2c"
        }
      ],
      "commonErrors": [
        {
          "error": "ERR_002 – Viết sai không gian mẫu",
          "count": 6,
          "severity": "high"
        },
        {
          "error": "ERR_006 – Sai công thức chu vi",
          "count": 4,
          "severity": "high"
        },
        {
          "error": "ERR_001 – Nhầm tần số/tần suất",
          "count": 4,
          "severity": "high"
        },
        {
          "error": "ERR_005 – Chứng minh P>1 chưa hoàn thiện",
          "count": 5,
          "severity": "high"
        },
        {
          "error": "ERR_007 – Sai lập phương trình chuyển động",
          "count": 3,
          "severity": "high"
        },
        {
          "error": "ERR_003 – Sai kiến thức số nguyên tố",
          "count": 3,
          "severity": "medium"
        }
      ],
      "interventionPlan": {
        "immediate": [
          "Tổ chức học phụ đạo khẩn cấp cho nhóm Yếu (ưu tiên: Trần Lý Quân, Nguyễn Minh Hường, Nguyễn Kim Khánh, Hoàng Phương Nhi)",
          "Ôn tập từ đầu: ký hiệu xác suất, công thức hình tròn, định nghĩa số nguyên tố",
          "Luyện tập đọc biểu đồ tần số"
        ],
        "longTerm": [
          "Xây dựng kế hoạch học tập cá nhân hóa cho 4 học sinh điểm dưới 2",
          "Kiểm tra thường xuyên theo tuần để theo dõi tiến độ",
          "Kết đôi học sinh Yếu với học sinh Giỏi trong học nhóm"
        ]
      }
    },
    "TB": {
      "name": "Nhóm TB",
      "count": 3,
      "averageScore": 5.55,
      "riskLevel": "Trung bình",
      "students": [
        {
          "id": "1017",
          "name": "Nguyễn Thục Quyên",
          "score": 5.35,
          "riskScore": 39,
          "group": "TB"
        },
        {
          "id": "1022",
          "name": "Nguyễn Đức Tuấn",
          "score": 5.4,
          "riskScore": 37,
          "group": "TB"
        },
        {
          "id": "1024",
          "name": "Nguyễn Cảnh Vân",
          "score": 5.9,
          "riskScore": 37,
          "group": "TB"
        }
      ],
      "commonWeaknesses": [
        {
          "topic": "Câu 2.0 – Phương trình chuyển động",
          "percentage": 67,
          "description": "2/3 học sinh TB không làm được hoặc làm sai phương trình chuyển động"
        },
        {
          "topic": "Câu 4.1a – Chu vi hình tròn",
          "percentage": 67,
          "description": "2/3 học sinh TB sai hoặc thiếu ở câu tính chu vi"
        },
        {
          "topic": "Câu 3.0c – Chứng minh P>1",
          "percentage": 100,
          "description": "3/3 học sinh TB không hoàn thành đầy đủ bước chứng minh"
        },
        {
          "topic": "Sai kiến thức số nguyên tố (1.2c)",
          "percentage": 100,
          "description": "3/3 học sinh TB sai 1.2c do nhầm số nguyên tố"
        }
      ],
      "commonErrors": [
        {
          "error": "ERR_003 – Sai kiến thức số nguyên tố",
          "count": 3,
          "severity": "high"
        },
        {
          "error": "ERR_004 – Thiếu bước TMĐK",
          "count": 3,
          "severity": "medium"
        },
        {
          "error": "ERR_005 – Chứng minh P>1 chưa hoàn thiện",
          "count": 3,
          "severity": "high"
        },
        {
          "error": "ERR_002 – Viết sai không gian mẫu",
          "count": 2,
          "severity": "medium"
        }
      ],
      "interventionPlan": {
        "immediate": [
          "Ôn tập định nghĩa số nguyên tố",
          "Luyện lại bài toán phương trình chuyển động",
          "Chữa bài chứng minh P>1 với phương pháp xét hiệu"
        ],
        "longTerm": [
          "Củng cố kiến thức thống kê và xác suất cơ bản",
          "Luyện tập các dạng chứng minh bất đẳng thức"
        ]
      }
    }
  },
  "students": [
    {
      "id": "1032",
      "name": "Đặng Minh Sơn",
      "score": 9.65,
      "riskScore": 5,
      "progress": 0,
      "group": "Giỏi",
      "studentId": "HS1032",
      "averageScore": 9.65,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 9.65
        }
      ],
      "riskBreakdown": {
        "averageScore": 2.1,
        "severity": 1.7,
        "trend": 0,
        "total": 5
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 0.5,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "unattempted",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.4,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1019",
      "name": "Hiếu Nhân",
      "score": 9.25,
      "riskScore": 8,
      "progress": 0,
      "group": "Giỏi",
      "studentId": "HS1019",
      "averageScore": 9.25,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 9.25
        }
      ],
      "riskBreakdown": {
        "averageScore": 4.5,
        "severity": 3.3,
        "trend": 0,
        "total": 8
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 0.5,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 0.5,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1027",
      "name": "Ngô Tuấn Anh",
      "score": 8.9,
      "riskScore": 12,
      "progress": 0,
      "group": "Giỏi",
      "studentId": "HS1027",
      "averageScore": 8.9,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 8.9
        }
      ],
      "riskBreakdown": {
        "averageScore": 6.6,
        "severity": 5.0,
        "trend": 0,
        "total": 12
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 1.0,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.4,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1016",
      "name": "Nguyễn Phương Linh",
      "score": 8.0,
      "riskScore": 21,
      "progress": 0,
      "group": "Giỏi",
      "studentId": "HS1016",
      "averageScore": 8.0,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 8.0
        }
      ],
      "riskBreakdown": {
        "averageScore": 12.0,
        "severity": 6.7,
        "trend": 0,
        "total": 21
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 0.5,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "unattempted",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "unattempted",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1025",
      "name": "Hải An",
      "score": 7.9,
      "riskScore": 19,
      "progress": 0,
      "group": "Khá",
      "studentId": "HS1025",
      "averageScore": 7.9,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 7.9
        }
      ],
      "riskBreakdown": {
        "averageScore": 12.6,
        "severity": 6.7,
        "trend": 0,
        "total": 19
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 0.4,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.75,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1020",
      "name": "Nguyễn Hoàng Mai",
      "score": 7.25,
      "riskScore": 27,
      "progress": 0,
      "group": "Khá",
      "studentId": "HS1020",
      "averageScore": 7.25,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 7.25
        }
      ],
      "riskBreakdown": {
        "averageScore": 16.5,
        "severity": 8.3,
        "trend": 0,
        "total": 27
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "unattempted",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "unattempted",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1024",
      "name": "Nguyễn Cảnh Vân",
      "score": 5.9,
      "riskScore": 37,
      "progress": 0,
      "group": "TB",
      "studentId": "HS1024",
      "averageScore": 5.9,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 5.9
        }
      ],
      "riskBreakdown": {
        "averageScore": 24.6,
        "severity": 10.0,
        "trend": 0,
        "total": 37
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 0.5,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.4,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "unattempted",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "unattempted",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1022",
      "name": "Nguyễn Đức Tuấn",
      "score": 5.4,
      "riskScore": 37,
      "progress": 0,
      "group": "TB",
      "studentId": "HS1022",
      "averageScore": 5.4,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 5.4
        }
      ],
      "riskBreakdown": {
        "averageScore": 27.6,
        "severity": 8.3,
        "trend": 0,
        "total": 37
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 0.5,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.4,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "unattempted",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1017",
      "name": "Nguyễn Thục Quyên",
      "score": 5.35,
      "riskScore": 39,
      "progress": 0,
      "group": "TB",
      "studentId": "HS1017",
      "averageScore": 5.35,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 5.35
        }
      ],
      "riskBreakdown": {
        "averageScore": 27.9,
        "severity": 10.0,
        "trend": 0,
        "total": 39
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 0.5,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "unattempted",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 0.5,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.1,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1031",
      "name": "Trúc Anh",
      "score": 4.75,
      "riskScore": 43,
      "progress": 0,
      "group": "Yếu",
      "studentId": "HS1031",
      "averageScore": 4.75,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 4.75
        }
      ],
      "riskBreakdown": {
        "averageScore": 31.5,
        "severity": 11.7,
        "trend": 0,
        "total": 43
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 0.5,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1018",
      "name": "Ngọc Diệp",
      "score": 4.65,
      "riskScore": 44,
      "progress": 0,
      "group": "Yếu",
      "studentId": "HS1018",
      "averageScore": 4.65,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 4.65
        }
      ],
      "riskBreakdown": {
        "averageScore": 32.1,
        "severity": 11.7,
        "trend": 0,
        "total": 44
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 0.4,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1021",
      "name": "Nguyễn Công Minh",
      "score": 4.55,
      "riskScore": 45,
      "progress": 0,
      "group": "Yếu",
      "studentId": "HS1021",
      "averageScore": 4.55,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 4.55
        }
      ],
      "riskBreakdown": {
        "averageScore": 32.7,
        "severity": 10.0,
        "trend": 0,
        "total": 45
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 0.75,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 0.5,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.4,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 0.75,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.4,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "unattempted",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "unattempted",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1030",
      "name": "Diễm My",
      "score": 3.85,
      "riskScore": 50,
      "progress": 0,
      "group": "Yếu",
      "studentId": "HS1030",
      "averageScore": 3.85,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 3.85
        }
      ],
      "riskBreakdown": {
        "averageScore": 36.9,
        "severity": 11.7,
        "trend": 0,
        "total": 50
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 0.4,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 0.4,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 0.4,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.5,
          "maxScore": 0.5,
          "status": "correct",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 0.75,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 0.9,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "unattempted",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1023",
      "name": "Hoàng Phương Nhi",
      "score": 1.9,
      "riskScore": 68,
      "progress": 0,
      "group": "Yếu",
      "studentId": "HS1023",
      "averageScore": 1.9,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 1.9
        }
      ],
      "riskBreakdown": {
        "averageScore": 48.6,
        "severity": 18.3,
        "trend": 0,
        "total": 68
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.4,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "unattempted",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1028",
      "name": "Nguyễn Kim Khánh",
      "score": 1.5,
      "riskScore": 72,
      "progress": 0,
      "group": "Yếu",
      "studentId": "HS1028",
      "averageScore": 1.5,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 1.5
        }
      ],
      "riskBreakdown": {
        "averageScore": 51.0,
        "severity": 20.0,
        "trend": 0,
        "total": 72
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 1.0,
          "maxScore": 1.0,
          "status": "correct",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "unattempted",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1029",
      "name": "Nguyễn Minh Hường",
      "score": 1.25,
      "riskScore": 76,
      "progress": 0,
      "group": "Yếu",
      "studentId": "HS1029",
      "averageScore": 1.25,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 1.25
        }
      ],
      "riskBreakdown": {
        "averageScore": 52.5,
        "severity": 20.0,
        "trend": 0,
        "total": 76
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "unattempted",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 0.25,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "unattempted",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.25,
          "maxScore": 0.5,
          "status": "partial",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 0.75,
          "maxScore": 1.0,
          "status": "partial",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "unattempted",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    },
    {
      "id": "1026",
      "name": "Trần Lý Quân",
      "score": 0.0,
      "riskScore": 85,
      "progress": 0,
      "group": "Yếu",
      "studentId": "HS1026",
      "averageScore": 0.0,
      "scoreHistory": [
        {
          "test": "GK2-9A2-Đề_Nguyễn_Bỉnh_Khiêm",
          "score": 0.0
        }
      ],
      "riskBreakdown": {
        "averageScore": 60.0,
        "severity": 25.0,
        "trend": 0,
        "total": 85
      },
      "questionResults": [
        {
          "question": "1.1a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.1b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Thống kê – Biểu đồ tần số ghép nhóm"
        },
        {
          "question": "1.2a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Xác suất – Không gian mẫu"
        },
        {
          "question": "1.2b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Xác suất cổ điển"
        },
        {
          "question": "1.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Xác suất cổ điển – Số nguyên tố"
        },
        {
          "question": "2.0",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Phương trình – Bài toán chuyển động"
        },
        {
          "question": "3.0a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Căn thức – Tính giá trị biểu thức"
        },
        {
          "question": "3.0b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Căn thức – Rút gọn biểu thức"
        },
        {
          "question": "3.0c",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Căn thức – Chứng minh bất đẳng thức"
        },
        {
          "question": "4.1a",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Chu vi hình tròn"
        },
        {
          "question": "4.1b",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Hình học – Ứng dụng chu vi"
        },
        {
          "question": "4.2a",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Tứ giác nội tiếp đường tròn"
        },
        {
          "question": "4.2b",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Tam giác đồng dạng / Hệ thức"
        },
        {
          "question": "4.2c",
          "score": 0.0,
          "maxScore": 1.0,
          "status": "incorrect",
          "topic": "Hình học – Chứng minh vuông góc"
        },
        {
          "question": "5.0",
          "score": 0.0,
          "maxScore": 0.5,
          "status": "incorrect",
          "topic": "Đại số – Tối ưu hóa / BĐT Cauchy"
        }
      ],
      "progressSteps": []
    }
  ],
  "questionDetailMap": {
    "Thống kê – Biểu đồ tần số ghép nhóm": [
      {
        "id": "Câu 1.1a",
        "content": "Xác định tần số của nhóm [2500; 3000] từ biểu đồ tần số ghép nhóm (N=60 ngày)",
        "type": "essay",
        "score": 0.347,
        "maxScore": 1.0,
        "studentsIncorrect": [
          "Hải An",
          "Ngô Tuấn Anh",
          "Diễm My",
          "Nguyễn Kim Khánh",
          "Đặng Minh Sơn",
          "Trúc Anh",
          "Trần Lý Quân",
          "Nguyễn Minh Hường",
          "Hoàng Phương Nhi",
          "Nguyễn Phương Linh",
          "Ngọc Diệp",
          "Nguyễn Đức Tuấn",
          "Nguyễn Công Minh"
        ]
      },
      {
        "id": "Câu 1.1b",
        "content": "Tính tần số tương đối ghép nhóm của nhóm [2500; 3000]",
        "type": "essay",
        "score": 0.509,
        "maxScore": 1.0,
        "studentsIncorrect": [
          "Ngô Tuấn Anh",
          "Diễm My",
          "Nguyễn Kim Khánh",
          "Trúc Anh",
          "Trần Lý Quân",
          "Hoàng Phương Nhi",
          "Ngọc Diệp",
          "Nguyễn Công Minh"
        ]
      }
    ],
    "Xác suất – Không gian mẫu": [
      {
        "id": "Câu 1.2a",
        "content": "Viết tập hợp không gian mẫu Ω khi rút ngẫu nhiên 1 thẻ từ 12 thẻ đánh số 1 đến 12",
        "type": "essay",
        "score": 0.206,
        "maxScore": 0.5,
        "studentsIncorrect": [
          "Hải An",
          "Diễm My",
          "Nguyễn Kim Khánh",
          "Trúc Anh",
          "Trần Lý Quân",
          "Nguyễn Minh Hường",
          "Hoàng Phương Nhi",
          "Nguyễn Phương Linh",
          "Ngọc Diệp",
          "Nguyễn Đức Tuấn",
          "Nguyễn Công Minh",
          "Nguyễn Cảnh Vân"
        ]
      }
    ],
    "Xác suất cổ điển": [
      {
        "id": "Câu 1.2b",
        "content": "Tính xác suất biến cố M: thẻ rút ra ghi số chia hết cho 3",
        "type": "essay",
        "score": 0.571,
        "maxScore": 1.0,
        "studentsIncorrect": [
          "Hải An",
          "Diễm My",
          "Nguyễn Kim Khánh",
          "Đặng Minh Sơn",
          "Trần Lý Quân",
          "Nguyễn Minh Hường",
          "Ngọc Diệp",
          "Nguyễn Đức Tuấn",
          "Nguyễn Thục Quyên",
          "Hiếu Nhân",
          "Nguyễn Công Minh",
          "Nguyễn Cảnh Vân"
        ]
      }
    ],
    "Xác suất cổ điển – Số nguyên tố": [
      {
        "id": "Câu 1.2c",
        "content": "Tính xác suất biến cố N: thẻ rút ra ghi số nguyên tố",
        "type": "essay",
        "score": 0.397,
        "maxScore": 1.0,
        "studentsIncorrect": [
          "Diễm My",
          "Nguyễn Kim Khánh",
          "Trúc Anh",
          "Trần Lý Quân",
          "Hoàng Phương Nhi",
          "Ngọc Diệp",
          "Nguyễn Hoàng Mai",
          "Nguyễn Đức Tuấn",
          "Nguyễn Thục Quyên",
          "Nguyễn Công Minh",
          "Nguyễn Cảnh Vân"
        ]
      }
    ],
    "Phương trình – Bài toán chuyển động": [
      {
        "id": "Câu 2.0",
        "content": "Lập phương trình tìm vận tốc xe máy và ô tô (bài toán hai xe gặp nhau, khoảng cách 90km)",
        "type": "essay",
        "score": 0.529,
        "maxScore": 1.0,
        "studentsIncorrect": [
          "Diễm My",
          "Nguyễn Kim Khánh",
          "Trần Lý Quân",
          "Nguyễn Minh Hường",
          "Hoàng Phương Nhi",
          "Nguyễn Phương Linh",
          "Nguyễn Công Minh"
        ]
      }
    ],
    "Căn thức – Tính giá trị biểu thức": [
      {
        "id": "Câu 3.0a",
        "content": "Tính giá trị biểu thức A = (√x+1)/(√x-2) khi x=16",
        "type": "essay",
        "score": 0.365,
        "maxScore": 0.5,
        "studentsIncorrect": [
          "Ngô Tuấn Anh",
          "Nguyễn Kim Khánh",
          "Trần Lý Quân",
          "Nguyễn Minh Hường",
          "Hoàng Phương Nhi",
          "Nguyễn Hoàng Mai",
          "Nguyễn Đức Tuấn",
          "Hiếu Nhân",
          "Nguyễn Công Minh",
          "Nguyễn Cảnh Vân"
        ]
      }
    ],
    "Căn thức – Rút gọn biểu thức": [
      {
        "id": "Câu 3.0b",
        "content": "Rút gọn biểu thức B = √x/(√x+2) - 4√x/(4-x) với x>0, x≠4",
        "type": "essay",
        "score": 0.809,
        "maxScore": 1.0,
        "studentsIncorrect": [
          "Diễm My",
          "Trần Lý Quân",
          "Nguyễn Minh Hường",
          "Hoàng Phương Nhi",
          "Nguyễn Thục Quyên",
          "Nguyễn Công Minh"
        ]
      }
    ],
    "Căn thức – Chứng minh bất đẳng thức": [
      {
        "id": "Câu 3.0c",
        "content": "Chứng minh P = A:B > 1 với điều kiện x>0, x≠4",
        "type": "essay",
        "score": 0.338,
        "maxScore": 0.5,
        "studentsIncorrect": [
          "Diễm My",
          "Nguyễn Kim Khánh",
          "Trúc Anh",
          "Trần Lý Quân",
          "Nguyễn Minh Hường",
          "Hoàng Phương Nhi",
          "Ngọc Diệp",
          "Nguyễn Hoàng Mai",
          "Nguyễn Thục Quyên",
          "Nguyễn Công Minh"
        ]
      }
    ],
    "Hình học – Chu vi hình tròn": [
      {
        "id": "Câu 4.1a",
        "content": "Tính chu vi bánh xe hình tròn có đường kính d = 550mm",
        "type": "essay",
        "score": 0.185,
        "maxScore": 0.5,
        "studentsIncorrect": [
          "Diễm My",
          "Nguyễn Kim Khánh",
          "Trúc Anh",
          "Trần Lý Quân",
          "Nguyễn Minh Hường",
          "Hoàng Phương Nhi",
          "Nguyễn Phương Linh",
          "Ngọc Diệp",
          "Nguyễn Đức Tuấn",
          "Nguyễn Thục Quyên",
          "Nguyễn Công Minh",
          "Nguyễn Cảnh Vân"
        ]
      }
    ],
    "Hình học – Ứng dụng chu vi": [
      {
        "id": "Câu 4.1b",
        "content": "Tính quãng đường xe đạp đi được sau 10 vòng đạp (tỉ số truyền giò đĩa:bánh xe = 1:3.7), làm tròn đến hàng đơn vị",
        "type": "essay",
        "score": 0.112,
        "maxScore": 0.5,
        "studentsIncorrect": [
          "Ngô Tuấn Anh",
          "Diễm My",
          "Nguyễn Kim Khánh",
          "Trúc Anh",
          "Trần Lý Quân",
          "Nguyễn Minh Hường",
          "Hoàng Phương Nhi",
          "Ngọc Diệp",
          "Nguyễn Hoàng Mai",
          "Nguyễn Đức Tuấn",
          "Nguyễn Thục Quyên"
        ]
      }
    ],
    "Hình học – Tứ giác nội tiếp đường tròn": [
      {
        "id": "Câu 4.2a",
        "content": "Chứng minh bốn điểm A, E, D, B cùng thuộc một đường tròn (E, D là chân đường cao từ B, C trong △ABC)",
        "type": "essay",
        "score": 0.553,
        "maxScore": 1.0,
        "studentsIncorrect": [
          "Diễm My",
          "Trúc Anh",
          "Trần Lý Quân",
          "Nguyễn Đức Tuấn",
          "Nguyễn Công Minh"
        ]
      }
    ],
    "Hình học – Tam giác đồng dạng / Hệ thức": [
      {
        "id": "Câu 4.2b",
        "content": "Chứng minh AB·AC = AK·AD (K là điểm đối diện A trên đường tròn ngoại tiếp)",
        "type": "essay",
        "score": 0.279,
        "maxScore": 1.0,
        "studentsIncorrect": [
          "Hải An",
          "Nguyễn Kim Khánh",
          "Trúc Anh",
          "Trần Lý Quân",
          "Nguyễn Minh Hường",
          "Hoàng Phương Nhi",
          "Ngọc Diệp",
          "Nguyễn Thục Quyên",
          "Hiếu Nhân",
          "Nguyễn Cảnh Vân"
        ]
      }
    ],
    "Hình học – Chứng minh vuông góc": [
      {
        "id": "Câu 4.2c",
        "content": "Chứng minh DF ⊥ AC (F là giao điểm AK với BC)",
        "type": "essay",
        "score": 0.074,
        "maxScore": 1.0,
        "studentsIncorrect": [
          "Hải An",
          "Ngô Tuấn Anh",
          "Diễm My",
          "Nguyễn Kim Khánh",
          "Trúc Anh",
          "Trần Lý Quân",
          "Nguyễn Minh Hường",
          "Hoàng Phương Nhi",
          "Ngọc Diệp",
          "Nguyễn Hoàng Mai",
          "Nguyễn Đức Tuấn",
          "Nguyễn Thục Quyên",
          "Hiếu Nhân",
          "Nguyễn Cảnh Vân"
        ]
      }
    ],
    "Đại số – Tối ưu hóa / BĐT Cauchy": [
      {
        "id": "Câu 5.0",
        "content": "Tìm kích thước thửa đất hình chữ nhật có chu vi 120m để diện tích trang trại trong đó là lớn nhất, áp dụng BĐT Cauchy",
        "type": "essay",
        "score": 0.024,
        "maxScore": 0.5,
        "studentsIncorrect": [
          "Hải An",
          "Ngô Tuấn Anh",
          "Diễm My",
          "Nguyễn Kim Khánh",
          "Đặng Minh Sơn",
          "Trúc Anh",
          "Trần Lý Quân",
          "Nguyễn Minh Hường",
          "Hoàng Phương Nhi",
          "Nguyễn Phương Linh",
          "Ngọc Diệp",
          "Nguyễn Hoàng Mai",
          "Nguyễn Đức Tuấn",
          "Nguyễn Thục Quyên",
          "Hiếu Nhân",
          "Nguyễn Công Minh",
          "Nguyễn Cảnh Vân"
        ]
      }
    ]
  }
};

export const errorDetailMap = exam177DeepData.errorDetailMap;
export const groupDetailMap = exam177DeepData.groupDetailMap;
export const enhancedStudents = exam177DeepData.students;
export const questionDetailMap = exam177DeepData.questionDetailMap;
    