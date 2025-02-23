import { BackgroundGradient } from '@/components/ui/background-gradient'
import { Button } from '../button'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const UpgradeCard = () => {
  return (
    <BackgroundGradient className="rounded-2xl p-px hover:p-0.5 transition-all">
      <div className="bg-[#1c1f2e] p-5 rounded-[15px] flex flex-col gap-3 border border-purple-500/20 group">
        <div className="flex items-center gap-2.5 mb-2">
          <Sparkles className="h-5 w-5 bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent" />
          <h3 className="text-lg font-bold bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent">
            Smart AI Pro
          </h3>
        </div>

        <p className="text-sm text-gray-400 mb-3  leading-snug tracking-wide transition-colors hover:text-gray-50 max-w-[240px]">
          Unlock AI-powered job search: Get 3x more interviews with smart optimization
        </p>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button className="w-full bg-gradient-to-r from-[#b666d2] to-[#e052a0] text-sm font-semibold text-white hover:shadow-purple-500/30" disabled>
            Comming Soon ✨
          </Button>
        </motion.div>
      </div>
    </BackgroundGradient>
  )
}

export default UpgradeCard