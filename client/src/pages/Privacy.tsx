import { useEffect } from "react";
import Layout from "@/components/Layout";

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy — Dream Gate";
  }, []);

  return (
    <Layout>
      <div className="max-w-[720px] mx-auto px-5 py-16">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-foreground/90 leading-relaxed text-sm">
          <p><strong>Effective Date:</strong> March 24, 2026</p>

          <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">
            What We Collect
          </h2>
          <p>
            If you subscribe to our newsletter, we collect your email address and the date
            of subscription. That is it. We do not collect names, phone numbers, payment
            information, or any other personal data through this website.
          </p>

          <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">
            How We Use Your Data
          </h2>
          <p>
            Your email address is used exclusively to send you newsletter content from
            Dream Gate. We do not sell, rent, or share your email address with third
            parties. We do not use your email for targeted advertising.
          </p>

          <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">
            Cookies and Analytics
          </h2>
          <p>
            This site uses privacy-respecting analytics to understand how visitors use the
            site. We do not use tracking cookies, fingerprinting, or any technology that
            follows you across the internet. Analytics data is aggregated and anonymous.
          </p>

          <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">
            Data Storage
          </h2>
          <p>
            Newsletter subscriber data is stored securely on Bunny CDN infrastructure.
            We retain your email address until you unsubscribe, at which point it is
            permanently deleted.
          </p>

          <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">
            Your Rights
          </h2>
          <p>
            You can unsubscribe from our newsletter at any time. If you want your data
            deleted, contact us and we will remove it within 30 days.
          </p>

          <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">
            Contact
          </h2>
          <p>
            For privacy-related questions, visit{" "}
            <a href="https://kalesh.love" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              kalesh.love
            </a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
