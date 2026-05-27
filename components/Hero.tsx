"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Code2, Globe, Mail, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { PersonalInfo } from '../lib/types';

const useTextScramble = (text: string, trigger: boolean) => {
  const [displayText, setDisplayText] = useState(text);
  useEffect(() => {
    if (!trigger || !text) return;
    const chars = '!<>-_\\/[]{}=+*^?#';
    let frame = 0;
    let iter = 0;
    const id = setInterval(() => {
      setDisplayText(
        text.split('').map((ch, i) =>
          i < iter ? ch : chars[Math.floor(Math.random() * chars.length)]
        ).join('')
      );
      if (frame % 3 === 0) iter++;
      if (iter > text.length) { clearInterval(id); setDisplayText(text); }
      frame++;
    }, 30);
    return () => clearInterval(id);
  }, [text, trigger]);
  return displayText;
};

const BAR_COUNT = 14;

const seededValue = (index: number, offset: number) => {
  const value = Math.sin(index * 997 + offset * 313) * 10000;
  return value - Math.floor(value);
};

const barHeights = Array.from({ length: BAR_COUNT }, (_, index) => 20 + seededValue(index, 1) * 60);

export const Hero = ({ personalInfo, summary }: { personalInfo: PersonalInfo; summary: string }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  const orbX = useTransform(springX, v => v * 0.04);
  const orbY = useTransform(springY, v => v * 0.04);
  const cardRotateX = useTransform(springY, [-400, 400], [4, -4]);
  const cardRotateY = useTransform(springX, [-400, 400], [-4, 4]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const r = sectionRef.current?.getBoundingClientRect();
      if (!r) return;
      mouseX.set(e.clientX - r.left - r.width / 2);
      mouseY.set(e.clientY - r.top - r.height / 2);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  const scrambledRole = useTextScramble(personalInfo.role ?? '', true);
  const summarySentences = summary.split('.').slice(0, 2).join('.') + '.';
  const words = ['Crafting', 'digital', 'experiences'];

  const socials = [
    { Icon: Code2,  label: 'GitHub',   sub: 'Source code',   href: personalInfo.github },
    { Icon: Globe,  label: 'LinkedIn', sub: 'Professional',  href: personalInfo.linkedin },
    { Icon: Mail,   label: 'Email',    sub: 'Say hello',     href: `mailto:${personalInfo.email}` },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden w-full"
    >
      {/* ── Grid overlay ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Noise grain ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
        }}
      />

      {/* ── Parallax gradient orbs ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-full"
        style={{
          width: 700,
          height: 700,
          top: '-10%',
          left: '-15%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 60%)',
          x: orbX,
          y: orbY,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: '-5%',
          right: '-5%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)',
        }}
      />

      {/* ══ Main layout (Removed horizontal padding since parent <main> handles it) ══ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto py-24 flex flex-col lg:flex-row lg:items-center gap-16 xl:gap-24">

        {/* ─── Left: Copy ─── */}
        <div className="flex-1 min-w-0">

          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-4 mb-10"
          >
            <span className="block h-[1px] w-10 bg-indigo-500/50" />
            <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-indigo-400">
              {scrambledRole}
            </span>
            <span
              className="block w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{ boxShadow: '0 0 10px rgba(52,211,153,0.6)', animation: 'pulse 2s infinite' }}
            />
          </motion.div>

          {/* Headline — word-by-word reveal */}
          <h1 className="font-black leading-[0.9] tracking-tight mb-4 overflow-hidden" style={{ fontSize: 'clamp(3.4rem, 8vw, 7rem)' }}>
            {words.map((word, i) => (
              <span key={word} className="block overflow-hidden pb-2">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.05 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={
                    i === 0 ? { color: '#fff' } :
                    i === 1 ? { color: 'rgba(255,255,255,0.22)' } :
                    {
                      background: 'linear-gradient(125deg, #818cf8 0%, #22d3ee 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Italic sub-line */}
          <div className="overflow-hidden mb-10">
            <motion.p
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="italic font-medium text-white/30"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
            >
              with precision.
            </motion.p>
          </div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.65 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-[460px] mb-12 pl-5 border-l-2 border-indigo-500/30"
          >
            {summarySentences}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Primary CTA */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full overflow-hidden bg-white text-black text-xs font-bold uppercase tracking-widest shadow-lg shadow-white/5"
            >
              <span
                className="absolute inset-0 translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-500"
                style={{ background: 'linear-gradient(125deg, #6366f1, #22d3ee)' }}
              />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">View Works</span>
              <ArrowRight
                size={16}
                className="relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all duration-500"
              />
            </motion.a>

            {/* Ghost CTA */}
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/10 bg-white/[0.02] text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-colors duration-300"
            >
              Get in Touch
              <Mail size={14} />
            </motion.a>
          </motion.div>
        </div>

        {/* ─── Right: Info Card (Upgraded to Bento UI) ─── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-[320px] shrink-0"
          style={{ perspective: 1000 }}
        >
          <motion.div
            style={{ rotateX: cardRotateX, rotateY: cardRotateY }}
            className="relative rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] shadow-2xl backdrop-blur-xl group"
          >
            {/* Internal ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative p-6 sm:p-8 z-10">
              {/* Status row */}
              <div className="flex items-center gap-3 pb-5 mb-5 border-b border-white/5">
                <span
                  className="block w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0"
                  style={{ boxShadow: '0 0 12px rgba(52,211,153,0.6)', animation: 'pulse 2s infinite' }}
                />
                <span className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Available for work
                </span>
              </div>

              {/* Social links */}
              <div className="space-y-2">
                {socials.map(({ Icon, label, sub, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={label !== 'Email' ? '_blank' : undefined}
                    rel="noreferrer"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65 + i * 0.08 }}
                    className="group/link flex items-center justify-between px-4 py-3 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover/link:bg-indigo-500/20 group-hover/link:text-indigo-300 transition-colors">
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white mb-0.5">{label}</div>
                        <div className="text-xs font-medium text-slate-500">{sub}</div>
                      </div>
                    </div>
                    <ExternalLink
                      size={14}
                      className="text-slate-600 group-hover/link:text-slate-300 transition-colors group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </motion.a>
                ))}
              </div>

              {/* Activity bar chart */}
              <div className="mt-5 pt-5 border-t border-white/5">
                <div className="flex items-end gap-1 h-12">
                  {barHeights.map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-sm bg-indigo-500/30"
                      style={{ height: h * 0.48 }}
                      animate={{ scaleY: [1, 0.4 + seededValue(i, 2) * 0.5, 1] }}
                      transition={{
                        duration: 1.2 + seededValue(i, 3) * 1.2,
                        repeat: Infinity,
                        delay: i * 0.07,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-600 mt-3 block text-center">
                  System Activity
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none hidden sm:flex"
      >
        <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-slate-600">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}
        />
      </motion.div>
    </section>
  );
};