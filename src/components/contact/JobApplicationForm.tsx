"use client";

import React, { useState, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";
import {
  Flex, Column, Text, Heading, Input, Textarea, Button, Background, Icon, SmartLink,
} from "@once-ui-system/core";
import { TbUpload, TbFile, TbX, TbBrandLinkedin, TbCheck, TbAlertCircle } from "react-icons/tb";
import styles from "./contact.module.scss";

const SERVICE_ID     = "service_v75amug";
const TEMPLATE_ADMIN = "template_unqc4m7";   // same template as ContactForm — works
const TEMPLATE_USER  = "template_mp8tgwx";   // user confirmation
const PUBLIC_KEY     = "AcRk-xtMNtqCEbSNj";
const ADMIN_EMAIL    = "muhammadarqam920@gmail.com";
const APPLY_EMAIL    = "hr@algocrew.io";

const ROLES = [
  "Senior Frontend Engineer (React / Next.js)",
  "Senior Backend Engineer (Node.js / Go)",
  "Senior Full-Stack Engineer",
  "Senior Mobile Engineer (React Native)",
  "Cloud & DevOps Engineer",
  "AI / ML Engineer",
  "QA Engineer",
  "UI/UX Designer",
  "Product Manager",
  "Open Application — Other",
];

const EXPERIENCE_LEVELS = ["3–5 years", "5–8 years", "8–12 years", "12+ years"];

type FileState = { file: File; name: string; size: string } | null;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Accept by MIME type OR file extension (some browsers return empty MIME on drag-drop) */
function isValidCvFile(file: File): boolean {
  const ALLOWED_MIME = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const ALLOWED_EXT = [".pdf", ".doc", ".docx"];
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  return ALLOWED_MIME.includes(file.type) || ALLOWED_EXT.includes(ext);
}

export default function JobApplicationForm() {
  const brand = "#06c8e8";

  const [form, setForm] = useState({
    name: "", email: "", phone: "", linkedin: "",
    role: "", experience: "", portfolio: "", coverLetter: "",
  });
  const [cv, setCv]           = useState<FileState>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError]     = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [field]: e.target.value }));

  const processFile = useCallback((file: File) => {
    setFileError("");
    if (!isValidCvFile(file)) {
      setFileError("Only PDF, DOC, or DOCX files are accepted.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File must be under 5 MB.");
      return;
    }
    setCv({ file, name: file.name, size: formatBytes(file.size) });
  }, []);

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) processFile(e.target.files[0]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.role)       { setError("Please select a role."); return; }
    if (!form.experience) { setError("Please select your experience level."); return; }
    if (!form.name.trim())  { setError("Please enter your full name."); return; }
    if (!form.email.trim()) { setError("Please enter your email address."); return; }
    if (!cv)              { setError("Please attach your CV (PDF or DOC/DOCX)."); return; }

    setLoading(true);
    setSuccess("");

    /* Match the param keys the existing template_unqc4m7 expects */
    const adminParams = {
      from_name:  form.name,
      from_email: form.email,
      from_phone: form.phone || "—",
      to_email:   ADMIN_EMAIL,
      time:       new Date().toLocaleString(),
      subject:    `Job Application — ${form.role}`,
      message:
`ROLE APPLIED FOR : ${form.role}
EXPERIENCE       : ${form.experience}
NAME             : ${form.name}
EMAIL            : ${form.email}
PHONE            : ${form.phone || "—"}
LINKEDIN         : ${form.linkedin || "—"}
PORTFOLIO        : ${form.portfolio || "—"}

CV FILE          : ${cv.name} (${cv.size})
NOTE             : Applicant was told to email CV to ${APPLY_EMAIL}

COVER LETTER:
${form.coverLetter || "Not provided."}`,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ADMIN, adminParams, PUBLIC_KEY);

      /* user confirmation — only needs name + email */
      await emailjs.send(
        SERVICE_ID, TEMPLATE_USER,
        { name: form.name, email: form.email },
        PUBLIC_KEY,
      );

      setSuccess("Application submitted! We'll review it and get back within 3 business days.");
      setForm({ name: "", email: "", phone: "", linkedin: "", role: "", experience: "", portfolio: "", coverLetter: "" });
      setCv(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Submission failed: ${msg}. Please email us directly at ${APPLY_EMAIL}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex fillWidth radius="xl" className={styles.contactContainer} mobileDirection="column" minHeight="104">

      {/* ── LEFT INFO PANEL ── */}
      <Column padding="48" flex={4} className={styles.infoSide} content="space-between">
        <Column gap="24">
          <Flex direction="column" gap="8">
            <Text variant="label-strong-s" style={{ color: brand, letterSpacing: "0.2em" }}>
              JOIN ALGOCREW
            </Text>
            <Heading variant="display-strong-s">
              Build with the <span style={{ color: brand }}>Best</span>
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Top 1% engineers. Async-first. Elite projects.
            </Text>
          </Flex>

          <Column gap="m" marginTop="xl">
            {[
              { icon: "check", text: "Senior-only team — no juniors" },
              { icon: "check", text: "100% remote, async-first culture" },
              { icon: "check", text: "Equity options for senior engineers" },
              { icon: "check", text: "$1,500 / year learning budget" },
              { icon: "check", text: "30-day rolling exit — no lock-in" },
              { icon: "check", text: "Fintech, AI, SaaS, DevOps projects" },
            ].map((item, i) => (
              <Flex key={i} gap="s" align="center">
                <Flex padding="xs" radius="m" style={{
                  background: "rgba(6,200,232,0.1)",
                  border: "1px solid rgba(6,200,232,0.2)",
                  color: brand, flexShrink: 0,
                }}>
                  <Icon name={item.icon} size="xs" />
                </Flex>
                <Text variant="body-default-s" onBackground="neutral-medium">{item.text}</Text>
              </Flex>
            ))}
          </Column>
        </Column>

        <Column gap="s" marginTop="xl">
          <Text variant="label-strong-xs" onBackground="neutral-medium">
            Send CV directly:
          </Text>
          <SmartLink href={`mailto:${APPLY_EMAIL}`}>
            <Text variant="body-default-s" style={{ color: brand, fontWeight: 700 }}>
              {APPLY_EMAIL}
            </Text>
          </SmartLink>
          <Text variant="body-default-xs" onBackground="neutral-weak" style={{ marginTop: 4 }}>
            For large files or portfolios email us directly.
          </Text>
        </Column>
      </Column>

      {/* ── RIGHT FORM PANEL ── */}
      <Column padding="48" flex={7} className={styles.formSide} position="relative">
        <Background dots={{ display: true, opacity: 10, size: "2", color: brand }} />

        <form onSubmit={handleSubmit} style={{ position: "relative", zIndex: 10 }}>
          <Column gap="24">

            {/* Role */}
            <Column gap="8">
              <Text variant="label-strong-xs" onBackground="neutral-medium">
                Role you&apos;re applying for *
              </Text>
              <div className={styles.appSelect}>
                <select
                  value={form.role}
                  onChange={set("role")}
                  className={styles.appSelectEl}
                >
                  <option value="" disabled>Select a role…</option>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <span className={styles.appSelectArrow}>▾</span>
              </div>
            </Column>

            {/* Experience */}
            <Column gap="8">
              <Text variant="label-strong-xs" onBackground="neutral-medium">
                Years of experience *
              </Text>
              <div className={styles.appSelect}>
                <select
                  value={form.experience}
                  onChange={set("experience")}
                  className={styles.appSelectEl}
                >
                  <option value="" disabled>Select experience level…</option>
                  {EXPERIENCE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <span className={styles.appSelectArrow}>▾</span>
              </div>
            </Column>

            {/* Name + Email */}
            <Flex gap="20" mobileDirection="column">
              <Input id="app-name" name="name" label="Full Name *"
                value={form.name} onChange={set("name")} required />
              <Input id="app-email" name="email" label="Email Address *"
                type="email" value={form.email} onChange={set("email")} required />
            </Flex>

            {/* Phone + LinkedIn */}
            <Flex gap="20" mobileDirection="column">
              <Input id="app-phone" name="phone" label="Phone (optional)"
                value={form.phone} onChange={set("phone")} />
              <Input id="app-linkedin" name="linkedin" label="LinkedIn URL (optional)"
                value={form.linkedin} onChange={set("linkedin")}
                hasPrefix={<TbBrandLinkedin size={15} style={{ color: brand }} />}
              />
            </Flex>

            {/* Portfolio */}
            <Input id="app-portfolio" name="portfolio"
              label="Portfolio / GitHub / Dribbble (optional)"
              value={form.portfolio} onChange={set("portfolio")}
              hasPrefix={<Icon name="link" size="xs" style={{ color: brand }} />}
            />

            {/* CV Upload */}
            <Column gap="8">
              <Text variant="label-strong-xs" onBackground="neutral-medium">
                CV / Resume * — PDF, DOC, or DOCX (max 5 MB)
              </Text>

              {!cv ? (
                <div
                  className={`${styles.dropZone} ${dragOver ? styles.dropZoneActive : ""}`}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={onFileInput}
                    style={{ display: "none" }}
                  />
                  <TbUpload size={24} style={{ color: brand, marginBottom: 10 }} />
                  <Text variant="body-default-s" style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                    Drag &amp; drop your CV here
                  </Text>
                  <Text variant="body-default-xs" onBackground="neutral-weak" style={{ marginTop: 4 }}>
                    or click to browse — PDF, DOC, DOCX only
                  </Text>
                </div>
              ) : (
                <div className={styles.filePreview}>
                  <TbFile size={22} style={{ color: brand, flexShrink: 0 }} />
                  <Column style={{ flex: 1, minWidth: 0 }}>
                    <Text variant="body-default-s" style={{
                      fontWeight: 700, color: "var(--text-primary)",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {cv.name}
                    </Text>
                    <Text variant="body-default-xs" onBackground="neutral-weak">{cv.size}</Text>
                  </Column>
                  <button
                    type="button"
                    onClick={() => { setCv(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                    className={styles.fileRemove}
                    aria-label="Remove file"
                  >
                    <TbX size={16} />
                  </button>
                </div>
              )}

              {fileError && (
                <Flex gap="xs" align="center">
                  <TbAlertCircle size={14} style={{ color: "#f87171", flexShrink: 0 }} />
                  <Text variant="body-default-xs" style={{ color: "#f87171" }}>{fileError}</Text>
                </Flex>
              )}
            </Column>

            {/* Cover Letter */}
            <Textarea
              id="app-cover"
              name="coverLetter"
              label="Cover Letter (optional)"
              value={form.coverLetter}
              onChange={set("coverLetter")}
              placeholder="Tell us about yourself, what excites you about AlgoCrew, and the best thing you've shipped…"
            />

            {/* Success */}
            {success && (
              <Flex gap="s" align="center" background="brand-alpha-weak" padding="m" radius="m" border="brand-alpha-medium">
                <TbCheck size={18} style={{ color: "#06c8e8", flexShrink: 0 }} />
                <Text variant="body-default-s" style={{ color: "#06c8e8" }}>{success}</Text>
              </Flex>
            )}

            {/* Error */}
            {error && (
              <Flex gap="s" align="center" background="neutral-alpha-weak" padding="m" radius="m" border="neutral-alpha-medium">
                <TbAlertCircle size={18} style={{ color: "#f87171", flexShrink: 0 }} />
                <Text variant="body-default-s" style={{ color: "#f87171" }}>{error}</Text>
              </Flex>
            )}

            <Button
              fillWidth size="l" type="submit" loading={loading}
              style={{
                background: "linear-gradient(135deg, #06c8e8 0%, #2563eb 100%)",
                color: "#04121a", WebkitTextFillColor: "#04121a",
                fontWeight: 800,
                boxShadow: "0 10px 28px -5px rgba(6,200,232,0.35)",
              }}
            >
              Submit Application →
            </Button>

            <Text variant="body-default-xs" onBackground="neutral-weak" style={{ textAlign: "center" }}>
              We review every application and respond within 3 business days.
            </Text>
          </Column>
        </form>
      </Column>
    </Flex>
  );
}
