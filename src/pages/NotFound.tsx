import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md px-6 animate-fade-in">
        {/* Icon */}
        <div className="w-20 h-20 rounded-3xl bg-muted/50 border border-border flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-warning" />
        </div>

        {/* 404 number */}
        <div className="relative mb-4">
          <h1
            className="text-9xl font-black font-display select-none"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0.3,
            }}
          >
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold font-display text-foreground/60">404</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-foreground mb-2">Page Not Found</h2>
        <p className="text-sm text-muted-foreground mb-8">
          The page at <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{location.pathname}</code> doesn't exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
        >
          <Home className="w-4 h-4" />
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
