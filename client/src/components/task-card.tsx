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
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-l-primary/20 hover:border-l-primary">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="p-4 relative">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleMutation.mutate()}
              disabled={toggleMutation.isPending}
              className="transition-transform duration-200 hover:scale-110"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 
              className={`font-medium truncate transition-colors duration-200 
                ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="mt-1 text-sm text-muted-foreground/80 line-clamp-2">
                {task.description}
              </p>
            )}
            {task.dueDate && (
              <p className="mt-2 text-xs text-muted-foreground/70 font-medium">
                Due: {format(new Date(task.dueDate), "PPP")}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}