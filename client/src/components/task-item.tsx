
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Task } from "@shared/schema";
import { format } from "date-fns";

interface TaskItemProps {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onComplete, onDelete }: TaskItemProps) {
  const formattedDate = task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'No due date';
  
  return (
    <Card className={`${task.completed ? 'opacity-50' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
            <div className="text-sm text-muted-foreground mt-2">
              Due: {formattedDate}
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onComplete(task.id)}
              className="p-2 rounded-full hover:bg-secondary"
            >
              {task.completed ? '↩️' : '✅'}
            </button>
            <button 
              onClick={() => onDelete(task.id)}
              className="p-2 rounded-full hover:bg-secondary text-destructive"
            >
              🗑️
            </button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
