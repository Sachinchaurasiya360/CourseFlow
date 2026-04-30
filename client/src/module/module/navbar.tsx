import { useState } from "react";

export default function Navbar({ NavbarProps, Login, Register }: any) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#0a0f1e]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <span className="text-[17px] font-black tracking-tight text-white">
              Course<span className="text-blue-400">Flow</span>
            </span>
          </a>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NavbarProps.map((item: any, index: number) => (
              <a
                key={index}
                href={item.path}
                className="px-4 py-2 text-sm font-medium text-white/55 hover:text-white hover:bg-white/[0.06] rounded-md transition-all duration-150"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white/55 hover:text-white hover:bg-white/[0.06] rounded-md transition-all duration-150"
            >
              {Login}
            </a>
            <a
              href="/register"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-150 shadow-md shadow-blue-600/25"
            >
              {Register} &rarr;
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/[0.07] py-4 space-y-1">
            {NavbarProps.map((item: any, index: number) => (
              <a
                key={index}
                href={item.path}
                className="block px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] rounded-md transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-white/[0.07] flex flex-col gap-2">
              <a
                href="/login"
                className="block px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] rounded-md transition-colors"
              >
                {Login}
              </a>
              <a
                href="/register"
                className="block text-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
              >
                {Register}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}