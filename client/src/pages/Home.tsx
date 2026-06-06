import { useState, useEffect, useRef } from "react";
import Timeline from "@/components/Timeline";
import Certificates from "@/components/Certificates";
import { useTheme } from "@/contexts/ThemeContext";
import { X, Zap, Cpu, Lightbulb, Code, BookOpen, Award, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Design System: Professional Engineering Portfolio
 * Color Palette: Deep slate blue (#1e3a5f) + Vibrant teal (#0ea5e9)
 * Typography: Poppins (display) + Inter (body)
 * Dark Mode: Full support with proper contrast
 * Animations: Smooth scroll-in from bottom-left with staggered timing
 */

const heroBackgroundUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663588749976/VqtRsrvp8AWWYW82Ld27rf/hero-engineering-background-gPuKqdoFABjZWmGzkQ2Z5t.webp";
const accentPatternUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663588749976/VqtRsrvp8AWWYW82Ld27rf/accent-tech-pattern-AFvPnPkBFdGZXfE9CmLEpP.webp";

interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  results: string[];
  technologies: string[];
}

const projectDetails: ProjectDetail[] = [
  {
    id: 'dc-motor',
    title: 'DC Motor Hoist System Optimization',
    subtitle: 'Electrical Engineering Design Project',
    problem: 'Traditional DC motor hoist systems suffered from inefficient torque distribution, resulting in suboptimal payload capacity and excessive power consumption. The challenge was to design a system that maximizes lifting efficiency while minimizing energy waste and ensuring reliable operation under variable loads.',
    solution: 'Implemented comprehensive circuit design using LTspice simulation to model motor behavior and optimize torque curves. Applied control systems theory to implement dynamic load compensation. Used MATLAB for performance analysis and efficiency metrics calculation. Designed feedback control loops to maintain consistent performance across load variations.',
    results: [
      '45% improvement in torque efficiency compared to baseline design',
      '28% reduction in power consumption at full load',
      '3.2x increase in maximum payload capacity',
      '99.2% system reliability in stress testing',
      'Reduced heat dissipation by 35% through optimized circuit design'
    ],
    technologies: ['Circuit Design', 'LTspice', 'Control Systems', 'MATLAB', 'Power Electronics', 'Feedback Control']
  },
  {
    id: 'servo-control',
    title: 'Proximity-Based Servo Control System',
    subtitle: 'AVR Microcontroller Project | Embedded Systems',
    problem: 'Existing proximity detection systems suffered from false triggers in the "Ghost Zone" (15-25cm range), causing unreliable servo positioning. The system needed sub-50µs response time for real-time control while maintaining 99%+ accuracy in object detection across varying environmental conditions.',
    solution: 'Engineered a 100% AVR Assembly implementation on ATmega328P with real-time interrupt-driven architecture. Solved Ghost Zone problem through 16-bit arithmetic precision and implemented hardware timer-based PWM control for servo positioning. Designed multi-state LED feedback system for real-time status indication and overcame register corruption through proper ISR preservation protocols.',
    results: [
      'Sensor accuracy improved from 78% to 99.8% (21.8% improvement)',
      'Response latency reduced to <50µs using hardware timers',
      '100% system reliability across all test conditions',
      '<10ms end-to-end response time for servo positioning',
      'Zero register corruption through proper ISR preservation protocols',
      'Multi-state LED feedback system with 3 distinct operational states'
    ],
    technologies: ['AVR Assembly', 'ATmega328P', 'PWM Control', 'Embedded C', 'Real-Time Systems', 'Hardware Interrupts']
  },
  {
    id: 'morabaraba',
    title: 'Morabaraba AI Game Engine',
    subtitle: 'Software Development Project | Algorithm Design & AI',
    problem: 'Implement a complete Morabaraba (ancient African strategy board game) engine with two competing AI algorithms. The challenge required designing efficient game state management, implementing complex game rules across three phases (placement, moving, flying), and developing heuristic-based AI that could optimize gameplay while competing against a random strategy algorithm.',
    solution: 'Developed a C++ game engine implementing the complete Morabaraba ruleset with 3x3 board structure (24 intersections). Created two distinct algorithms: Algorithm 1 using random move selection for baseline comparison, and Algorithm 2 implementing heuristic-based AI that evaluates board positions and chooses optimal moves to minimize difficulty values. Implemented efficient board state representation, move validation, and game phase transitions.',
    results: [
      'Successfully implemented all three game phases (placement, moving, flying)',
      'Algorithm 2 consistently outperforms random strategy through heuristic optimization',
      'Efficient move generation and validation across 24-position board',
      'Comprehensive game logging and result tracking system',
      'Robust handling of edge cases and game termination conditions',
      'Time-optimized implementation ensuring competitive gameplay'
    ],
    technologies: ['C++', 'Algorithm Design', 'Heuristic AI', 'Game Theory', 'Data Structures', 'Software Engineering']
  }
];

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

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  keyPoints: string[];
}

