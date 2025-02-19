import { MessageCircle as CircleProgress, Calendar, BookOpen, Brain, Trophy, ChevronLeft, PenLine } from 'lucide-react';
import HeatMapWrapper from './HeatMap';
import { useNavigate, useParams } from 'react-router-dom';
import { usePreparationMetricDetailQuery } from '@/queries/preparationMetricQueries';
import { DetailedMetricSkeleton } from './Skeleton';
import { Chart } from './Chart';
import {DotLottieReact} from "@lottiefiles/dotlottie-react"
import { words } from 'lodash';
import GetAiHelp from './get-ai-help';
function DetailedMetricPage() {
  // Mock data - in production this would come from your backend
  
  
  const navigate = useNavigate();
  const {metricId} = useParams();
  if(!metricId) navigate("/prep-tracker")
  const {data:preparationData,isLoading} = usePreparationMetricDetailQuery(metricId)
  
  if(isLoading) {
    return <DetailedMetricSkeleton/>
  }
  console.log(preparationData);
  const target = preparationData.targetPerDay[0]?.value || 0;
  const totalQuestions = preparationData.progress.reduce((sum, entry) => sum + entry.achieved, 0);
  const metTargetDays = preparationData.progress.filter(entry => entry.achieved >= target).length;
  const consistency = preparationData.progress.length > 0 
    ? Math.round((metTargetDays / preparationData.progress.length) * 100)
    : 0;

  // Streak calculations
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  const sortedProgress = [...preparationData.progress]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  sortedProgress.forEach((entry, index) => {
    if (entry.achieved >= target) {
      tempStreak++;
      
      // Check if consecutive day
      if (index > 0) {
        const prevDate = new Date(sortedProgress[index - 1].date);
        const currDate = new Date(entry.date);
        const dayDiff = (currDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24);
        
        if (dayDiff !== 1) tempStreak = 1;
      }
      
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
    
    // Update current streak if it's the last entry
    if (index === sortedProgress.length - 1) {
      currentStreak = tempStreak;
    }
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Sidebar placeholder - your actual sidebar component would go here */}
      <div className="w-64 bg-gray-900 border-r border-gray-800"></div>
      
      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button className="text-gray-400 hover:text-gray-100">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">{preparationData.name} Progress</h1>
        </div>

        {/* Top cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Daily Goal</p>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {preparationData.targetPerDay[0].value}
                </h3>
              </div>
              <BookOpen className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Current Streak</p>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {currentStreak}
                  
                </h3>
              </div>
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Longest Streak</p>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {longestStreak}
                </h3>
              </div>
              <Trophy className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Total {preparationData.targetPerDay[0].label.split(" ").map(word => word.charAt(0).toUpperCase()+word.slice(1)).join(" ")}</p>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {totalQuestions}
                </h3>
              </div>
              <CircleProgress className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Help Section */}
            <GetAiHelp metricName={preparationData.name} />

            {/* Random Boost */}
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Random Boost</h3>
                  <p className="text-gray-400">Pehle bhi tere college mei to companies bhi aa ti</p>
                </div>
                <button className="text-purple-400 hover:text-purple-300">
                  <PenLine size={20} />
                </button>
              </div>
            </div>

            {/*  last 7 days for progress */}
            <div className=' border-[1px] border-slate-500 rounded-lg pt-4 md:w-2/3'>
              <div className=' p-4 text-3xl font-medium font text-slate-300'>
                Past 7 Days Progress
              </div>

              <Chart data={
                preparationData.progress.map((progress)=> {
                  return (
                    {date:progress.date,achieved:progress.achieved}
                  )
                } )
              }  />
            </div>
            
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Consistency Circle */}
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-6">Consistency</h2>
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="10"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - consistency / 100)}`}
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">

                  {
                    consistency<=85 ? <span className="text-3xl font-bold">{consistency}%</span> : 
                    
                    <div className='  flex flex-col items-center justify-center'>
                        <DotLottieReact 
                      src='/animations/flame.lottie'
                      autoplay
                      loop
                      className=' h-28'
                      />
                    <span className=' font-medium text-slate-400'>{consistency}</span>
                    </div>
                  }
                  
                  
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-6">Add your notes</h2>
              <textarea 
                className="w-full h-32 bg-gray-700/20 border border-gray-700 rounded-lg p-3 text-gray-100 focus:outline-none focus:border-purple-500"
                placeholder="Add notes about your progress..."
              />
            </div>
          </div>
        </div>
        <HeatMapWrapper value={preparationData.progress.map(p => ({
          date: new Date(p.date).toISOString().split('T')[0].replace(/-/g, '/'),
          count: p.achieved
        }))} />

        
      </div>
    </div>
  );
}

export default DetailedMetricPage;