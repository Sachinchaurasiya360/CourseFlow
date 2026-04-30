import Navbar from "../module/navbar";
import { GlowyWavesHero } from "@/components/ui/glowy-waves-hero";

const navbarItems = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Courses", path: "/courses" },
  { name: "Pricing", path: "/pricing" },
];

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar NavbarProps={navbarItems} Login="Log in" Register="Get Started" />

      {/* --- Glowy Waves Hero --- */}
      <GlowyWavesHero />


      {/* --- App Preview --- */}
      <section className="bg-[#0a0f1e] pt-4 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400 mb-3">Product</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Your course business, at a glance</h2>
            <p className="text-neutral-400 text-lg max-w-xl mx-auto">One dashboard to manage students, revenue, and content � nothing else needed.</p>
          </div>

          {/* Browser mockup */}
          <div className="rounded-2xl border border-white/10 shadow-2xl shadow-blue-900/20 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#141b2d] border-b border-white/7">
              <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
              <div className="flex-1 ml-3 bg-white/6 rounded-md h-7 flex items-center px-3 max-w-xs mx-auto">
                <div className="w-3 h-3 rounded-full bg-green-400/60 mr-2 shrink-0"></div>
                <span className="text-xs text-white/30 font-mono">app.courseflow.io/dashboard</span>
              </div>
            </div>

            {/* App content */}
            <div className="flex h-85 bg-[#0d1526]">
              {/* Sidebar */}
              <div className="w-52 bg-[#0a0f1e] border-r border-white/6 p-4 flex flex-col gap-1 shrink-0">
                <div className="flex items-center gap-2 px-3 py-2 mb-3">
                  <div className="w-6 h-6 rounded-md bg-blue-600"></div>
                  <span className="text-sm font-black text-white">CourseFlow</span>
                </div>
                {[
                  { label: "Dashboard", active: true },
                  { label: "Courses", active: false },
                  { label: "Students", active: false },
                  { label: "Analytics", active: false },
                  { label: "Payments", active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${item.active ? "bg-blue-600/20 border border-blue-600/30" : ""}`}
                  >
                    <div className={`w-4 h-4 rounded ${item.active ? "bg-blue-400" : "bg-white/10"}`}></div>
                    <div className={`h-2.5 rounded w-full ${item.active ? "bg-blue-300/60" : "bg-white/10"}`}></div>
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-6 space-y-4 overflow-hidden">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Total Students", value: "2,481", accent: "bg-blue-500/15 border-blue-500/25", text: "text-blue-300" },
                    { label: "Revenue", value: "$8,320", accent: "bg-green-500/15 border-green-500/25", text: "text-green-300" },
                    { label: "Completion", value: "78%", accent: "bg-purple-500/15 border-purple-500/25", text: "text-purple-300" },
                  ].map((card) => (
                    <div key={card.label} className={`${card.accent} border rounded-xl p-4`}>
                      <p className="text-xs text-white/40 mb-1">{card.label}</p>
                      <p className={`text-2xl font-black ${card.text}`}>{card.value}</p>
                    </div>
                  ))}
                </div>

                {/* Course list */}
                <div className="bg-white/4 rounded-xl border border-white/7 overflow-hidden">
                  {["Intro to React", "Advanced TypeScript", "UI/UX Design"].map((course, i) => (
                    <div
                      key={course}
                      className={`flex items-center justify-between px-4 py-3 ${i !== 2 ? "border-b border-white/6" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/30"></div>
                        <div>
                          <p className="text-sm font-semibold text-white">{course}</p>
                          <p className="text-xs text-white/30">Active � {[312, 198, 420][i]} students</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-28 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${[72, 58, 90][i]}%` }}></div>
                        </div>
                        <span className="text-xs text-white/40 w-8 text-right">{[72, 58, 90][i]}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features --- */}
      <section className="bg-[#060c1a] py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400 mb-3">Features</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Everything you need to succeed</h2>
            <p className="text-neutral-400 text-lg max-w-xl mx-auto">Build your education business without juggling a dozen different tools.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Course Builder",
                desc: "Drag-and-drop editor. Add videos, quizzes, and assignments without writing a single line of code.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                ),
              },
              {
                title: "Live Analytics",
                desc: "See who is watching, where they drop off, and what content drives the highest completion rates.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                ),
              },
              {
                title: "Built-in Payments",
                desc: "Sell one-time purchases or subscriptions. Stripe-powered checkout with zero configuration needed.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                ),
              },
              {
                title: "Certificates",
                desc: "Auto-issue branded certificates on course completion to keep students motivated and coming back.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                ),
              },
              {
                title: "Community",
                desc: "Foster deeper engagement with built-in discussion forums and per-lesson Q&A threads.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                ),
              },
              {
                title: "Mobile Ready",
                desc: "Every course looks stunning on any screen size, right out of the box � no extra work required.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 9h3" />
                ),
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group bg-white/3 hover:bg-white/6 border border-white/7 hover:border-blue-500/40 rounded-2xl p-7 transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/25 flex items-center justify-center mb-5 group-hover:bg-blue-600/25 transition-colors">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    {f.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Social Proof --- */}
      <section className="bg-[#0a0f1e] border-t border-white/5 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/30 mb-10">Trusted by educators worldwide</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                quote: "CourseFlow cut my launch time from weeks to a single afternoon. The builder is genuinely intuitive.",
                name: "Sarah M.",
                role: "UX Design Educator � 4,200 students",
              },
              {
                quote: "I moved from Teachable and never looked back. The analytics alone are worth the switch.",
                name: "James K.",
                role: "Full-Stack Dev Instructor � 8,100 students",
              },
              {
                quote: "My revenue doubled in three months. The built-in checkout removes every friction point.",
                name: "Priya R.",
                role: "Business Coach � 1,900 students",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white/3 border border-white/7 rounded-2xl p-7">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5">"{t.quote}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/35 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="bg-[#060c1a] border-t border-white/5 py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 uppercase tracking-[0.2em] mb-8">
            Get started free
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
            Your first course is<br /><span className="text-blue-400">on us.</span>
          </h2>
          <p className="text-neutral-400 text-lg mb-10">
            Free forever for your first course. No credit card required. Launch in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/register"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-12 rounded-xl text-base shadow-xl shadow-blue-600/25 transition-all"
            >
              Create Your Course
            </a>
            <a
              href="/features"
              className="w-full sm:w-auto border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-semibold py-4 px-10 rounded-xl text-base transition-all"
            >
              See all features
            </a>
          </div>
          <p className="mt-6 text-xs text-white/25">No credit card � Free plan always available � Cancel anytime</p>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#0a0f1e] text-neutral-400">

        {/* CTA Strip */}
        <div className="border-b border-white/6 bg-white/1.5">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-semibold text-lg">Ready to start teaching?</p>
              <p className="text-sm mt-1 text-neutral-400">Join 10,000+ creators already on CourseFlow.</p>
            </div>
            <a
              href="/register"
              className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-all shadow-lg shadow-blue-600/20"
            >
              Get Started Free
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <span className="text-[17px] font-black text-white">Course<span className="text-blue-400">Flow</span></span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs mb-6">
                The modern platform for building, launching, and monetizing online courses. No tech skills needed.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3">
                {[
                  { label: "Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                  { label: "GitHub", path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
                  { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 hover:bg-white/6 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <p className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Product</p>
              <ul className="space-y-3.5 text-sm">
                {["Features", "Pricing", "Changelog", "Roadmap"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-150">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <p className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Resources</p>
              <ul className="space-y-3.5 text-sm">
                {["Documentation", "Blog", "Community", "Support"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-150">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-white font-semibold mb-5 text-xs uppercase tracking-widest">Company</p>
              <ul className="space-y-3.5 text-sm">
                {["About", "Careers", "Privacy Policy", "Terms"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors duration-150">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/6 pt-8 gap-3 text-xs text-neutral-500">
            <p>� {new Date().getFullYear()} CourseFlow, Inc. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
