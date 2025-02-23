import { TaskList } from "@/components/task-list";
import { TaskFilters } from "@/components/task-filters";
import { CreateTaskButton } from "@/components/task-form";
import { TaskProgress } from "@/components/task-progress";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center justify-between">
          <TaskFilters />
          <CreateTaskButton />
        </div>
        <TaskList />
      </div>
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Me</h2>
        <TaskProgress />
      </div>
    </div>
  );
}