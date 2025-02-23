import { Switch, Route, Link, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import CalendarView from "@/pages/calendar-view";
import NotFound from "@/pages/not-found";
import { ListTodo, Calendar, User } from "lucide-react";

function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t py-2">
      <div className="container mx-auto flex justify-around items-center">
        <Link href="/">
          <a className={`flex flex-col items-center gap-1 ${location === "/" ? "text-primary" : "text-muted-foreground"}`}>
            <ListTodo className="h-5 w-5" />
            <span className="text-xs">Tasks</span>
          </a>
        </Link>
        <Link href="/calendar">
          <a className={`flex flex-col items-center gap-1 ${location === "/calendar" ? "text-primary" : "text-muted-foreground"}`}>
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Calendar</span>
          </a>
        </Link>
        <Link href="/profile">
          <a className={`flex flex-col items-center gap-1 ${location === "/profile" ? "text-primary" : "text-muted-foreground"}`}>
            <User className="h-5 w-5" />
            <span className="text-xs">Mine</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}

function Router() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="py-4 px-4">
        <h1 className="text-2xl font-bold text-primary">TaskByte</h1>
      </header>
      <main className="container mx-auto px-4">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/calendar" component={CalendarView} />
          <Route component={NotFound} />
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