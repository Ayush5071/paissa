'use client'

import { motion } from 'framer-motion'
import { Smartphone, Shield, Zap, BarChart3, Bell, Users, Globe, Award } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

const features = [
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile First",
    description: "Optimized for mobile devices with responsive design for tracking on the go.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure & Private",
    description: "Your financial data is encrypted and stored securely with industry-standard protection.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Instant transaction recording and real-time chart updates for immediate insights.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Smart Analytics",
    description: "AI-powered insights and spending pattern analysis to optimize your finances.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: "Smart Alerts",
    description: "Get notified about budget limits, unusual spending, and achievement milestones.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Family Sharing",
    description: "Share budgets and track family expenses together with multi-user support.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Multi-Currency",
    description: "Track expenses in multiple currencies with real-time exchange rates.",
    color: "from-teal-500 to-blue-500"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Goal Achievement",
    description: "Set financial goals and track progress with milestone celebrations.",
    color: "from-amber-500 to-orange-500"
  }
]

export default function FeaturesSection() {
  const { theme } = useTheme()
  
  return (
    <section className={`w-full py-20 px-4 md:px-8 flex flex-col items-center relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }`}></div>
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent_50%)]'
          : 'bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.08),transparent_50%)]'
      }`}></div>
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-[radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.1),transparent_50%)]'
          : 'bg-[radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.08),transparent_50%)]'
      }`}></div>
      
      <div className="absolute inset-0 opacity-10">
        <div className={`h-full w-full ${
          theme === 'dark'
            ? 'bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]'
        } bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]`}></div>
      </div>

      <div className="w-full max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-lg border rounded-full text-sm mb-6 ${
              theme === 'dark' 
                ? 'bg-white/10 border-white/20 text-zinc-300' 
                : 'bg-black/10 border-black/20 text-gray-600'
            }`}
          >
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>Powerful Features</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl md:text-6xl font-extrabold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Everything You Need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Succeed
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed ${
              theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
            }`}
          >
            Packed with features designed to make financial management 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold"> effortless and intelligent</span>.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`group relative p-6 backdrop-blur-lg border rounded-2xl transition-all duration-500 shadow-xl ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
              
              <div className="relative z-10">
                <div className={`p-3 w-fit bg-gradient-to-br ${feature.color}/20 border rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 ${
                  theme === 'dark' ? 'border-white/20' : 'border-black/20'
                }`}>
                  <div className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.color}`}>
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'text-white group-hover:from-white group-hover:to-blue-200' 
                    : 'text-gray-900 group-hover:from-gray-900 group-hover:to-blue-600'
                }`}>
                  {feature.title}
                </h3>
                
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'text-zinc-300 group-hover:text-zinc-200' 
                    : 'text-gray-600 group-hover:text-gray-500'
                }`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className={`p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-lg border rounded-2xl shadow-xl max-w-4xl mx-auto ${
            theme === 'dark' ? 'border-white/10' : 'border-black/10'
          }`}>
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Transform Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Financial Life?
              </span>
            </h3>
            <p className={`text-lg leading-relaxed mb-6 ${
              theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'
            }`}>
              Join thousands of users who have already taken control of their finances with our intelligent platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto text-lg"
            >
              Get Started Now
              <Zap className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
