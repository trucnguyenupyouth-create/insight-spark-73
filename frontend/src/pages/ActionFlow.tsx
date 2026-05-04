import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Users, FileText, Mail, MessageSquare, Send, Eye, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActionFlowProps {
  initialData?: {
    actionType: string;
    context?: any;
    recipients?: any[];
  };
}

const steps = [
  { id: 1, title: "Chọn người nhận", description: "Nội dung & kiểm tra" },
  { id: 2, title: "Nội dung & kiểm tra", description: "Thời gian" },
  { id: 3, title: "Xem trước", description: "Xem trước & xác nhận" }
];

const recipientOptions = [
  { id: "all_class", label: "Toàn lớp (20 HS)", count: 20, type: "class" },
  { id: "weak_group", label: "Nhóm đề xuất (Cần hỗ trợ - 14 HS)", count: 14, type: "group" },
  { id: "by_topic", label: "Chọn theo chủ đề", count: 0, type: "topic" },
  { id: "manual", label: "Chọn thủ công", count: 0, type: "manual" }
];

const students = [
  { id: "hs001", name: "Nguyễn Văn An", group: "Giỏi", score: 8.5, selected: false },
  { id: "hs002", name: "Trần Thị Bình", group: "Yếu", score: 4.5, selected: true },
  { id: "hs003", name: "Phạm Minh Cường", group: "Khá", score: 7.2, selected: true },
  { id: "hs004", name: "Lê Thị Dung", group: "TB", score: 6.1, selected: false },
  { id: "hs005", name: "Hoàng Văn E", group: "Yếu", score: 2.7, selected: true },
  { id: "hs006", name: "Vũ Thị Giao", group: "Giỏi", score: 9.2, selected: false }
];

const messageTemplates = [
  {
    id: "worksheet_3",
    name: "Worksheet 3 câu",
    type: "student",
    title: "Worksheet 3 câu",
    content: "Làm trong 10 phút.\nMẫu: worksheet_3",
    attachments: ["worksheet_3", "answer_key_template", "worked_example"],
    example: true
  },
  {
    id: "parent_report",
    name: "Báo cáo cho phụ huynh",
    type: "parent", 
    title: "Tóm tắt 1 trang (với lỗi) về học tập huyền tập. Sử dụng tên HS thông minh",
    content: "Hướng dẫn\nLàm trong 10 phút.",
    attachments: [],
    example: true
  }
];

