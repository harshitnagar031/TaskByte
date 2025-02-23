import { Switch, Route, Link, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import CalendarView from "@/pages/calendar-view";
import MeView from "@/pages/me-view";
import { ListTodo, Calendar, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t py-3 shadow-lg">
      <div className="container max-w-5xl mx-auto flex justify-around items-center relative">
        <Link href="/">
          <a className={`flex flex-col items-center gap-1.5 min-w-[64px] ${location === "/" ? "text-primary" : "text-muted-foreground"}`}>
            <ListTodo className="h-6 w-6" />
            <span className="text-xs font-medium">Tasks</span>
          </a>
        </Link>
        <Link href="/calendar">
          <a className={`flex flex-col items-center gap-1.5 min-w-[64px] ${location === "/calendar" ? "text-primary" : "text-muted-foreground"}`}>
            <Calendar className="h-6 w-6" />
            <span className="text-xs font-medium">Calendar</span>
          </a>
        </Link>

        {/* Floating Action Button for adding tasks */}
        <Button 
          size="icon" 
          className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full shadow-lg"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add Task</span>
        </Button>

        <Link href="/me">
          <a className={`flex flex-col items-center gap-1.5 min-w-[64px] ${location === "/me" ? "text-primary" : "text-muted-foreground"}`}>
            <User className="h-6 w-6" />
            <span className="text-xs font-medium">Me</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}

function Router() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="py-4 px-4 border-b bg-background/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="container max-w-5xl mx-auto flex justify-center items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            TaskByte
          </h1>
        </div>
      </header>
      <main className="container max-w-5xl mx-auto px-4 pt-16">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/calendar" component={CalendarView} />
          <Route path="/me" component={MeView} />
        </Switch>
      </main>
      <Navigation />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;