import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Task } from "@shared/schema";
import { useState } from "react";
import { format } from "date-fns";
import { TaskCard } from "@/components/task-card";

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ["/api/tasks"]
  });

  const selectedDateTasks = selectedDate 
    ? tasks.filter(task => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        return format(taskDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
      })
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="p-4 lg:col-span-2">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          Tasks for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Selected Date"}
        </h2>
        {selectedDateTasks.length === 0 ? (
          <p className="text-muted-foreground">No tasks scheduled for this date.</p>
        ) : (
          <div className="space-y-4">
            {selectedDateTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
