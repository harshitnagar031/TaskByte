import { TaskList } from "@/components/task-list";
import { TaskFilters } from "@/components/task-filters";
import { CreateTaskButton } from "@/components/task-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl p-8 shadow-sm border">
              <h2 className="text-3xl font-semibold mb-8">My Tasks</h2>
              <TaskFilters />
              <div className="mt-8">
                <TaskList />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-sm border">
              <h3 className="text-xl font-medium mb-4">Task Statistics</h3>
              {/* Task stats will be added here later */}
            </div>
          </div>
        </div>
      </div>
      <CreateTaskButton />
    </div>
  );
}