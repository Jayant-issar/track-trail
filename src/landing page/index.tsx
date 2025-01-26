"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, ArrowRight, Briefcase, Send, BarChart3, CheckCircle, Users, Globe, ChevronDown } from "lucide-react"
import Hyperspeed from "@/components/Hyperspeed/Hyperspeed"
import { HeroSection } from "@/components/landing-page/HeroSection"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      content: "Track-Trail transformed my job search. I landed my dream role in just 2 months!",
      avatar: "/avatar1.png",
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateCo",
      content: "The analytics dashboard gave me insights I never knew I needed. Highly recommended!",
      avatar: "/avatar2.png",
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "DesignHub",
      content: "Managing my applications has never been easier. Track-Trail is a game-changer!",
      avatar: "/avatar3.png",
    },
  ]

  return (
    <div className="min-h-screen bg-[#151823]">
      {/* Animated Navbar */}
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#1c1f2e]/80 backdrop-blur-md" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Target className="h-8 w-8 text-[#b666d2]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Track-Trail
              </span>
            </motion.div>

            <div className="hidden md:flex space-x-6">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
            </div>

            <motion.a href="/dashboard" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="bg-gradient-to-r from-[#b666d2] to-[#e052a0] text-white px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-purple-500/20 font-medium">
                Get Started
              </button>
            </motion.a>
          </div>
        </div>
      </motion.nav>

      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <HeroSection />
        {/* <div className="text-center w-full border-2 mx-auto ">
          <div>
            <Hyperspeed />
          </div>
          
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
        </div> */}

        {/* Dashboard Preview Section */}
        <motion.div
          className="mt-20 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#151823] via-transparent to-transparent z-10"></div>
          <div className="relative z-0 rounded-xl overflow-hidden shadow-2xl border border-purple-500/20 bg-[#1c1f2e]">
            <img src="/dashboard.png" alt="Track-Trail Dashboard Preview" className="w-full h-auto opacity-75" />
          </div>
        </motion.div>

        {/* Features Grid */}
        <div id="features" className="mt-32">
          <motion.h2
            className="text-3xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Powerful Features for Your Job Search
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Briefcase className="h-6 w-6 text-[#b666d2] group-hover:text-[#e052a0] transition-colors" />}
              title="Application Tracking"
              description="Monitor your job applications with our intuitive tracking system. Never miss an opportunity."
            />
            <FeatureCard
              icon={<Send className="h-6 w-6 text-[#b666d2] group-hover:text-[#e052a0] transition-colors" />}
              title="Cold Email Management"
              description="Organize your outreach campaigns and track responses efficiently."
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6 text-[#b666d2] group-hover:text-[#e052a0] transition-colors" />}
              title="Analytics Dashboard"
              description="Get insights into your job search with detailed metrics and analytics."
            />
            <FeatureCard
              icon={<CheckCircle className="h-6 w-6 text-[#b666d2] group-hover:text-[#e052a0] transition-colors" />}
              title="Task Management"
              description="Stay organized with built-in task management for your job search activities."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-[#b666d2] group-hover:text-[#e052a0] transition-colors" />}
              title="Network Tracking"
              description="Keep track of your professional network and interactions during your job search."
            />
            <FeatureCard
              icon={<Globe className="h-6 w-6 text-[#b666d2] group-hover:text-[#e052a0] transition-colors" />}
              title="Job Market Insights"
              description="Access real-time job market data and trends to inform your career decisions."
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32">
          <motion.h2
            className="text-3xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Trusted by Job Seekers Worldwide
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard number="5000+" label="Active Users" />
            <StatCard number="50k+" label="Applications Tracked" />
            <StatCard number="85%" label="Success Rate" />
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="mt-32">
          <motion.h2
            className="text-3xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What Our Users Say
          </motion.h2>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-[#1c1f2e] p-8 rounded-xl border border-purple-500/20"
              >
                <p className="text-gray-300 mb-4">{testimonials[activeTestimonial].content}</p>
                <div className="flex items-center">
                  <img
                    src={testimonials[activeTestimonial].avatar || "/placeholder.svg"}
                    alt={testimonials[activeTestimonial].name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-white font-semibold">{testimonials[activeTestimonial].name}</p>
                    <p className="text-gray-400">
                      {testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${index === activeTestimonial ? "bg-[#b666d2]" : "bg-gray-600"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mt-32">
          <motion.h2
            className="text-3xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose Your Plan
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            <PricingCard
              title="Basic"
              price="$0"
              features={["Up to 10 job applications", "Basic analytics", "Email support"]}
              cta="Get Started"
            />
            <PricingCard
              title="Pro"
              price="$19"
              features={[
                "Unlimited job applications",
                "Advanced analytics",
                "Priority email support",
                "Custom task management",
              ]}
              cta="Try Pro"
              highlighted={true}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              features={[
                "All Pro features",
                "Dedicated account manager",
                "Custom integrations",
                "Team collaboration tools",
              ]}
              cta="Contact Sales"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center bg-gradient-to-r from-[#b666d2]/5 to-[#e052a0]/5 p-12 rounded-xl border border-purple-500/20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Job Search?</h2>
            <p className="text-gray-400 mb-8">
              Join thousands of successful job seekers who have streamlined their career journey with Track-Trail.
            </p>
            <motion.button
              className="bg-gradient-to-r from-[#b666d2] to-[#e052a0] text-white px-8 py-3.5 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
            </motion.button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 mt-20 border-t border-purple-500/20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Target className="h-6 w-6 text-[#b666d2]" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Track-Trail
            </span>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Contact Us
            </a>
          </div>
          <div className="text-gray-500">© 2024 Track-Trail. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-gray-300 hover:text-white transition-colors">
      {children}
    </a>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      className="bg-[#1c1f2e] p-8 rounded-xl hover:transform hover:scale-102 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="bg-gradient-to-br from-[#b666d2]/20 to-[#e052a0]/20 p-3 rounded-lg w-fit mb-6">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      className="bg-[#1c1f2e] p-8 rounded-xl border border-purple-500/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-4xl font-bold bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-gray-400 mt-2 font-medium">{label}</div>
    </motion.div>
  )
}

function PricingCard({
  title,
  price,
  features,
  cta,
  highlighted = false,
}: { title: string; price: string; features: string[]; cta: string; highlighted?: boolean }) {
  return (
    <motion.div
      className={`bg-[#1c1f2e] p-8 rounded-xl border ${highlighted ? "border-purple-500" : "border-purple-500/20"} flex flex-col`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <div className="text-4xl font-bold bg-gradient-to-r from-[#b666d2] to-[#e052a0] bg-clip-text text-transparent mb-6">
        {price}
      </div>
      <ul className="mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <CheckCircle className="h-5 w-5 text-[#b666d2] mr-2" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-2 rounded-lg font-medium ${highlighted ? "bg-gradient-to-r from-[#b666d2] to-[#e052a0] text-white" : "bg-[#2a2d3a] text-white"}`}
      >
        {cta}
      </button>
    </motion.div>
  )
}