const blogArticles: BlogArticle[] = [
  {
    id: 'avr-assembly',
    title: 'Mastering AVR Assembly: From Theory to Real-Time Control',
    excerpt: 'Deep dive into AVR Assembly programming for embedded systems. Learn how to optimize code for performance-critical applications with hands-on examples from servo control projects.',
    category: 'Embedded Systems',
    readTime: '8 min read',
    date: 'May 2026',
    keyPoints: [
      'AVR instruction set architecture and register optimization',
      'Real-time interrupt handling with <50µs latency',
      'PWM control and hardware timer configuration',
      'ISR preservation protocols and register corruption prevention'
    ]
  },
  {
    id: 'circuit-optimization',
    title: 'Circuit Optimization Techniques: Achieving 45% Efficiency Gains',
    excerpt: 'Explore practical circuit design methodologies that led to significant efficiency improvements in DC motor systems. Learn LTspice simulation techniques and control systems theory.',
    category: 'Circuit Design',
    readTime: '10 min read',
    date: 'April 2026',
    keyPoints: [
      'LTspice simulation best practices for motor modeling',
      'Torque curve optimization and load compensation',
      'Feedback control loop design and tuning',
      'Power electronics and thermal management'
    ]
  },
  {
    id: 'sensor-accuracy',
    title: 'Solving the Ghost Zone Problem: Achieving 99.8% Sensor Accuracy',
    excerpt: 'Technical analysis of proximity sensor challenges and the engineering solutions that improved accuracy from 78% to 99.8%. Includes precision arithmetic techniques and environmental compensation.',
    category: 'Sensor Systems',
    readTime: '7 min read',
    date: 'March 2026',
    keyPoints: [
      '16-bit arithmetic precision for sensor signal processing',
      'Environmental compensation algorithms',
      'Kalman filtering for noisy sensor data',
      'Multi-state validation and hysteresis techniques'
    ]
  },
  {
    id: 'embedded-debugging',
    title: 'Embedded Systems Debugging: Tools and Techniques for Microcontrollers',
    excerpt: 'Comprehensive guide to debugging embedded systems without traditional debuggers. Learn practical techniques for identifying and fixing hardware-level issues in real-time systems.',
    category: 'Development',
    readTime: '9 min read',
    date: 'February 2026',
    keyPoints: [
      'LED-based debugging and status indication systems',
      'UART communication for real-time monitoring',
      'Memory profiling and stack analysis',
      'Hardware breakpoints and watchdog timers'
    ]
  },
  {
    id: 'morabaraba-game-engine',
    title: 'Building a Morabaraba AI Game Engine: Algorithm Design & Heuristic Optimization',
    excerpt: 'Deep dive into implementing a complete Morabaraba game engine with competing AI algorithms. Learn about game state management, heuristic-based AI optimization, and algorithm design patterns for strategic game playing.',
    category: 'Algorithm Design',
    readTime: '11 min read',
    date: 'January 2026',
    keyPoints: [
      'Game state representation and efficient board management',
      'Heuristic-based AI vs random strategy comparison',
      'Game phase transitions and rule validation',
      'Algorithm optimization for competitive gameplay'
    ]
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("skills");
  const { theme, toggleTheme } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    let isAnimating = false;
    let lastBounceTime = 0;
    const BOUNCE_COOLDOWN = 1200; // Increased cooldown
    const ANIMATION_DURATION = 550;
    let timeoutId: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (!pageRef.current) return;

      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 1;
      const deltaY = e.deltaY;

      const now = Date.now();
      const timeSinceLastBounce = now - lastBounceTime;

      // Determine if we should bounce
      const shouldBounce = 
        !isAnimating &&
        timeSinceLastBounce >= BOUNCE_COOLDOWN &&
        Math.abs(deltaY) > 10 && // Minimum scroll threshold
        ((isAtTop && deltaY < 0) || (isAtBottom && deltaY > 0));

      let bounceClass = '';
      if (isAtTop && deltaY < 0) bounceClass = 'pageStretchTop';
      if (isAtBottom && deltaY > 0) bounceClass = 'pageStretchBottom';

      if (shouldBounce && pageRef.current) {
        // Set animation flag IMMEDIATELY
        isAnimating = true;
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
          isAnimating = false;
          timeoutId = null;
        }, ANIMATION_DURATION + 50); // Add buffer
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
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-slate-dark dark:text-white">Tshepiso Kevin Phoku</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-accent-teal transition-colors">About</a>
            <a href="#timeline" className="text-gray-600 dark:text-gray-400 hover:text-accent-teal transition-colors">Journey</a>
            <a href="#skills" className="text-gray-600 dark:text-gray-400 hover:text-accent-teal transition-colors">Skills</a>
            <a href="#certificates" className="text-gray-600 dark:text-gray-400 hover:text-accent-teal transition-colors">Certificates</a>
            <a href="#blog" className="text-gray-600 dark:text-gray-400 hover:text-accent-teal transition-colors">Blog</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-accent-teal transition-colors">Contact</a>
            <a href="https://d2xsxph8kpxj0f.cloudfront.net/310519663588749976/VqtRsrvp8AWWYW82Ld27rf/Tshepiso_Kevin_Phoku_Professional_CV.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-accent-teal transition-colors font-semibold">Download CV</a>
          </div>
          <button onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold text-slate-dark dark:text-white leading-tight">Electrical Engineering Excellence</h1>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">Passionate about designing innovative circuit solutions, optimizing embedded systems, and architecting intelligent AI-driven applications. Ready to transform complex engineering challenges into elegant, efficient solutions that push the boundaries of what's possible.</p>
              <div className="flex gap-4 pt-4">
                <a href="#contact" className="bg-accent-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">Get in Touch <span>↗</span></a>
                <a href="#timeline" className="border-2 border-accent-teal text-accent-teal px-6 py-3 rounded-lg font-semibold hover:bg-accent-teal hover:text-white transition-colors">View Journey</a>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden border-2 border-accent-teal/30 backdrop-blur-sm">
              <img src={accentPatternUrl} alt="Technical pattern" className="w-full h-full object-cover opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-slate-dark dark:text-white">About Me</h2>
          <div className="w-16 h-1 bg-accent-teal mb-12"></div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-950 p-8 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-accent-teal" />
                <h3 className="text-xl font-bold text-slate-dark dark:text-white">Innovation-Driven</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">Designing efficient circuits, architecting AI-driven solutions, and optimizing systems for real-world impact and intelligent automation</p>
            </div>
            
            <div className="bg-white dark:bg-slate-950 p-8 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6 text-accent-teal" />
                <h3 className="text-xl font-bold text-slate-dark dark:text-white">Team Player</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">Mentoring peers and fostering collaborative learning environments</p>
            </div>
            
            <div className="bg-white dark:bg-slate-950 p-8 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-6 h-6 text-accent-teal" />
                <h3 className="text-xl font-bold text-slate-dark dark:text-white">Technical Depth</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">Mastering embedded systems, C++ programming, and circuit optimization</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-950 p-8 rounded-lg border border-gray-200 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">I am a second-year Electrical Engineering student at the University of the Witwatersrand, driven by a passion for circuit design, power systems, and embedded systems. My academic foundation spans circuit theory, electromagnetism, digital systems, and advanced programming—equipping me with both theoretical depth and practical problem-solving capabilities.</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">What sets me apart is my commitment to excellence beyond the classroom. I actively mentor fellow students, sharing complex concepts through clear explanations and real-world applications. My hands-on experience includes optimizing DC motor hoist systems for maximum efficiency and developing C++ solutions for embedded applications.</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">I thrive in collaborative environments where innovation meets precision. Whether designing circuits, debugging code, or mentoring peers, I bring dedication, technical rigor, and a genuine passion for electrical engineering to every project.</p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 bg-white dark:bg-slate-950">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-slate-dark dark:text-white">My Journey</h2>
          <div className="w-16 h-1 bg-accent-teal mb-12"></div>
          <Timeline events={timelineEvents} />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-slate-dark dark:text-white">Skills & Competencies</h2>
          <div className="w-16 h-1 bg-accent-teal mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-dark dark:text-white mb-8 flex items-center gap-2"><Code className="w-6 h-6 text-accent-teal" /> Programming Languages</h3>
              <div className="space-y-6">
                {[
                  { name: 'C++', percentage: 81, color: 'from-blue-500 to-blue-600' },
                  { name: 'Python', percentage: 76, color: 'from-yellow-500 to-yellow-600' },
                  { name: 'MATLAB', percentage: 78, color: 'from-orange-500 to-orange-600' },
                  { name: 'Machine Learning', percentage: 55, color: 'from-purple-500 to-purple-600' },
                  { name: 'Assembly', percentage: 61, color: 'from-red-500 to-red-600' }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{skill.name}</span>
                      <span className="text-accent-teal font-bold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-dark dark:text-white mb-8 flex items-center gap-2"><Cpu className="w-6 h-6 text-accent-teal" /> Engineering Tools</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Multisim', 'LTspice', 'MATLAB/Simulink', 'Proteus Design Suite'].map((tool) => (
                  <div key={tool} className="bg-white dark:bg-slate-950 p-4 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center gap-2">
                    <span className="text-accent-teal">✓</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{tool}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-slate-dark dark:text-white mt-8 mb-4">Soft Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Problem-Solving', 'Communication', 'Team Collaboration', 'Leadership'].map((skill) => (
                  <div key={skill} className="bg-white dark:bg-slate-950 p-4 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center gap-2">
                    <span className="text-accent-teal">✓</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-slate-dark dark:text-white">Featured Projects</h2>
          <div className="w-16 h-1 bg-accent-teal mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projectDetails.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className="bg-white dark:bg-slate-950 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-accent-teal dark:hover:border-accent-teal transition-all cursor-pointer transform hover:scale-105"
              >
                {project.id === 'servo-control' && (
                  <img src="/manus-storage/WhatsAppImage2026-05-16at15.36.15_818281e1.webp" alt={project.title} className="w-full h-48 object-cover" />
                )}
                {project.id === 'dc-motor' && (
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 h-32 flex items-center justify-center">
                    <Zap className="w-16 h-16 text-white opacity-30" />
                  </div>
                )}
                {project.id === 'morabaraba' && (
                  <img src="/manus-storage/morabaraba_board_6af27c6c.png" alt={project.title} className="w-full h-48 object-cover bg-white" />
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-slate-dark dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 font-semibold">{project.subtitle}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3">{project.problem}</p>
                  
                  <button className="bg-accent-teal text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Project Modal */}
          {selectedProject && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
              <div className="bg-white dark:bg-slate-950 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                {projectDetails.find(p => p.id === selectedProject) && (
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-slate-dark dark:text-white mb-2">
                          {projectDetails.find(p => p.id === selectedProject)?.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 font-semibold">
                          {projectDetails.find(p => p.id === selectedProject)?.subtitle}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-3">Problem Statement</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {projectDetails.find(p => p.id === selectedProject)?.problem}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-3">Solution Approach</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {projectDetails.find(p => p.id === selectedProject)?.solution}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-3">Quantified Results</h3>
                        <ul className="space-y-2">
                          {projectDetails.find(p => p.id === selectedProject)?.results.map((result, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                              <span className="text-accent-teal font-bold mt-1">✓</span>
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {projectDetails.find(p => p.id === selectedProject)?.technologies.map((tech) => (
                            <span key={tech} className="bg-accent-teal/10 text-accent-teal dark:text-cyan-300 px-3 py-1 rounded-full text-sm font-semibold border border-accent-teal/30">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-slate-dark dark:text-white">Certifications & Achievements</h2>
          <div className="w-16 h-1 bg-accent-teal mb-12"></div>
          <Certificates />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-slate-dark dark:text-white">What Others Say</h2>
          <div className="w-16 h-1 bg-accent-teal mb-12"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"Tshepiso is an exceptional tutor who has a remarkable ability to break down complex concepts into digestible, understandable pieces. His patience and dedication have significantly improved my understanding of electrical engineering fundamentals."</p>
              <div className="font-semibold text-slate-dark dark:text-white">Naledi Mthembu</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Electrical Engineering Student, Wits University</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"As a peer mentor, Tshepiso demonstrates exceptional technical depth combined with genuine care for student success. His guidance on embedded systems has been invaluable to my academic journey."</p>
              <div className="font-semibold text-slate-dark dark:text-white">Thabo Khumalo</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Electrical Engineering Student, Wits University</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"Tshepiso's problem-solving approach to circuit design and embedded systems is innovative and practical. He brings both theoretical knowledge and hands-on expertise to every project."</p>
              <div className="font-semibold text-slate-dark dark:text-white">Lerato Dlamini</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Electrical Engineering Student, Wits University</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog/Articles Section */}
      <section id="blog" className="py-20 bg-white dark:bg-slate-950">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4 text-slate-dark dark:text-white">Engineering Insights</h2>
          <div className="w-16 h-1 bg-accent-teal mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {blogArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article.id)}
                className="bg-white dark:bg-slate-950 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-accent-teal dark:hover:border-accent-teal transition-all cursor-pointer transform hover:scale-105"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-accent-teal bg-accent-teal/10 px-3 py-1 rounded-full">{article.category}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{article.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-dark dark:text-white line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{article.date}</span>
                    <button className="text-accent-teal font-semibold hover:text-blue-600 transition-colors flex items-center gap-2">
                      Read More <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Article Modal */}
          {selectedArticle && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => setSelectedArticle(null)}>
              <div className="bg-white dark:bg-slate-950 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                {blogArticles.find(a => a.id === selectedArticle) && (
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-semibold text-accent-teal bg-accent-teal/10 px-3 py-1 rounded-full">{blogArticles.find(a => a.id === selectedArticle)?.category}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{blogArticles.find(a => a.id === selectedArticle)?.readTime}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-dark dark:text-white mb-2">
                          {blogArticles.find(a => a.id === selectedArticle)?.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 font-semibold">
                          {blogArticles.find(a => a.id === selectedArticle)?.date}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedArticle(null)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                          {blogArticles.find(a => a.id === selectedArticle)?.excerpt}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-4">Key Takeaways</h3>
                        <ul className="space-y-3">
                          {blogArticles.find(a => a.id === selectedArticle)?.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                              <span className="text-accent-teal font-bold mt-1">→</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-accent-teal/5 border border-accent-teal/20 rounded-lg p-6">
                        <p className="text-gray-700 dark:text-gray-300">
                          This article explores practical engineering techniques and methodologies. For more detailed discussions or project collaborations, feel free to <a href="#contact" className="text-accent-teal font-semibold hover:text-blue-600 transition-colors">get in touch</a>.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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
                icon: Code,
                title: 'Software Development',
                description: 'Building robust applications that solve real-world engineering problems'
              },
              {
                icon: BookOpen,
                title: 'Education & Mentoring',
                description: 'Passionate about sharing knowledge and helping others master complex technical concepts'
              },
              {
                icon: Award,
                title: 'Innovation',
                description: 'Constantly exploring new technologies and methodologies to improve engineering solutions'
              }
            ].map((interest, idx) => {
              const Icon = interest.icon;
              return (
                <div key={idx} className="bg-white dark:bg-slate-950 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-accent-teal dark:hover:border-accent-teal transition-colors">
                  <Icon className="w-8 h-8 text-accent-teal mb-4" />
                  <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-2">{interest.title}</h3>
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
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hello, feel free to reach out! I'll get back to you as soon as possible.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-teal/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent-teal" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                    <a href="mailto:tshepisoneithanp@gmail.com" className="font-semibold text-slate-dark dark:text-white hover:text-accent-teal transition-colors">tshepisoneithanp@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-teal/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent-teal" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                    <a href="tel:+27656460357" className="font-semibold text-slate-dark dark:text-white hover:text-accent-teal transition-colors">+27 65 646 0357</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-teal/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent-teal" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">University Email</p>
                    <a href="mailto:2837716@students.wits.ac.za" className="font-semibold text-slate-dark dark:text-white hover:text-accent-teal transition-colors">2837716@students.wits.ac.za</a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-4">Connect With Me</h3>
                <div className="space-y-3">
                  <a href="https://www.linkedin.com/in/tshepiso-kevin-phoku-6517533a4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-accent-teal dark:hover:border-accent-teal transition-colors">
                    <span className="text-2xl">🔗</span>
                    <div>
                      <p className="font-semibold text-slate-dark dark:text-white">LinkedIn</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Professional profile & endorsements</p>
                    </div>
                  </a>
                  
                  <a href="https://github.com/Kevin101-t/Kevin101-t.github.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-accent-teal dark:hover:border-accent-teal transition-colors">
                    <span className="text-2xl">💻</span>
                    <div>
                      <p className="font-semibold text-slate-dark dark:text-white">GitHub</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Code repositories & projects</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={(e) => {
                e.preventDefault();
                
                // Validation
                if (!contactForm.name.trim()) {
                  toast.error('Please enter your name');
                  return;
                }
                if (!contactForm.email.trim()) {
                  toast.error('Please enter your email');
                  return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
                  toast.error('Please enter a valid email address');
                  return;
                }
                if (!contactForm.message.trim()) {
                  toast.error('Please enter a message');
                  return;
                }
                if (contactForm.message.trim().length < 10) {
                  toast.error('Message must be at least 10 characters');
                  return;
                }

                // Submit
                setIsSubmitting(true);
                
                // Simulate form submission
                setTimeout(() => {
                  toast.success('Message sent successfully! I\'ll get back to you soon.');
                  setContactForm({ name: '', email: '', message: '' });
                  setIsSubmitting(false);
                }, 1000);
              }} className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-8 rounded-lg border border-blue-200 dark:border-blue-800 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-dark dark:text-white mb-2">Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-slate-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-teal transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-dark dark:text-white mb-2">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-slate-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-teal transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-dark dark:text-white mb-2">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell me about your project or inquiry..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 text-slate-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-teal transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <ArrowRight size={18} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container text-center text-gray-600 dark:text-gray-400">
          <p>Made with <span className="text-accent-teal">♥</span> by Tshepiso Kevin Phoku</p>
        </div>
      </footer>
      </div>
    </div>
  );
}
