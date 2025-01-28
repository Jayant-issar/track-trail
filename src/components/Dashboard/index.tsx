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
  getApplicationsData,
  getColdOutreachData,
  getSkillMetrics,
  getUpcomingInterviews,
  getInspirationQuote
} from '../../lib/utils';
import { onBoardingMiddleware } from '@/middlewares/globalMiddleware';
import { useUser } from '@clerk/clerk-react';

const Dashboard = () => {
  const progressSummary = getProgressSummary();
  const applications = getApplicationsData();
  const outreaches = getColdOutreachData();
  const skillMetrics = getSkillMetrics();
  const interviews = getUpcomingInterviews();
  const inspiration = getInspirationQuote();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-6">
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
                    <th className="text-left py-3 px-4">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                      <td className="py-3 px-4">{app.jobTitle}</td>
                      <td className="py-3 px-4">{app.company}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          app.status === 'Interview Scheduled' ? 'bg-green-500/20 text-green-400' :
                          app.status === 'Applied' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{app.deadline}</td>
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
              {interviews.map((interview) => (
                <div key={interview.id} className="flex items-center p-4 bg-gray-700/20 rounded-lg border border-gray-700">
                  <div className="flex-1">
                    <h3 className="font-medium">{interview.company}</h3>
                    <p className="text-sm text-gray-400">{interview.type} • {interview.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    interview.status === 'Scheduled' ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {interview.status}
                  </span>
                </div>
              ))}
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