export function ActionFlow({ initialData }: ActionFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRecipientType, setSelectedRecipientType] = useState("weak_group");
  const [selectedStudents, setSelectedStudents] = useState(students.filter(s => s.selected));
  const [selectedTemplate, setSelectedTemplate] = useState("worksheet_3");
  const [customTitle, setCustomTitle] = useState("");
  const [customContent, setCustomContent] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState(["email", "zalo"]);
  const [scheduleType, setScheduleType] = useState("immediate");
  const { toast } = useToast();

  const currentTemplate = messageTemplates.find(t => t.id === selectedTemplate);
  const selectedRecipientOption = recipientOptions.find(r => r.id === selectedRecipientType);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStudentToggle = (student: any) => {
    const isSelected = selectedStudents.some(s => s.id === student.id);
    if (isSelected) {
      setSelectedStudents(selectedStudents.filter(s => s.id !== student.id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const handleSend = () => {
    toast({
      title: "Đã gửi thành công",
      description: `Tin nhắn đã được gửi đến ${selectedStudents.length} người nhận`,
      variant: "default"
    });
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

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Trình tự hành động</h1>
            <p className="text-muted-foreground">
              3 bước: Chọn người nhận → Nội dung & kiểm tra → Xem trước & xác nhận
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-8 py-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                currentStep >= step.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}>
                B{step.id}
              </div>
              <div>
                <p className={cn(
                  "font-medium text-sm",
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="w-16 h-px bg-border mx-4" />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Bước 1 — Chọn người nhận</h2>
              
              {/* Recipient Type Selection */}
              <div className="space-y-4 mb-6">
                <RadioGroup value={selectedRecipientType} onValueChange={setSelectedRecipientType}>
                  {recipientOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span>{option.label}</span>
                          {option.count > 0 && (
                            <Badge variant="secondary">{option.count} học sinh</Badge>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Student Selection */}
              {(selectedRecipientType === "manual" || selectedRecipientType === "by_topic") && (
                <div>
                  <h3 className="font-medium mb-3">Chọn học sinh cụ thể</h3>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center space-x-3 p-2 border rounded hover:bg-accent/50">
                        <Checkbox 
                          id={student.id}
                          checked={selectedStudents.some(s => s.id === student.id)}
                          onCheckedChange={() => handleStudentToggle(student)}
                        />
                        <Label htmlFor={student.id} className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{student.name}</span>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className={getGroupColor(student.group)}>
                                {student.group}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{student.score}</span>
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Bước 2 — Nội dung & kiểm tra & Thời gian</h2>
              
              {/* Template Selection */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2 block">Xem nhanh mẫu có sẵn</Label>
                <div className="grid grid-cols-1 gap-3">
                  {messageTemplates.map((template) => (
                    <div key={template.id} className="relative">
                      <div className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all",
                        selectedTemplate === template.id 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:bg-accent/50"
                      )}>
                        <div className="flex items-start space-x-3">
                          <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate}>
                            <RadioGroupItem value={template.id} id={template.id} className="mt-1" />
                          </RadioGroup>
                          <div className="flex-1">
                            <Label htmlFor={template.id} className="cursor-pointer">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{template.name}</span>
                                {template.example && (
                                  <Badge variant="outline">Bao gồm worked example</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{template.title}</p>
                              <div className="text-xs text-muted-foreground whitespace-pre-line">
                                {template.content}
                              </div>
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Content */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="custom-title">Tiêu đề</Label>
                  <Input 
                    id="custom-title"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Nhập tiêu đề tùy chỉnh..."
                  />
                </div>
                <div>
                  <Label htmlFor="custom-content">Nội dung</Label>
                  <Textarea 
                    id="custom-content"
                    value={customContent}
                    onChange={(e) => setCustomContent(e.target.value)}
                    placeholder="Nhập nội dung tùy chỉnh..."
                    rows={4}
                  />
                </div>
              </div>

              <Separator className="my-6" />

              {/* Delivery Options */}
              <div className="space-y-4">
                <h3 className="font-medium">Phương thức gửi</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="email"
                      checked={deliveryMethod.includes("email")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setDeliveryMethod([...deliveryMethod, "email"]);
                        } else {
                          setDeliveryMethod(deliveryMethod.filter(m => m !== "email"));
                        }
                      }}
                    />
                    <Label htmlFor="email" className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="zalo"
                      checked={deliveryMethod.includes("zalo")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setDeliveryMethod([...deliveryMethod, "zalo"]);
                        } else {
                          setDeliveryMethod(deliveryMethod.filter(m => m !== "zalo"));
                        }
                      }}
                    />
                    <Label htmlFor="zalo" className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Zalo</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="in-app"
                      checked={deliveryMethod.includes("in-app")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setDeliveryMethod([...deliveryMethod, "in-app"]);
                        } else {
                          setDeliveryMethod(deliveryMethod.filter(m => m !== "in-app"));
                        }
                      }}
                    />
                    <Label htmlFor="in-app" className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>In-app</span>
                    </Label>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Schedule Options */}
              <div className="space-y-4">
                <h3 className="font-medium">Lịch gửi</h3>
                <RadioGroup value={scheduleType} onValueChange={setScheduleType}>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="immediate" id="immediate" />
                    <Label htmlFor="immediate">Gửi ngay</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <Label htmlFor="scheduled">Hẹn giờ</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="draft" id="draft" />
                    <Label htmlFor="draft">Trong ghi nhớ</Label>
                  </div>
                </RadioGroup>
              </div>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Bước 3 — Xem trước</h2>
              
              <div className="space-y-6">
                {/* Preview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h3 className="font-medium mb-3 flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Bản xem trước cho học sinh
                    </h3>
                    <div className="bg-muted/50 p-3 rounded text-sm">
                      <p className="font-medium mb-2">
                        {customTitle || currentTemplate?.title || "Worksheet 3 câu"}
                      </p>
                      <p className="whitespace-pre-line">
                        {customContent || currentTemplate?.content || "Làm trong 10 phút.\nMẫu: worksheet_3"}
                      </p>
                      {currentTemplate?.attachments && currentTemplate.attachments.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-1">Đính kèm:</p>
                          <div className="flex flex-wrap gap-1">
                            {currentTemplate.attachments.map((attachment, index) => (
                              <Badge key={index} variant="secondary">
                                {attachment}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-medium mb-3 flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Bản xem trước cho phụ huynh
                    </h3>
                    <div className="bg-muted/50 p-3 rounded text-sm">
                      <p className="font-medium mb-2">
                        Tóm tắt 1 trang (với lỗi) về học tập huyền tập. Sử dụng tên HS thông minh
                      </p>
                      <p className="text-muted-foreground">
                        Kính chào quý phụ huynh,<br/>
                        Con em đã hoàn thành bài kiểm tra với kết quả...
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Recipients Summary */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Người nhận ({selectedStudents.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudents.slice(0, 6).map((student) => (
                      <Badge key={student.id} variant="secondary">
                        {student.name}
                      </Badge>
                    ))}
                    {selectedStudents.length > 6 && (
                      <Badge variant="outline">
                        +{selectedStudents.length - 6} khác
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Delivery Summary */}
                <div>
                  <h3 className="font-medium mb-2">Phương thức gửi</h3>
                  <div className="flex items-center space-x-4">
                    {deliveryMethod.map((method) => (
                      <Badge key={method} variant="outline">
                        {method === "email" ? "📧 Email" : 
                         method === "zalo" ? "💬 Zalo" : 
                         "📱 In-app"}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Progress Summary */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Tóm tắt tiến trình</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className={cn(
                  currentStep >= 1 ? "text-foreground" : "text-muted-foreground"
                )}>
                  Người nhận
                </span>
                {currentStep >= 1 && (
                  <Badge variant="secondary">
                    {selectedStudents.length || selectedRecipientOption?.count || 0}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className={cn(
                  currentStep >= 2 ? "text-foreground" : "text-muted-foreground"
                )}>
                  Nội dung
                </span>
                {currentStep >= 2 && (
                  <Badge variant="secondary">
                    {selectedTemplate ? "Đã chọn" : "Chưa chọn"}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className={cn(
                  currentStep >= 3 ? "text-foreground" : "text-muted-foreground"
                )}>
                  Xem trước
                </span>
                {currentStep >= 3 && (
                  <Badge variant="secondary">
                    Sẵn sàng
                  </Badge>
                )}
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <Card className="p-4">
            <div className="space-y-3">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious} className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại
                </Button>
              )}
              
              {currentStep < 3 ? (
                <Button onClick={handleNext} className="w-full">
                  Tiếp theo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button onClick={handleSend} className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Gửi ngay
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Clock className="w-4 h-4 mr-2" />
                    Lưu nháp
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}