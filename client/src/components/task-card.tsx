import { Task } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const toggleMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("PATCH", `/api/tasks/${task.id}`, {
        completed: !task.completed,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/tasks/${task.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => toggleMutation.mutate()}
          disabled={toggleMutation.isPending}
        />
        <div className="flex-1">
          <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
          )}
          {task.dueDate && (
            <p className="mt-2 text-xs text-muted-foreground">
              Due: {format(new Date(task.dueDate), "PPP")}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteMutation.mutate()}
          disabled={deleteMutation.isPending}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
