import React, { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "./components/ui/card";
import { Button, IconButton } from "./components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider, ThemeToggle } from "./components/theme/theme-provider";
import { ProjectCard } from "./components/projects/project-card";
import { projects } from "./data/projects";
import { skills } from "./data/skills";
import { experience } from "./data/experience";
import { GITHUB_URL, LINKEDIN_URL, EMAIL } from "./config/constants";

/**
 * Main Application Component
 * 
 * This is a modern React portfolio application that demonstrates:
 * - Advanced hooks (useState, useEffect, useRef, useMemo)
 * - Custom components with composition pattern
 * - Framer Motion animations
 * - Dark/light theme toggling
 * - Responsive design with Tailwind
 * - Performance optimizations
 */
function App() {
  // State management
  const [activeTab, setActiveTab] = useState("projects");
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);
  
  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    if (!heroRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = heroRef.current.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  // Filter projects by tag (memoized for performance)
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter(project => 
      project.tags.includes(activeFilter)
    );
  }, [activeFilter]);

  // Navbar class - changes on scroll
  const navbarClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm" 
      : "bg-transparent"
  }`;

  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
        {/* Navigation Bar */}
        <nav className={navbarClass}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Sam DevOps
                </span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                  <button
                    onClick={() => setActiveTab("projects")}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === "projects"
                        ? "text-blue-600 dark:text-blue-400"
                        : "hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => setActiveTab("skills")}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === "skills"
                        ? "text-blue-600 dark:text-blue-400"
                        : "hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => setActiveTab("experience")}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === "experience"
                        ? "text-blue-600 dark:text-blue-400"
                        : "hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === "contact"
                        ? "text-blue-600 dark:text-blue-400"
                        : "hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    Contact
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                {/* Social Links */}
                <a 
                  href={GITHUB_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href={LINKEDIN_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="pt-32 pb-20 px-4 text-center bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="animate-on-scroll"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sam DevOps
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Cloud Engineer & Frontend Developer specializing in AWS infrastructure and React applications
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 animate-on-scroll"
          >
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => setActiveTab("projects")}
            >
              View Projects
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => setActiveTab("contact")}
            >
              Get In Touch
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-3 animate-on-scroll"
          >
            {/* Key Skills */}
            <Badge variant="outline">AWS</Badge>
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">Terraform</Badge>
            <Badge variant="outline">Docker</Badge>
            <Badge variant="outline">CI/CD</Badge>
            <Badge variant="outline">Kubernetes</Badge>
            <Badge variant="outline">Serverless</Badge>
          </motion.div>
        </section>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects">
              <div className="space-y-8">
                <div className="flex flex-wrap items-center justify-between">
                  <h2 className="text-3xl font-bold">Featured Projects</h2>
                  <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                    <Button 
                      variant={activeFilter === "all" ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setActiveFilter("all")}
                    >
                      All
                    </Button>
                    <Button 
                      variant={activeFilter === "aws" ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setActiveFilter("aws")}
                    >
                      AWS
                    </Button>
                    <Button 
                      variant={activeFilter === "react" ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setActiveFilter("react")}
                    >
                      React
                    </Button>
                    <Button 
                      variant={activeFilter === "devops" ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setActiveFilter("devops")}
                    >
                      DevOps
                    </Button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                {filteredProjects.length > visibleProjects && (
                  <div className="text-center mt-8">
                    <Button 
                      variant="outline"
                      onClick={() => setVisibleProjects(prev => prev + 3)}
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="skills">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold">Technical Skills</h2>
                
                <div className="space-y-6">
                  {/* Cloud & DevOps */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Cloud & DevOps</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.cloud.map(skill => (
                        <SkillBadge 
                          key={skill.name} 
                          name={skill.name} 
                          level={skill.level} 
                          icon={skill.icon}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Frontend */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Frontend Development</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.frontend.map(skill => (
                        <SkillBadge 
                          key={skill.name} 
                          name={skill.name} 
                          level={skill.level} 
                          icon={skill.icon}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Backend */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Backend Development</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.backend.map(skill => (
                        <SkillBadge 
                          key={skill.name} 
                          name={skill.name} 
                          level={skill.level} 
                          icon={skill.icon}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Tools & Others */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Tools & Others</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.tools.map(skill => (
                        <SkillBadge 
                          key={skill.name} 
                          name={skill.name} 
                          level={skill.level} 
                          icon={skill.icon}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="experience">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold">Work Experience & Education</h2>
                
                <Timeline experiences={experience} />
              </div>
            </TabsContent>
            
            <TabsContent value="contact">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold">Get In Touch</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <h3 className="text-xl font-semibold">Contact Information</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a href={`mailto:${EMAIL}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                            {EMAIL}
                          </a>
                        </div>
                        <div className="flex items-center space-x-3">
                          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                          </svg>
                          <span>Seattle, WA (Remote Available)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <div className="flex space-x-4">
                            <a 
                              href={GITHUB_URL} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              GitHub
                            </a>
                            <a 
                              href={LINKEDIN_URL} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              LinkedIn
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <ContactForm />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Sam DevOps
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Cloud Engineer & Frontend Developer
                </p>
              </div>
              
              <div className="flex space-x-6">
                <a 
                  href={GITHUB_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href={LINKEDIN_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href={`mailto:${EMAIL}`}
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <span className="sr-only">Email</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Sam DevOps. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;