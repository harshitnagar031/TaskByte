import { TaskList } from "@/components/task-list";
import { TaskFilters } from "@/components/task-filters";
import { CreateTaskButton } from "@/components/task-form";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">My Tasks</h2>
            <TaskFilters />
            <div className="mt-6">
              <TaskList />
            </div>
          </div>
        </div>
      </div>
      <CreateTaskButton />
    </div>
  );
}