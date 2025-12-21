import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
          Yash.dev
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#experience" className="hover:text-white transition">Experience</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </nav>
  );
}