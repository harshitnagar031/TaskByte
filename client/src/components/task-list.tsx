import { useQuery } from "@tanstack/react-query";
import { Task } from "@shared/schema";
import { TaskCard } from "./task-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilterStore } from "./task-filters";

export function TaskList() {
  const { selectedCategory } = useFilterStore();
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

  const filteredTasks = tasks?.filter(task => 
    !selectedCategory || task.category === selectedCategory
  );

  if (!filteredTasks?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {selectedCategory 
          ? `No tasks in ${selectedCategory} category` 
          : "No tasks yet. Create one to get started!"}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}