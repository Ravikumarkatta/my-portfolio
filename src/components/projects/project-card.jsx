import React, { useState } from "react";
import { Card, CardContent, CardImage, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

/**
 * ProjectCard Component
 * 
 * This component demonstrates:
 * - Sophisticated card design for project showcasing
 * - Integration with card component system
 * - Interactive elements and hover states
 * - Tag/badge system for categorization
 * - Custom animations and transitions
 * - Conditional rendering based on project data
 */
export function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Destructure project data with defaults
  const {
    title,
    description,
    image,
    tags = [],
    liveUrl,
    repoUrl,
    featured = false,
    longDescription,
    technologies = []
  } = project;
  
  // Handle toggling expanded description
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card 
      variant="default" 
      isHoverable={true}
      className="flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Project Image */}
      {image && (
        <div className="relative">
          <CardImage 
            src={image} 
            alt={title} 
            className="h-48 object-cover" 
          />
          {featured && (
            <Badge 
              variant="primary" 
              className="absolute top-3 right-3"
            >
              Featured
            </Badge>
          )}
        </div>
      )}
      
      <div className="flex flex-col flex-grow">
        {/* Project Content */}
        <CardContent className="flex-grow">
          {/* Title */}
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Description */}
          <CardDescription className="text-sm">
            {isExpanded && longDescription ? longDescription : description}
          </CardDescription>
          
          {/* Expand/Collapse toggle */}
          {longDescription && (
            <button
              onClick={toggleExpand}
              className="text-blue-600 dark:text-blue-400 text-xs mt-2 inline-flex items-center hover:underline focus:outline-none"
            >
              {isExpanded ? 'Show less' : 'Read more'}
              <svg
                className={`ml-1 h-3 w-3 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
          
          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="mt-3">
              <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-1">
                {technologies.map(tech => (
                  <Badge 
                    key={tech} 
                    variant="outline" 
                    className="text-xs bg-gray-50 dark:bg-gray-900"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        {/* Project Links */}
        <CardFooter className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          {liveUrl && (
            <Button 
              variant="primary" 
              size="sm" 
              className="flex-1"
              as="a" 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              rightIcon={(
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              )}
            >
              Live Demo
            </Button>
          )}
          
          {repoUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              as="a" 
              href={repoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              rightIcon={(
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              )}
            >
              GitHub
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}