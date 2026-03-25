import { useEffect } from "react";
import Layout from "@/components/Layout";

export default function Terms() {
  useEffect(() => {
    document.title = "Terms of Service — Dream Gate";
  }, []);

  return (
    <Layout>
      <div className="container max-w-3xl py-16">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-8">
          Terms of Service
        </h1>
        <div className="space-y-6 text-foreground/90 leading-relaxed text-sm">
          <p><strong>Effective Date:</strong> March 24, 2026</p>

          <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">
            Use of This Site
          </h2>
          <p>
            Dream Gate provides dream interpretation content for educational and
            informational purposes. The content on this site is not a substitute for
            professional mental health treatment, medical advice, or therapy. If you are
            experiencing psychological distress, please consult a qualified professional.
          </p>

          <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">
            Content Ownership
          </h2>
          <p>
            All articles, quizzes, and content on Dream Gate are the intellectual property
            of Dream Gate and its contributors. You may share links to our content but may
            not reproduce, republish, or redistribute articles without written permission.
          </p>

          <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">
            Newsletter
          </h2>
          <p>
            By subscribing to our newsletter, you consent to receiving periodic emails
            from Dream Gate. You can unsubscribe at any time. We will never share your
            email address with third parties.
          </p>

          <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">
            Disclaimer
          </h2>
          <p>
            Dream interpretation is inherently subjective. The interpretations and
            perspectives offered on this site represent one approach among many. We
            encourage you to use our content as a starting point for your own exploration
            rather than as definitive answers.
          </p>

          <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">
            Changes to These Terms
          </h2>
          <p>
            We may update these terms from time to time. Continued use of the site after
            changes constitutes acceptance of the updated terms.
          </p>

          <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">
            Contact
          </h2>
          <p>
            For questions about these terms, visit{" "}
            <a href="https://shrikrishna.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              ShriKrishna.com
            </a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
