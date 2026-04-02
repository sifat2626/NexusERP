import { useEffect, useState } from "react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  FolderKanban,
  ListChecks,
  CreditCard,
  Zap,
  Bell,
  Settings,
  ChevronRight,
  User,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react"
import { useTheme } from "@/hooks/useTheme"
import WelcomeTour from "@/components/WelcomeTour"

const navItems = [
  {
    to: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
    description: "See everything",
  },
  {
    to: "/projects",
    icon: FolderKanban,
    label: "Projects",
    description: "All your projects",
  },
  {
    to: "/tasks",
    icon: ListChecks,
    label: "Tasks & Teams",
    description: "Work & people",
  },
  {
    to: "/payments",
    icon: CreditCard,
    label: "Payments",
    description: "Money & approvals",
  },
]

const AppLayout = () => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileMenuOpen) {
      return
    }

    document.body.classList.add("overflow-hidden")
    document.documentElement.classList.add("overflow-hidden")
    return () => {
      document.body.classList.remove("overflow-hidden")
      document.documentElement.classList.remove("overflow-hidden")
    }
  }, [mobileMenuOpen])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt+1: Dashboard
      if (e.altKey && e.key === "1") {
        e.preventDefault()
        navigate("/")
      }
      // Alt+2: Projects
      else if (e.altKey && e.key === "2") {
        e.preventDefault()
        navigate("/projects")
      }
      // Alt+3: Tasks & Teams
      else if (e.altKey && e.key === "3") {
        e.preventDefault()
        navigate("/tasks")
      }
      // Alt+4: Payments
      else if (e.altKey && e.key === "4") {
        e.preventDefault()
        navigate("/payments")
      }
      // Alt+T: Toggle theme
      else if (e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault()
        toggleTheme()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [navigate, toggleTheme])

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-350">
      {/* Welcome Tour */}
      <WelcomeTour />

      {mobileMenuOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`w-[85vw] max-w-72 md:w-72 flex flex-col fixed h-full z-40 md:z-20 border-r border-sidebar-border transition-transform duration-300 md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "hsl(var(--sidebar-background))" }}
      >
        {/* Brand */}
        <div className="px-5 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="logo-ring shrink-0">
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                style={{ background: "hsl(var(--sidebar-background))" }}
              >
                <Zap className="w-5 h-5 text-sidebar-primary" />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-sm font-display text-sidebar-foreground leading-none">
                NexusERP
              </h1>
              <p className="text-xs text-sidebar-muted mt-0.5 uppercase tracking-widest">
                Construction Suite
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-widest text-sidebar-muted">
            Quick Navigation
          </p>
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative border ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground nav-active-glow border-sidebar-primary/20"
                    : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 border-transparent"
                }`
              }
              title={item.label}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-sidebar-primary animate-scale-in" />
                  )}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? "bg-sidebar-primary/20"
                        : "group-hover:bg-sidebar-accent"
                    }`}
                  >
                    <item.icon
                      className={`w-4 h-4 transition-colors ${isActive ? "text-sidebar-primary" : ""}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block truncate">{item.label}</span>
                    <span className="block text-xs text-sidebar-muted/80 truncate">
                      {item.description}
                    </span>
                  </div>
                  {isActive && (
                    <ChevronRight className="w-3 h-3 text-sidebar-primary shrink-0 animate-fade-in" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-2 border-t border-sidebar-border space-y-0.5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200 border border-transparent">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <span>Notifications</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200 border border-transparent">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <span>Settings</span>
          </button>
        </div>

        {/* User card */}
        <div className="px-3 pb-4">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-sidebar-accent/40 border border-sidebar-border cursor-pointer hover:bg-sidebar-accent/70 transition-all duration-200 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sidebar-primary to-accent flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-background" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">
                John Smith
              </p>
              <p className="text-xs text-sidebar-muted truncate">
                Manager
              </p>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 md:ml-72 min-h-screen flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="sticky top-0 z-10 border-b border-border/50 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between transition-colors duration-300"
          style={{
            background:
              theme === "dark"
                ? "hsl(var(--background)/0.85)"
                : "hsl(var(--card)/0.9)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="theme-toggle md:hidden shrink-0"
              title="Open navigation"
              aria-label="Open navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
            <span className="pulse-dot bg-success" />
            <span className="hidden sm:inline truncate">
              Everything is working great
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Updated recently badge */}
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/60 border border-border/60 px-3 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Updated Now</span>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle group"
              title={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
              aria-label="Toggle theme"
            >
              <span className="transition-transform duration-300 group-hover:rotate-12 inline-flex">
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </span>
            </button>

            {mobileMenuOpen && (
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="theme-toggle md:hidden"
                title="Close navigation"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppLayout
