import { TaskProgress } from "@/components/task-progress";

export default function MeView() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Me</h2>
      <TaskProgress />
    </div>
  );
}
