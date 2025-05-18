import React, { useState, useEffect } from "react";
import { Moon, Sun, ExternalLink, Github as GitHub, Linkedin, Mail, Download, Code, Briefcase, Award, Globe, Server, Database } from "lucide-react";

// Custom Button component with variants
const Button = ({ children, variant = "primary", href, icon, onClick, className = "" }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/30",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    outline: "border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30",
    link: "text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 p-0 hover:underline"
  };
  
  const buttonClass = `${baseClasses} ${variants[variant]} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={buttonClass} target="_blank" rel="noopener noreferrer">
        {children}
        {icon}
      </a>
    );
  }
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
      {icon}
    </button>
  );
};

// Enhanced Card component with hover effects
const Card = ({ children, className = "" }) => (
  <div className={`border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 bg-white dark:bg-gray-800 ${className}`}>
    {children}
  </div>
);

// Project Card component with improved hover animation
const ProjectCard = ({ title, description, tags, demoLink, githubLink, image }) => (
  <Card className="flex flex-col h-full hover:scale-[1.02] group">
    {image && (
      <div className="h-48 mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <h4 className="text-white font-medium">{title}</h4>
        </div>
      </div>
    )}
    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h3>
    <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow">{description}</p>
    
    {tags && (
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
    
    <div className="flex items-center mt-auto pt-4">
      {demoLink && (
        <Button href={demoLink} variant="primary" className="mr-3" icon={<ExternalLink size={16} />}>
          Live Demo
        </Button>
      )}
      {githubLink && (
        <Button href={githubLink} variant="outline" icon={<GitHub size={16} />}>
          Code
        </Button>
      )}
    </div>
  </Card>
);

// Skill Badge component with animated progression
const SkillBadge = ({ name, level }) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getWidth = () => {
    switch(level) {
      case 'expert': return 'w-full';
      case 'advanced': return 'w-4/5';
      case 'intermediate': return 'w-3/5';
      case 'beginner': return 'w-2/5';
      default: return 'w-1/2';
    }
  };
  
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="font-medium text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{level}</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-1000 ease-out ${getWidth()} ${animate ? 'w-full' : 'w-0'}`}
          style={{ width: animate ? undefined : '0', transitionProperty: 'width' }}
        ></div>
      </div>
    </div>
  );
};

