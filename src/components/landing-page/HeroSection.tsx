import { motion } from "framer-motion";
import Hyperspeed from "../Hyperspeed/Hyperspeed";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
    return (
      <div className="text-center w-full mx-auto relative ">
        <div className="hidden md:block  absolute inset-1 z-0 ">
            <Hyperspeed 
            />
        </div>
  
        <div className="relative z-10 px-6 py-20 ">
          <motion.div
            className="inline-block mb-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#b666d2]/10 to-[#e052a0]/10 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-medium bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent">
              Track Your Career Journey
            </span>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Streamline Your
            <span className="bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent">
              {" "}
              Job Search
            </span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Take control of your career path with our comprehensive application tracking system. Monitor applications,
            manage outreach, and track your success metrics in one place.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              className="group bg-gradient-to-r from-[#b666d2] to-[#e052a0] text-white px-8 py-3.5 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              className="bg-[#1c1f2e] border border-purple-500/20 text-white px-8 py-3.5 rounded-lg hover:bg-[#1f2235] transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>
      </div>
    )
  }
  
  