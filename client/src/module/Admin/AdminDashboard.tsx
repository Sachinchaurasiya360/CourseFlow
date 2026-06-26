import { Button } from "@/components/ui/button";
import { apiClient } from "@/utils/apiClient";
import { useUserStore } from "@/store/useStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

// Shared brand mark — matches the logo used on the landing page header.
const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="6" fill="#1d4ed8" />
    <path d="M7 14L12 9L17 14L22 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 19L12 14L17 19L22 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
  </svg>
);

// Minimal stroke-icon set for the sidebar. Each key maps to the inner paths of a 24×24 icon.
const Icon = ({ name, className = "h-[18px] w-[18px]" }: { name: string; className?: string }) => {
  const paths: Record<string, React.ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    layers: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 17 9 5 9-5" />
      </>
    ),
    clipboard: (
      <>
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </>
    ),
    check: (
      <>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
    video: (
      <>
        <path d="m23 7-7 5 7 5V7Z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </>
    ),
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    star: (
      <>
        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
      </>
    ),
    chat: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
      </>
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </>
    ),
    wallet: (
      <>
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </>
    ),
    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="m16 17 5-5-5-5" />
        <path d="M21 12H9" />
      </>
    ),
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
};

// Sidebar navigation. Most items are placeholders for features wired up later.
const NAV_SECTIONS = [
  {
    title: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "grid" },
      { id: "courses", label: "My Courses", icon: "book" },
      { id: "create", label: "Create Course", icon: "plus" },
    ],
  },
  {
    title: "Teaching",
    items: [
      { id: "curriculum", label: "Curriculum & Modules", icon: "layers" },
      { id: "assignments", label: "Assignments", icon: "clipboard" },
      { id: "quizzes", label: "Quizzes & Tests", icon: "check" },
      { id: "live", label: "Live Classes", icon: "video" },
    ],
  },
  {
    title: "Learners",
    items: [
      { id: "students", label: "Students", icon: "users" },
      { id: "reviews", label: "Reviews & Ratings", icon: "star" },
      { id: "discussions", label: "Q&A / Discussions", icon: "chat" },
      { id: "messages", label: "Messages", icon: "mail" },
    ],
  },
  {
    title: "Insights",
    items: [
      { id: "analytics", label: "Analytics", icon: "chart" },
      { id: "earnings", label: "Earnings", icon: "wallet" },
      { id: "certificates", label: "Certificates", icon: "award" },
    ],
  },
  {
    title: "Account",
    items: [
      { id: "settings", label: "Settings", icon: "settings" },
      { id: "help", label: "Help & Support", icon: "help" },
    ],
  },
] as const;

interface CourseFormData {
  courseName: string;
  courseDescription: string;
  coursePrice: string;
  category: string;
  highlight: string[];
}
interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  coursePrice: number;
  category?: string;
  highlights?: string[];
  thumbnail?: string;
}

