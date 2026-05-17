import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code2, Zap, Users, BookOpen, ArrowUpRight, Moon, Sun, Lightbulb, Cpu, Wrench } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Timeline from "@/components/Timeline";
import Certificates from "@/components/Certificates";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Design System: Professional Engineering Portfolio
 * Color Palette: Deep slate blue (#1e3a5f) + Vibrant teal (#0ea5e9)
 * Typography: Poppins (display) + Inter (body)
 * Dark Mode: Full support with proper contrast
 * Animations: Smooth scroll-in from bottom-left with staggered timing
 */

const heroBackgroundUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663588749976/VqtRsrvp8AWWYW82Ld27rf/hero-engineering-background-gPuKqdoFABjZWmGzkQ2Z5t.webp";
const accentPatternUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663588749976/VqtRsrvp8AWWYW82Ld27rf/accent-tech-pattern-AFvPnPkBFdGZXfE9CmLEpP.webp";

interface TimelineEvent {
  id: string;
  date: string;
  dateRange?: string;
  title: string;
  subtitle: string;
  description: string[];
  type: 'education' | 'experience' | 'achievement';
  status?: 'completed' | 'current' | 'upcoming';
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'hs',
    date: '2019',
    dateRange: 'Jan 2019 - Nov 2023',
    title: 'National Senior Certificate',
    subtitle: 'Hulwazi Secondary School, Daveyton',
    type: 'education',
    status: 'completed',
    description: [
      'Completed high school education with strong academic foundation',
      'Developed discipline and work ethic in preparation for university',
      'Participated in various academic and extracurricular activities'
    ]
  },
  {
    id: 'tutoring',
    date: '2023',
    dateRange: 'June 2023 - Present',
    title: 'Freelance Tutor',
    subtitle: 'Self-Employed | Transforming Complex Concepts into Clarity',
    type: 'experience',
    status: 'current',
    description: [
      'Deliver engaging tutoring in Mathematics, Physics, and Chemistry at university and high school levels with proven track record of improving student performance',
      'Master the art of translating abstract concepts into intuitive understanding through real-world analogies, interactive problem-solving, and hands-on demonstrations',
      'Craft personalized learning strategies that adapt to each student\'s unique learning style, pace, and goals—ensuring breakthrough moments and lasting comprehension'
    ]
  },
  {
    id: 'mentor',
    date: '2023',
    dateRange: 'Sep 2023 - Present',
    title: 'Peer Mentor',
    subtitle: 'University of the Witwatersrand',
    type: 'experience',
    status: 'current',
    description: [
      'Provide academic support to help fellow students understand course material and clarify complex concepts',
      'Offer guidance on navigating campus resources, academic requirements, and balancing workload',
      'Develop study techniques and improve learning strategies for diverse student backgrounds'
    ]
  },
  {
    id: 'bsc',
    date: '2024',
    dateRange: 'Jan 2024 - Present',
    title: 'BSc Electrical Engineering',
    subtitle: 'University of the Witwatersrand',
    type: 'education',
    status: 'current',
    description: [
      'Focus Areas: Circuit theory, electromagnetism, C++ programming, algebra, calculus, physics, and systems design',
      'Design Project: Optimized a DC motor hoist system to lift payloads efficiently, focusing on torque optimization',
      'Current Work: Learning C++ programming from foundational concepts with applications in embedded systems and simulation'
    ]
  }
];

