import { TaskList } from "@/components/task-list";
import { TaskFilters } from "@/components/task-filters";
import { CreateTaskButton } from "@/components/task-form";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-background/80 pb-24">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border shadow-sm">
              <TaskFilters />
            </div>
            <TaskList />
          </div>
        </div>
        <CreateTaskButton />
      </div>
    </div>
  );
}