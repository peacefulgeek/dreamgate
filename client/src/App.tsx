import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";

// Lazy load pages for code splitting
const Home = lazy(() => import("@/pages/Home"));
const ArticlePage = lazy(() => import("@/pages/ArticlePage"));
const ArticleIndex = lazy(() => import("@/pages/ArticleIndex"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const QuizPage = lazy(() => import("@/pages/QuizPage"));
const QuizIndex = lazy(() => import("@/pages/QuizIndex"));
const DreamDecoder = lazy(() => import("@/pages/DreamDecoder"));
const About = lazy(() => import("@/pages/About"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground font-body text-sm">Crossing the threshold...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/articles" component={ArticleIndex} />
        <Route path="/category/:slug" component={CategoryPage} />
        <Route path="/quizzes" component={QuizIndex} />
        <Route path="/quiz/:slug" component={QuizPage} />
        <Route path="/dream-decoder" component={DreamDecoder} />
        <Route path="/about" component={About} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        {/* Article routes — must be last since they match /:slug */}
        <Route path="/:slug" component={ArticlePage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
