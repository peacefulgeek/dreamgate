import { useEffect } from "react";
import Layout from "@/components/Layout";
import { assessments } from "@/lib/assessments";
import { Link } from "wouter";

export default function AssessmentsIndex() {
  useEffect(() => {
    document.title = "Assessments — Dream Gate";
  }, []);

  return (
    <Layout>
      <div className="max-w-[720px] mx-auto px-5 py-16">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
          Assessments
        </h1>
        <p className="text-base text-foreground/80 leading-relaxed mb-12">
          These are not personality quizzes. They are diagnostic tools that measure
          specific dimensions of your dream practice and consciousness exploration.
          Each assessment gives you a score, a detailed interpretation, and concrete
          recommendations for what to work on next. You can download your results as
          a PDF.
        </p>

        <div className="space-y-4">
          {assessments.map((a) => (
            <Link
              key={a.id}
              href={`/assessment/${a.slug}`}
              className="group block p-5 rounded-lg border border-border/40 bg-card/30 hover:border-primary/40 transition-all duration-300 no-underline"
            >
              <h2 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                {a.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {a.description}
              </p>
              <div className="text-xs text-primary font-body font-semibold">
                {a.questions.length} questions &middot; Scored 0–{a.maxScore}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
