import { Send } from "lucide-react";
import { useRef, useState, type SubmitEvent } from "react";
import { contactFormEndpoint, profile } from "../data";
import { SocialLinks } from "./SocialLinks";

const SUBMISSION_COOLDOWN_MS = 60_000;
const LAST_ATTEMPT_KEY = "contact-last-attempt";

type SubmissionStatus =
  | "idle"
  | "sending"
  | "success"
  | "error"
  | "cooldown"
  | "rate-limited";

export function Contact() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const lastAttempt = useRef(0);
  const isConfigured = contactFormEndpoint.trim().length > 0;
  const isSending = status === "sending";

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isConfigured || isSending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const now = Date.now();

    // Storage shares the cooldown across tabs and reloads; the ref also works
    // when browser privacy settings prevent storage access.
    try {
      const storedAttempt = Number(localStorage.getItem(LAST_ATTEMPT_KEY));
      if (Number.isFinite(storedAttempt) && storedAttempt <= now) {
        lastAttempt.current = Math.max(lastAttempt.current, storedAttempt);
      }
    } catch {
      // Keep the in-memory cooldown when storage is unavailable.
    }

    if (now - lastAttempt.current < SUBMISSION_COOLDOWN_MS) {
      setStatus("cooldown");
      return;
    }

    lastAttempt.current = now;
    try {
      localStorage.setItem(LAST_ATTEMPT_KEY, String(now));
    } catch {
      // Submission does not require browser storage.
    }

    setStatus("sending");

    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
        signal: AbortSignal.timeout(30_000),
      });

      if (response.status === 429) {
        setStatus("rate-limited");
        return;
      }
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
          <p>Have a question or a project in mind? Send me a message!</p>
        </header>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
          aria-busy={isSending}
        >
          <div hidden>
            <label>
              Leave this field empty
              <input name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
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
              "Your message was submitted! Look to hear back soon."}
            {status === "cooldown" &&
              "Please wait a bit between submissions!"}
            {status === "rate-limited" &&
              "Too many submissions right now. Please try again later or use the email link below."}
            {status === "error" && (
              <>
                Your message was not sent. Please try again or email me at{" "}
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
