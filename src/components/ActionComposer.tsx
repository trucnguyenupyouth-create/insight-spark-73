import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Send, Clock, Save, Eye, Users, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Recipient {
  id: string;
  name: string;
  type: "student" | "parent" | "group";
  group?: string;
}

interface MessageTemplate {
  id: string;
  name: string;
  type: "class" | "group" | "individual" | "parent";
  subject: string;
  content: string;
  attachments?: string[];
}

interface ActionComposerProps {
  isOpen: boolean;
  onClose: () => void;
  recipients: Recipient[];
  context?: {
    errorTag?: string;
    topic?: string;
    studentNames?: string[];
  };
  onSend?: (message: any) => void;
}

const messageTemplates: MessageTemplate[] = [
  {
    id: "class_announcement",
    name: "Thông báo lớp",
    type: "class",
    subject: "Cả lớp chú ý: Lỗi sai phổ biến trong bài kiểm tra",
    content: `Chào cả lớp, qua bài kiểm tra "{{topic}}", cô thấy có tới {{percentage}}% bạn mắc lỗi "{{error_tag}}". Đây là kiến thức quan trọng. Cô đã gửi một tài liệu ôn tập ngắn và 5 bài tập luyện thêm trong mục "Bài tập". Các em hãy hoàn thành trước buổi học tới nhé!`,
    attachments: ["Tài liệu ôn tập", "Bài tập luyện"]
  },
  {
    id: "group_remediation",
    name: "Can thiệp nhóm",
    type: "group",
    subject: "Bài tập củng cố cho {{group_name}}",
    content: `Chào {{student_name}}, trong bài vừa rồi, nhóm của các em đang gặp một số khó khăn chung về "{{error_tag}}". Cô đã tạo một lộ trình ôn tập ngắn gồm 1 video hướng dẫn và 6 câu hỏi luyện tập. Em hãy dành 15 phút để hoàn thành nhé.`,
    attachments: ["Video hướng dẫn", "Bài tập luyện"]
  },
  {
    id: "individual_feedback",
    name: "Phản hồi cá nhân",
    type: "individual",
    subject: "Nhận xét bài làm của {{student_name}}",
    content: `Chào {{student_name}}, cô đã xem bài của em. Em làm tốt phần {{good_points}}, tuy nhiên em đã mắc lỗi "{{error_tag}}" ở câu {{question_number}}. Hãy xem lại ví dụ về lỗi sai của em và làm 3 bài tập tương tự để khắc phục nhé. Cố lên!`,
    attachments: ["Ví dụ lỗi sai", "Bài tập khắc phục"]
  },
  {
    id: "parent_note",
    name: "Thông báo phụ huynh",
    type: "parent",
    subject: "Cập nhật tình hình học tập của em {{student_name}}",
    content: `Chào Anh/Chị, trong bài kiểm tra Toán gần đây, em {{student_name}} đạt {{score}} điểm. Điểm mạnh của em là {{strengths}}. Tuy nhiên, em đang gặp khó khăn với kiến thức "{{error_tag}}". Giáo viên đã gửi bài tập bổ sung và nhờ Anh/Chị động viên em dành khoảng 15 phút mỗi tối để ôn tập cùng con.`,
    attachments: ["Báo cáo chi tiết", "Hướng dẫn gia đình"]
  }
];

