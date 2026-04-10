const Footer = () => {
  return (
    <footer className=" text-gray-400 border-t border-zinc-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">MovieApp</span>. All rights
          reserved.
        </p>

        <div className="flex gap-6 text-xs text-gray-500">
          <span className="hover:text-white cursor-pointer transition">
            Privacy
          </span>
          <span className="hover:text-white cursor-pointer transition">
            Terms
          </span>
          <span className="hover:text-white cursor-pointer transition">
            Contact
          </span>
        </div>

        <p className="text-xs text-gray-500">Built with ❤️ using React</p>
      </div>
    </footer>
  );
};

export default Footer;
