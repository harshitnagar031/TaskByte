import { useQuery } from "@tanstack/react-query";
import { Task } from "@shared/schema";
import { TaskCard } from "./task-card";
import { Skeleton } from "@/components/ui/skeleton";

export function TaskList() {
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No tasks yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
