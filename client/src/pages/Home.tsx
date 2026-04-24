import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code2, Zap, Users, BookOpen, ArrowUpRight, Moon, Sun, Lightbulb, Cpu, Wrench } from "lucide-react";
import { useState } from "react";
import Timeline from "@/components/Timeline";
import Certificates from "@/components/Certificates";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Design System: Professional Engineering Portfolio
 * Color Palette: Deep slate blue (#1e3a5f) + Vibrant teal (#0ea5e9)
 * Typography: Poppins (display) + Inter (body)
 * Dark Mode: Full support with proper contrast
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

export default function Home() {
  const [activeTab, setActiveTab] = useState("skills");
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-gray-100">
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

      {/* About Section - FIXED DARK MODE */}
      <section id="about" className="py-20 bg-white dark:bg-slate-900">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-dark dark:text-white mb-8">About Me</h2>
            <div className="divider-accent mb-8"></div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I am a second-year Electrical Engineering student at the University of the Witwatersrand, driven by a passion for circuit design, power systems, and embedded systems. My academic foundation spans circuit theory, electromagnetism, digital systems, and advanced programming—equipping me with both theoretical depth and practical problem-solving capabilities.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                What sets me apart is my commitment to excellence beyond the classroom. I actively mentor fellow students, sharing complex concepts through clear explanations and real-world applications. My hands-on experience includes optimizing DC motor hoist systems for maximum efficiency and developing C++ solutions for embedded applications.
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I thrive in collaborative environments where innovation meets precision. Whether designing circuits, debugging code, or mentoring peers, I bring dedication, technical rigor, and a genuine passion for electrical engineering to every project.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 shadow-elevated bg-white dark:bg-slate-800 border-0 dark:border dark:border-gray-700">
                <Lightbulb className="w-8 h-8 text-accent-teal mb-4" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Innovation-Driven</h3>
                <p className="text-gray-600 dark:text-gray-400">Designing efficient circuits, architecting AI-driven solutions, and optimizing systems for real-world impact and intelligent automation</p>
              </Card>
              <Card className="p-6 shadow-elevated bg-white dark:bg-slate-800 border-0 dark:border dark:border-gray-700">
                <Users className="w-8 h-8 text-accent-teal mb-4" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Team Player</h3>
                <p className="text-gray-600 dark:text-gray-400">Mentoring peers and fostering collaborative learning environments</p>
              </Card>
              <Card className="p-6 shadow-elevated bg-white dark:bg-slate-800 border-0 dark:border dark:border-gray-700">
                <Cpu className="w-8 h-8 text-accent-teal mb-4" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Technical Depth</h3>
                <p className="text-gray-600 dark:text-gray-400">Mastering embedded systems, C++ programming, and circuit optimization</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Timeline Section */}
      <section id="timeline" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container">
          <h2 className="text-4xl font-bold text-slate-dark dark:text-white mb-8">My Journey</h2>
          <div className="divider-accent mb-12"></div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 text-center">
              Click on any milestone to explore the details of my educational and professional progression.
            </p>
            <Timeline events={timelineEvents} />
          </div>
        </div>
      </section>

      {/* Skills Section - FIXED DARK MODE */}
      <section id="skills" className="py-20 bg-white dark:bg-slate-900">
        <div className="container">
          <h2 className="text-4xl font-bold text-slate-dark dark:text-white mb-8">Skills & Competencies</h2>
          <div className="divider-accent mb-12"></div>
          
          <div className="max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Technical Skills */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-accent-teal" />
                  Programming Languages
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-slate-900 dark:text-white">C++</span>
                      <span className="text-sm text-gray-600 dark:text-white">81%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="progress-bar-green h-2 rounded-full" style={{ width: '81%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-slate-900 dark:text-white">Python</span>
                      <span className="text-sm text-gray-600 dark:text-white">76%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="progress-bar-green h-2 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-slate-900 dark:text-white">MATLAB</span>
                      <span className="text-sm text-gray-600 dark:text-white">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="progress-bar-green h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-slate-900 dark:text-white">Machine Learning</span>
                      <span className="text-sm text-gray-600 dark:text-white">55%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="progress-bar-green h-2 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-slate-900 dark:text-white">Assembly</span>
                      <span className="text-sm text-gray-600 dark:text-white">61%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="progress-bar-green h-2 rounded-full" style={{ width: '61%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engineering Tools */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent-teal" />
                  Engineering Tools
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span className="text-slate-900 dark:text-white">Multisim</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span className="text-slate-900 dark:text-white">LTspice</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span className="text-slate-900 dark:text-white">MATLAB/Simulink</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span className="text-slate-900 dark:text-white">Proteus Design Suite</span>
                  </div>
                </div>
              </div>

              {/* Office Tools */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Office & Productivity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span className="text-slate-900 dark:text-white">Microsoft Word</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span className="text-slate-900 dark:text-white">Microsoft Excel</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span className="text-slate-900 dark:text-white">Microsoft PowerPoint</span>
                  </div>
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-accent-teal" />
                  Soft Skills
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span className="text-slate-900 dark:text-white">Problem-Solving</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span className="text-slate-900 dark:text-white">Communication</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span className="text-slate-900 dark:text-white">Team Collaboration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container">
          <h2 className="text-4xl font-bold text-slate-dark dark:text-white mb-8">Certificates & Achievements</h2>
          <div className="divider-accent mb-12"></div>
          <Certificates />
        </div>
      </section>

      {/* Interests Section - FIXED DARK MODE */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container">
          <h2 className="text-4xl font-bold text-slate-dark dark:text-white mb-8">Interests & Passions</h2>
          <div className="divider-accent mb-12"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-white dark:bg-slate-800 border-0 dark:border dark:border-gray-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Circuit Design</h3>
              <p className="text-gray-600 dark:text-gray-400">Passionate about designing efficient and innovative electrical circuits</p>
            </Card>
            <Card className="p-6 bg-white dark:bg-slate-800 border-0 dark:border dark:border-gray-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Embedded Systems</h3>
              <p className="text-gray-600 dark:text-gray-400">Fascinated by programming microcontrollers and IoT applications with cutting-edge technologies</p>
            </Card>
            <Card className="p-6 bg-white dark:bg-slate-800 border-0 dark:border dark:border-gray-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Machine Learning & AI</h3>
              <p className="text-gray-600 dark:text-gray-400">Architecting intelligent systems that combine electrical engineering with AI-driven automation</p>
            </Card>
            <Card className="p-6 bg-white dark:bg-slate-800 border-0 dark:border dark:border-gray-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Problem Solving</h3>
              <p className="text-gray-600 dark:text-gray-400">Love tackling complex engineering challenges with creative, innovative solutions</p>
            </Card>
            <Card className="p-6 bg-white dark:bg-slate-800 border-0 dark:border dark:border-gray-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Mentoring</h3>
              <p className="text-gray-600 dark:text-gray-400">Dedicated to helping others understand engineering concepts and unlock their potential</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section - FIXED DARK MODE */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container">
          <h2 className="text-4xl font-bold text-slate-dark dark:text-white mb-8">Get in Touch</h2>
          <div className="divider-accent mb-12"></div>
          
          <div className="max-w-2xl">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Ready to collaborate on groundbreaking projects? Whether you're looking for a driven electrical engineer, an innovative problem-solver, or someone passionate about AI-driven systems, I'm excited to connect!
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
              Let's discuss how I can contribute to your team's success. Reach out through any channel below—I respond quickly and am always eager to explore new opportunities.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6 bg-white dark:bg-slate-900 border-0 dark:border dark:border-gray-700 hover:shadow-lg transition-smooth cursor-pointer">
                <Phone className="w-6 h-6 text-accent-teal mb-4" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Phone</h3>
                <p className="text-gray-600 dark:text-gray-400">+27 68 123 4567</p>
              </Card>
              <Card className="p-6 bg-white dark:bg-slate-900 border-0 dark:border dark:border-gray-700 hover:shadow-lg transition-smooth cursor-pointer">
                <Mail className="w-6 h-6 text-accent-teal mb-4" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">2837716@students.wits.ac.za</p>
              </Card>
              <a href="https://www.linkedin.com/in/tshepiso-kevin-phoku-6517533a4/" target="_blank" rel="noopener noreferrer">
                <Card className="p-6 bg-white dark:bg-slate-900 border-0 dark:border dark:border-gray-700 hover:shadow-lg transition-smooth cursor-pointer h-full">
                  <Linkedin className="w-6 h-6 text-accent-teal mb-4" />
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">LinkedIn</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">View Profile <ExternalLink size={16} /></p>
                </Card>
              </a>
              <a href="https://github.com/Kevin101-t" target="_blank" rel="noopener noreferrer">
                <Card className="p-6 bg-white dark:bg-slate-900 border-0 dark:border dark:border-gray-700 hover:shadow-lg transition-smooth cursor-pointer h-full">
                  <Github className="w-6 h-6 text-accent-teal mb-4" />
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">GitHub</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">View Projects <ExternalLink size={16} /></p>
                </Card>
              </a>
            </div>

            <div className="flex items-center gap-3 p-4 bg-accent-teal/10 dark:bg-accent-teal/5 rounded-lg border border-accent-teal/20">
              <MapPin className="w-5 h-5 text-accent-teal flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-300">Johannesburg, South Africa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-dark dark:bg-slate-950 text-white py-12">
        <div className="container">
          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-gray-300 mb-2">© 2026 Tshepiso Kevin Phoku. All rights reserved.</p>
            <p className="text-center text-gray-400 text-sm">
              This portfolio is my exclusive intellectual property. No third party, including Meta, Google, or any technology platform, has any claim to this website or its content.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
