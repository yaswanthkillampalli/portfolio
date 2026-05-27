"use client";

import { motion } from 'motion/react';
import { Menu, X, FileText } from 'lucide-react';
import { useState } from 'react';
import { PersonalInfo } from '../lib/types';

const resumeUrl = "https://drive.google.com/file/d/1jwkPpF3Pgfkh2_4gbPOPqvwgl8IWTnmX/view?usp=drive_link";

const navLinks = [
  { name: 'Expertise', href: '#skills' },
  { name: 'Works', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = ({ personalInfo }: { personalInfo: PersonalInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass">
      <div className=" mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-lg flex items-center justify-center font-bold text-white text-sm">
            {personalInfo.name.charAt(0)}
          </div>
          <span className="font-semibold tracking-tight text-white uppercase text-xs">{personalInfo.name}</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-400 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            <FileText size={12} />
            See Resume
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 w-full bg-[#050505] border-b border-white/5 px-6 py-8 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary flex w-full items-center justify-center gap-2 py-3"
          >
            <FileText size={14} />
            See Resume
          </a>
        </motion.div>
      )}
    </nav>
  );
};
