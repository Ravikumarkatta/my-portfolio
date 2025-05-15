/**
 * Project data for the portfolio
 * This file exports an array of project objects to be displayed in the Projects section
 */

export const projects = [
  {
    id: 1,
    title: "Serverless E-commerce Platform",
    description: "Built a fully serverless e-commerce platform using AWS Lambda, API Gateway, DynamoDB, and S3. Implemented secure authentication with Cognito and payment processing with Stripe.",
    image: "/images/projects/serverless-ecommerce.jpg",
    tags: ["aws", "serverless", "react", "dynamodb"],
    demoUrl: "https://ecommerce-demo.samdevops.com",
    githubUrl: "https://github.com/samdevops/serverless-ecommerce",
    featured: true,
    highlights: [
      "Reduced operational costs by 65% compared to traditional server-based architecture",
      "Implemented automated CI/CD pipeline with AWS CodePipeline",
      "Achieved 99.99% uptime with fault-tolerant design"
    ]
  },
  {
    id: 2,
    title: "Container Orchestration Platform",
    description: "Designed and implemented a Kubernetes-based container orchestration platform for microservices deployment. Set up auto-scaling, health monitoring, and zero-downtime deployments.",
    image: "/images/projects/container-platform.jpg",
    tags: ["kubernetes", "docker", "devops", "aws"],
    demoUrl: "https://k8s-demo.samdevops.com",
    githubUrl: "https://github.com/samdevops/k8s-platform",
    featured: true,
    highlights: [
      "Reduced deployment time from hours to minutes",
      "Implemented Infrastructure as Code using Terraform",
      "Set up comprehensive monitoring with Prometheus and Grafana"
    ]
  },
  {
    id: 3,
    title: "Real-time Analytics Dashboard",
    description: "Developed a real-time analytics dashboard using React, D3.js, and WebSockets. Integrated with AWS Kinesis for data streaming and processing.",
    image: "/images/projects/analytics-dashboard.jpg",
    tags: ["react", "aws", "d3js", "websockets"],
    demoUrl: "https://analytics.samdevops.com",
    githubUrl: "https://github.com/samdevops/analytics-dashboard",
    featured: true,
    highlights: [
      "Visualized complex data sets with interactive charts",
      "Implemented real-time updates with minimal latency",
      "Built responsive UI that works across devices"
    ]
  },
  {
    id: 4,
    title: "Multi-Region Infrastructure",
    description: "Architected a multi-region AWS infrastructure for a high-availability SaaS application. Implemented global load balancing, data replication, and disaster recovery procedures.",
    image: "/images/projects/multi-region.jpg",
    tags: ["aws", "devops", "terraform", "high-availability"],
    demoUrl: null,
    githubUrl: "https://github.com/samdevops/multi-region-infra",
    featured: false,
    highlights: [
      "Achieved 99.999% availability with cross-region failover",
      "Implemented secure data replication across regions",
      "Created comprehensive disaster recovery playbooks"
    ]
  },
  {
    id: 5,
    title: "CI/CD Pipeline Automation",
    description: "Built a comprehensive CI/CD pipeline using GitHub Actions, AWS CodePipeline, and Terraform. Implemented automated testing, security scanning, and deployment to multiple environments.",
    image: "/images/projects/cicd-pipeline.jpg",
    tags: ["devops", "github-actions", "aws", "terraform"],
    demoUrl: null,
    githubUrl: "https://github.com/samdevops/cicd-automation",
    featured: false,
    highlights: [
      "Reduced deployment errors by 90% with automated validation",
      "Implemented security scanning at every stage of the pipeline",
      "Achieved consistent deployments across all environments"
    ]
  },
  {
    id: 6,
    title: "Cloud Cost Optimization Tool",
    description: "Developed a tool to analyze and optimize AWS cloud costs. Identifies unused resources, recommends right-sizing, and implements automated cost-saving measures.",
    image: "/images/projects/cost-optimization.jpg",
    tags: ["aws", "python", "serverless", "devops"],
    demoUrl: "https://cost-optimizer.samdevops.com",
    githubUrl: "https://github.com/samdevops/cloud-cost-optimizer",
    featured: false,
    highlights: [
      "Reduced monthly cloud spend by 30% for enterprise clients",
      "Implemented automated resource scheduling based on usage patterns",
      "Created comprehensive cost allocation reporting by team and service"
    ]
  },
  {
    id: 7,
    title: "Serverless File Processor",
    description: "Built a scalable serverless solution for processing large files using AWS Lambda, S3, and Step Functions. Handles image processing, document conversion, and data extraction.",
    image: "/images/projects/file-processor.jpg",
    tags: ["aws", "serverless", "lambda", "s3"],
    demoUrl: null,
    githubUrl: "https://github.com/samdevops/serverless-file-processor",
    featured: false,
    highlights: [
      "Processes thousands of files per minute with automatic scaling",
      "Implemented event-driven architecture for efficient resource usage",
      "Added comprehensive error handling and retry mechanisms"
    ]
  },
  {
    id: 8,
    title: "React Component Library",
    description: "Created a reusable React component library with Storybook documentation. Includes form components, data visualization, and UI elements with comprehensive testing.",
    image: "/images/projects/component-library.jpg",
    tags: ["react", "storybook", "typescript", "frontend"],
    demoUrl: "https://components.samdevops.com",
    githubUrl: "https://github.com/samdevops/react-component-library",
    featured: false,
    highlights: [
      "Built 50+ reusable components with comprehensive documentation",
      "Implemented accessibility standards (WCAG 2.1 AA)",
      "Created automated visual regression testing with Chromatic"
    ]
  },
  {
    id: 9,
    title: "Infrastructure Monitoring Solution",
    description: "Set up comprehensive infrastructure monitoring using Prometheus, Grafana, and ELK stack. Includes alerting, log aggregation, and performance dashboards.",
    image: "/images/projects/monitoring.jpg",
    tags: ["devops", "prometheus", "grafana", "elk"],
    demoUrl: "https://monitoring-demo.samdevops.com",
    githubUrl: "https://github.com/samdevops/infrastructure-monitoring",
    featured: false,
    highlights: [
      "Reduced incident response time by 70% with proactive alerting",
      "Created custom dashboards for different stakeholders",
      "Implemented automated anomaly detection with machine learning"
    ]
  }
];

export default projects;