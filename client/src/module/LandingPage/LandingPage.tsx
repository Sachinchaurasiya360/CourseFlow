import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Testimonials } from "@/components/ui/unique-testimonial";
import "./LandingPage.css";

// ── Data ─────────────────────────────────────────────────────────────────────

// words that rotate after "you want ___" in the hero headline
const ROTATING_WORDS = ["next", "love", "deserve", "dream of", "actually want"];

// real profile photos for the hero social-proof avatar stack
const HERO_AVATARS = [
  "https://images.unsplash.com/photo-1564490215983-296e5f56b623?w=120&q=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1609770653328-a4d1dd377970?w=120&q=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1582828835690-22a88e8dd257?w=120&q=80&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1533128361669-69c065857a13?w=120&q=80&fit=crop&crop=faces",
];

const COURSES = [
  {
    id: 1,
    title: "Full-Stack Web Development with React & Node",
    instructor: "Sachin Chaurasiya",
    duration: "42 hours",
    rating: 4.9,
    reviews: 2847,
    price: 899,
    tag: "Bestseller",
    level: "Intermediate",
  },
  {
    id: 2,
    title: "Data Science & Machine Learning Fundamentals",
    instructor: "Dr. Priya Sharma",
    duration: "38 hours",
    rating: 4.8,
    reviews: 1923,
    price: 799,
    tag: "New",
    level: "Beginner",
  },
  {
    id: 3,
    title: "System Design for Senior Engineers",
    instructor: "Marcus Williams",
    duration: "24 hours",
    rating: 4.9,
    reviews: 1456,
    price: 999,
    tag: null,
    level: "Advanced",
  },
];

const MODULES = [
  {
    id: 1,
    title: "Module 1: Foundations & Environment Setup",
    lessons: [
      { title: "Course overview and learning path", duration: "8 min" },
      { title: "Setting up your development environment", duration: "22 min" },
      { title: "Understanding the JavaScript runtime", duration: "18 min" },
      { title: "Git workflow and version control", duration: "15 min" },
    ],
  },
  {
    id: 2,
    title: "Module 2: React Core Concepts",
    lessons: [
      { title: "Components, props, and state", duration: "34 min" },
      { title: "Hooks in depth: useState, useEffect, useContext", duration: "45 min" },
      { title: "Performance: useMemo and useCallback", duration: "28 min" },
      { title: "Building real-world forms with validation", duration: "52 min" },
    ],
  },
  {
    id: 3,
    title: "Module 3: Node.js & REST APIs",
    lessons: [
      { title: "Express.js fundamentals", duration: "30 min" },
      { title: "Database design with PostgreSQL", duration: "42 min" },
      { title: "Authentication with JWT and sessions", duration: "38 min" },
      { title: "API security and rate limiting", duration: "25 min" },
    ],
  },
  {
    id: 4,
    title: "Module 4: Deployment & Production",
    lessons: [
      { title: "Docker and containerization", duration: "35 min" },
      { title: "CI/CD with GitHub Actions", duration: "28 min" },
      { title: "Deploying to AWS and Vercel", duration: "40 min" },
    ],
  },
];

const PLANS = [
  {
    name: "Single Course",
    price: 899,
    period: "one-time",
    description: "Full access to one course of your choice.",
    features: [
      "Lifetime access to course content",
      "Certificate of completion",
      "Community forum access",
      "Project code and resources",
    ],
    featured: false,
    cta: "Buy Course",
  },
  {
    name: "All-Access",
    price: 499,
    period: "per month",
    description: "Unlimited access to every course on the platform.",
    features: [
      "All current and future courses",
      "Priority support and Q&A",
      "Live monthly office hours",
      "All certificates included",
      "1-on-1 career coaching session",
    ],
    featured: true,
    cta: "Start All-Access",
  },
  {
    name: "Team",
    price: 799,
    period: "per seat / month",
    description: "For teams of 5 or more with centralized billing.",
    features: [
      "Everything in All-Access",
      "Admin dashboard and analytics",
      "Custom learning paths",
      "Dedicated account manager",
    ],
    featured: false,
    cta: "Contact Sales",
  },
];

