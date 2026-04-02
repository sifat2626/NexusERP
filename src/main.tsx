import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

// Apply saved theme immediately to avoid flash
const savedTheme = localStorage.getItem("nexus-theme")
const theme = savedTheme || "dark"

if (!savedTheme) {
  localStorage.setItem("nexus-theme", "dark")
}

if (theme === "dark") {
  document.documentElement.classList.add("dark")
}

createRoot(document.getElementById("root")!).render(<App />)
