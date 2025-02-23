import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Task } from "@shared/schema";
import { useState } from "react";
import { format, isSameDay } from "date-fns";
import { TaskCard } from "@/components/task-card";

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ["/api/tasks"]
  });

  // Sort tasks by due date (most recent first)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
  });

  const selectedDateTasks = selectedDate 
    ? sortedTasks.filter(task => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        return isSameDay(taskDate, selectedDate);
      })
    : [];

  // Get dates that have tasks
  const taskDates = tasks
    .filter(task => task.dueDate)
    .map(task => new Date(task.dueDate!));

  // Custom modifiers for the calendar
  const modifiers = {
    hasTask: taskDates,
  };

  // Custom styles for dates with tasks
  const modifiersStyles = {
    hasTask: {
      backgroundColor: "hsl(var(--primary) / 0.1)",
      fontWeight: "bold",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="p-4 lg:col-span-2">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
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