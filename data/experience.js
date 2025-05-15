/**
 * Experience data for the portfolio
 * This file exports an array of experience objects for work history and education
 */

export const experience = [
  {
    type: "work",
    title: "Senior Cloud Engineer",
    organization: "TechInnovate Solutions",
    period: "2022 - Present",
    description: "Leading cloud infrastructure and DevOps initiatives for enterprise clients. Architecting serverless solutions and implementing CI/CD pipelines.",
    achievements: [
      "Reduced cloud infrastructure costs by 35% through optimization and right-sizing",
      "Implemented multi-region high-availability architecture with 99.99% uptime",
      "Led migration of legacy applications to containerized microservices architecture",
      "Mentored junior engineers on cloud best practices and DevOps methodologies"
    ],
    technologies: ["AWS", "Terraform", "Kubernetes", "Docker", "CI/CD", "Serverless"]
  },
  {
    type: "work",
    title: "DevOps Engineer",
    organization: "CloudScale Systems",
    period: "2020 - 2022",
    description: "Designed and implemented cloud infrastructure and CI/CD pipelines for SaaS products. Focused on automation, security, and scalability.",
    achievements: [
      "Built automated deployment pipelines reducing release time from days to hours",
      "Implemented infrastructure as code practices using Terraform",
      "Developed monitoring and alerting system with 24/7 coverage",
      "Improved system reliability through chaos engineering practices"
    ],
    technologies: ["AWS", "Docker", "Jenkins", "Terraform", "Python", "ELK Stack"]
  },
  {
    type: "work",
    title: "Frontend Developer",
    organization: "WebFusion Interactive",
    period: "2018 - 2020",
    description: "Developed responsive web applications using React and modern JavaScript. Implemented state management solutions and UI component libraries.",
    achievements: [
      "Created reusable component library reducing development time by 40%",
      "Improved application performance by implementing code splitting and lazy loading",
      "Implemented automated testing increasing code coverage to 85%",
      "Contributed to open-source projects and internal knowledge sharing"
    ],
    technologies: ["React", "JavaScript", "TypeScript", "Redux", "HTML/CSS", "Jest"]
  },
  {
    type: "education",
    title: "M.S. in Computer Science",
    organization: "University of Washington",
    period: "2016 - 2018",
    description: "Specialized in Cloud Computing and Distributed Systems. Research focus on serverless computing optimization and container orchestration.",
    achievements: [
      "Published research paper on serverless computing performance optimization",
      "Developed a proof-of-concept for auto-scaling containerized applications",
      "Teaching assistant for Advanced Cloud Computing course",
      "Graduated with 3.9 GPA"
    ],
    technologies: ["Cloud Computing", "Distributed Systems", "Algorithms", "Machine Learning"]
  },
  {
    type: "education",
    title: "B.S. in Software Engineering",
    organization: "Oregon State University",
    period: "2012 - 2016",
    description: "Comprehensive education in software development methodologies, data structures, algorithms, and systems design.",
    achievements: [
      "Graduated cum laude with 3.7 GPA",
      "Led student software development team for university mobile app",
      "Internship at tech startup developing web applications",
      "Winner of annual hackathon for innovative cloud-based solution"
    ],
    technologies: ["Java", "Python", "Web Development", "Databases", "Software Design"]
  }
];

export default experience;