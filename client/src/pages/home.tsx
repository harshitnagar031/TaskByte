import { TaskList } from "@/components/task-list";
import { TaskFilters } from "@/components/task-filters";
import { CreateTaskButton } from "@/components/task-form";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-center">
          <motion.h1 
            className="text-2xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            TaskByte
          </motion.h1>
        </div>
      </header>
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