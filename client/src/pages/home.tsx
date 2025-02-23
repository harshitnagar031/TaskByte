import { TaskList } from "@/components/task-list";
import { TaskFilters } from "@/components/task-filters";
import { CreateTaskButton } from "@/components/task-form";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">My Tasks</h2>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <TaskFilters />
              <div className="mt-6">
                <TaskList />
              </div>
            </div>
          </div>
        </div>
        <CreateTaskButton />
      </main>
    </div>
  );
}