CURRICULUM_CONSTANTS = """
### 📚 KIẾN THỨC CHƯƠNG TRÌNH (CURRICULUM CONSTANTS)

**Hệ thống chấm điểm:**
- Thi theo barem: mỗi bước đúng được điểm thành phần (chia 0.25).
- TMĐK (Thỏa mãn Điều kiện Xác định): BẮT BUỘC khi bài có căn thức hoặc phân thức. Thiếu TMĐK = mất 0.25 điểm. Đây là LỖI TRÌNH BÀY, không phải lỗi kiến thức.

**Kỹ thuật trọng tâm lớp 9:**
- Xét hiệu: Chứng minh A > B bằng cách tính A - B và xét dấu. Đây là kỹ thuật CHUẨN trong SGK. Dừng lại ở bước rút gọn là CHƯA HOÀN THÀNH.
- Số nguyên tố: Số tự nhiên > 1 có đúng 2 ước (1 và chính nó). 1 KHÔNG phải số nguyên tố. Nhầm 1 là số nguyên tố = LỖI KIẾN THỨC.
- Không gian mẫu Ω: PHẢI viết dạng tập hợp với dấu ngoặc nhọn {}. Viết n(Ω) = 12 thay vì Ω = {1;2;...;12} = LỖI KÝ HIỆU.
- Chu vi hình tròn: C = πd = 2πR. Nhầm với diện tích S = πR² = LỖI KIẾN THỨC GỐC.
- Bài toán chuyển động: Phải phân biệt THỜI ĐIỂM (6h, 6h30) và THỜI GIAN (= quãng đường / vận tốc). Nhầm 2 khái niệm này = LỖI TƯ DUY.

**Phân nhóm theo điểm (chuẩn Bộ GD&ĐT):**
  Giỏi: ≥ 8.0 | Khá: ≥ 6.5 | Trung bình: ≥ 5.0 | Yếu: < 5.0
"""

GOLDEN_ERROR_EXAMPLES = """
### 🎯 GOLDEN EXAMPLES — Output CỦA BẠN phải đạt mức chất lượng này

**VÍ DỤ 1 (Lỗi trình bày — ERR_002):**
```json
{
  "id": "ERR_002",
  "tag": "Viết n(Ω) thay vì liệt kê Ω",
  "error_type": "trình bày",
  "fullDescription": "Đề bài yêu cầu: Viết tập hợp không gian mẫu Ω (liệt kê các kết quả có thể xảy ra).\\n- Học sinh làm: Không liệt kê, ghi thẳng con số n(Ω) = 12.\\n- Tắc ở bước: Sai thuật ngữ. Các con không phân biệt được 'Không gian mẫu' (là tập hợp phải có {}) và 'Số phần tử' (là một con số).",
  "commonMistakes": [
    "Viết n(Ω) = 12 thay vì liệt kê Ω = {1, 2, 3, ..., 12}",
    "Bỏ ngoặc nhọn của tập hợp"
  ],
  "example": "Học sinh 1016: Viết 'n(Ω) = 12' thay vì 'Ω = {1; 2; 3; ...; 12}'",
  "affected_questions": ["Câu 1.2a"],
  "affectedStudentIds": [1029, 1028, 1030, 1021, 1018, 1031, 1022, 1024, 1025, 1016],
  "severity": "high",
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
}
```

**VÍ DỤ 2 (Lỗi kỹ thuật — ERR_005):**
```json
{
  "id": "ERR_005",
  "tag": "Ngộ nhận & Bỏ dở Chứng minh BĐT",
  "error_type": "kỹ thuật",
  "fullDescription": "Đề bài yêu cầu: Chứng minh biểu thức P > 1.\\n- Học sinh làm: Rút gọn xong P = (√x+1)/√x rồi để trống, hoặc kết luận bừa P>1 mà không chứng minh.\\n- Tắc ở bước: Không có tư duy giải BĐT. Các con không nhớ quy tắc 'Xét hiệu': muốn chứng minh A > B thì phải lấy A - B rồi xét dấu.",
  "commonMistakes": [
    "Dừng lại ở bước rút gọn",
    "Lập luận vòng tròn: 'P > 1 vì tử lớn hơn mẫu' (chưa đủ chặt chẽ)"
  ],
  "example": "Học sinh 1030: Rút gọn đúng P = (√x+1)/√x nhưng sau đó viết 'Vì √x+1 > √x nên P > 1' mà không xét hiệu P - 1",
  "affected_questions": ["Câu 3c"],
  "affectedStudentIds": [1029, 1028, 1030, 1018, 1031, 1017, 1020],
  "severity": "high",
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
}
```
"""
