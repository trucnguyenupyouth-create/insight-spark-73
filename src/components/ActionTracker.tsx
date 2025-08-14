import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Undo, 
  BarChart3,
  Users,
  Mail,
  MessageSquare
} from "lucide-react";

interface SentAction {
  id: string;
  type: "class" | "group" | "individual" | "parent";
  subject: string;
  content: string;
  recipients: string[];
  recipientNames: string[];
  sentAt: string;
  status: "sent" | "delivered" | "read" | "responded";
  canRevoke: boolean;
}

interface StudentProgress {
  studentId: string;
  studentName: string;
  assignedTasks: {
    id: string;
    title: string;
    status: "pending" | "in_progress" | "completed";
    assignedAt: string;
    completedAt?: string;
    score?: number;
  }[];
}

interface ActionTrackerProps {
  sentActions: SentAction[];
  studentProgress: StudentProgress[];
  onRevoke?: (actionId: string) => void;
  onViewDetails?: (actionId: string) => void;
}

export function ActionTracker({ 
  sentActions, 
  studentProgress, 
  onRevoke, 
  onViewDetails 
}: ActionTrackerProps) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "class": return MessageSquare;
      case "group": return Users;
      case "individual": return Eye;
      case "parent": return Mail;
      default: return MessageSquare;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "class": return "Thông báo lớp";
      case "group": return "Can thiệp nhóm";
      case "individual": return "Phản hồi cá nhân";
      case "parent": return "Thông báo phụ huynh";
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "warning";
      case "delivered": return "primary";
      case "read": return "success";
      case "responded": return "success";
      default: return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "sent": return "Đã gửi";
      case "delivered": return "Đã nhận";
      case "read": return "Đã đọc";
      case "responded": return "Đã phản hồi";
      default: return status;
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-warning";
      case "in_progress": return "text-primary";
      case "completed": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getTaskStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Chưa bắt đầu";
      case "in_progress": return "Đang làm";
      case "completed": return "Đã hoàn thành";
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const handleRevoke = (actionId: string) => {
    onRevoke?.(actionId);
  };

  return (
    <Card className="p-6 shadow-md">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-primary" />
          Theo dõi hành động
        </h3>

        <Tabs defaultValue="sent" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sent">
              Đã gửi ({sentActions.length})
            </TabsTrigger>
            <TabsTrigger value="progress">
              Tiến độ học sinh ({studentProgress.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sent" className="space-y-4 mt-4">
            {sentActions.length > 0 ? (
              <div className="space-y-3">
                {sentActions.map((action) => {
                  const TypeIcon = getTypeIcon(action.type);
                  return (
                    <div
                      key={action.id}
                      className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 rounded-lg bg-primary-light">
                              <TypeIcon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-medium text-card-foreground">
                                {action.subject}
                              </h4>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Badge variant="outline" className="text-xs">
                                  {getTypeLabel(action.type)}
                                </Badge>
                                <span>•</span>
                                <span>{formatDate(action.sentAt)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs",
                                getStatusColor(action.status) === "warning" && "border-warning text-warning",
                                getStatusColor(action.status) === "primary" && "border-primary text-primary",
                                getStatusColor(action.status) === "success" && "border-success text-success"
                              )}
                            >
                              {getStatusLabel(action.status)}
                            </Badge>
                          </div>
                        </div>

                        {/* Recipients */}
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">
                            Người nhận ({action.recipients.length})
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {action.recipientNames.slice(0, 3).map((name, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {name}
                              </Badge>
                            ))}
                            {action.recipientNames.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{action.recipientNames.length - 3} khác
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Content preview */}
                        <div className="text-sm text-muted-foreground">
                          {action.content.substring(0, 100)}
                          {action.content.length > 100 && "..."}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onViewDetails?.(action.id)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Xem chi tiết
                          </Button>
                          
                          {action.canRevoke && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRevoke(action.id)}
                              className="text-warning hover:text-warning-dark"
                            >
                              <Undo className="w-4 h-4 mr-2" />
                              Thu hồi
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Chưa có hành động nào được gửi</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="progress" className="space-y-4 mt-4">
            {studentProgress.length > 0 ? (
              <div className="space-y-3">
                {studentProgress.map((student) => (
                  <div
                    key={student.studentId}
                    className="p-4 border border-border rounded-lg"
                  >
                    <div className="space-y-3">
                      {/* Student header */}
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-card-foreground">
                          {student.studentName}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {student.assignedTasks.length} nhiệm vụ
                        </Badge>
                      </div>

                      {/* Tasks */}
                      <div className="space-y-2">
                        {student.assignedTasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                          >
                            <div className="space-y-1">
                              <div className="text-sm font-medium">
                                {task.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Giao: {formatDate(task.assignedAt)}
                                {task.completedAt && (
                                  <span> • Hoàn thành: {formatDate(task.completedAt)}</span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {task.score && (
                                <Badge variant="outline" className="text-xs">
                                  {task.score}/10
                                </Badge>
                              )}
                              <div className={cn(
                                "text-xs font-medium",
                                getTaskStatusColor(task.status)
                              )}>
                                {getTaskStatusLabel(task.status)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Chưa có nhiệm vụ nào được giao</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}