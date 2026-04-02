import { formatDistanceToNow, parseISO, format, isValid } from "date-fns"

/**
 * Format a date string to a user-friendly relative time
 * e.g., "2 days ago", "3 weeks ago", "just now"
 */
export function formatRelativeDate(dateString: string): string {
  try {
    const date = parseISO(dateString)
    if (!isValid(date)) {
      return dateString
    }
    return formatDistanceToNow(date, { addSuffix: true })
  } catch {
    return dateString
  }
}

/**
 * Format a date string to a readable format
 * e.g., "Jan 15, 2024"
 */
export function formatReadableDate(dateString: string): string {
  try {
    const date = parseISO(dateString)
    if (!isValid(date)) {
      return dateString
    }
    return format(date, "MMM dd, yyyy")
  } catch {
    return dateString
  }
}

/**
 * Format a date string to a full readable format
 * e.g., "January 15, 2024"
 */
export function formatFullDate(dateString: string): string {
  try {
    const date = parseISO(dateString)
    if (!isValid(date)) {
      return dateString
    }
    return format(date, "MMMM dd, yyyy")
  } catch {
    return dateString
  }
}

/**
 * Get a friendly status description
 */
export function getStatusDescription(status: string): string {
  const descriptions: Record<string, string> = {
    "In Progress": "Currently being worked on",
    Completed: "Successfully finished",
    Planning: "Being planned and prepared",
    Pending: "Waiting for action or approval",
    Approved: "Has been approved and can proceed",
    Rejected: "Was not approved",
    High: "Needs immediate attention",
    Medium: "Important but not urgent",
    Low: "Can be handled when time permits",
    Open: "Available to work on",
    Done: "Completed successfully",
  }
  return descriptions[status] || status
}
