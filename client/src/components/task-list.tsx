import { useQuery } from "@tanstack/react-query";
import { Task } from "@shared/schema";
import { TaskCard } from "./task-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilterStore } from "./task-filters";
import { motion, AnimatePresence } from "framer-motion";

export function TaskList() {
  const { selectedCategory } = useFilterStore();
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <Skeleton className="h-24 w-full bg-card/50 backdrop-blur-sm" />
          </div>
        ))}
      </div>
    );
  }

  const filteredTasks = tasks?.filter(task => 
    !selectedCategory || task.category === selectedCategory
  );

  if (!filteredTasks?.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 px-4 rounded-lg bg-card/50 backdrop-blur-sm border shadow-sm"
      >
        <div className="text-4xl mb-4">📝</div>
        <p className="text-lg font-medium text-foreground/80">
          {selectedCategory 
            ? `No tasks in ${selectedCategory} category` 
            : "No tasks yet. Create one to get started!"}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard task={task} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}