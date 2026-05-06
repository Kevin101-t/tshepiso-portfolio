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
      const isInView = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;

      if (isInView && isScrollingDown) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isVisible };
};

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const lastBounceTimeRef = useRef(0);
  const bounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let lastWheelTime = 0;
    const BOUNCE_COOLDOWN = 800; // ms between bounces
    const ANIMATION_DURATION = 550; // ms for animation

    const handleWheel = (e: WheelEvent) => {
      if (!pageRef.current) return;

      const now = Date.now();
      const timeSinceLastBounce = now - lastBounceTimeRef.current;

      // Only allow bounce if cooldown has passed
      if (timeSinceLastBounce < BOUNCE_COOLDOWN) {
        return;
      }

      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const isAtTop = scrollTop <= 5;
      const isAtBottom = scrollTop >= scrollHeight - 5;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // Check if we should bounce
      let shouldBounce = false;
      let bounceClass = '';

      if (isAtTop && isScrollingUp) {
        shouldBounce = true;
        bounceClass = 'page-bounce-top';
      } else if (isAtBottom && isScrollingDown) {
        shouldBounce = true;
        bounceClass = 'page-bounce-bottom';
      }

      if (shouldBounce) {
        // Clear any existing timeout
        if (bounceTimeoutRef.current) {
          clearTimeout(bounceTimeoutRef.current);
        }

        // Update last bounce time BEFORE adding class
        lastBounceTimeRef.current = now;

        // Add animation class
        pageRef.current.classList.add(bounceClass);

        // Remove class after animation completes
        bounceTimeoutRef.current = setTimeout(() => {
          if (pageRef.current) {
            pageRef.current.classList.remove(bounceClass);
          }
          bounceTimeoutRef.current = null;
        }, ANIMATION_DURATION);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (bounceTimeoutRef.current) {
        clearTimeout(bounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={pageRef} className={`min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-gray-100 relative overflow-hidden`}>
      {/* iOS Glass Morphism Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Frosted glass blur base layer */}
        <div className="absolute inset-0 backdrop-blur-3xl opacity-40 dark:opacity-20"></div>
        
        {/* Animated glass blobs with proper morphism */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-cyan-500/20 rounded-full blur-3xl animate-blob-glass"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 rounded-full blur-3xl animate-blob-glass" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/25 to-cyan-400/15 rounded-full blur-3xl animate-blob-glass" style={{ animationDelay: '4s' }}></div>
        
        {/* Light overlay for iOS glass effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 dark:from-white/2 dark:via-transparent dark:to-white/2 pointer-events-none"></div>
      </div>

      <div className="relative z-0">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
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
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-smooth">
                {/* Theme toggle placeholder */}
                <span className="text-xl">🌙</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Electrical<br />Engineering<br />Excellence
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Passionate about designing innovative circuit solutions, optimizing embedded systems, and architecting intelligent AI-driven applications. Ready to transform complex engineering challenges into elegant, efficient solutions that push the boundaries of what's possible.
              </p>
              <div className="flex gap-4 pt-4">
                <a href="#contact" className="px-6 py-3 bg-accent-teal text-white rounded-lg hover:bg-accent-teal/90 transition-smooth">Get in Touch →</a>
                <a href="#timeline" className="px-6 py-3 border border-accent-teal text-accent-teal rounded-lg hover:bg-accent-teal/10 transition-smooth">View Journey</a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-2xl blur-2xl"></div>
              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-8 shadow-2xl">
                <svg className="w-full h-64" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="200" cy="150" r="80" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.3" />
                  <circle cx="200" cy="150" r="60" fill="none" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.5" />
                  <circle cx="200" cy="150" r="40" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.7" />
                  {[...Array(12)].map((_, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    const x = 200 + 70 * Math.cos(angle);
                    const y = 150 + 70 * Math.sin(angle);
                    return <circle key={i} cx={x} cy={y} r="3" fill="#0ea5e9" opacity="0.6" />;
                  })}
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-900/50">
          <div className="container space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">About Me</h2>
              <div className="w-16 h-1 bg-accent-teal rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="text-4xl">💡</div>
                <h3 className="text-xl font-semibold">Innovation-Driven</h3>
                <p className="text-gray-600 dark:text-gray-400">Designing efficient circuits, architecting AI-driven solutions, and optimizing systems for real-world impact and intelligent automation</p>
              </div>
              <div className="space-y-3">
                <div className="text-4xl">🤝</div>
                <h3 className="text-xl font-semibold">Team Player</h3>
                <p className="text-gray-600 dark:text-gray-400">Mentoring peers and fostering collaborative learning environments</p>
              </div>
              <div className="space-y-3">
                <div className="text-4xl">⚙️</div>
                <h3 className="text-xl font-semibold">Technical Depth</h3>
                <p className="text-gray-600 dark:text-gray-400">Mastering embedded systems, C++ programming, and circuit optimization</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
              I am a second-year Electrical Engineering student at the University of the Witwatersrand, driven by a passion for circuit design, power systems, and embedded systems. My academic foundation spans circuit theory, electromagnetism, digital systems, and advanced programming—equipping me with both theoretical depth and practical problem-solving capabilities.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-20 md:py-32">
          <div className="container space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">My Journey</h2>
              <div className="w-16 h-1 bg-accent-teal rounded-full"></div>
            </div>
            <Timeline events={timelineEvents} />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-900/50">
          <div className="container space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Skills & Competencies</h2>
              <div className="w-16 h-1 bg-accent-teal rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Programming Languages</h3>
                {[
                  { name: 'C++', level: 81 },
                  { name: 'Python', level: 76 },
                  { name: 'MATLAB', level: 78 },
                  { name: 'Assembly', level: 61 },
                  { name: 'Machine Learning', level: 55 }
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-accent-teal">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-accent-teal h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Engineering Tools</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Multisim', 'LTspice', 'MATLAB/Simulink', 'Proteus Design Suite', 'Microsoft Office', 'Git'].map((tool) => (
                    <div key={tool} className="p-4 bg-gray-100 dark:bg-slate-800 rounded-lg text-center">
                      <span className="font-medium">✓ {tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="py-20 md:py-32">
          <div className="container space-y-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Certificates & Achievements</h2>
              <div className="w-16 h-1 bg-accent-teal rounded-full"></div>
            </div>
            <Certificates />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <div className="container text-center space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Ready to collaborate on groundbreaking projects? Whether you're looking for a driven electrical engineer, an innovative problem-solver, or someone passionate about AI-driven systems, I'm excited to connect!
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 py-8">
              <div>
                <p className="text-sm opacity-75 mb-2">Phone</p>
                <a href="tel:+27656460357" className="text-xl font-semibold hover:opacity-80 transition-smooth">+27 65 6460 357</a>
              </div>
              <div>
                <p className="text-sm opacity-75 mb-2">Email</p>
                <a href="mailto:2837716@students.wits.ac.za" className="text-xl font-semibold hover:opacity-80 transition-smooth">2837716@students.wits.ac.za</a>
              </div>
              <div>
                <p className="text-sm opacity-75 mb-2">Location</p>
                <p className="text-xl font-semibold">Johannesburg, South Africa</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center pt-8">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-opacity-90 transition-smooth font-semibold">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-opacity-90 transition-smooth font-semibold">GitHub</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="container text-center text-gray-600 dark:text-gray-400">
            <p>Made with <span className="text-accent-teal">❤️</span> by Tshepiso Phoku</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
