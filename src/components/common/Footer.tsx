import { FaHeart, FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 font-sans text-zinc-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-zinc-800/50">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold text-white tracking-tight">
              Movie<span className="text-red-500"> Base</span>
            </span>
            <p className="text-xs text-zinc-500 max-w-sm text-center md:text-left leading-relaxed">
              Discover, track, and stream your favorite movies and TV series all in one place.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium">
            <span className="hover:text-amber-400 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-amber-400 cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-amber-400 cursor-pointer transition-colors">
              Contact
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/80 cursor-pointer transition-all">
              <FaGithub className="w-4 h-4" />
            </div>
            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/80 cursor-pointer transition-all">
              <FaTwitter className="w-4 h-4" />
            </div>
            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/80 cursor-pointer transition-all">
              <FaDiscord className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-zinc-300 font-medium">Movie Base</span>. All rights reserved.
          </p>

          <p className="inline-flex items-center gap-1 text-center sm:text-right">
            Built with <FaHeart className="text-red-500 w-3 h-3 inline animate-pulse" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;