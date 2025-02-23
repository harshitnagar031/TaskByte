import { TaskProgress } from "@/components/task-progress";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export default function MeView() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">My Progress</h2>
        <TaskProgress />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Appearance</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            variant={theme === 'light' ? 'default' : 'outline'}
            onClick={() => setTheme('light')}
            className="flex-1"
          >
            <Sun className="mr-2 h-4 w-4" />
            Light
          </Button>
          <Button
            variant={theme === 'dark' ? 'default' : 'outline'}
            onClick={() => setTheme('dark')}
            className="flex-1"
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </Button>
          <Button
            variant={theme === 'system' ? 'default' : 'outline'}
            onClick={() => setTheme('system')}
            className="flex-1"
          >
            <Laptop className="mr-2 h-4 w-4" />
            System
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">About TaskByte</h2>
        <p className="text-muted-foreground">
          Version 1.0.0
        </p>
      </section>
    </div>
  );
}