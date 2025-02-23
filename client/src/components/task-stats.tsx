import { useQuery } from "@tanstack/react-query";
import { Task } from "@shared/schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function TaskStats() {
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const completionRate = total ? Math.round((completed / total) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={completionRate} className="h-2" />
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{completed}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{total - completed}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
