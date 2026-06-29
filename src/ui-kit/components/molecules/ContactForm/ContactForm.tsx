"use client";

import { type FormEvent, useId, useState } from "react";
import {
  TextArea,
  TextInput,
} from "@/ui-kit/components/atoms/TextInput/TextInput";
import "./ContactForm.css";

type FormState = "idle" | "success" | "error";

type FieldErrors = {
  email?: string;
  message?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();
  const emailErrorId = useId();
  const messageErrorId = useId();
  const statusId = useId();

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};

    if (!email.trim()) {
      next.email = "L'adresse email est obligatoire.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      next.email =
        "Veuillez saisir une adresse email valide (exemple : nom@domaine.fr).";
    }

    if (!message.trim()) {
      next.message = "Le message est obligatoire.";
    }

    return next;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const bodyLines = [];
    if (name.trim()) {
      bodyLines.push(`Nom : ${name.trim()}`);
      bodyLines.push("");
    }
    bodyLines.push(message.trim());

    const mailtoParams = new URLSearchParams({
      subject: subject.trim() || "Contact via Csscade",
      body: bodyLines.join("\n"),
    });

    const mailtoUrl = `mailto:hello@csscade.fr?${mailtoParams.toString()}`;

    try {
      window.location.href = mailtoUrl;
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div className="contact-form__success" role="status" aria-live="polite">
        <p>
          <strong>Votre client de messagerie va s'ouvrir.</strong>
        </p>
        <p>
          Vérifiez que le message est bien adressé à{" "}
          <strong>hello@csscade.fr</strong> avant d'envoyer.
        </p>
        <button
          type="button"
          className="contact-form__reset"
          onClick={() => {
            setFormState("idle");
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
          }}
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={statusId}
    >
      {formState === "error" && (
        <p
          id={statusId}
          className="contact-form__status-error"
          role="alert"
          aria-live="assertive"
        >
          Une erreur est survenue. Veuillez nous contacter directement à{" "}
          <a href="mailto:hello@csscade.fr">hello@csscade.fr</a>.
        </p>
      )}

      <p className="contact-form__required-notice" aria-hidden="true">
        Les champs marqués d'un{" "}
        <span className="contact-form__required-star">*</span> sont
        obligatoires.
      </p>

      <div className="contact-form__field">
        <label htmlFor={nameId} className="contact-form__label">
          Nom ou pseudonyme
        </label>
        <TextInput
          id={nameId}
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor={emailId} className="contact-form__label">
          Adresse email{" "}
          <span className="contact-form__required-star" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(obligatoire)</span>
        </label>
        <TextInput
          id={emailId}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            if (!email.trim()) {
              setErrors((prev) => ({
                ...prev,
                email: "L'adresse email est obligatoire.",
              }));
            } else if (!EMAIL_REGEX.test(email.trim())) {
              setErrors((prev) => ({
                ...prev,
                email:
                  "Veuillez saisir une adresse email valide (exemple : nom@domaine.fr).",
              }));
            } else {
              setErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? emailErrorId : undefined}
          autoComplete="email"
        />
        {errors.email && (
          <p
            id={emailErrorId}
            className="contact-form__error"
            role="alert"
            aria-live="assertive"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div className="contact-form__field">
        <label htmlFor={subjectId} className="contact-form__label">
          Sujet
        </label>
        <TextInput
          id={subjectId}
          type="text"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor={messageId} className="contact-form__label">
          Message{" "}
          <span className="contact-form__required-star" aria-hidden="true">
            *
          </span>
          <span className="sr-only">(obligatoire)</span>
        </label>
        <TextArea
          id={messageId}
          name="message"
          rows={6}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message)
              setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? messageErrorId : undefined}
        />
        {errors.message && (
          <p
            id={messageErrorId}
            className="contact-form__error"
            role="alert"
            aria-live="assertive"
          >
            {errors.message}
          </p>
        )}
      </div>

      <div className="contact-form__actions">
        <button type="submit" className="contact-form__submit">
          Envoyer le message
        </button>
      </div>
    </form>
  );
};
