import { TaskList } from "@/components/task-list";
import { TaskFilters } from "@/components/task-filters";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <TaskFilters />
        <TaskList />
      </div>
    </div>
  );
}