// Scroll animation hook with scroll direction detection
const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      const rect = ref.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport && !isVisible) {
        // Animate only once when first entering viewport
        if (isScrollingDown) {
          ref.current.classList.add('scroll-fade-in');
        } else {
          ref.current.classList.add('scroll-fade-in-reverse');
        }
        setIsVisible(true);
      }
      // Once animated, keep the animation classes - do not remove them
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isVisible };
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("skills");
  const { theme, toggleTheme } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);

  // Parallax effect for glass blobs
  useEffect(() => {
    const handleParallaxScroll = () => {
      const scrollY = window.scrollY;
      const parallaxOffset = scrollY * 0.15; // 15% of scroll speed
      
      // Update CSS custom property for parallax
      document.documentElement.style.setProperty('--parallax-transform', `translateY(${parallaxOffset}px)`);
    };

    window.addEventListener('scroll', handleParallaxScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleParallaxScroll);
  }, []);

  useEffect(() => {
    let lastBounceTime = 0;
    const BOUNCE_COOLDOWN = 800;
    const ANIMATION_DURATION = 550;
    let timeoutId: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      // Strict cooldown - no bounce if within cooldown window
      if (now - lastBounceTime < BOUNCE_COOLDOWN) {
        return;
      }

      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const isAtTop = scrollTop <= 5;
      const isAtBottom = scrollTop >= scrollHeight - 5;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      let shouldBounce = false;
      let bounceClass = '';

      if (isAtTop && isScrollingUp && pageRef.current) {
        shouldBounce = true;
        bounceClass = 'page-stretch-top';
      } else if (isAtBottom && isScrollingDown && pageRef.current) {
        shouldBounce = true;
        bounceClass = 'page-stretch-bottom';
      }

      if (shouldBounce && pageRef.current) {
        // Update cooldown BEFORE animation starts
        lastBounceTime = now;
        
        // Clear any pending timeout
        if (timeoutId) clearTimeout(timeoutId);
        
        // Add animation class
        pageRef.current.classList.add(bounceClass);
        
        // Remove class after animation completes
        timeoutId = setTimeout(() => {
          if (pageRef.current) {
            pageRef.current.classList.remove(bounceClass);
          }
          timeoutId = null;
        }, ANIMATION_DURATION);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div ref={pageRef} className={`min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-gray-100 relative overflow-hidden`}>
      {/* iOS Glass Morphism Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Frosted glass base layer */}
        <div className="absolute inset-0 backdrop-blur-3xl opacity-40 dark:opacity-20"></div>
        
        {/* Animated glass blobs with parallax */}
        <div className="absolute inset-0 parallax-blobs" style={{ transform: 'var(--parallax-transform, translateY(0))', willChange: 'transform', backfaceVisibility: 'hidden' }}>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/35 to-cyan-500/25 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/35 to-blue-500/25 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>
        
        {/* Light overlay for iOS effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 dark:from-white/2 dark:via-transparent dark:to-white/2 pointer-events-none"></div>
      </div>
      <div className="relative z-10">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-slate-dark dark:text-white">Tshepiso Kevin Phoku</div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8">
              <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-accent-teal transition-smooth">About</a>
              <a href="#timeline" className="text-gray-600 dark:text-gray-400 hover:text-accent-teal transition-smooth">Journey</a>
              <a href="#skills" className="text-gray-600 dark:text-gray-400 hover:text-accent-teal transition-smooth">Skills</a>
              <a href="#certificates" className="text-gray-600 dark:text-gray-400 hover:text-accent-teal transition-smooth">Certificates</a>
              <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-accent-teal transition-smooth">Contact</a>
            </div>
            <button 
              onClick={toggleTheme} 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-smooth text-xl"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-dark via-blue-900 to-slate-dark dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${heroBackgroundUrl})`, backgroundSize: 'cover' }}></div>
        
        {/* Corner glow effects */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-0 corner-glow-top-left"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 rounded-full blur-3xl opacity-0 corner-glow-top-right"></div>
        
        {/* Animated circuit lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" style={{ pointerEvents: 'none' }}>
          <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="rgba(14, 165, 233, 0.4)" strokeWidth="2" className="hero-glow-animation" />
          <line x1="60%" y1="30%" x2="90%" y2="60%" stroke="rgba(14, 165, 233, 0.4)" strokeWidth="2" className="hero-glow-animation" style={{ animationDelay: '0.5s' }} />
          <line x1="20%" y1="70%" x2="50%" y2="90%" stroke="rgba(14, 165, 233, 0.4)" strokeWidth="2" className="hero-glow-animation" style={{ animationDelay: '1s' }} />
          <line x1="70%" y1="40%" x2="95%" y2="80%" stroke="rgba(14, 165, 233, 0.4)" strokeWidth="2" className="hero-glow-animation" style={{ animationDelay: '1.5s' }} />
        </svg>
        
        <div className="relative container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Electrical Engineering Excellence
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Passionate about designing innovative circuit solutions, optimizing embedded systems, and architecting intelligent AI-driven applications. Ready to transform complex engineering challenges into elegant, efficient solutions that push the boundaries of what's possible.
              </p>
              <div className="flex gap-4">
                <a href="#contact" className="bg-accent-teal hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-smooth flex items-center gap-2">
                  Get in Touch <ArrowUpRight size={20} />
                </a>
                <a href="#timeline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-smooth">
                  View Journey
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <img src={accentPatternUrl} alt="Technical pattern" className="w-full h-auto rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-slate-950">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-slate-dark dark:text-white">About Me</h2>
              <div className="w-16 h-1 bg-accent-teal mb-8"></div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                I am a second-year Electrical Engineering student at the University of the Witwatersrand, driven by a passion for circuit design, power systems, and embedded systems. My academic foundation spans circuit theory, electromagnetism, digital systems, and advanced programming—equipping me with both theoretical depth and practical problem-solving capabilities.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                What sets me apart is my commitment to excellence beyond the classroom. I actively mentor fellow students, sharing complex concepts through clear explanations and real-world applications. My hands-on experience includes optimizing DC motor hoist systems for maximum efficiency and developing C++ solutions for embedded applications.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I thrive in collaborative environments where innovation meets precision. Whether designing circuits, debugging code, or mentoring peers, I bring dedication, technical rigor, and a genuine passion for electrical engineering to every project.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
                <Lightbulb className="w-12 h-12 text-accent-teal mb-4" />
                <h3 className="text-xl font-bold mb-3 text-slate-dark dark:text-white">Innovation-Driven</h3>
                <p className="text-gray-700 dark:text-gray-300">Designing efficient circuits, architecting AI-driven solutions, and optimizing systems for real-world impact and intelligent automation</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
                <Users className="w-12 h-12 text-accent-teal mb-4" />
                <h3 className="text-xl font-bold mb-3 text-slate-dark dark:text-white">Team Player</h3>
                <p className="text-gray-700 dark:text-gray-300">Mentoring peers and fostering collaborative learning environments</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
                <Cpu className="w-12 h-12 text-accent-teal mb-4" />
                <h3 className="text-xl font-bold mb-3 text-slate-dark dark:text-white">Technical Depth</h3>
                <p className="text-gray-700 dark:text-gray-300">Mastering embedded systems, C++ programming, and circuit optimization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-slate-dark dark:text-white">My Journey</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">Click on any milestone to explore the details of my educational and professional progression.</p>
          <Timeline events={timelineEvents} />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white dark:bg-slate-950">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-slate-dark dark:text-white">Skills & Competencies</h2>
          <div className="w-16 h-1 bg-accent-teal mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Programming Languages */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-slate-dark dark:text-white flex items-center gap-3">
                <Code2 className="w-6 h-6 text-accent-teal" />
                Programming Languages
              </h3>
              <div className="space-y-6">
                {[
                  { name: 'C++', percentage: 81 },
                  { name: 'Python', percentage: 76 },
                  { name: 'MATLAB', percentage: 78 },
                  { name: 'Machine Learning', percentage: 55 },
                  { name: 'Assembly', percentage: 61 }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{skill.name}</span>
                      <span className="text-accent-teal font-bold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-accent-teal to-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    <span className="font-semibold">Claude Code</span> - Coming Soon
                  </p>
                </div>
              </div>
            </div>

            {/* Engineering Tools & Other Skills */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-slate-dark dark:text-white flex items-center gap-3">
                <Wrench className="w-6 h-6 text-accent-teal" />
                Engineering Tools
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['Multisim', 'LTspice', 'MATLAB/Simulink', 'Proteus Design Suite'].map((tool) => (
                  <div key={tool} className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center gap-2">
                    <span className="text-accent-teal text-xl">✓</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{tool}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold mb-8 text-slate-dark dark:text-white flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-accent-teal" />
                Office & Productivity
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'].map((tool) => (
                  <div key={tool} className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center gap-2">
                    <span className="text-accent-teal text-xl">✓</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{tool}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold mb-8 text-slate-dark dark:text-white flex items-center gap-3">
                <Zap className="w-6 h-6 text-accent-teal" />
                Soft Skills
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {['Problem-Solving', 'Communication', 'Team Collaboration'].map((skill) => (
                  <div key={skill} className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center gap-2">
                    <span className="text-accent-teal text-xl">✓</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-slate-dark dark:text-white">Featured Projects</h2>
          <div className="w-16 h-1 bg-accent-teal mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* DC Motor Hoist */}
            <div className="bg-white dark:bg-slate-950 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 h-32 flex items-center justify-center">
                <Zap className="w-16 h-16 text-white opacity-30" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-slate-dark dark:text-white">DC Motor Hoist System Optimization</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 font-semibold">Electrical Engineering Design Project</p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">Designed and optimized a DC motor hoist system to efficiently lift payloads with focus on torque optimization and system performance. This project demonstrates practical application of circuit theory, control systems, and mechanical engineering principles.</p>
                
                <h4 className="font-bold text-slate-dark dark:text-white mb-3">Key Achievements:</h4>
                <ul className="space-y-2 mb-6 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-teal mt-1">•</span>
                    <span>Optimized motor torque for maximum payload capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-teal mt-1">•</span>
                    <span>Implemented circuit design using LTspice simulation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-teal mt-1">•</span>
                    <span>Analyzed system performance and efficiency metrics</span>
                  </li>
                </ul>

                <h4 className="font-bold text-slate-dark dark:text-white mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Circuit Design', 'LTspice', 'Control Systems', 'MATLAB'].map((tech) => (
                    <span key={tech} className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Proximity-Based Servo Control */}
            <div className="bg-white dark:bg-slate-950 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <img src="/manus-storage/WhatsAppImage2026-05-16at15.36.15_818281e1.webp" alt="Proximity-Based Servo Control System" className="w-full h-48 object-cover" />
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-slate-dark dark:text-white">Proximity-Based Servo Control System</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 font-semibold">AVR Microcontroller Project | Embedded Systems</p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">Designed and implemented a fully automated proximity detection system using AVR Assembly on ATmega328P microcontroller. The system integrates ultrasonic sensing, servo motor control, and real-time LED feedback to detect nearby objects and respond with precise servo positioning.</p>
                
                <h4 className="font-bold text-slate-dark dark:text-white mb-3">Key Achievements:</h4>
                <ul className="space-y-2 mb-6 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-teal mt-1">•</span>
                    <span>Engineered 100% AVR Assembly implementation achieving direct hardware control with zero software abstraction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-teal mt-1">•</span>
                    <span>Implemented real-time interrupt-driven architecture reducing latency to &lt;50µs using hardware timers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-teal mt-1">•</span>
                    <span>Solved "Ghost Zone" false triggers through 16-bit arithmetic, improving sensor accuracy from 78% to 99.8%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-teal mt-1">•</span>
                    <span>Achieved 100% system reliability across all test conditions with &lt;10ms response time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-teal mt-1">•</span>
                    <span>Overcame register corruption during ISR execution through proper register preservation protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-teal mt-1">•</span>
                    <span>Designed multi-state LED feedback (Safe/Warning/Critical) with real-time status indication</span>
                  </li>
                </ul>

                <h4 className="font-bold text-slate-dark dark:text-white mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {['AVR Assembly', 'ATmega328P', 'PWM Control', 'Embedded C', 'Real-Time Systems'].map((tech) => (
                    <span key={tech} className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200 px-3 py-1 rounded-full text-sm font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 bg-white dark:bg-slate-950">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-slate-dark dark:text-white">Certifications & Achievements</h2>
          <div className="w-16 h-1 bg-accent-teal mb-12"></div>
          <Certificates />
        </div>
      </section>

      {/* Interests Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-slate-dark dark:text-white">Interests & Passions</h2>
          <div className="w-16 h-1 bg-accent-teal mb-12"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Circuit Design',
                description: 'Passionate about designing efficient and innovative electrical circuits'
              },
              {
                icon: Cpu,
                title: 'Embedded Systems',
                description: 'Fascinated by programming microcontrollers and IoT applications with cutting-edge technologies'
              },
              {
                icon: Lightbulb,
                title: 'Machine Learning & AI',
                description: 'Architecting intelligent systems that combine electrical engineering with AI-driven automation'
              },
              {
                icon: Code2,
                title: 'Problem Solving',
                description: 'Love tackling complex engineering challenges with creative, innovative solutions'
              },
              {
                icon: Users,
                title: 'Mentoring',
                description: 'Dedicated to helping others understand engineering concepts and unlock their potential'
              }
            ].map((interest, index) => {
              const Icon = interest.icon;
              return (
                <div key={index} className="bg-white dark:bg-slate-950 p-8 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-accent-teal mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-slate-dark dark:text-white">{interest.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{interest.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-slate-950">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-slate-dark dark:text-white">Get in Touch</h2>
          <div className="w-16 h-1 bg-accent-teal mb-12"></div>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Ready to collaborate on groundbreaking projects? Whether you're looking for a driven electrical engineer, an innovative problem-solver, or someone passionate about AI-driven systems, I'm excited to connect!
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Let's discuss how I can contribute to your team's success. Reach out through any channel below—I respond quickly and am always eager to explore new opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
              <Phone className="w-8 h-8 text-accent-teal mb-4" />
              <h3 className="text-xl font-bold mb-2 text-slate-dark dark:text-white">Phone</h3>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">+27 65 6460 357</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
              <Mail className="w-8 h-8 text-accent-teal mb-4" />
              <h3 className="text-xl font-bold mb-2 text-slate-dark dark:text-white">Email</h3>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">2837716@students.wits.ac.za</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <a href="https://www.linkedin.com/in/tshepiso-phoku-7b8a3a2b9/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow flex items-start gap-4">
              <Linkedin className="w-8 h-8 text-accent-teal flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-2">LinkedIn</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Connect with me on LinkedIn to see my professional profile and endorsements.</p>
                <span className="text-accent-teal font-semibold flex items-center gap-2">
                  View Profile <ExternalLink size={16} />
                </span>
              </div>
            </a>
            <a href="https://github.com/tshepiso-phoku" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow flex items-start gap-4">
              <Github className="w-8 h-8 text-accent-teal flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-2">GitHub</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Explore my code repositories and see my projects in action.</p>
                <span className="text-accent-teal font-semibold flex items-center gap-2">
                  View Projects <ExternalLink size={16} />
                </span>
              </div>
            </a>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin size={18} />
            <span>Johannesburg, South Africa</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-dark dark:bg-slate-950 text-white py-8">
        <div className="container text-center">
          <p className="mb-2">© 2026 Tshepiso Kevin Phoku. All rights reserved.</p>
          <p className="text-sm text-gray-400">This portfolio is my exclusive intellectual property. No third party, including Meta, Google, or any technology platform, has any claim to this website or its content.</p>
        </div>
      </footer>
      </div>
    </div>
  );
}
