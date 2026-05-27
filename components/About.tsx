"use client";

import { motion } from "motion/react";
import { PersonalInfo } from "../lib/types";

export const About = ({
	info,
	summary,
}: {
	info: PersonalInfo;
	summary: string;
}) => {
	const fadeUp = (delay = 0) => ({
		initial: { opacity: 0, y: 24 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true },
		transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
	});

	return (
		<section id="about" className="relative py-32 overflow-hidden">
			{/* Ambient background glow */}
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/8 blur-[120px]" />
				<div className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-violet-500/6 blur-[100px]" />
			</div>

			<div className="grid grid-cols-1 items-center gap-20 md:grid-cols-2">
				{/* ── Image column ── */}
				<motion.div
					initial={{ opacity: 0, scale: 0.96 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
					className="relative mx-auto w-full max-w-sm md:max-w-none"
				>
					{/* Layered glows behind the card */}
					<div className="absolute inset-0 -z-10 scale-90 rounded-[48px] bg-indigo-500/20 blur-[60px]" />
					<div className="absolute inset-0 -z-10 scale-75 rounded-[48px] bg-violet-600/15 blur-[40px]" />

					{/* Card */}
					<div className="group relative overflow-hidden rounded-[40px] border border-white/[0.08] bg-white/[0.03] p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl">
						{/* Shimmer border highlight */}
						<div className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="/pfp.png"
							alt={info.name}
							className="h-auto w-full rounded-[34px] grayscale transition-all duration-700 group-hover:grayscale-0"
						/>

						{/* Bottom overlay label */}
						<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/[0.06] bg-black/50 px-4 py-3 backdrop-blur-xl">
							<div>
								<p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-300">
									Available for work
								</p>
								<p className="text-sm font-semibold text-white">{info.name}</p>
							</div>
							<span className="relative flex h-2.5 w-2.5">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
								<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
							</span>
						</div>
					</div>
				</motion.div>

				{/* ── Text column ── */}
				<div className="flex flex-col gap-0">
					<motion.p
						{...fadeUp(0.05)}
						className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-400"
					>
						About Me
					</motion.p>

					<motion.h2
						{...fadeUp(0.12)}
						className="mb-7 text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl"
					>
						Beyond
						<br />
						the{" "}
						<em className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
							Code.
						</em>
					</motion.h2>

					<motion.p
						{...fadeUp(0.18)}
						className="mb-10 max-w-md text-base leading-relaxed text-slate-400"
					>
						{summary}
					</motion.p>

					{/* Stats */}
					<motion.div
						{...fadeUp(0.24)}
						className="mb-8 flex gap-4"
					>
						{[
							{ value: "10+", label: "Projects Shipped" },
							{ value: "2", label: "Internships" },
						].map(({ value, label }) => (
							<div
								key={label}
								className="flex flex-1 flex-col gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-4"
							>
								<span className="text-4xl font-bold tracking-tight text-white">
									{value}
								</span>
								<span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
									{label}
								</span>
							</div>
						))}
					</motion.div>

					{/* Location / Pronouns card */}
					<motion.div
						{...fadeUp(0.3)}
						className="relative overflow-hidden rounded-2xl border border-indigo-500/[0.12] bg-gradient-to-br from-indigo-500/[0.07] to-violet-500/[0.04] p-px"
					>
						<div className="rounded-[15px] bg-black/20 backdrop-blur-sm">
							<div className="flex divide-x divide-white/[0.05]">
								{[
									{ label: "Location", value: info.location },
									{ label: "Pronouns", value: info.pronouns },
								].map(({ label, value }) => (
									<div key={label} className="flex-1 px-5 py-4">
										<span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.25em] text-indigo-400">
											{label}
										</span>
										<p className="text-sm font-semibold text-white">{value}</p>
									</div>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};