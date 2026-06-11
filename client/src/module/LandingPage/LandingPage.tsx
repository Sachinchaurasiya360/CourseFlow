import { useState } from "react";
import "./LandingPage.css";

// ── Data ─────────────────────────────────────────────────────────────────────

const COURSES = [
  {
    id: 1,
    title: "Full-Stack Web Development with React & Node",
    instructor: "Alex Chen",
    duration: "42 hours",
    rating: 4.9,
    reviews: 2847,
    price: 89,
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
    price: 99,
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
    price: 119,
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

const TESTIMONIALS = [
  {
    initials: "SM",
    name: "Sarah Mitchell",
    role: "Frontend Engineer at Shopify",
    timeAgo: "2 months ago",
    text: "I went from writing jQuery spaghetti to shipping production React at a company I actually wanted to work for. The system design module alone was worth the price — my interviewers kept commenting on how I talked about architecture.",
    rating: 5,
  },
  {
    initials: "JO",
    name: "James Okonkwo",
    role: "Software Engineer at Stripe",
    timeAgo: "4 months ago",
    text: "Three months after completing this course I was at Stripe. The curriculum doesn't waste your time — every lesson is dense with real patterns you'll encounter on the job. No fluff, no padding.",
    rating: 5,
  },
  {
    initials: "EV",
    name: "Elena Vasquez",
    role: "Full-Stack Developer, Freelance",
    timeAgo: "1 month ago",
    text: "I was skeptical about online courses but this one is different. The projects are portfolio-ready and have helped me land contracts. The community Slack is surprisingly active for a recorded course.",
    rating: 5,
  },
];

const PLANS = [
  {
    name: "Single Course",
    price: 89,
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
    price: 29,
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
    price: 49,
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
        <div className="cf-container cf-hero-inner">
          <div className="cf-hero-text">
            <div className="cf-badge">
              <span className="cf-badge-dot" />
              Trusted by 40,000+ engineers
            </div>
            <h1 className="cf-hero-headline">
              Learn the skills<br />
              that <em>actually</em><br />
              get you hired.
            </h1>
            <p className="cf-hero-sub">
              Structured, rigorous courses taught by engineers who've shipped at
              companies you know. No fluff. No filler. Just the depth that matters.
            </p>
            <div className="cf-hero-actions">
              <a href="/signup" className="cf-btn-primary cf-btn-lg">Enroll Now</a>
              <a href="#curriculum" className="cf-btn-outline cf-btn-lg">View Curriculum</a>
            </div>
            <div className="cf-hero-proof">
              <div className="cf-proof-stars">
                {[1,2,3,4,5].map(i => <IconStar key={i} />)}
              </div>
              <span className="cf-proof-text">4.9 from 6,200+ reviews</span>
              <span className="cf-proof-sep">·</span>
              <span className="cf-proof-text">30-day refund guarantee</span>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="cf-hero-mockup">
            {/* Floating rating card */}
            <div className="cf-float-card cf-float-card-top">
              <div className="cf-float-card-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5L9.8 6H14.5L10.5 8.8L12 13.5L8 10.8L4 13.5L5.5 8.8L1.5 6H6.2L8 1.5Z" fill="#1d4ed8"/>
                </svg>
              </div>
              <div>
                <div className="cf-float-card-label">Top Rated Course</div>
                <div className="cf-float-card-sub">4.9 · 6,200+ reviews</div>
              </div>
            </div>
            <div className="cf-mockup-window">
              <div className="cf-mockup-titlebar">
                <div className="cf-mockup-dots">
                  <span /><span /><span />
                </div>
                <span className="cf-mockup-url">courseflow.dev / dashboard</span>
              </div>
              <div className="cf-mockup-body">
                <div className="cf-mockup-sidebar">
                  <div className="cf-mockup-sidebar-title">My Courses</div>
                  <div className="cf-mockup-course-item cf-active">
                    <span className="cf-course-dot" />
                    Full-Stack React
                  </div>
                  <div className="cf-mockup-course-item">
                    <span className="cf-course-dot" />
                    System Design
                  </div>
                  <div className="cf-mockup-course-item">
                    <span className="cf-course-dot" />
                    Data Science
                  </div>
                  <div className="cf-mockup-sidebar-section">Progress</div>
                  <div className="cf-progress-item">
                    <div className="cf-progress-label">
                      <span>React & Node</span><span>68%</span>
                    </div>
                    <div className="cf-progress-bar">
                      <div className="cf-progress-fill" style={{ width: "68%" }} />
                    </div>
                  </div>
                  <div className="cf-progress-item">
                    <div className="cf-progress-label">
                      <span>System Design</span><span>24%</span>
                    </div>
                    <div className="cf-progress-bar">
                      <div className="cf-progress-fill" style={{ width: "24%" }} />
                    </div>
                  </div>
                </div>

                <div className="cf-mockup-content">
                  <div className="cf-mockup-lesson-header">
                    <div className="cf-lesson-tag">Module 2 · Lesson 4</div>
                    <div className="cf-lesson-title">Building forms with validation</div>
                  </div>
                  <div className="cf-mockup-video">
                    <div className="cf-video-placeholder">
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <circle cx="17" cy="17" r="16" stroke="#1d4ed8" strokeWidth="1.5" />
                        <path d="M14 12L23 17L14 22V12Z" fill="#1d4ed8" />
                      </svg>
                      <span>52 min · HD video</span>
                    </div>
                  </div>
                  <div className="cf-mockup-chapters">
                    <div className="cf-chapter-item cf-chapter-done">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="7" fill="#1d4ed8" />
                        <path d="M4 7L6 9L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      useState deep dive
                    </div>
                    <div className="cf-chapter-item cf-chapter-done">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="7" fill="#1d4ed8" />
                        <path d="M4 7L6 9L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      useEffect patterns
                    </div>
                    <div className="cf-chapter-item cf-chapter-active">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="7" fill="#1d4ed8" fillOpacity="0.12" />
                        <circle cx="7" cy="7" r="3" fill="#1d4ed8" />
                      </svg>
                      Form validation (current)
                    </div>
                    <div className="cf-chapter-item">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6.5" stroke="#d1d5db" />
                      </svg>
                      Custom hooks
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating enrollment notification */}
            <div className="cf-float-card cf-float-card-bottom">
              <div className="cf-float-avatar">SM</div>
              <div>
                <div className="cf-float-card-label">Sarah just enrolled</div>
                <div className="cf-float-card-sub">Full-Stack React · 2 min ago</div>
              </div>
              <div className="cf-float-live-dot" />
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
            <div className="cf-logos">
              {["Stripe", "Shopify", "Vercel", "Notion", "Linear", "GitHub"].map((co) => (
                <span key={co} className="cf-company-logo">{co}</span>
              ))}
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
          <div className="cf-courses-grid">
            {COURSES.map((course) => (
              <div key={course.id} className="cf-course-card">
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
                  <span className="cf-course-price">${course.price}</span>
                  <button className="cf-btn-primary cf-btn-sm">Enroll Now</button>
                </div>
              </div>
            ))}
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
          <div className="cf-section-header">
            <div className="cf-section-tag">Why CourseFlow</div>
            <h2 className="cf-section-title">The difference is in the depth.</h2>
          </div>
          <div className="cf-benefits-grid">
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
              },
            ].map((b, i) => (
              <div key={i} className="cf-benefit-card">
                <div className="cf-benefit-icon">{b.icon}</div>
                <h3 className="cf-benefit-title">{b.title}</h3>
                <p className="cf-benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
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
              <div className="cf-instructor-avatar">AC</div>
              <div className="cf-instructor-companies">
                <div className="cf-company-badge">Ex-Google</div>
                <div className="cf-company-badge">Ex-Stripe</div>
              </div>
            </div>
            <div className="cf-instructor-content">
              <div className="cf-section-tag">Lead Instructor</div>
              <h2 className="cf-instructor-name">Alex Chen</h2>
              <p className="cf-instructor-title">Senior Staff Engineer, formerly Google & Stripe</p>
              <p className="cf-instructor-bio">
                Alex spent 8 years as a software engineer at Google and Stripe, where he led
                the infrastructure team that rebuilt Stripe's payments dashboard from the ground up.
                He's spoken at React Summit and NodeConf, and has contributed to open-source projects
                used by millions of developers.
              </p>
              <p className="cf-instructor-bio">
                He started CourseFlow after becoming frustrated with the gap between what's taught
                in courses and what's expected on the job. Every lesson here is based on real problems
                he's had to solve in production.
              </p>
              <div className="cf-instructor-stats">
                <div className="cf-instr-stat">
                  <strong>8 years</strong>
                  <span>at FAANG companies</span>
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
          <div className="cf-testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="cf-testimonial-card">
                <div className="cf-testimonial-rating">
                  {Array.from({ length: t.rating }).map((_, j) => <IconStar key={j} />)}
                </div>
                <p className="cf-testimonial-text">"{t.text}"</p>
                <div className="cf-testimonial-author">
                  <div className="cf-testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="cf-author-name">{t.name}</div>
                    <div className="cf-author-role">{t.role} · {t.timeAgo}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="cf-section cf-section-alt">
        <div className="cf-container">
          <div className="cf-section-header">
            <div className="cf-section-tag">Pricing</div>
            <h2 className="cf-section-title">Simple, honest pricing.</h2>
            <p className="cf-section-sub">No upsells. No hidden fees. No dark patterns.</p>
          </div>
          <div className="cf-pricing-grid">
            {PLANS.map((plan, i) => (
              <div key={i} className={`cf-pricing-card${plan.featured ? " cf-pricing-featured" : ""}`}>
                {plan.featured && <div className="cf-pricing-badge">Most Popular</div>}
                <div className="cf-pricing-name">{plan.name}</div>
                <div className="cf-pricing-price">
                  <span className="cf-price-dollar">$</span>
                  <span className="cf-price-amount">{plan.price}</span>
                  <span className="cf-price-period">{plan.period}</span>
                </div>
                <p className="cf-pricing-desc">{plan.description}</p>
                <ul className="cf-pricing-features">
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <IconCheck accent={plan.featured} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`${plan.featured ? "cf-btn-primary" : "cf-btn-outline"} cf-btn-full`}>
                  {plan.cta}
                </button>
              </div>
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