// Timeline Item component with enhanced styling
const TimelineItem = ({ year, title, company, description }) => (
  <div className="relative pl-8 pb-8 border-l border-gray-300 dark:border-gray-700 group">
    <div className="absolute left-[-8px] bg-indigo-600 rounded-full w-4 h-4 border-4 border-white dark:border-gray-900 group-hover:scale-125 transition-transform duration-300"></div>
    <span className="inline-block px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs font-semibold mb-2">
      {year}
    </span>
    <h3 className="font-bold text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-1">{company}</p>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

// Service Card component
const ServiceCard = ({ icon: Icon, title, description }) => (
  <Card className="group hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-300">
    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg inline-block mb-4 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40 transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </Card>
);

// Main app component
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle dark mode toggle
  useEffect(() => {
    // Check user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['hero', 'projects', 'skills', 'experience', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce app with React, Next.js, and Stripe integration featuring cart functionality, user authentication, and a responsive design.",
      tags: ["React", "Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
      demoLink: "https://ecommerce-ravi.vercel.app",
      githubLink: "https://github.com/ravikumarkatta/ecommerce-platform",
      image: "https://gizmodo.com/dalle-midjourney-imagine-with-meta-playground-ai-test-1851078719"

    },
    {
      title: "AWS Serverless API",
      description: "Scalable REST API built with AWS Lambda, API Gateway, and DynamoDB using the Serverless Framework with CI/CD automation.",
      tags: ["AWS Lambda", "DynamoDB", "API Gateway", "Serverless", "CI/CD"],
      demoLink: "https://api-docs.example.com",
      githubLink: "https://github.com/ravikumarkatta/serverless-api",
      image: "https://gizmodo.com/dalle-midjourney-imagine-with-meta-playground-ai-test-1851078719"

    },
    {
      title: "Real-time Chat Application",
      description: "Modern chat app with WebSockets for real-time messaging, featuring user authentication, message history, and room management.",
      tags: ["WebSockets", "React", "Node.js", "MongoDB", "Socket.io"],
      demoLink: "https://chat-app.ravikumarkatta.com",
      githubLink: "https://github.com/ravikumarkatta/real-time-chat",
      image: "https://gizmodo.com/dalle-midjourney-imagine-with-meta-playground-ai-test-1851078719"

    },
    {
      title: "CI/CD Pipeline Dashboard",
      description: "Interactive dashboard for monitoring multi-environment deployments with real-time status updates and alerting system.",
      tags: ["React", "Docker", "Jenkins", "GitHub Actions", "GraphQL"],
      demoLink: "https://devops-dashboard.example.com",
      githubLink: "https://github.com/ravikumarkatta/cicd-dashboard",
      image: "https://gizmodo.com/dalle-midjourney-imagine-with-meta-playground-ai-test-1851078719"

    },
    {
      title: "Microservices Architecture",
      description: "Scalable microservices system with Kubernetes, service discovery, and distributed logging using the ELK stack.",
      tags: ["Kubernetes", "Docker", "Microservices", "ELK Stack", "Go"],
      demoLink: "https://microservices-demo.example.com",
      githubLink: "https://github.com/ravikumarkatta/microservices-demo",
      image: "https://wallpaperaccess.com/full/5651999.jpg"
    },
    {
      title: "Progressive Web App",
      description: "Feature-rich PWA with offline support, push notifications and performance optimizations scoring 95+ on Lighthouse.",
      tags: ["PWA", "Service Workers", "IndexedDB", "React", "Webpack"],
      demoLink: "https://pwa-example.ravikumarkatta.com",
      githubLink: "https://github.com/ravikumarkatta/progressive-web-app",
      image: "/images/5651990.jpg"
    }
  ];

  const skills = [
    { name: "Frontend Development (React, Next.js)", level: "expert" },
    { name: "AWS Cloud Services & DevOps", level: "advanced" },
    { name: "Backend Development (Node.js, Express)", level: "advanced" },
    { name: "Docker & Containerization", level: "advanced" },
    { name: "CI/CD & Automation", level: "advanced" },
    { name: "Kubernetes & Container Orchestration", level: "intermediate" },
    { name: "Terraform & IaC", level: "intermediate" },
    { name: "Microservices Architecture", level: "intermediate" }
  ];

  const experience = [
    {
      year: "2023 - Present",
      title: "Senior Cloud Engineer",
      company: "TechInnovate Solutions",
      description: "Lead cloud infrastructure development using AWS, implemented microservices architecture, and automated CI/CD pipelines reducing deployment time by 75%."
    },
    {
      year: "2021 - 2023",
      title: "Full Stack Developer",
      company: "Digital Transformation Co.",
      description: "Developed full-stack web applications using React and Node.js, implemented responsive UI designs, and integrated with various APIs and payment gateways."
    },
    {
      year: "2020 - 2021",
      title: "Frontend Developer",
      company: "Web Solutions Agency",
      description: "Built responsive, accessible frontend interfaces using modern JavaScript frameworks, collaborated with UX designers, and optimized web performance."
    }
  ];

  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Modern, responsive websites and web applications built with React, Next.js and cutting-edge frontend technologies."
    },
    {
      icon: Server,
      title: "Cloud Infrastructure",
      description: "Scalable and secure AWS cloud infrastructure designed and implemented using infrastructure as code with Terraform."
    },
    {
      icon: Code,
      title: "Full Stack Development",
      description: "End-to-end application development with React frontend and Node.js/Express backend services connected to various databases."
    },
    {
      icon: Database,
      title: "DevOps Implementation",
      description: "CI/CD pipeline setup, containerization with Docker, and deployment automation to streamline development workflows."
    }
  ];

  // Scroll to section function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-xl text-indigo-600 dark:text-indigo-400">
            Ravi<span className="text-gray-800 dark:text-white">DevOps</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${activeSection === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <Button variant="primary" href="/resume.pdf" className="hidden md:flex">
              <Download size={16} className="mr-2" />
              Resume
            </Button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col items-end gap-1.5">
                <span className={`block h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${mobileMenuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`}></span>
                <span className={`block h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
                <span className={`block h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${mobileMenuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900 pt-20 px-6 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col space-y-6">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-lg font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${activeSection === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'}`}
              >
                {item.label}
              </button>
            ))}
            
            <Button variant="primary" href="/resume.pdf" className="mt-6">
              <Download size={16} className="mr-2" />
              Resume
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ravi <span className="text-gray-800 dark:text-white">DevOps</span>
            </h1>
            <div className="flex items-center mb-6">
              <div className="h-1 w-20 bg-indigo-600 mr-4"></div>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                Cloud Engineer & Full Stack Developer
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              Building high-performance web applications and scalable cloud infrastructure. 
              Specialized in DevOps practices, microservices architecture, and creating exceptional user experiences.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => scrollToSection('contact')}>
                Get in touch
              </Button>
              <Button variant="outline" onClick={() => scrollToSection('projects')}>
                View projects
              </Button>
            </div>
            
            <div className="flex space-x-4 mt-8">
              <a href="https://github.com/ravikumarkatta" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                <GitHub size={24} />
              </a>
              <a href="https://linkedin.com/in/ravikumarkatta" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:kattaravi000@gmail.com" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse absolute filter blur-3xl opacity-30"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative z-10 border-4 border-white dark:border-gray-800 shadow-xl">
                <img src="/api/placeholder/320/320" alt="Ravi" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Services</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I specialize in delivering end-to-end solutions that combine modern web development with robust cloud infrastructure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center mb-2">
                <div className="h-1 w-12 bg-indigo-600 mr-3"></div>
                <h2 className="text-sm text-indigo-600 dark:text-indigo-400 uppercase font-semibold tracking-wider">Portfolio</h2>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                A showcase of my latest work demonstrating my expertise in full-stack development, cloud engineering, and DevOps practices.
              </p>
            </div>
            <Button variant="link" className="mt-4 md:mt-0">
              View all projects <ExternalLink size={16} className="ml-1" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Skills & Experience Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Skills */}
            <div id="skills">
              <div className="flex items-center mb-2">
                <div className="h-1 w-12 bg-indigo-600 mr-3"></div>
                <h2 className="text-sm text-indigo-600 dark:text-indigo-400 uppercase font-semibold tracking-wider">Expertise</h2>
              </div>
              <h2 className="text-3xl font-bold mb-8">Skills & Technologies</h2>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <SkillBadge key={index} {...skill} />
                ))}
              </div>
              
              <div className="mt-10">
                <h3 className="font-bold text-xl mb-4">Technologies I work with:</h3>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Next.js', 'AWS', 'Docker', 'Kubernetes', 'Terraform', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis', 'TypeScript', 'GraphQL', 'Jest', 'Cypress', 'GitHub Actions', 'Jenkins', 'Tailwind CSS'].map((tech, index) => (
                    <span key={index} className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-sm hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Experience */}
            <div id="experience">
              <div className="flex items-center mb-2">
                <div className="h-1 w-12 bg-indigo-600 mr-3"></div>
                <h2 className="text-sm text-indigo-600 dark:text-indigo-400 uppercase font-semibold tracking-wider">Career</h2>
              </div>
              <h2 className="text-3xl font-bold mb-8">Work Experience</h2>
              
              <div className="space-y-2">
                {experience.map((exp, index) => (
                  <TimelineItem key={index} {...exp} />
                ))}
              </div>
              
              <Button variant="outline" href="/resume.pdf" className="mt-8">
                <Download size={16} className="mr-2" />
                Download Full Resume
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Achievements Section */}
      <section className="py-20 px-6 bg-indigo-50 dark:bg-indigo-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Achievements & Certifications</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Continuous learning and professional growth through certifications and practical achievements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:border-indigo-500 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">AWS Certified Solutions Architect</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Amazon Web Services • 2023
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Advanced design and deployment of AWS infrastructure.
              </p>
            </Card>
            
            <Card className="text-center hover:border-indigo-500 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
                <Award size={32} />
              </div>
              // Continuing from where it left off in the app-jsx.js file...

              <h3 className="text-xl font-bold mb-2">Certified Kubernetes Administrator</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Cloud Native Computing Foundation • 2022
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Expert-level knowledge in Kubernetes deployment and management.
              </p>
            </Card>
            
            <Card className="text-center hover:border-indigo-500 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Terraform Associate</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                HashiCorp • 2023
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Infrastructure as Code implementation using Terraform.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* About Me Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-2">
                <div className="h-1 w-12 bg-indigo-600 mr-3"></div>
                <h2 className="text-sm text-indigo-600 dark:text-indigo-400 uppercase font-semibold tracking-wider">About</h2>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">A bit about me</h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  I'm a Cloud Engineer and Full Stack Developer with over 5 years of experience building scalable web applications and cloud infrastructure.
                </p>
                <p>
                  My journey in tech started with frontend development, where I developed a passion for creating intuitive user experiences. As I evolved in my career, I ventured into DevOps practices and cloud technologies, allowing me to build complete solutions from infrastructure to user interface.
                </p>
                <p>
                  Today, I specialize in designing and implementing modern applications using microservices architecture, containerization, and cloud-native technologies. I'm passionate about automation, infrastructure as code, and creating efficient CI/CD pipelines.
                </p>
                <p>
                  When I'm not coding, I enjoy contributing to open source projects, writing technical blogs, and mentoring junior developers.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Button onClick={() => scrollToSection('contact')}>
                  Get in touch
                </Button>
                <Button variant="outline" href="/resume.pdf">
                  <Download size={16} className="mr-2" />
                  Resume
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden relative z-10 border-2 border-white dark:border-gray-800 shadow-2xl transform md:rotate-3 hover:rotate-0 transition-transform duration-300">
                <img src="/api/placeholder/600/400" alt="About me" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-4 right-4 z-20 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-xs transform hover:scale-105 transition-transform duration-300">
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "I believe in continuous learning and staying updated with the latest technologies to deliver innovative solutions."
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-3">
                    <img src="/api/placeholder/40/40" alt="Ravi" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium">Ravi Kumar Katta</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cloud Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Clients Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here's what people I've worked with have to say about my expertise and work ethic.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:scale-105 transition-transform">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className="w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "Ravi was exceptional in developing our cloud infrastructure. His expertise in AWS and microservices architecture significantly improved our application's performance and scalability."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
                  <img src="/api/placeholder/48/48" alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Michael Thompson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">CTO, TechStart Inc.</p>
                </div>
              </div>
            </Card>
            
            <Card className="hover:scale-105 transition-transform">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className="w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "Working with Ravi on our e-commerce platform was a game-changer. His full-stack skills and attention to detail delivered an exceptional user experience that increased our conversion rates."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
                  <img src="/api/placeholder/48/48" alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Product Manager, RetailFlow</p>
                </div>
              </div>
            </Card>
            
            <Card className="hover:scale-105 transition-transform">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className="w-5 h-5 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                "Ravi's expertise in CI/CD pipelines and DevOps practices revolutionized our development workflow. Our deployment time was reduced by 80%, and our team's productivity increased significantly."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
                  <img src="/api/placeholder/48/48" alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">David Chen</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Engineering Lead, CloudSoft Solutions</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Blog Section (Optional) */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center mb-2">
                <div className="h-1 w-12 bg-indigo-600 mr-3"></div>
                <h2 className="text-sm text-indigo-600 dark:text-indigo-400 uppercase font-semibold tracking-wider">Insights</h2>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                Technical insights and industry trends. Sharing knowledge and experiences from my journey in cloud engineering and web development.
              </p>
            </div>
            <Button variant="link" className="mt-4 md:mt-0">
              View all articles <ExternalLink size={16} className="ml-1" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden group">
              <div className="h-48 mb-4 overflow-hidden">
                <img 
                  src="/api/placeholder/600/300" 
                  alt="Blog post" 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">May 10, 2023</span>
              <h3 className="text-xl font-bold my-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Building Scalable Microservices with Kubernetes
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A comprehensive guide to designing and implementing scalable microservices architecture using Kubernetes.
              </p>
              <Button variant="link">
                Read more <ExternalLink size={16} className="ml-1" />
              </Button>
            </Card>
            
            <Card className="overflow-hidden group">
              <div className="h-48 mb-4 overflow-hidden">
                <img 
                  src="/api/placeholder/600/300" 
                  alt="Blog post" 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">April 25, 2023</span>
              <h3 className="text-xl font-bold my-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Modern CI/CD Pipelines for Frontend Applications
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Learn how to set up efficient CI/CD pipelines for modern frontend applications using GitHub Actions.
              </p>
              <Button variant="link">
                Read more <ExternalLink size={16} className="ml-1" />
              </Button>
            </Card>
            
            <Card className="overflow-hidden group">
              <div className="h-48 mb-4 overflow-hidden">
                <img 
                  src="/api/placeholder/600/300" 
                  alt="Blog post" 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">March 12, 2023</span>
              <h3 className="text-xl font-bold my-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Infrastructure as Code: Best Practices with Terraform
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Dive into infrastructure as code concepts and learn best practices for managing cloud resources with Terraform.
              </p>
              <Button variant="link">
                Read more <ExternalLink size={16} className="ml-1" />
              </Button>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-indigo-50 dark:bg-indigo-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-2">
                <div className="h-1 w-12 bg-indigo-600 mr-3"></div>
                <h2 className="text-sm text-indigo-600 dark:text-indigo-400 uppercase font-semibold tracking-wider">Contact</h2>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Have a project in mind or want to discuss potential opportunities? I'm always open to new challenges and collaborations.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <Mail size={24} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">kattaravi000@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <Linkedin size={24} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">LinkedIn</h3>
                    <p className="text-gray-600 dark:text-gray-300">linkedin.com/in/ravikumarkatta</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <GitHub size={24} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">GitHub</h3>
                    <p className="text-gray-600 dark:text-gray-300">github.com/ravikumarkatta</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="shadow-lg">
                <h3 className="text-xl font-bold mb-6">Send a Message</h3>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="Your name" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="Your email" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      placeholder="Project discussion, job opportunity, etc." 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows="4" 
                      placeholder="Tell me about your project or inquiry..." 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                  </div>
                  
                  <Button>
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-800 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="font-bold text-xl text-indigo-400 mb-4">
                Ravi<span className="text-white">DevOps</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Cloud Engineer & Full Stack Developer specializing in modern web applications, cloud infrastructure, and DevOps practices.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/ravikumarkatta" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <GitHub size={20} />
                </a>
                <a href="https://linkedin.com/in/ravikumarkatta" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:kattaravi000@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map(item => (
                  <li key={item.id}>
                    <button 
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Web Development</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Cloud Infrastructure</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">DevOps Implementation</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Full Stack Development</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Ravi Kumar Katta. All rights reserved.
            </p>
            <div className="text-gray-400 text-sm">
              Designed and developed with ❤️
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
