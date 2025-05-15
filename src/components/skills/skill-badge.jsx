import React from "react";
import { motion } from "framer-motion";

/**
 * SkillBadge Component
 * 
 * An advanced skill representation component with:
 * - Animated hover effects
 * - Skill level visualization
 * - Icon integration
 * - Accessibility features
 * 
 * This component is optimized for performance using:
 * - React.memo for preventing unnecessary re-renders
 * - CSS variables for dynamic styling
 * - Framer Motion for smooth animations
 * 
 * @author Sam DevOps
 * @version 2.1.0
 */

const SkillBadge = React.memo(({ name, level, icon }) => {
  // Convert level to percentage for visual representation
  const levelPercentage = (() => {
    switch(level) {
      case "expert": return 100;
      case "advanced": return 80;
      case "intermediate": return 60;
      case "beginner": return 40;
      default: return 50;
    }
  })();
  
  // Level label accessor with screen reader friendly text
  const getLevelLabel = () => {
    switch(level) {
      case "expert": return "Expert Level";
      case "advanced": return "Advanced Level";
      case "intermediate": return "Intermediate Level";
      case "beginner": return "Beginner Level";
      default: return "Skill Level";
    }
  };
  
  // Custom color mapping based on the skill name
  // This creates a unique visual identity for different skill categories
  const getSkillColor = () => {
    const colorMap = {
      // Cloud services
      "AWS": "#FF9900",
      "Azure": "#0089D6",
      "GCP": "#4285F4",
      "Kubernetes": "#326CE5", 
      "Docker": "#2496ED",
      "Terraform": "#7B42BC",
      
      // Frontend
      "React": "#61DAFB",
      "Vue": "#4FC08D", 
      "Angular": "#DD0031",
      "JavaScript": "#F7DF1E",
      "TypeScript": "#3178C6",
      "HTML": "#E34F26",
      "CSS": "#1572B6",
      "Tailwind": "#06B6D4",
      
      // Backend
      "Node.js": "#339933",
      "Python": "#3776AB",
      "Java": "#007396",
      "Go": "#00ADD8",
      "C#": "#239120",
      "PHP": "#777BB4",
      
      // Database
      "MongoDB": "#47A248",
      "PostgreSQL": "#336791",
      "MySQL": "#4479A1",
      "Redis": "#DC382D",
      
      // DevOps
      "Jenkins": "#D24939",
      "GitHub Actions": "#2088FF",
      "CircleCI": "#343434",
      "Ansible": "#EE0000",
      
      // Default
      "default": "#6366F1"
    };
    
    return colorMap[name] || colorMap.default;
  };
  
  // Animation variants for hover state
  const badgeVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 }
  };
  
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      variants={badgeVariants}
      className="relative flex items-center px-3 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700"
      style={{ "--skill-color": getSkillColor() }}
      role="listitem"
      aria-label={`${name} - ${getLevelLabel()}`}
    >
      {/* Skill icon */}
      {icon && (
        <span className="mr-2 text-lg" style={{ color: "var(--skill-color)" }}>
          {icon}
        </span>
      )}
      
      {/* Skill name */}
      <span className="font-medium mr-2">{name}</span>
      
      {/* Skill level indicator */}
      <div className="ml-1 relative h-1.5 w-16 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden" 
           role="progressbar" 
           aria-valuenow={levelPercentage} 
           aria-valuemin="0" 
           aria-valuemax="100">
        <div 
          className="absolute top-0 left-0 h-full"
          style={{ 
            width: `${levelPercentage}%`, 
            backgroundColor: "var(--skill-color)" 
          }}
        />
      </div>
      
      {/* Visually hidden text for screen readers */}
      <span className="sr-only">{getLevelLabel()}</span>
    </motion.div>
  );
});

SkillBadge.displayName = "SkillBadge";

export { SkillBadge };