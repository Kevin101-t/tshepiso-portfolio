import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code2, Zap, Users, BookOpen, ArrowUpRight, Moon, Sun } from "lucide-react";
import { useState } from "react";
import Timeline from "@/components/Timeline";
import Certificates from "@/components/Certificates";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Design System: Modern Engineering Minimalism
 * Color Palette: Deep slate blue (#1e3a5f) + Vibrant teal (#0ea5e9)
 * Typography: Poppins (display) + Inter (body)
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
    subtitle: 'Self-Employed',
    type: 'experience',
    status: 'current',
    description: [
      'Offer tutoring in Mathematics, Physics, and Chemistry at university and high school levels',
      'Specialize in simplifying abstract concepts using real-world analogies and interactive problem-solving',
      'Develop personalized learning strategies tailored to individual student needs'
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
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-slate-dark dark:text-white">Tshepiso Phoku</div>
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
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-smooth"
              title="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-dark via-blue-900 to-slate-dark py-24 md:py-32">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${heroBackgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Electrical Engineering Student
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Passionate about circuit design, embedded systems, and solving complex engineering problems. Currently pursuing a BSc in Electrical Engineering at the University of the Witwatersrand.
            </p>
            <div className="flex gap-4">
              <a href="#contact">
                <Button className="bg-accent-teal hover:bg-blue-400 text-white px-8 py-6 text-lg transition-smooth">
                  Get in Touch
                </Button>
              </a>
              <a href="#timeline">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg transition-smooth">
                  View Journey
                </Button>
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <img src={accentPatternUrl} alt="Technical pattern" className="w-full h-auto rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-slate-dark mb-8">About Me</h2>
            <div className="divider-accent mb-8"></div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              I am a second-year Electrical Engineering student at the University of the Witwatersrand with a strong foundation in circuit theory, electromagnetism, and programming. My academic journey has equipped me with both theoretical knowledge and practical problem-solving skills.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Beyond academics, I am deeply committed to mentoring fellow students, sharing knowledge through tutoring, and continuously expanding my technical expertise. I believe in the power of collaboration and community-driven learning.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 shadow-elevated">
                <Zap className="w-8 h-8 text-accent-teal mb-4" />
                <h3 className="font-semibold mb-2">Technical Focus</h3>
                <p className="text-gray-600">Circuit design, electromagnetism, and embedded systems</p>
              </Card>
              <Card className="p-6 shadow-elevated">
                <Users className="w-8 h-8 text-accent-teal mb-4" />
                <h3 className="font-semibold mb-2">Leadership</h3>
                <p className="text-gray-600">Peer mentoring and academic support for fellow students</p>
              </Card>
              <Card className="p-6 shadow-elevated">
                <BookOpen className="w-8 h-8 text-accent-teal mb-4" />
                <h3 className="font-semibold mb-2">Continuous Learning</h3>
                <p className="text-gray-600">Dedicated to mastering new technologies and methodologies</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Timeline Section */}
      <section id="timeline" className="py-20">
        <div className="container">
          <h2 className="text-slate-dark mb-8">My Journey</h2>
          <div className="divider-accent mb-12"></div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-12 text-center">
              Click on any milestone to explore the details of my educational and professional progression.
            </p>
            <Timeline events={timelineEvents} />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-slate-dark mb-8">Skills & Competencies</h2>
          <div className="divider-accent mb-12"></div>
          
          <div className="max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Technical Skills */}
              <div>
                <h3 className="text-xl font-semibold text-slate-dark mb-6 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-accent-teal" />
                  Programming Languages
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">C++</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">81%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="progress-bar-green h-2 rounded-full" style={{ width: '81%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Python</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">76%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="progress-bar-green h-2 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">MATLAB</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="progress-bar-green h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Machine Learning</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">55%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="progress-bar-green h-2 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engineering Tools */}
              <div>
                <h3 className="text-xl font-semibold text-slate-dark dark:text-white mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent-teal" />
                  Engineering Tools
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span>Multisim</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span>LTspice</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span>MATLAB/Simulink</span>
                  </div>
                </div>
              </div>

              {/* Office Tools */}
              <div>
                <h3 className="text-xl font-semibold text-slate-dark dark:text-white mb-6">Office & Productivity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span>Microsoft Word</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span>Microsoft Excel</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span>Microsoft PowerPoint</span>
                  </div>
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className="text-xl font-semibold text-slate-dark dark:text-white mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent-teal" />
                  Soft Skills
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span>Time Management</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span>Critical Thinking & Problem-Solving</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span>Excellent Communication</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <span className="text-accent-teal">✓</span>
                    <span>Leadership & Conflict Resolution</span>
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
          <Certificates />
        </div>
      </section>

      {/* Interests Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container">
          <h2 className="text-slate-dark dark:text-white mb-8">Interests & Hobbies</h2>
          <div className="divider-accent mb-12"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
            <Card className="p-6 shadow-subtle dark:bg-slate-800">
              <h3 className="font-semibold text-slate-dark dark:text-white mb-2">Engineering Design</h3>
              <p className="text-gray-600 dark:text-gray-400">Projects and simulations in electrical systems</p>
            </Card>
            <Card className="p-6 shadow-subtle dark:bg-slate-800">
              <h3 className="font-semibold text-slate-dark dark:text-white mb-2">Fitness & Wellness</h3>
              <p className="text-gray-600 dark:text-gray-400">Regular gym training and maintaining healthy lifestyle</p>
            </Card>
            <Card className="p-6 shadow-subtle dark:bg-slate-800">
              <h3 className="font-semibold text-slate-dark dark:text-white mb-2">Gaming</h3>
              <p className="text-gray-600 dark:text-gray-400">Strategy games and competitive gaming (FIFA)</p>
            </Card>
            <Card className="p-6 shadow-subtle dark:bg-slate-800">
              <h3 className="font-semibold text-slate-dark dark:text-white mb-2">Reading</h3>
              <p className="text-gray-600 dark:text-gray-400">Motivational books and personal development</p>
            </Card>
            <Card className="p-6 shadow-subtle dark:bg-slate-800">
              <h3 className="font-semibold text-slate-dark dark:text-white mb-2">Public Speaking</h3>
              <p className="text-gray-600 dark:text-gray-400">Communication and presentation skills</p>
            </Card>
            <Card className="p-6 shadow-subtle dark:bg-slate-800">
              <h3 className="font-semibold text-slate-dark dark:text-white mb-2">Mentoring</h3>
              <p className="text-gray-600 dark:text-gray-400">Helping others learn and grow professionally</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container">
          <h2 className="text-slate-dark dark:text-white mb-8">Get in Touch</h2>
          <div className="divider-accent mb-12"></div>
          
          <div className="max-w-2xl">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
              I'm always interested in hearing about new opportunities, collaborations, and interesting projects. Feel free to reach out through any of the channels below.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <a href="tel:+27656460357" className="flex items-start gap-4 p-6 bg-white dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-smooth group shadow-subtle">
                <Phone className="w-6 h-6 text-accent-teal flex-shrink-0 mt-1 group-hover:scale-110 transition-smooth" />
                <div>
                  <h3 className="font-semibold text-slate-dark dark:text-white mb-1">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">(065) 646 0357</p>
                </div>
              </a>

              <a href="mailto:2837716@student.wits.ac.za" className="flex items-start gap-4 p-6 bg-white dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-smooth group shadow-subtle">
                <Mail className="w-6 h-6 text-accent-teal flex-shrink-0 mt-1 group-hover:scale-110 transition-smooth" />
                <div>
                  <h3 className="font-semibold text-slate-dark dark:text-white mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">2837716@student.wits.ac.za</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/tshepiso-kevin-phoku-6517533a4/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-6 bg-white dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-smooth group shadow-subtle">
                <Linkedin className="w-6 h-6 text-accent-teal flex-shrink-0 mt-1 group-hover:scale-110 transition-smooth" />
                <div>
                  <h3 className="font-semibold text-slate-dark dark:text-white mb-1">LinkedIn</h3>
                  <p className="text-gray-600 dark:text-gray-400">Tshepiso Kevin Phoku</p>
                </div>
              </a>

              <a href="https://github.com/Kevin101-t" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-6 bg-white dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-smooth group shadow-subtle">
                <Github className="w-6 h-6 text-accent-teal flex-shrink-0 mt-1 group-hover:scale-110 transition-smooth" />
                <div>
                  <h3 className="font-semibold text-slate-dark dark:text-white mb-1">GitHub</h3>
                  <p className="text-gray-600 dark:text-gray-400">Kevin101-t</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-700 rounded-lg shadow-subtle">
                <MapPin className="w-6 h-6 text-accent-teal flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-dark dark:text-white mb-1">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">Etwatwa, Benoni, South Africa</p>
                </div>
              </div>
            </div>

            {/* References */}
            <div className="bg-blue-50 dark:bg-slate-700 p-8 rounded-lg border border-blue-200 dark:border-slate-600">
              <h3 className="text-xl font-semibold text-slate-dark dark:text-white mb-6">References</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-dark dark:text-white">Liyema Ndwandwa</h4>
                  <p className="text-gray-600 dark:text-gray-400">Electrical Engineering Mentor</p>
                  <p className="text-accent-teal">L.ndwandwa13@gmail.com | (068) 505-9284</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-dark dark:text-white">Glenn Mashimbye</h4>
                  <p className="text-gray-600 dark:text-gray-400">Mentor and Experience Provider</p>
                  <p className="text-accent-teal">glennlulama@gmail.com | (083) 811-769</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-dark text-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Tshepiso Phoku</h3>
              <p className="text-blue-200">Electrical Engineering Student | Problem Solver | Mentor</p>
            </div>
            <div className="flex gap-6 mt-6 md:mt-0">
              <a href="mailto:2837716@student.wits.ac.za" className="text-blue-200 hover:text-accent-teal transition-smooth" title="Email">
                <Mail className="w-6 h-6" />
              </a>
              <a href="tel:+27656460357" className="text-blue-200 hover:text-accent-teal transition-smooth" title="Phone">
                <Phone className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/tshepiso-kevin-phoku-6517533a4/" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-accent-teal transition-smooth" title="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://github.com/Kevin101-t" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-accent-teal transition-smooth" title="GitHub">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-blue-900 mt-8 pt-8 space-y-4">
            <div className="text-center text-blue-200 text-sm">
              <p className="font-semibold mb-2">© 2026 Tshepiso Kevin Phoku. All rights reserved.</p>
              <p className="text-xs text-blue-300 mb-3">
                This website and all its content are the exclusive intellectual property of Tshepiso Kevin Phoku.
              </p>
              <p className="text-xs text-blue-300 mb-3">
                No third party, including Meta, Google, or any technology platform, has any claim to this website.
              </p>
              <p className="text-xs text-blue-300">
                <a href="/OWNERSHIP_AND_SECURITY.md" className="text-accent-teal hover:underline">View Ownership & Security Documentation</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
