import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code2, Zap, Users, BookOpen } from "lucide-react";
import { useState } from "react";

/**
 * Design System: Modern Engineering Minimalism
 * Color Palette: Deep slate blue (#1e3a5f) + Vibrant teal (#0ea5e9)
 * Typography: Poppins (display) + Inter (body)
 */

const heroBackgroundUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663588749976/VqtRsrvp8AWWYW82Ld27rf/hero-engineering-background-gPuKqdoFABjZWmGzkQ2Z5t.webp";
const accentPatternUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663588749976/VqtRsrvp8AWWYW82Ld27rf/accent-tech-pattern-AFvPnPkBFdGZXfE9CmLEpP.webp";

export default function Home() {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-slate-dark">Tshepiso Phoku</div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="text-gray-600 hover:text-accent-teal transition-smooth">About</a>
            <a href="#education" className="text-gray-600 hover:text-accent-teal transition-smooth">Education</a>
            <a href="#experience" className="text-gray-600 hover:text-accent-teal transition-smooth">Experience</a>
            <a href="#skills" className="text-gray-600 hover:text-accent-teal transition-smooth">Skills</a>
            <a href="#contact" className="text-gray-600 hover:text-accent-teal transition-smooth">Contact</a>
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
              <a href="#projects">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg transition-smooth">
                  View Work
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

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="container">
          <h2 className="text-slate-dark mb-8">Education</h2>
          <div className="divider-accent mb-12"></div>
          
          <div className="space-y-8 max-w-3xl">
            {/* Current Studies */}
            <Card className="p-8 shadow-elevated border-l-4 border-l-accent-teal">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-dark">BSc Electrical Engineering</h3>
                  <p className="text-accent-teal font-medium">University of the Witwatersrand</p>
                </div>
                <span className="bg-accent-teal text-white px-4 py-2 rounded text-sm font-semibold">In Progress</span>
              </div>
              <p className="text-gray-600 mb-4">January 2024 – Present</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-accent-teal mt-1">•</span>
                  <span><strong>Focus Areas:</strong> Circuit theory, electromagnetism, C++ programming, algebra, calculus, physics, and systems design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-teal mt-1">•</span>
                  <span><strong>Design Project:</strong> Optimized a DC motor hoist system to lift payloads efficiently, focusing on torque optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-teal mt-1">•</span>
                  <span><strong>Current Work:</strong> Learning C++ programming from foundational concepts with applications in embedded systems and simulation</span>
                </li>
              </ul>
            </Card>

            {/* High School */}
            <Card className="p-8 shadow-elevated">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-dark">National Senior Certificate</h3>
                  <p className="text-gray-600 font-medium">Hulwazi Secondary School, Daveyton</p>
                </div>
                <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-semibold">Completed</span>
              </div>
              <p className="text-gray-600">January 2019 – November 2023</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-slate-dark mb-8">Experience & Volunteering</h2>
          <div className="divider-accent mb-12"></div>
          
          <div className="space-y-8 max-w-3xl">
            {/* Peer Mentor */}
            <Card className="p-8 shadow-elevated border-l-4 border-l-accent-teal">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-dark">Peer Mentor</h3>
                  <p className="text-accent-teal font-medium">University of the Witwatersrand</p>
                </div>
                <span className="text-gray-600 text-sm">Sep 2023 – Present</span>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-accent-teal mt-1">•</span>
                  <span>Provide academic support to help fellow students understand course material and clarify complex concepts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-teal mt-1">•</span>
                  <span>Offer guidance on navigating campus resources, academic requirements, and balancing workload</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-teal mt-1">•</span>
                  <span>Develop study techniques and improve learning strategies for diverse student backgrounds</span>
                </li>
              </ul>
            </Card>

            {/* Tutoring */}
            <Card className="p-8 shadow-elevated">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-dark">Freelance Tutor</h3>
                  <p className="text-gray-600 font-medium">Self-Employed</p>
                </div>
                <span className="text-gray-600 text-sm">June 2023 – Present</span>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-accent-teal mt-1">•</span>
                  <span>Offer tutoring in Mathematics, Physics, and Chemistry at both university and high school levels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-teal mt-1">•</span>
                  <span>Specialize in simplifying abstract concepts using real-world analogies and interactive problem-solving</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-teal mt-1">•</span>
                  <span>Develop personalized learning strategies tailored to individual student needs</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container">
          <h2 className="text-slate-dark mb-8">Skills & Competencies</h2>
          <div className="divider-accent mb-12"></div>
          
          <div className="max-w-4xl">
            {/* Skill Categories */}
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
                      <span className="text-sm text-gray-600">In Progress</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-accent-teal h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Python</span>
                      <span className="text-sm text-gray-600">Basic</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-accent-teal h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">MATLAB</span>
                      <span className="text-sm text-gray-600">Familiar</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-accent-teal h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engineering Tools */}
              <div>
                <h3 className="text-xl font-semibold text-slate-dark mb-6 flex items-center gap-2">
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
                <h3 className="text-xl font-semibold text-slate-dark mb-6">Office & Productivity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
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
                <h3 className="text-xl font-semibold text-slate-dark mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent-teal" />
                  Soft Skills
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
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

      {/* Interests Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="text-slate-dark mb-8">Interests & Hobbies</h2>
          <div className="divider-accent mb-12"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
            <Card className="p-6 shadow-subtle">
              <h3 className="font-semibold text-slate-dark mb-2">Engineering Design</h3>
              <p className="text-gray-600">Projects and simulations in electrical systems</p>
            </Card>
            <Card className="p-6 shadow-subtle">
              <h3 className="font-semibold text-slate-dark mb-2">Fitness & Wellness</h3>
              <p className="text-gray-600">Regular gym training and maintaining healthy lifestyle</p>
            </Card>
            <Card className="p-6 shadow-subtle">
              <h3 className="font-semibold text-slate-dark mb-2">Gaming</h3>
              <p className="text-gray-600">Strategy games and competitive gaming (FIFA)</p>
            </Card>
            <Card className="p-6 shadow-subtle">
              <h3 className="font-semibold text-slate-dark mb-2">Reading</h3>
              <p className="text-gray-600">Motivational books and personal development</p>
            </Card>
            <Card className="p-6 shadow-subtle">
              <h3 className="font-semibold text-slate-dark mb-2">Public Speaking</h3>
              <p className="text-gray-600">Communication and presentation skills</p>
            </Card>
            <Card className="p-6 shadow-subtle">
              <h3 className="font-semibold text-slate-dark mb-2">Mentoring</h3>
              <p className="text-gray-600">Helping others learn and grow professionally</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container">
          <h2 className="text-slate-dark mb-8">Get in Touch</h2>
          <div className="divider-accent mb-12"></div>
          
          <div className="max-w-2xl">
            <p className="text-lg text-gray-700 mb-12">
              I'm always interested in hearing about new opportunities, collaborations, and interesting projects. Feel free to reach out through any of the channels below.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <a href="tel:+27656460357" className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-smooth group">
                <Phone className="w-6 h-6 text-accent-teal flex-shrink-0 mt-1 group-hover:scale-110 transition-smooth" />
                <div>
                  <h3 className="font-semibold text-slate-dark mb-1">Phone</h3>
                  <p className="text-gray-600">(065) 646 0357</p>
                </div>
              </a>

              <a href="mailto:2837716@student.wits.ac.za" className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-smooth group">
                <Mail className="w-6 h-6 text-accent-teal flex-shrink-0 mt-1 group-hover:scale-110 transition-smooth" />
                <div>
                  <h3 className="font-semibold text-slate-dark mb-1">Email</h3>
                  <p className="text-gray-600">2837716@student.wits.ac.za</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                <MapPin className="w-6 h-6 text-accent-teal flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-dark mb-1">Location</h3>
                  <p className="text-gray-600">Etwatwa, Benoni, South Africa</p>
                </div>
              </div>
            </div>

            {/* References */}
            <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-slate-dark mb-6">References</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-dark">Liyema Ndwandwa</h4>
                  <p className="text-gray-600">Electrical Engineering Mentor</p>
                  <p className="text-accent-teal">L.ndwandwa13@gmail.com | (068) 505-9284</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-dark">Glenn Mashimbye</h4>
                  <p className="text-gray-600">Mentor and Experience Provider</p>
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
              <a href="mailto:2837716@student.wits.ac.za" className="text-blue-200 hover:text-accent-teal transition-smooth">
                <Mail className="w-6 h-6" />
              </a>
              <a href="tel:+27656460357" className="text-blue-200 hover:text-accent-teal transition-smooth">
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-blue-900 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2026 Tshepiso Phoku. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
