import React, { useEffect } from 'react';
import { 
  BarChart3, 
  Mail, 
  Target, 
  Calendar, 
  Award, 
  BookOpen,
  TrendingUp,
  Users,
  MessageSquare,
  Clock
} from 'lucide-react';
import {
  getProgressSummary,
  getColdOutreachData,
  getSkillMetrics,
  getUpcomingInterviews,
  getInspirationQuote,
  getTopApplications
} from "@/actions/dashboard";
import { useApplicationStore } from '@/stores/applicationStore';
import { useApplicationsQuery } from '@/queries/applicationQueries';
import { useColdOutreacheQuery } from '@/queries/coldApproachQueries';
import { format } from 'date-fns';
import { useUser } from '@clerk/clerk-react';

// Add these new utility functions
const getWelcomeMessage = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const getProgressOverview = () => ({
  overallProgress: 65,
  dailyTarget: 5,
  weeklyApplications: 15,
  profileCompleteness: 85
});

const getQuickStats = () => ({
  applicationsToday: 3,
  outreachesThisWeek: 12,
  skillsPracticed: 2
});

const Dashboard = () => {
  const { applications } = useApplicationStore();
  const { isLoading: isapplicationQueryLoading } = useApplicationsQuery();
  const { isLoading: isColdApproachQueryLoading } = useColdOutreacheQuery();
  const user = useUser();
  // Combined loading state
  const isLoading = isapplicationQueryLoading || isColdApproachQueryLoading;

  const progressSummary = getProgressSummary();
  const topApplications = getTopApplications(applications);
  const outreaches = getColdOutreachData();
  const skillMetrics = getSkillMetrics();
  const interviews = getUpcomingInterviews();
  const inspiration = getInspirationQuote();
  
  const welcomeMessage = getWelcomeMessage();
  const progressOverview = getProgressOverview();
  const quickStats = getQuickStats();

  return isLoading ? (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-6">
      {/* Add welcome message skeleton */}
      <div className="mb-8 space-y-4">
        <div className="h-8 w-48 bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-64 bg-gray-700 rounded animate-pulse" />
      </div>
      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
                <div className="h-8 w-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded animate-pulse" />
              </div>
              <div className="h-8 w-8 bg-gray-700 rounded-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applications Table Skeleton */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 w-32 bg-gray-700 rounded animate-pulse" />
              <div className="h-10 w-24 bg-gray-700 rounded-lg animate-pulse" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-gray-700/20 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>

          {/* Skill Metrics Skeleton */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <div className="h-6 w-32 bg-gray-700 rounded mb-6 animate-pulse" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 w-8 bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Interviews Skeleton */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <div className="h-6 w-40 bg-gray-700 rounded mb-6 animate-pulse" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-700/20 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>

          {/* Daily Goals Skeleton */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <div className="h-6 w-32 bg-gray-700 rounded mb-6 animate-pulse" />
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="h-2 bg-gray-700 rounded-full" />
              </div>
            </div>
          </div>

          {/* Inspiration Quote Skeleton */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-6">
      {/* Welcome Section */}
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {welcomeMessage}, {user.user.fullName}
        </h1>
        <p className="text-gray-400">
          Today is {format(new Date(), 'EEEE, MMMM do')} • 
          <span className="ml-2 text-purple-400">
            {progressOverview.dailyTarget} daily goals remaining
          </span>
        </p>
      </div>

      {/* Quick Stats Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Today's Applications</p>
              <p className="text-2xl font-bold">{quickStats.applicationsToday}</p>
            </div>
            <Target className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Weekly Outreaches</p>
              <p className="text-2xl font-bold">{quickStats.outreachesThisWeek}</p>
            </div>
            <Users className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Skills Practiced</p>
              <p className="text-2xl font-bold">{quickStats.skillsPracticed}</p>
            </div>
            <BookOpen className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div> */}

      {/* Progress Overview */}
      <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Progress Overview</h2>
            <p className="text-gray-400">Weekly goal completion: {progressOverview.overallProgress}%</p>
          </div>
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl font-bold">{progressOverview.overallProgress}%</div>
            </div>
            <svg className="transform -rotate-90 w-24 h-24">
              <circle
                cx="48"
                cy="48"
                r="44"
                className="stroke-current text-gray-700"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="44"
                className="stroke-current text-purple-500"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(2 * Math.PI * 44) * (progressOverview.overallProgress / 100)} ${2 * Math.PI * 44}`}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Applications</p>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {progressSummary.totalApplications}
              </h3>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Cold Outreaches</p>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {progressSummary.coldOutreaches}
              </h3>
            </div>
            <Mail className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Interviews</p>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {progressSummary.interviewsScheduled}
              </h3>
            </div>
            <Calendar className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Offers</p>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {progressSummary.offersReceived}
              </h3>
            </div>
            <Award className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applications Table */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Applications</h2>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                Add New
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Job Title</th>
                    <th className="text-left py-3 px-4">Company</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Applied At</th>
                  </tr>
                </thead>
                <tbody>
                  {topApplications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                      <td className="py-3 px-4">{app.position}</td>
                      <td className="py-3 px-4">{app.companyName}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          app.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                          app.status === 'interviewing' ? 'bg-blue-500/20 text-blue-400' :
                          app.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                          app.status === 'ghosting' ? 'bg-gray-500/20 text-gray-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{new Date(app.appliedDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Skill Metrics */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-6">Skill Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>DSA Progress</span>
                  <span>{skillMetrics.dsaProgress}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${skillMetrics.dsaProgress}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>System Design</span>
                  <span>{skillMetrics.systemDesign}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${skillMetrics.systemDesign}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Frontend Skills</span>
                  <span>{skillMetrics.frontendSkills}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${skillMetrics.frontendSkills}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Interviews */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-6">Upcoming Interviews</h2>
            <div className="space-y-4">
              { interviews.length? interviews.map((interview) => (
                <div key={interview.id} className="flex items-center p-4 bg-gray-700/20 rounded-lg border border-gray-700">
                  <div className="flex-1">
                    <h3 className="font-medium">{interview.companyName}</h3>
                    <p className="text-sm text-gray-400">{interview.position} • {interview.appliedDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${'bg-green-500/20 text-green-400'
                  }`}>
                    {interview.status}
                  </span>
                </div>
              )) : (
                <div>
                  No Upcoming Interviews
                </div>
              )
            
            }
            </div>
          </div>

          {/* Daily Goals */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-6">Daily Goals</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>DSA Problems</span>
                  <span>{skillMetrics.dailyGoals.problemsSolved}/{skillMetrics.dailyGoals.targetProblems}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${(skillMetrics.dailyGoals.problemsSolved / skillMetrics.dailyGoals.targetProblems) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Inspiration Quote */}
          <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
            <div className="text-center">
              <p className="text-lg italic mb-2">"{inspiration.quote}"</p>
              <p className="text-sm text-gray-400">- {inspiration.author}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;