import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
export function IntegrationShowcase() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  
    return (
      <motion.div 
        className="py-20 bg-[#1c1f2e]/50"
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <h3 className="text-center text-gray-400 mb-12 text-lg font-medium">
            Trusted by teams at
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 opacity-70 hover:opacity-100 transition-opacity">
            {['Google', 'Microsoft', 'Spotify', 'Slack', 'Airbnb'].map((company, index) => (
              <motion.div
                key={company}
                className="flex items-center justify-center"
                initial={{ scale: 0.8 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <img 
                  src={`/${company.toLowerCase()}-logo.svg`} 
                  alt={company} 
                  className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }