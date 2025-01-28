import { motion } from "framer-motion";
import Hyperspeed from "../Hyperspeed/Hyperspeed";
import { ArrowRight } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Hyperspeed />
        <div className="absolute inset-0 bg-gradient-to-b from-[#151823]/40 to-[#151823]/80" />
      </div>
      
      <div className="relative z-10 py-32 text-center">
        <motion.div
          className="inline-block mb-6 px-5 py-2 rounded-full bg-gradient-to-r from-[#b666d2]/20 to-[#e052a0]/20 border border-purple-500/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent">
            Don't Lie to Yourself Anymore
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Smarter Career </span>
          <span className="bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent">
            <Typewriter
              words={['Tracking', 'Management', 'Analytics', 'Success']}
              loop={0}
              cursor
              cursorStyle='|'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Transform your job search into a data-driven process with our all-in-one platform for application tracking, 
          interview preparation, and career growth analytics.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="group relative bg-gradient-to-r from-[#b666d2] to-[#e052a0] text-white px-8 py-4 rounded-xl flex items-center space-x-3 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Start Free Trial</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#b666d2]/30 to-[#e052a0]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          <motion.button
            className="bg-[#1c1f2e] border border-purple-500/30 text-white px-8 py-4 rounded-xl hover:bg-[#1f2235] transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent">
              Watch Product Tour
            </span>
            <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#b666d2]/20 transition-all" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
  
  