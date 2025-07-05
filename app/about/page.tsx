'use client'

import { motion } from 'framer-motion'
import { 
  Code, 
  Database, 
  Brain, 
  Trophy, 
  GraduationCap, 
  Mail, 
  Github, 
  ExternalLink,
  Target,
  TrendingUp,
  PieChart,
  Shield,
  Zap,
  Users,
  Star,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Briefcase
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'

export default function AboutPage() {
  const { theme } = useTheme()

  const projectFeatures = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Stage 1: Transaction Tracking",
      description: "Complete CRUD operations for financial transactions with real-time updates"
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Stage 2: Visual Analytics",
      description: "Interactive charts and category-wise insights using Chart.js"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Stage 3: AI-Powered Budgeting",
      description: "Google Gemini integration for intelligent budget recommendations"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Scalable",
      description: "MongoDB integration with proper authentication and data validation"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Modern Tech Stack",
      description: "Next.js 14, TypeScript, Tailwind CSS, and Framer Motion"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Experience",
      description: "Dark/Light theme, responsive design, and smooth animations"
    }
  ]

  const techStack = [
    { name: "Next.js 14", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Framer Motion", category: "Animation" },
    { name: "MongoDB", category: "Database" },
    { name: "Chart.js", category: "Visualization" },
    { name: "Google Gemini AI", category: "AI/ML" },
    { name: "React Hook Form", category: "Forms" }
  ]

  const achievements = [
    {
      title: "Hack36 - CC MNNIT",
      position: "9th place",
      participants: "100+ teams",
      year: "2025"
    },
    {
      title: "Innodev - ES MNNIT",
      position: "1st place",
      participants: "100+ teams",
      year: "2025"
    },
    {
      title: "Dev or Die - MNNIT",
      position: "1st place",
      participants: "50+ teams",
      year: "2024"
    },
    {
      title: "Quintathlon - ES MNNIT",
      position: "3rd place",
      participants: "Mock Interview + OA",
      year: "2024"
    }
  ]

  const projects = [
    {
      title: "Quants Programmer: EdTech Platform",
      period: "Dec 2024 - June 2025",
      description: "Full-stack EdTech platform with AI interviews, roadmaps, and real-time features",
      tech: ["Next.js", "TypeScript", "MongoDB", "Gemini AI"],
      links: {
        demo: "#",
        code: "#"
      }
    },
    {
      title: "CampusX: College OLX Platform",
      period: "Oct 2024 - Nov 2024",
      description: "Marketplace for students with real-time auctions and chat using Socket.io",
      tech: ["Next.js", "Express", "Socket.io", "Razorpay"],
      links: {
        demo: "#",
        code: "#"
      }
    }
  ]

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 md:px-8">
        <div className="absolute inset-0 opacity-20">
          <div className={`h-full w-full ${
            theme === 'dark'
              ? 'bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]'
              : 'bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]'
          } bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]`}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
                Paissa
              </span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              A modern financial management platform built with cutting-edge technologies
              to help you take control of your finances
            </p>
          </motion.div>

          {/* Project Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`p-8 rounded-2xl border mb-16 ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700 backdrop-blur-lg' 
                : 'bg-white/50 border-gray-200 backdrop-blur-lg'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className={`text-3xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Progressive Financial Platform
                </h2>
                <p className={`text-lg leading-relaxed mb-6 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Paissa is designed as a 3-stage progressive learning system that grows with your
                  financial literacy. From basic transaction tracking to AI-powered budget insights,
                  each stage builds upon the previous one to create a comprehensive financial ecosystem.
                </p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        theme === 'dark' 
                          ? 'bg-purple-500/20 text-purple-300' 
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${
                      theme === 'dark' 
                        ? 'bg-gray-700/50 border-gray-600' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="text-purple-500 mb-3">
                      {feature.icon}
                    </div>
                    <h3 className={`font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Developer */}
      <section className={`py-16 px-4 md:px-8 ${
        theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-100/50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Meet the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Developer
              </span>
            </h2>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Passionate about creating innovative solutions that make a difference
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`p-8 rounded-2xl border ${
                theme === 'dark' 
                  ? 'bg-gray-800/50 border-gray-700 backdrop-blur-lg' 
                  : 'bg-white/50 border-gray-200 backdrop-blur-lg'
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AT</span>
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Ayush Tiwari
                  </h3>
                  <p className={`${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Full-Stack Developer
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-500" />
                  <a href="mailto:ayusht9919@gmail.com" className={`hover:text-purple-500 transition-colors ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    ayusht9919@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-purple-500" />
                  <a href="https://github.com/Ayush5071" className={`hover:text-purple-500 transition-colors ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    github.com/Ayush5071
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  <span className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    MNNIT Allahabad
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      B.Tech in ECE
                    </p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      MNNIT Allahabad • CPI: 7.88 • 2023-2027
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      LeetCode Contest Rated
                    </p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      179 problems solved
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Achievements
              </h3>
              
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border ${
                    theme === 'dark' 
                      ? 'bg-gray-800/50 border-gray-700' 
                      : 'bg-white/50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Trophy className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h4 className={`font-semibold mb-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm mb-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {achievement.position} • {achievement.participants} • {achievement.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Other{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Projects
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`p-8 rounded-2xl border ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700 backdrop-blur-lg' 
                    : 'bg-white/50 border-gray-200 backdrop-blur-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`text-sm mb-3 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {project.period}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a 
                      href={project.links.demo} 
                      title="View Live Demo"
                      className="text-purple-500 hover:text-purple-600 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a 
                      href={project.links.code} 
                      title="View Source Code"
                      className="text-purple-500 hover:text-purple-600 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                
                <p className={`mb-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        theme === 'dark' 
                          ? 'bg-blue-500/20 text-blue-300' 
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-4 md:px-8 ${
        theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-100/50'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`p-8 rounded-2xl border ${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700 backdrop-blur-lg' 
                : 'bg-white/50 border-gray-200 backdrop-blur-lg'
            }`}
          >
            <h2 className={`text-3xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Take Control of Your Finances?
            </h2>
            <p className={`text-lg mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Start your financial journey with Paissa today and experience the power of intelligent money management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Get Started
                </motion.button>
              </Link>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 border font-semibold rounded-xl transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
