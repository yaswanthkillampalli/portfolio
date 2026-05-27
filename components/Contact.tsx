"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Send, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { PersonalInfo } from "../lib/types";

const stackHighlights = [
  "Next.js",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Supabase",
  "Python",
  "FastAPI",
  "Tailwind CSS",
  "Azure",
  "Cloudflare Tunnels",
];

const socialLinks = [
  { label: "GitHub", key: "github" as keyof PersonalInfo },
  { label: "LinkedIn", key: "linkedin" as keyof PersonalInfo },
  { label: "Portfolio", key: "portfolio" as keyof PersonalInfo },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const Contact = ({ info }: { info: PersonalInfo }) => {
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const result = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send your message.");
      }

      toast.success(result.message ?? "Message sent successfully.");
      setFormValues({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-violet-600/5 blur-[120px]" />
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 relative z-10">
        {/* ── Left: CTA + links ── */}
        <motion.div {...fadeUp(0)} className="flex flex-col justify-between gap-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="block text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">
                Open for collaboration
              </span>
              <div className="h-[1px] w-12 bg-indigo-500/30"></div>
            </div>

            <motion.h2
              {...fadeUp(0.1)}
              className="mb-8 text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
            >
              Let&apos;s
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 italic pr-4">
                build it.
              </span>
            </motion.h2>

            <motion.p {...fadeUp(0.2)} className="max-w-md text-base leading-relaxed text-slate-400">
              Need a Next.js interface, a MERN stack app, an AI workflow, or a
              reliable backend with clean deployment? Let&apos;s shape it together.
            </motion.p>
          </div>

          {/* Email link */}
          <motion.div {...fadeUp(0.3)} className="space-y-8">
            <a
              href={`mailto:${info.email}`}
              className="group inline-flex items-center gap-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <Mail size={20} />
              </div>
              <span className="border-b border-transparent pb-0.5 text-base font-medium text-slate-300 transition-all duration-300 group-hover:border-indigo-400/50 group-hover:text-white">
                {info.email}
              </span>
            </a>

            {/* Social pills */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, key }) => (
                <a
                  key={label}
                  href={info[key] as string}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                >
                  {label}
                  <ArrowUpRight
                    size={14}
                    className="opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: Form Card ── */}
        <motion.div
          {...fadeUp(0.2)}
          className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] shadow-2xl shadow-black/40 backdrop-blur-xl group"
        >
          {/* Internal ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative p-8 sm:p-10 z-10">
            {/* Card header */}
            <div className="mb-8 flex items-start justify-between gap-4 border-b border-white/5 pb-6">
              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.25em] text-indigo-300">
                  Stack snapshot
                </span>
                <p className="mt-2 text-sm text-slate-400">
                  Technologies I use to ship fast and keep systems dependable.
                </p>
              </div>
              <span className="shrink-0 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                Ready
              </span>
            </div>

            {/* Stack tags */}
            <div className="mb-10 flex flex-wrap gap-2.5">
              {stackHighlights.map((stack) => (
                <span
                  key={stack}
                  className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-200 cursor-default"
                >
                  {stack}
                </span>
              ))}
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {[
                {
                  label: "Your name",
                  type: "text",
                  name: "name",
                  placeholder: "Yaswanth Vardhan",
                },
                {
                  label: "Your email",
                  type: "email",
                  name: "email",
                  placeholder: "you@example.com",
                },
                {
                  label: "Project name",
                  type: "text",
                  name: "subject",
                  placeholder: "Next.js dashboard, AI assistant, full-stack platform…",
                },
              ].map(({ label, type, name, placeholder }) => (
                <div key={label} className="space-y-2">
                  <label className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formValues[name as keyof Pick<ContactFormValues, "name" | "email" | "subject">]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 hover:border-white/10 focus:border-indigo-500/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              ))}

              <div className="space-y-2">
                <label className="ml-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  What are you building?
                </label>
                <textarea
                  rows={3}
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  placeholder="Describe the workflow, users, timeline, and any stack preferences…"
                  className="w-full resize-none rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 hover:border-white/10 focus:border-indigo-500/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative mt-4 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-indigo-500/20 bg-indigo-500/10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-300 transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/20 hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  {isSubmitting ? "Sending..." : "Start Collaboration"}
                  <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};