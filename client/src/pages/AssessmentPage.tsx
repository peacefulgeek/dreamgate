import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import { getAssessmentBySlug, type Assessment, type AssessmentRange } from "@/lib/assessments";

export default function AssessmentPage() {
  const { slug } = useParams<{ slug: string }>();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [result, setResult] = useState<AssessmentRange | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const a = getAssessmentBySlug(slug);
    if (a) {
      setAssessment(a);
      setAnswers(new Array(a.questions.length).fill(null));
      setCurrentQ(0);
      setResult(null);
      setShowResult(false);
      document.title = `${a.title} — Dream Gate`;
    }
  }, [slug]);

  const handleAnswer = useCallback(
    (score: number) => {
      if (!assessment) return;
      const newAnswers = [...answers];
      newAnswers[currentQ] = score;
      setAnswers(newAnswers);

      if (currentQ < assessment.questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        // Calculate total score
        const total = newAnswers.reduce<number>((sum, s) => sum + (s ?? 0), 0);
        setTotalScore(total);
        const r = assessment.getResult(total as number);
        setResult(r);
        setShowResult(true);
      }
    },
    [assessment, answers, currentQ]
  );

  const handleBack = useCallback(() => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  }, [currentQ]);

  const handleRestart = useCallback(() => {
    if (!assessment) return;
    setAnswers(new Array(assessment.questions.length).fill(null));
    setCurrentQ(0);
    setResult(null);
    setShowResult(false);
  }, [assessment]);

  const handleExportPDF = useCallback(() => {
    if (!assessment || !result) return;

    // Build a printable HTML document and trigger print-to-PDF
    const printContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${assessment.title} — Results</title>
  <style>
    body { font-family: Georgia, serif; max-width: 700px; margin: 40px auto; padding: 20px; color: #1a1a1a; line-height: 1.6; }
    h1 { font-size: 24px; margin-bottom: 4px; }
    h2 { font-size: 18px; margin-top: 24px; }
    .score { font-size: 48px; font-weight: bold; color: #4a5568; margin: 16px 0; }
    .result-title { font-size: 20px; font-weight: bold; color: #2d3748; }
    .description { margin: 12px 0; }
    .recommendations { margin: 12px 0; padding-left: 20px; }
    .recommendations li { margin-bottom: 8px; }
    .meta { color: #718096; font-size: 14px; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; }
    .disclaimer { color: #a0aec0; font-size: 12px; margin-top: 16px; }
    .question-review { margin: 8px 0; font-size: 14px; }
    .question-review strong { color: #4a5568; }
  </style>
</head>
<body>
  <h1>${assessment.title}</h1>
  <p style="color: #718096;">Dream Gate — dreamgate.love</p>

  <div class="score">${totalScore} / ${assessment.maxScore}</div>
  <div class="result-title">${result.title}</div>
  <p class="description">${result.description}</p>

  <h2>Recommendations</h2>
  <ul class="recommendations">
    ${result.recommendations.map((r) => `<li>${r}</li>`).join("")}
  </ul>

  <h2>Your Answers</h2>
  ${assessment.questions
    .map(
      (q, i) =>
        `<div class="question-review"><strong>Q${i + 1}:</strong> ${q.question}<br/>Answer: ${
          q.options.find((o) => o.score === answers[i])?.text || "—"
        } (${answers[i]} pts)</div>`
    )
    .join("")}

  <div class="meta">
    Assessment taken on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
  </div>
  <div class="disclaimer">
    This assessment is for educational purposes only and is not intended as medical, psychological, or professional advice.
    Visit dreamgate.love for more resources.
  </div>
</body>
</html>`;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 500);
    }
  }, [assessment, result, totalScore, answers]);

  if (!assessment) {
    return (
      <Layout>
        <div className="max-w-[720px] mx-auto px-5 py-16 text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
            Assessment Not Found
          </h1>
          <Link href="/assessments" className="text-primary hover:underline">
            View all assessments
          </Link>
        </div>
      </Layout>
    );
  }

  // Results view
  if (showResult && result) {
    const pct = Math.round((totalScore / assessment.maxScore) * 100);
    return (
      <Layout>
        <div className="max-w-[720px] mx-auto px-5 py-16">
          <nav className="text-sm text-muted-foreground mb-8">
            <Link href="/assessments" className="hover:text-foreground transition-colors no-underline">
              Assessments
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{assessment.title}</span>
          </nav>

          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            Your Results
          </h1>
          <p className="text-muted-foreground mb-8">{assessment.title}</p>

          {/* Score display */}
          <div className="border border-border/40 rounded-lg bg-card/30 p-8 mb-8 text-center">
            <div className="text-6xl font-heading font-bold text-foreground mb-2">
              {totalScore}
              <span className="text-2xl text-muted-foreground font-normal">
                /{assessment.maxScore}
              </span>
            </div>
            <div className="w-full bg-border/30 rounded-full h-3 mb-4 max-w-xs mx-auto">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-1000"
                style={{ width: `${pct}%` }}
              />
            </div>
            <h2 className="font-heading text-xl font-semibold text-primary mb-3">
              {result.title}
            </h2>
            <p className="text-foreground/80 leading-relaxed max-w-lg mx-auto">
              {result.description}
            </p>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
              Recommendations
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80">
                  <span className="text-primary font-semibold text-sm mt-0.5">{i + 1}.</span>
                  <span className="text-sm leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended articles */}
          {result.articleSlugs.length > 0 && (
            <div className="mb-8">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                Recommended Reading
              </h3>
              <ul className="space-y-2">
                {result.articleSlugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/article/${slug}`}
                      className="text-sm text-primary hover:underline no-underline"
                    >
                      {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={handleExportPDF}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Download as PDF
            </button>
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 border border-border rounded-md text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              Retake Assessment
            </button>
            <Link
              href="/assessments"
              className="px-5 py-2.5 border border-border rounded-md text-sm font-medium text-foreground hover:bg-accent transition-colors no-underline inline-flex items-center"
            >
              All Assessments
            </Link>
          </div>

          {/* Health disclaimer */}
          <div className="border border-amber-500/30 rounded-lg bg-amber-500/5 px-5 py-4">
            <p className="text-xs text-foreground/70 leading-relaxed">
              <strong className="text-foreground/80">Educational Content Only.</strong> This
              assessment is provided for educational and informational purposes and is not
              intended as medical, psychological, or professional health advice. Results are
              subjective and should not replace consultation with a qualified healthcare
              provider.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Question view
  const q = assessment.questions[currentQ];
  const progress = ((currentQ + 1) / assessment.questions.length) * 100;

  return (
    <Layout>
      <div className="max-w-[720px] mx-auto px-5 py-16">
        <nav className="text-sm text-muted-foreground mb-8">
          <Link href="/assessments" className="hover:text-foreground transition-colors no-underline">
            Assessments
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{assessment.title}</span>
        </nav>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>
              Question {currentQ + 1} of {assessment.questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-border/30 rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="font-heading text-xl font-semibold text-foreground mb-8 leading-snug">
          {q.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {q.options.map((opt, i) => {
            const isSelected = answers[currentQ] === opt.score;
            return (
              <button
                key={i}
                onClick={() => handleAnswer(opt.score)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/40 bg-card/30 text-foreground/80 hover:border-border hover:bg-card/50"
                }`}
              >
                <span className="text-sm leading-relaxed">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        {currentQ > 0 && (
          <button
            onClick={handleBack}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Previous question
          </button>
        )}
      </div>
    </Layout>
  );
}