export default function AdminDashboard() {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CourseFormData>({
    courseName: "",
    courseDescription: "",
    coursePrice: "",
    category: "",
    highlight: [""],
  });

  const [loading, setLoading] = useState(false);
  const [openDialog, setDialog] = useState(false);
  const [userCreatedCourses, setUserCreatedCourses] = useState<Course[]>([]);
  const [activeNav, setActiveNav] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setSidebarOpen(false);
    if (id === "create") {
      setActiveNav("dashboard");
      setDialog(true);
      return;
    }
    setActiveNav(id);
  };

  // Label of the currently selected nav item — used for placeholder views.
  const activeLabel =
    NAV_SECTIONS.flatMap((s) => s.items).find((i) => i.id === activeNav)?.label ??
    "Dashboard";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHighlightChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      highlight: prev.highlight.map((item, itemIndex) =>
        itemIndex === index ? value : item,
      ),
    }));
  };

  const addHighlightInput = () => {
    setFormData((prev) => ({
      ...prev,
      highlight: [...prev.highlight, ""],
    }));
  };

  const loadCourses = async () => {
    try {
      const getAllCourses = await apiClient.get("/courseRoute/getallCourses");
      setUserCreatedCourses(getAllCourses.data?.result ?? []);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);

      await apiClient.post("/courseRoute/createcourses", {
        ...formData,
        coursePrice: Number(formData.coursePrice),
        highlights: formData.highlight,
      });

      toast.success("Course created successfully");
      setFormData({
        courseName: "",
        courseDescription: "",
        coursePrice: "",
        category: "",
        highlight: [""],
      });
      setDialog(false);
      await loadCourses();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Failed to create course");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const sidebar = (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-neutral-200 bg-white">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-4">
        <Logo />
        <span className="font-display text-lg font-bold text-neutral-900">
          CourseFlow
          <span className="ml-2 rounded-full bg-brand-light px-2 py-0.5 text-xs font-semibold text-brand">
            Admin
          </span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-2">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-brand-light text-brand"
                          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                      }`}
                    >
                      <Icon name={item.icon} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer / logout */}
      <div className="border-t border-neutral-200 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <Icon name="logout" />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex">
        {/* Desktop sidebar */}
        <div className="sticky top-0 hidden h-screen lg:block">{sidebar}</div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full">{sidebar}</div>
          </div>
        )}

        {/* Content column */}
        <div className="flex min-h-screen w-full flex-col">
          {/* Topbar (mobile menu + greeting) */}
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-200 bg-white/90 px-4 py-3 backdrop-blur lg:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="grid h-9 w-9 place-items-center rounded-md border border-neutral-200 text-neutral-600 lg:hidden"
                aria-label="Open menu"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="font-display text-base font-semibold text-neutral-900">
                {activeLabel}
              </span>
            </div>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-light text-sm font-semibold text-brand">
              {user?.name?.charAt(0).toUpperCase() ?? "A"}
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
            {activeNav !== "dashboard" && activeNav !== "courses" ? (
              /* Placeholder for features wired up later */
              <div className="grid min-h-[60vh] place-items-center">
                <div className="max-w-md text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-light text-brand">
                    <Icon
                      name={
                        NAV_SECTIONS.flatMap((s) => s.items).find(
                          (i) => i.id === activeNav,
                        )?.icon ?? "grid"
                      }
                      className="h-7 w-7"
                    />
                  </div>
                  <h2 className="mt-4 font-display text-xl font-bold text-neutral-900">
                    {activeLabel}
                  </h2>
                  <p className="mt-2 text-sm text-neutral-500">
                    This section is coming soon. The feature will be wired up here.
                  </p>
                </div>
              </div>
            ) : (
              <>
        {/* Header / greeting */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              Hello {user?.name ?? "there"}
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Manage and publish the courses you create.
            </p>
          </div>
          <Button onClick={() => setDialog((prev) => !prev)}>
            {openDialog ? "Close" : "+ Create Course"}
          </Button>
        </div>

        {/* Create course form */}
        {openDialog && (
          <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-neutral-900">
              New course
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="courseName" className="text-sm font-medium text-neutral-700">
                  Course name
                </label>
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  placeholder="e.g. Intro to React"
                  onChange={handleChange}
                  required
                  value={formData.courseName}
                  className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="coursePrice" className="text-sm font-medium text-neutral-700">
                  Price (₹)
                </label>
                <input
                  type="number"
                  id="coursePrice"
                  name="coursePrice"
                  placeholder="0"
                  value={formData.coursePrice}
                  required
                  onChange={handleChange}
                  disabled={loading}
                  className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="courseDescription" className="text-sm font-medium text-neutral-700">
                  Description
                </label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  placeholder="What will students learn?"
                  required
                  value={formData.courseDescription}
                  onChange={handleChange}
                  rows={3}
                  className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="category" className="text-sm font-medium text-neutral-700">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                >
                  <option value="">Select category</option>
                  <option value="TECH">TECH</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="HUMANITIES">HUMANITIES</option>
                  <option value="FINANCE">FINANCE</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-neutral-700">Highlights</label>
                  <Button type="button" variant="outline" size="sm" onClick={addHighlightInput}>
                    + Add
                  </Button>
                </div>
                <div className="grid gap-2">
                  {formData.highlight.map((highlight, index) => (
                    <input
                      key={index}
                      type="text"
                      id={`highlight-${index}`}
                      name="highlight"
                      value={highlight}
                      onChange={(e) => handleHighlightChange(index, e.target.value)}
                      placeholder={`Highlight ${index + 1}`}
                      required
                      disabled={loading}
                      className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                    />
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating course…" : "Create course"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Courses list */}
        <div className="mt-10">
          <h2 className="font-display text-lg font-semibold text-neutral-900">
            Your courses
            <span className="ml-2 text-sm font-normal text-neutral-400">
              ({userCreatedCourses.length})
            </span>
          </h2>

          {userCreatedCourses.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-neutral-300 bg-white p-10 text-center">
              <p className="text-sm text-neutral-500">
                You haven't created any courses yet.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userCreatedCourses.map((data) => (
                <div
                  key={data._id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg"
                >
                  {/* Cover — uses thumbnail when present, otherwise a branded gradient with the course initial */}
                  <div className="relative h-32 overflow-hidden bg-linear-to-br from-brand to-brand-dark">
                    {data.thumbnail ? (
                      <img
                        src={data.thumbnail}
                        alt={data.courseName}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full place-items-center">
                        <span className="font-display text-4xl font-bold text-white/90">
                          {data.courseName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    {data.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand shadow-sm backdrop-blur">
                        {data.category}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-semibold text-neutral-900">
                      {data.courseName}
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                      {data.courseDescription}
                    </p>

                    {data.highlights && data.highlights.filter(Boolean).length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {data.highlights.filter(Boolean).slice(0, 3).map((h, i) => (
                          <li
                            key={i}
                            className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600"
                          >
                            {h}
                          </li>
                        ))}
                        {data.highlights.filter(Boolean).length > 3 && (
                          <li className="rounded-md px-1 py-0.5 text-xs font-medium text-neutral-400">
                            +{data.highlights.filter(Boolean).length - 3} more
                          </li>
                        )}
                      </ul>
                    )}

                    <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-neutral-400">Price</span>
                        <span className="font-display text-xl font-bold text-neutral-900">
                          ₹{data.coursePrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand">
                        Published
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