const FAQS = [
  {
    q: "How long do I have access to the courses?",
    a: "You get lifetime access to any course you purchase individually. All-Access subscribers retain access for as long as their subscription is active. If you cancel, you lose access to courses you haven't purchased separately.",
  },
  {
    q: "Do courses include certificates?",
    a: "Yes. Every course includes a shareable certificate of completion for LinkedIn or your resume. Certificates are generated automatically when you complete all course requirements.",
  },
  {
    q: "What if I don't find the course useful?",
    a: "We offer a 30-day full refund, no questions asked. If you've completed less than 30% of the course and aren't satisfied, email us and we'll process your refund within 2 business days.",
  },
  {
    q: "Are courses updated when technologies change?",
    a: "Yes. All courses are actively maintained. When a major framework version ships or best practices shift, affected modules are updated. You'll receive an email when courses you own get significant updates.",
  },
  {
    q: "Is there a student or team discount?",
    a: "Students with a valid .edu email get 40% off any course or subscription. Teams of 10+ get custom pricing — email sales@courseflow.dev and we'll put together a plan.",
  },
];

// ── Icons ─────────────────────────────────────────────────────────────────────

const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6" stroke="#6b7280" strokeWidth="1.2" />
    <path d="M7 4V7L9 9" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconStar = ({ filled = true }: { filled?: boolean }) => (
  <svg width="13" height="13" viewBox="0 0 12 12" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="1">
    <path d="M6 1L7.5 4.5H11L8 6.5L9 10L6 8L3 10L4 6.5L1 4.5H4.5L6 1Z" />
  </svg>
);

