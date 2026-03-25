import { useParams, useLocation } from "wouter";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { getQuizBySlug } from "@/lib/quizzes";
import { Link } from "wouter";
import { ArrowRight, RotateCcw } from "lucide-react";

export default function QuizPage() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const quiz = slug ? getQuizBySlug(slug) : undefined;
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (quiz) {
      document.title = `${quiz.title} — Dream Gate`;
    }
  }, [quiz]);

  if (!quiz) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Quiz not found
          </h1>
          <Link href="/quizzes" className="text-primary mt-4 inline-block no-underline">
            View all quizzes &rarr;
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = showResult ? quiz.getResult(answers) : null;
  const progress = ((currentQ + (showResult ? 1 : 0)) / quiz.questions.length) * 100;

  return (
    <Layout>
      <div className="container max-w-2xl py-16">
        {!showResult ? (
          <>
            {/* Quiz header */}
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              {quiz.title}
            </h1>
            <p className="text-muted-foreground mb-8">{quiz.description}</p>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-secondary rounded-full mb-10 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Question */}
            <div className="mb-8">
              <p className="text-xs text-muted-foreground mb-2 font-body">
                Question {currentQ + 1} of {quiz.questions.length}
              </p>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                {quiz.questions[currentQ].question}
              </h2>

              <div className="space-y-3">
                {quiz.questions[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all duration-200 text-foreground font-body text-sm leading-relaxed"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : result ? (
          <>
            {/* Result */}
            <div className="text-center mb-10">
              <p className="text-xs text-primary font-body font-semibold uppercase tracking-wider mb-2">
                Your Result
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {result.title}
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                {result.description}
              </p>
            </div>

            {/* Recommended articles */}
            <div className="mb-10">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                Recommended Reading
              </h2>
              <div className="space-y-3">
                {result.articles.map((slug) => (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/50 hover:border-primary/40 transition-all no-underline group"
                  >
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors font-body">
                      {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={reset}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors text-sm font-body"
              >
                <RotateCcw className="w-4 h-4" />
                Take Again
              </button>
              <Link
                href="/quizzes"
                className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity no-underline"
              >
                More Quizzes
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </Layout>
  );
}
