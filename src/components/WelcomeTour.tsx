import { X, ArrowRight, Check } from "lucide-react"
import { useState, useEffect } from "react"

interface TourStep {
  title: string
  description: string
  element?: string
}

const tourSteps: TourStep[] = [
  {
    title: "Welcome to NexusERP!",
    description:
      "This quick tour will help you understand how to use this system. Let's get started!",
  },
  {
    title: "Dashboard Overview",
    description:
      "The main dashboard shows you all your projects at a glance. You can see how much money has been spent, what work needs to be done, and any issues that need attention.",
  },
  {
    title: "Navigation Menu",
    description:
      "Use the menu on the left to switch between different sections: Dashboard, Projects, Tasks & Teams, and Payments & Approvals. Click on any item to view that section.",
  },
  {
    title: "Dark & Light Mode",
    description:
      "Prefer dark mode for evening work? or light mode during the day? Click the sun/moon icon in the top right to switch between light and dark themes. Your preference will be saved automatically.",
  },
  {
    title: "Get Help Anytime",
    description:
      "Look for the small '?' icons throughout the app. Click them to get explanations about what you're looking at.",
  },
  {
    title: "You're Ready!",
    description:
      "That's all! Remember, you can click on projects, tasks, or payment cards to see more details. If you need help, just look for the '?' icons.",
  },
]

const WelcomeTour = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenWelcomeTour")
    if (!hasSeenTour) {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handleSkip = () => {
    handleClose()
  }

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("hasSeenWelcomeTour", "true")
  }

  if (!isVisible) return null

  const step = tourSteps[currentStep]
  const isLastStep = currentStep === tourSteps.length - 1

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50 animate-fade-in" />

      {/* Tour Card */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-lg">
        <div className="stat-card gradient-border animate-scale-in">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold font-display text-foreground">
                {step.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Step {currentStep + 1} of {tourSteps.length}
              </p>
            </div>
            <button
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Close tour"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <p className="text-base text-foreground/80 leading-relaxed mb-6">
            {step.description}
          </p>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mb-6">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "bg-primary w-8"
                    : index < currentStep
                      ? "bg-primary/40 w-4"
                      : "bg-muted w-4"
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleSkip}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip tour
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              {isLastStep ? (
                <>
                  <Check className="w-4 h-4" />
                  Got it!
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default WelcomeTour
