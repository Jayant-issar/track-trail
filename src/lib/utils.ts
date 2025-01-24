import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getProgressSummary() {
  return {
    totalApplications: 45,
    coldOutreaches: 23,
    interviewsScheduled: 8,
    offersReceived: 3,
  };
}

export function getApplicationsData() {
  return [
    {
      id: 1,
      jobTitle: "Software Engineer",
      company: "TechCorp Inc.",
      status: "Interview Scheduled",
      deadline: "2024-03-15",
      priority: "high"
    },
    {
      id: 2,
      jobTitle: "Frontend Developer",
      company: "InnovateTech",
      status: "Applied",
      deadline: "2024-03-20",
      priority: "medium"
    },
    {
      id: 3,
      jobTitle: "Full Stack Developer",
      company: "DevSolutions",
      status: "Shortlisted",
      deadline: "2024-03-18",
      priority: "high"
    },
  ];
}

export function getColdOutreachData() {
  return [
    {
      id: 1,
      contactName: "Sarah Miller",
      company: "GrowthTech",
      status: "Responded",
      lastContact: "2024-03-01",
      followUpDate: "2024-03-08"
    },
    {
      id: 2,
      contactName: "James Wilson",
      company: "InnoSoft",
      status: "Pending",
      lastContact: "2024-03-05",
      followUpDate: "2024-03-12"
    },
  ];
}

export function getSkillMetrics() {
  return {
    dsaProgress: 75,
    systemDesign: 60,
    frontendSkills: 85,
    backendSkills: 70,
    dailyGoals: {
      problemsSolved: 3,
      targetProblems: 5,
    }
  };
}

export function getUpcomingInterviews() {
  return [
    {
      id: 1,
      company: "TechCorp Inc.",
      type: "Technical",
      date: "2024-03-10",
      time: "10:00 AM",
      status: "Scheduled"
    },
    {
      id: 2,
      company: "InnovateTech",
      type: "HR",
      date: "2024-03-12",
      time: "2:00 PM",
      status: "Preparation Needed"
    },
  ];
}

export function getInspirationQuote() {
  return {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  };
}