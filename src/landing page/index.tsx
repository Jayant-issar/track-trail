import React from 'react';
import { BarChart3, Send, Target, Briefcase, ArrowRight, CheckCircle2, Mail } from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#151823]">
      {/* Hero Section */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-[#b666d2]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Track-Trail</span>
          </div>
          <button className="bg-gradient-to-r from-[#b666d2] to-[#e052a0] text-white px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 font-medium">
            Get Started
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#b666d2]/10 to-[#e052a0]/10 border border-purple-500/20">
            <span className="text-sm font-medium bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent">
              Track Your Career Journey
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Streamline Your
            <span className="bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent"> Job Search</span>
          </h1>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Take control of your career path with our comprehensive application tracking system. 
            Monitor applications, manage outreach, and track your success metrics in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="group bg-gradient-to-r from-[#b666d2] to-[#e052a0] text-white px-8 py-3.5 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 font-medium">
              <span>Launch Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-[#1c1f2e] border border-purple-500/20 text-white px-8 py-3.5 rounded-lg hover:bg-[#1f2235] transition-all duration-300 font-medium">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Dashboard Preview Section */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#151823] via-transparent to-transparent z-10"></div>
          <div className="relative z-0 rounded-xl overflow-hidden shadow-2xl border border-purple-500/20 bg-[#1c1f2e]">
            <img 
              src="/dashboard.png" 
              alt="Track-Trail Dashboard Preview"
              className="w-full h-auto opacity-75"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="bg-[#1c1f2e] p-8 rounded-xl hover:transform hover:scale-102 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 group">
            <div className="bg-gradient-to-br from-[#b666d2]/20 to-[#e052a0]/20 p-3 rounded-lg w-fit mb-6">
              <Briefcase className="h-6 w-6 text-[#b666d2] group-hover:text-[#e052a0] transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Application Tracking</h3>
            <p className="text-gray-400">Monitor your job applications with our intuitive tracking system. Never miss an opportunity.</p>
          </div>
          
          <div className="bg-[#1c1f2e] p-8 rounded-xl hover:transform hover:scale-102 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 group">
            <div className="bg-gradient-to-br from-[#b666d2]/20 to-[#e052a0]/20 p-3 rounded-lg w-fit mb-6">
              <Send className="h-6 w-6 text-[#b666d2] group-hover:text-[#e052a0] transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Cold Email Management</h3>
            <p className="text-gray-400">Organize your outreach campaigns and track responses efficiently.</p>
          </div>
          
          <div className="bg-[#1c1f2e] p-8 rounded-xl hover:transform hover:scale-102 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 group">
            <div className="bg-gradient-to-br from-[#b666d2]/20 to-[#e052a0]/20 p-3 rounded-lg w-fit mb-6">
              <BarChart3 className="h-6 w-6 text-[#b666d2] group-hover:text-[#e052a0] transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Analytics Dashboard</h3>
            <p className="text-gray-400">Get insights into your job search with detailed metrics and analytics.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-12">
            Trusted by Job Seekers Worldwide
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1c1f2e] p-8 rounded-xl border border-purple-500/20">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent">5000+</div>
              <div className="text-gray-400 mt-2 font-medium">Active Users</div>
            </div>
            <div className="bg-[#1c1f2e] p-8 rounded-xl border border-purple-500/20">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent">50k+</div>
              <div className="text-gray-400 mt-2 font-medium">Applications Tracked</div>
            </div>
            <div className="bg-[#1c1f2e] p-8 rounded-xl border border-purple-500/20">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent">85%</div>
              <div className="text-gray-400 mt-2 font-medium">Success Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center bg-gradient-to-r from-[#b666d2]/5 to-[#e052a0]/5 p-12 rounded-xl border border-purple-500/20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Job Search?</h2>
            <p className="text-gray-400 mb-8">
              Join thousands of successful job seekers who have streamlined their career journey with Track-Trail.
            </p>
            <button className="bg-gradient-to-r from-[#b666d2] to-[#e052a0] text-white px-8 py-3.5 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105">
              Get Started Free
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 mt-20 border-t border-purple-500/20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Target className="h-6 w-6 text-[#b666d2]" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Track-Trail</span>
          </div>
          <div className="text-gray-500">© 2024 Track-Trail. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;