const IconCheck = ({ accent }: { accent?: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="7.5" fill={accent ? "#1d4ed8" : "#eff6ff"} />
    <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke={accent ? "white" : "#1d4ed8"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevron = () => (
  <svg className="cf-accordion-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="#1d4ed8" />
    <path d="M7 14L12 9L17 14L22 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 19L12 14L17 19L22 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeBenefit, setActiveBenefit] = useState<number | null>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length),
      1600
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cf-root">

      {/* ── HEADER ── */}
      <header className="cf-header">
        <div className="cf-container cf-header-inner">
          <a href="/" className="cf-logo">
            <Logo />
            <span className="cf-logo-text">CourseFlow</span>
          </a>
          <nav className="cf-nav">
            <a href="#courses">Courses</a>
            <a href="#pricing">Pricing</a>
            <a href="#reviews">Reviews</a>
            <a href="#about">About</a>
          </nav>
          <div className="cf-header-actions">
            <a href="/login" className="cf-btn-ghost">Log in</a>
            <a href="/signup" className="cf-btn-primary">Get Started</a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="cf-hero">
        <div className="cf-hero-bg" aria-hidden="true">
          <div className="cf-hero-glow cf-hero-glow-1" />
          <div className="cf-hero-glow cf-hero-glow-2" />
        </div>
        <div className="cf-container cf-hero-inner">
          <div className="cf-hero-text">
            <h1 className="cf-hero-headline">
              Courses for the <em>job</em><br />
              you want{" "}
              <span className="cf-rotating-word">
                <AnimatePresence mode="wait">
                  <motion.em
                    key={wordIndex}
                    initial={{ y: "0.55em", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-0.55em", opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.em>
                </AnimatePresence>
              </span>
              .
            </h1>
            <p className="cf-hero-sub">
              We build courses with engineers who do this work every day 
              the kind that cover the messy parts most tutorials skip. Pick a
              topic, work through it at your pace, and keep it for good.
            </p>
            <div className="cf-hero-actions">
              <a href="/signup" className="cf-btn-primary cf-btn-lg">
                Browse Courses <IconArrow />
              </a>
              <a href="#curriculum" className="cf-btn-outline cf-btn-lg">See the Curriculum</a>
            </div>
            <div className="cf-hero-social">
              <div className="cf-avatar-stack">
                {HERO_AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="cf-avatar-stack-item"
                    style={{ zIndex: 4 - i }}
                  />
                ))}
                <span className="cf-avatar-stack-more">40k+</span>
              </div>
              <div className="cf-hero-social-text">
                <div className="cf-hero-social-stars">
                  {Array.from({ length: 5 }).map((_, j) => <IconStar key={j} />)}
                  <strong>4.9</strong>
                </div>
                <span>Loved by 40,000+ engineers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="cf-trust">
        <div className="cf-container">
          <div className="cf-trust-stats">
            <div className="cf-stat">
              <div className="cf-stat-number">40,000+</div>
              <div className="cf-stat-label">Students enrolled</div>
            </div>
            <div className="cf-stat-divider" />
            <div className="cf-stat">
              <div className="cf-stat-number">91%</div>
              <div className="cf-stat-label">Completion rate</div>
            </div>
            <div className="cf-stat-divider" />
            <div className="cf-stat">
              <div className="cf-stat-number">4.9 / 5</div>
              <div className="cf-stat-label">Average rating</div>
            </div>
            <div className="cf-stat-divider" />
            <div className="cf-stat">
              <div className="cf-stat-number">300+</div>
              <div className="cf-stat-label">Hours of content</div>
            </div>
          </div>
          <div className="cf-trust-logos">
            <span className="cf-trust-label">Our students work at</span>
            <div className="cf-logos-marquee">
              <div className="cf-logos-track">
                {["Stripe", "Shopify", "Vercel", "Notion", "Linear", "GitHub", "Airbnb", "Figma"].concat(
                  ["Stripe", "Shopify", "Vercel", "Notion", "Linear", "GitHub", "Airbnb", "Figma"]
                ).map((co, i) => (
                  <span key={i} className="cf-company-logo" aria-hidden={i >= 8}>{co}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      <section id="courses" className="cf-section">
        <div className="cf-container">
          <div className="cf-section-header">
            <div className="cf-section-tag">Courses</div>
            <h2 className="cf-section-title">Built for working engineers.</h2>
            <p className="cf-section-sub">
              Every course is structured around real skills with projects you can ship.
            </p>
          </div>
          <div className="cf-courses-marquee">
            <div className="cf-courses-track">
              {COURSES.concat(COURSES).map((course, i) => (
                <div
                  key={i}
                  className="cf-course-card"
                  aria-hidden={i >= COURSES.length}
                >
                  <div className="cf-course-card-header">
                    {course.tag && <span className="cf-course-tag">{course.tag}</span>}
                    <span className="cf-course-level">{course.level}</span>
                  </div>
                  <h3 className="cf-course-title">{course.title}</h3>
                  <p className="cf-course-instructor">by {course.instructor}</p>
                  <div className="cf-course-meta">
                    <span className="cf-course-duration">
                      <IconClock />
                      {course.duration}
                    </span>
                    <span className="cf-course-rating">
                      <IconStar />
                      {course.rating}{" "}
                      <span className="cf-rating-count">({course.reviews.toLocaleString()})</span>
                    </span>
                  </div>
                  <div className="cf-course-footer">
                    <span className="cf-course-price">₹{course.price}</span>
                    <button className="cf-btn-primary cf-btn-sm">Enroll Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cf-courses-footer">
            <a href="#" className="cf-link-arrow">
              View all 24 courses <IconArrow />
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="cf-section cf-section-alt">
        <div className="cf-container">
          <motion.div
            className="cf-section-header"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cf-section-tag">Why CourseFlow</div>
            <h2 className="cf-section-title">The difference is in the depth.</h2>
          </motion.div>
          <motion.div className="cf-benefits-grid" layout>
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 2L13.5 8.5H20L14.5 12.5L16.5 19L11 15L5.5 19L7.5 12.5L2 8.5H8.5L11 2Z"
                      stroke="#1d4ed8" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Practical, job-ready skills",
                desc: "Courses are structured around what senior engineers actually need to know — not certification checkboxes or contrived toy projects.",
                detail: "Each module ends with a project you'd actually build on the job — a rate limiter, an auth flow, a deploy pipeline — reviewed against the patterns real teams ship to production.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="2" y="6" width="18" height="14" rx="2" stroke="#1d4ed8" strokeWidth="1.5" />
                    <path d="M7 6V4C7 2.9 7.9 2 9 2H13C14.1 2 15 2.9 15 4V6" stroke="#1d4ed8" strokeWidth="1.5" />
                    <path d="M11 10V16M8 13H14" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "Industry-relevant content",
                desc: "The syllabus is reviewed quarterly with input from engineers at Stripe, Vercel, and similar companies. When practices change, we update.",
                detail: "We track changelogs, RFCs, and framework releases. When a major version ships or a best practice shifts, the affected lessons are re-recorded — not patched with a footnote.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 2C6 2 2 6 2 11s4 9 9 9 9-4 9-9" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M16 2V8H20" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 2L14 8" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "Lifetime access, forever",
                desc: "Pay once and keep the course permanently — including all future updates. No re-purchase when a new version ships.",
                detail: "Buy once and the course is yours — including every future update, new module, and re-recording. No subscription creep, no 'upgrade to keep watching' the day a new version lands.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="#1d4ed8" strokeWidth="1.5" />
                    <circle cx="15" cy="14" r="6" stroke="#1d4ed8" strokeWidth="1.5" />
                  </svg>
                ),
                title: "Active community",
                desc: "Every enrollment includes access to a Slack community with 12,000+ members. Ask questions, share projects, find collaborators.",
                detail: "A 12,000-member Slack where instructors answer questions daily, students pair on projects, and hiring managers post roles. Your access stays live for as long as you own the course.",
              },
            ].map((b, i) => {
              const isActive = activeBenefit === i;
              return (
                <motion.div
                  key={i}
                  layout
                  onClick={() => setActiveBenefit(isActive ? null : i)}
                  className={`cf-benefit-card${isActive ? " cf-benefit-active" : ""}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  whileHover={isActive ? undefined : { y: -4 }}
                  transition={{
                    layout: { type: "spring", stiffness: 280, damping: 32, mass: 0.9 },
                    default: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  <motion.div
                    layout="position"
                    className="cf-benefit-icon"
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.15, ease: "backOut" }}
                  >
                    {b.icon}
                  </motion.div>
                  <motion.h3 layout="position" className="cf-benefit-title">
                    {b.title}
                    <span className="cf-benefit-toggle" aria-hidden>
                      {isActive ? "–" : "+"}
                    </span>
                  </motion.h3>
                  <motion.p layout="position" className="cf-benefit-desc">{b.desc}</motion.p>
                  <AnimatePresence initial={false} mode="popLayout">
                    {isActive && (
                      <motion.div
                        layout="position"
                        className="cf-benefit-detail"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{
                          layout: { type: "spring", stiffness: 280, damping: 32, mass: 0.9 },
                          opacity: { duration: 0.28, ease: "easeOut", delay: 0.06 },
                          y: { duration: 0.28, ease: "easeOut", delay: 0.06 },
                        }}
                      >
                        <p>{b.detail}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CURRICULUM PREVIEW ── */}
      <section id="curriculum" className="cf-section">
        <div className="cf-container">
          <div className="cf-two-col">
            <div className="cf-curriculum-left">
              <div className="cf-section-tag">Curriculum</div>
              <h2 className="cf-section-title cf-section-title-left">
                Every lesson earns<br />its place.
              </h2>
              <p className="cf-section-sub cf-section-sub-left">
                We cut anything that doesn't directly build toward your goal.
                42 hours, 0 minutes wasted.
              </p>
              <div className="cf-curriculum-summary">
                <div className="cf-summary-item"><strong>4</strong>modules</div>
                <div className="cf-summary-item"><strong>15</strong>lessons</div>
                <div className="cf-summary-item"><strong>42 hrs</strong>total</div>
              </div>
            </div>

            <div className="cf-curriculum-accordion">
              {MODULES.map((mod, i) => (
                <div
                  key={mod.id}
                  className={`cf-accordion-item${openModule === i ? " cf-open" : ""}`}
                >
                  <button
                    className="cf-accordion-trigger"
                    onClick={() => setOpenModule(openModule === i ? null : i)}
                  >
                    <div className="cf-accordion-left">
                      <span className="cf-module-num">0{i + 1}</span>
                      <span className="cf-module-title">{mod.title}</span>
                    </div>
                    <IconChevron />
                  </button>
                  {openModule === i && (
                    <div className="cf-accordion-content">
                      {mod.lessons.map((lesson, j) => (
                        <div key={j} className="cf-lesson-row">
                          <div className="cf-lesson-row-left">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <circle cx="7" cy="7" r="6" stroke="#d1d5db" strokeWidth="1" />
                              <path d="M5 7L8 7M7 5.5L8.5 7L7 8.5" stroke="#9ca3af" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {lesson.title}
                          </div>
                          <span className="cf-lesson-duration">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTRUCTOR ── */}
      <section id="about" className="cf-section cf-section-alt">
        <div className="cf-container">
          <div className="cf-instructor-layout">
            <div className="cf-instructor-avatar-col">
              <img
                className="cf-instructor-avatar"
                src="https://sachinchaurasiya.xyz/sachinActivites/sachinpic.png"
                alt="Sachin Chaurasiya"
              />
              <div className="cf-instructor-companies">
                <span className="cf-company-badge">Instructor</span>
              </div>
            </div>
            <div className="cf-instructor-content">
              <div className="cf-section-tag">Lead Instructor</div>
              <h2 className="cf-instructor-name">Sachin Chaurasiya</h2>
              <p className="cf-instructor-title">Full-Stack &amp; AI Engineer · RAG &amp; Fine-Tuning · Educator</p>
              <p className="cf-instructor-bio">
                Sachin is a full-stack and AI engineer with deep expertise across modern web
                development and applied AI — building production RAG systems and fine-tuning
                large language models. He's worked in industry at Vizuara AI Labs and Aaradhy
                Tech, and takes on freelance engineering projects.
              </p>
              <p className="cf-instructor-bio">
                He's also a professional teacher who has led technical communities and societies
                across several colleges, mentoring students and helping them ship real projects.
                Every lesson here is drawn from problems he's actually solved in production.
              </p>
              <div className="cf-instructor-stats">
                <div className="cf-instr-stat">
                  <strong>Full-Stack + AI</strong>
                  <span>RAG &amp; fine-tuning</span>
                </div>
                <div className="cf-instr-stat">
                  <strong>40,000+</strong>
                  <span>students taught</span>
                </div>
                <div className="cf-instr-stat">
                  <strong>4.9 / 5</strong>
                  <span>average rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" className="cf-section">
        <div className="cf-container">
          <div className="cf-section-header">
            <div className="cf-section-tag">Reviews</div>
            <h2 className="cf-section-title">Real outcomes. Real engineers.</h2>
            <p className="cf-section-sub">From people who finished the course and shipped the work.</p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="cf-section cf-section-alt">
        <div className="cf-container">
          <motion.div
            className="cf-section-header"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cf-section-tag">Pricing</div>
            <h2 className="cf-section-title">Simple, honest pricing.</h2>
            <p className="cf-section-sub">No upsells. No hidden fees. No dark patterns.</p>
          </motion.div>
          <div className="cf-pricing-grid">
            {PLANS.map((plan, i) => (
              <motion.div
                key={i}
                className={`cf-pricing-card${plan.featured ? " cf-pricing-featured" : ""}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
              >
                {plan.featured && <div className="cf-pricing-badge">Most Popular</div>}
                <div className="cf-pricing-name">{plan.name}</div>
                <div className="cf-pricing-price">
                  <span className="cf-price-dollar">₹</span>
                  <span className="cf-price-amount">{plan.price}</span>
                  <span className="cf-price-period">{plan.period}</span>
                </div>
                <p className="cf-pricing-desc">{plan.description}</p>
                <ul className="cf-pricing-features">
                  {plan.features.map((f, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.35, delay: i * 0.12 + 0.25 + j * 0.06 }}
                    >
                      <IconCheck accent={plan.featured} />
                      {f}
                    </motion.li>
                  ))}
                </ul>
                <button className={`${plan.featured ? "cf-btn-primary" : "cf-btn-outline"} cf-btn-full`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
          <p className="cf-pricing-note">
            All plans include a 30-day money-back guarantee. Student discount available with .edu email.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="cf-section">
        <div className="cf-container cf-faq-layout">
          <div className="cf-faq-left">
            <div className="cf-section-tag">FAQ</div>
            <h2 className="cf-section-title cf-section-title-left">Common questions.</h2>
            <p className="cf-section-sub cf-section-sub-left">
              Anything else? Email us at{" "}
              <a href="mailto:hello@courseflow.dev" className="cf-text-link">
                hello@courseflow.dev
              </a>
            </p>
          </div>
          <div className="cf-faq-accordion">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`cf-faq-item${openFaq === i ? " cf-open" : ""}`}
              >
                <button
                  className="cf-faq-trigger"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <IconChevron />
                </button>
                {openFaq === i && (
                  <div className="cf-faq-answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="cf-final-cta">
        <div className="cf-container cf-cta-inner">
          <h2 className="cf-cta-headline">
            The gap between where you are<br />
            and where you want to be<br />
            <em>is a curriculum away.</em>
          </h2>
          <p className="cf-cta-sub">
            40,000 engineers have already made the move. The next step is yours.
          </p>
          <div className="cf-cta-actions">
            <a href="/signup" className="cf-btn-white cf-btn-lg">
              Enroll Now — Start Today
            </a>
            <span className="cf-cta-note">30-day refund guarantee · Lifetime access</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="cf-footer">
        <div className="cf-container">
          <div className="cf-footer-top">
            <div className="cf-footer-brand">
              <a href="/" className="cf-logo">
                <Logo />
                <span className="cf-logo-text">CourseFlow</span>
              </a>
              <p className="cf-footer-tagline">
                Rigorous courses for engineers<br />who want to grow fast.
              </p>
            </div>
            <div className="cf-footer-links">
              <div className="cf-footer-col">
                <div className="cf-footer-col-title">Product</div>
                <a href="#">Courses</a>
                <a href="#">Pricing</a>
                <a href="#">Reviews</a>
                <a href="#">Instructors</a>
              </div>
              <div className="cf-footer-col">
                <div className="cf-footer-col-title">Company</div>
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Careers</a>
                <a href="#">Press</a>
              </div>
              <div className="cf-footer-col">
                <div className="cf-footer-col-title">Support</div>
                <a href="mailto:hello@courseflow.dev">Contact</a>
                <a href="#">Help Center</a>
                <a href="#">Student Discount</a>
                <a href="#">Teams</a>
              </div>
              <div className="cf-footer-col">
                <div className="cf-footer-col-title">Legal</div>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
          </div>
          <div className="cf-footer-bottom">
            <span>© 2026 CourseFlow, Inc. All rights reserved.</span>
            <span>hello@courseflow.dev</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
