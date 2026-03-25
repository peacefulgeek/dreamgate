import { useEffect } from "react";
import Layout from "@/components/Layout";
import { quizzes } from "@/lib/quizzes";
import { Link } from "wouter";

const WATER_IMG = "https://dreamgate.b-cdn.net/images/dreamgate-starlit-water.png";

export default function QuizIndex() {
  useEffect(() => {
    document.title = "Dream Quizzes — Dream Gate";
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${WATER_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        <div className="relative container text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Dream Quizzes
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Interactive tools that map your dream landscape. Each quiz leads to
            personalized article recommendations based on your answers.
          </p>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((q) => (
            <Link
              key={q.id}
              href={`/quiz/${q.slug}`}
              className="group block p-6 rounded-xl bg-card border border-border/50 hover:border-primary/40 transition-all duration-300 no-underline h-full"
            >
              <h2 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                {q.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {q.description}
              </p>
              <div className="text-xs text-primary font-body font-semibold">
                {q.questions.length} questions &middot; {q.results.length} outcomes
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