export function ActionComposer({ isOpen, onClose, recipients, context, onSend }: ActionComposerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [messageType, setMessageType] = useState<string>("class");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (recipients.length > 0) {
      // Auto-detect message type based on recipients
      if (recipients.length === 1 && recipients[0].type === "student") {
        setMessageType("individual");
      } else if (recipients.every(r => r.type === "student" && r.group)) {
        setMessageType("group");
      } else if (recipients.some(r => r.type === "parent")) {
        setMessageType("parent");
      } else {
        setMessageType("class");
      }
    }
  }, [recipients]);

  useEffect(() => {
    if (selectedTemplate) {
      const template = messageTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        setSubject(template.subject);
        setContent(template.content);
      }
    }
  }, [selectedTemplate]);

  const fillTemplate = (text: string, recipient?: Recipient): string => {
    let filled = text;
    
    // Replace context variables
    if (context?.errorTag) {
      filled = filled.replace(/\{\{error_tag\}\}/g, context.errorTag);
    }
    if (context?.topic) {
      filled = filled.replace(/\{\{topic\}\}/g, context.topic);
    }
    
    // Replace recipient-specific variables
    if (recipient) {
      filled = filled.replace(/\{\{student_name\}\}/g, recipient.name);
      filled = filled.replace(/\{\{group_name\}\}/g, recipient.group || "");
    }
    
    // Replace other placeholders with sample data
    filled = filled.replace(/\{\{percentage\}\}/g, "35");
    filled = filled.replace(/\{\{score\}\}/g, "4.5");
    filled = filled.replace(/\{\{question_number\}\}/g, "5");
    filled = filled.replace(/\{\{good_points\}\}/g, "giải hệ phương trình cơ bản");
    filled = filled.replace(/\{\{strengths\}\}/g, "tính toán cẩn thận, trình bày rõ ràng");
    
    return filled;
  };

  const getPreviewContent = () => {
    if (previewMode && selectedRecipient) {
      return {
        subject: fillTemplate(subject, selectedRecipient),
        content: fillTemplate(content, selectedRecipient)
      };
    }
    return { subject, content };
  };

  const handleSend = () => {
    if (!subject.trim() || !content.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ tiêu đề và nội dung",
        variant: "destructive"
      });
      return;
    }

    const message = {
      type: messageType,
      subject,
      content,
      recipients: recipients.map(r => r.id),
      timestamp: new Date().toISOString()
    };

    onSend?.(message);
    
    toast({
      title: "Đã gửi thành công",
      description: `Tin nhắn đã được gửi đến ${recipients.length} người nhận`,
      variant: "default"
    });

    onClose();
  };

  const { subject: previewSubject, content: previewContent } = getPreviewContent();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Soạn hành động
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel: Composer */}
          <div className="space-y-4">
            {/* Recipients */}
            <div>
              <label className="text-sm font-medium mb-2 block">Người nhận</label>
              <Card className="p-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{recipients.length} người nhận</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {recipients.slice(0, 3).map((recipient) => (
                    <Badge key={recipient.id} variant="secondary" className="text-xs">
                      {recipient.name}
                    </Badge>
                  ))}
                  {recipients.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{recipients.length - 3} khác
                    </Badge>
                  )}
                </div>
              </Card>
            </div>

            {/* Message Type & Template */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Loại tin nhắn</label>
                <Select value={messageType} onValueChange={setMessageType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class">Thông báo lớp</SelectItem>
                    <SelectItem value="group">Can thiệp nhóm</SelectItem>
                    <SelectItem value="individual">Phản hồi cá nhân</SelectItem>
                    <SelectItem value="parent">Thông báo phụ huynh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Mẫu tin nhắn</label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn mẫu" />
                  </SelectTrigger>
                  <SelectContent>
                    {messageTemplates
                      .filter(t => t.type === messageType)
                      .map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="text-sm font-medium mb-2 block">Tiêu đề</label>
              <Textarea 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                rows={2}
                placeholder="Nhập tiêu đề tin nhắn..."
              />
            </div>

            {/* Content */}
            <div>
              <label className="text-sm font-medium mb-2 block">Nội dung</label>
              <Textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                placeholder="Nhập nội dung tin nhắn..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? "Ẩn xem trước" : "Xem trước"}
              </Button>

              <div className="space-x-2">
                <Button variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Lưu nháp
                </Button>
                <Button variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Lên lịch
                </Button>
                <Button onClick={handleSend}>
                  <Send className="w-4 h-4 mr-2" />
                  Gửi ngay
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel: Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Xem trước tin nhắn</h3>
              {previewMode && recipients.length > 1 && (
                <Select 
                  value={selectedRecipient?.id || ""} 
                  onValueChange={(id) => setSelectedRecipient(recipients.find(r => r.id === id) || null)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Chọn người nhận" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipients.map((recipient) => (
                      <SelectItem key={recipient.id} value={recipient.id}>
                        {recipient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <Card className="p-4">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                    <Mail className="w-4 h-4" />
                    <span>Tiêu đề</span>
                  </div>
                  <div className="font-medium text-card-foreground">
                    {previewSubject || "Chưa có tiêu đề"}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Nội dung</div>
                  <div className="text-sm text-card-foreground whitespace-pre-wrap">
                    {previewContent || "Chưa có nội dung"}
                  </div>
                </div>

                {previewMode && selectedRecipient && (
                  <div className="bg-primary-light/10 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">
                      Xem trước cho: {selectedRecipient.name}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}