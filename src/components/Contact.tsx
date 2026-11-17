import { Send } from "lucide-react";
import { useState, type SubmitEvent } from "react";
import { contactFormEndpoint, profile } from "../data";
import { SocialLinks } from "./SocialLinks";

type SubmissionStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const isConfigured = contactFormEndpoint.trim().length > 0;
  const isSending = status === "sending";

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isConfigured || isSending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
        signal: AbortSignal.timeout(30_000),
      });

      if (!response.ok)
        throw new Error(`Formspree returned ${response.status}`);

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="contact-page"
      id="panel-contact"
      role="tabpanel"
      aria-labelledby="tab-contact"
    >
      <div className="contact-content">
        <header className="document-heading">
          <h1>Contact Me</h1>
          <p>Have a question or a project in mind? Send me a message.</p>
        </header>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
          aria-describedby={isConfigured ? "contact-form-note" : undefined}
          aria-busy={isSending}
        >
          <fieldset disabled={isSending}>
            <div className="contact-field">
              <label htmlFor="contact-name">Full Name</label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                maxLength={200}
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-phone">
                Phone Number <span>(optional)</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={50}
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                maxLength={10000}
                required
              />
            </div>
          </fieldset>

          {isConfigured && (
            <p className="contact-note" id="contact-form-note">
              Your details will be sent through Formspree to my inbox.
            </p>
          )}
          <button
            className="button button-primary contact-submit"
            type="submit"
            disabled={!isConfigured || isSending}
          >
            <Send size={16} aria-hidden="true" />
            {isSending ? "Sending…" : "Send Message"}
          </button>
          <div className="contact-status" role="status" aria-atomic="true">
            {status === "success" &&
              "Thanks! Your message was submitted successfully."}
            {status === "error" && (
              <>
                Your message could not be confirmed. Please try again or email{" "}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>{" "}
                directly.
              </>
            )}
          </div>
        </form>

        <footer className="contact-footer">
          <p className="content-label">Or connect directly</p>
          <SocialLinks />
        </footer>
      </div>
    </section>
  );
}
