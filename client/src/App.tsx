import { Switch, Route, Link } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/home";
import CalendarView from "@/pages/calendar-view";
import NotFound from "@/pages/not-found";

function Navigation() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/">
          <a className="text-lg font-semibold text-primary">TaskMaster</a>
        </Link>
        <div className="flex gap-4">
          <Link href="/">
            <a className="text-sm text-muted-foreground hover:text-foreground">Tasks</a>
          </Link>
          <Link href="/calendar">
            <a className="text-sm text-muted-foreground hover:text-foreground">Calendar</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/calendar" component={CalendarView} />
          <Route component={NotFound} />
        </Switch>
      </main>
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
