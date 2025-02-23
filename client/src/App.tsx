import { Switch, Route, Link, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import CalendarView from "@/pages/calendar-view";
import MeView from "@/pages/me-view";
import { ListTodo, Calendar, User } from "lucide-react";

function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t py-3">
      <div className="container mx-auto flex justify-around items-center">
        <Link href="/">
          <a className={`flex flex-col items-center gap-2 ${location === "/" ? "text-primary" : "text-muted-foreground"}`}>
            <ListTodo className="h-5 w-5" />
            <span className="text-xs">Tasks</span>
          </a>
        </Link>
        <Link href="/calendar">
          <a className={`flex flex-col items-center gap-2 ${location === "/calendar" ? "text-primary" : "text-muted-foreground"}`}>
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Calendar</span>
          </a>
        </Link>
        <Link href="/me">
          <a className={`flex flex-col items-center gap-2 ${location === "/me" ? "text-primary" : "text-muted-foreground"}`}>
            <User className="h-5 w-5" />
            <span className="text-xs">Me</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}

function Router() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="py-8 px-6 border-b mb-8">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            TaskByte
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-6 space-y-8">
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