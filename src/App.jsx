import React, { useState, useEffect } from "react";
import { Moon, Sun, ExternalLink, GithubIcon as GitHub, Linkedin, Mail, Download } from "lucide-react";

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

// Project Card component
const ProjectCard = ({ title, description, tags, demoLink, githubLink, image }) => (
  <Card className="flex flex-col h-full hover:scale-[1.02] group">
    {image && (
      <div className="h-48 mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-500"
        />
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

// Skill Badge component
const SkillBadge = ({ name, level }) => {
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
        <div className={`h-full bg-gradient-to-r from-indigo-500 to-purple-600 ${getWidth()}`}></div>
      </div>
    </div>
  );
};

// Timeline Item component
const TimelineItem = ({ year, title, company, description }) => (
  <div className="relative pl-8 pb-8 border-l border-gray-300 dark:border-gray-700">
    <div className="absolute left-[-8px] bg-indigo-600 rounded-full w-4 h-4 border-4 border-white dark:border-gray-900"></div>
    <span className="inline-block px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs font-semibold mb-2">
      {year}
    </span>
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-1">{company}</p>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

// Main app component
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle dark mode toggle
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
      title: "Movie Search App",
      description: "React app using TMDB API to search movies with a responsive UI, filtering, and watchlist functionality.",
      tags: ["React", "API Integration", "Tailwind CSS", "JavaScript"],
      demoLink: "https://your-movie-app.vercel.app",
      githubLink: "https://github.com/yourusername/movie-app",
      image: "/api/placeholder/600/300"
    },
    {
      title: "AWS S3 Static Site",
      description: "A portfolio deployed on AWS S3 with CloudFront CDN, Route53 for DNS, and secured with AWS Certificate Manager.",
      tags: ["AWS", "CloudFront", "S3", "IaC", "Terraform"],
      demoLink: "https://your-s3-site.aws.amazon.com",
      githubLink: "https://github.com/yourusername/aws-static-site",
      image: "/api/placeholder/600/300"
    },
    {
      title: "Fitness Landing Page",
      description: "A responsive website for a fitness center with animated scroll effects, membership management, and modern design.",
      tags: ["HTML", "CSS", "JavaScript", "GSAP Animation"],
      demoLink: "https://ravikumarkatta.github.io/Fitness",
      githubLink: "https://github.com/yourusername/fitness-landing",
      image: "/api/placeholder/600/300"
    },
    {
      title: "DevOps Dashboard",
      description: "A dashboard to monitor CI/CD pipelines, cloud resources, and automated deployment status across multiple environments.",
      tags: ["React", "Node.js", "Docker", "Jenkins API"],
      demoLink: "https://devops-dashboard.example.com",
      githubLink: "https://github.com/yourusername/devops-dashboard",
      image: "/api/placeholder/600/300"
    }
  ];

  const skills = [
    { name: "Frontend Development (React, JavaScript)", level: "advanced" },
    { name: "AWS Cloud Services", level: "intermediate" },
    { name: "Docker & Containerization", level: "intermediate" },
    { name: "CI/CD Pipelines", level: "intermediate" },
    { name: "Terraform & IaC", level: "beginner" },
    { name: "UI/UX Design", level: "intermediate" }
  ];

  const experience = [
    {
      year: "2023 - Present",
      title: "Junior Cloud Engineer",
      company: "TechStartup Inc.",
      description: "Deployed and maintained cloud infrastructure on AWS, implemented CI/CD pipelines, and automated deployment processes."
    },
    {
      year: "2021 - 2023",
      title: "Frontend Developer",
      company: "Web Solutions Co.",
      description: "Built responsive web applications using React, implemented modern UI designs, and integrated with backend APIs."
    },
    {
      year: "2020 - 2021",
      title: "Web Development Intern",
      company: "Digital Agency",
      description: "Assisted in creating landing pages and simple web applications using HTML, CSS, and JavaScript."
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
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-xl text-indigo-600 dark:text-indigo-400">
            Sam<span className="text-gray-800 dark:text-white">DevOps</span>
          </div>
          
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
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ravi DevOps
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
              Cloud Engineer & Frontend Developer
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              Building modern web applications and cloud infrastructure solutions. 
              Passionate about DevOps practices, automation, and creating seamless user experiences.
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
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                <GitHub size={24} />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
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
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative z-10">
                <img src="/api/placeholder/320/320" alt="Sam" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                A collection of my recent work showcasing my skills in frontend development, cloud engineering, and DevOps practices.
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
              <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <SkillBadge key={index} {...skill} />
                ))}
              </div>
              
              <div className="mt-10">
                <h3 className="font-bold text-xl mb-4">Technologies I work with:</h3>
                <div className="flex flex-wrap gap-3">
                  {['React', 'AWS', 'Docker', 'Git', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Terraform', 'Jenkins', 'GitHub Actions'].map((tech, index) => (
                    <span key={index} className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Experience */}
            <div id="experience">
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
      
      {/* About Me Section */}
      <section id="about" className="py-20 px-6 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <div className="rounded-xl overflow-hidden mb-6">
                  <img src="/api/placeholder/400/600" alt="About Sam" className="w-full object-cover" />
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button variant="secondary" href="https://github.com/yourusername" icon={<GitHub size={16} />}>
                    GitHub
                  </Button>
                  <Button variant="secondary" href="https://linkedin.com/in/yourusername" icon={<Linkedin size={16} />}>
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
              
              <div className="prose prose-lg dark:prose-invert">
                <p>
                  I'm an aspiring Cloud Engineer with a strong frontend development background, currently focused on AWS and DevOps practices.
                </p>
                <p>
                  My journey began in web development, where I built responsive and user-friendly interfaces using modern JavaScript frameworks. 
                  This experience gave me a deep appreciation for creating seamless user experiences and efficient code.
                </p>
                <p>
                  As I grew in my career, I became fascinated with cloud technologies and the DevOps philosophy. 
                  I've since been learning and implementing AWS services, containerization with Docker, and infrastructure as code using Terraform.
                </p>
                <p>
                  I believe in continuous learning and improvement, which is why I built this portfolio to demonstrate not only my technical skills 
                  but also my ability to quickly adapt to new technologies and solve complex problems.
                </p>
                <p>
                  When I'm not coding or learning about new technologies, you can find me hiking, reading tech blogs, or experimenting with home automation projects.
                </p>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold mb-4">Education</h3>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold">Bachelor of Science in Computer Science</p>
                  <p className="text-gray-600 dark:text-gray-300">SIMATS UNIVERSITY • 2016-2020</p>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold mb-4">Certifications</h3>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold">AWS Certified Cloud Practitioner</p>
                    <p className="text-gray-600 dark:text-gray-300">Amazon Web Services • 2023</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold">Certified Kubernetes Administrator</p>
                    <p className="text-gray-600 dark:text-gray-300">Cloud Native Computing Foundation • 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              Interested in working together or have a question? Feel free to reach out to me!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-32"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <Button className="w-full">Send Message</Button>
              </div>
            </Card>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="mr-4 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:kattaravi000@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      kattaravi000@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Linkedin className="mr-4 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <a href="https://linkedin.com/in/yourusername" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      linkedin.com/in/ravikumarkatta
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <GitHub className="mr-4 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="font-medium">GitHub</p>
                    <a href="https://github.com/yourusername" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      github.com/ravikumarkatta
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Availability</h3>
                <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-900 rounded-lg p-4">
                  <p className="text-indigo-800 dark:text-indigo-300">
                    I'm currently <span className="font-bold">available</span> for freelance work and open to new opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-100 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="font-bold text-xl text-indigo-600 dark:text-indigo-400 mb-2">
              RAVI<span className="text-gray-800 dark:text-white">DevOps</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Cloud Engineer & Frontend Developer
            </p>
          </div>
          
          <div className="flex space-x-8">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="mt-6 md:mt-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Ravi DevOps. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;