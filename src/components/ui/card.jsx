import React from "react";

/**
 * Enhanced Card Component System
 * 
 * This component set demonstrates:
 * - Component composition pattern with separate Card parts
 * - Support for hover effects and animations
 * - Interactive variations for different use cases
 * - Accessibility considerations
 * - Flexible layout options
 */

export function Card({ 
  children, 
  className = "", 
  variant = "default", 
  isHoverable = false,
  isInteractive = false,
  onClick = null,
  ...props 
}) {
  // Define base classes for the card
  const baseClass = "rounded-lg overflow-hidden transition-all duration-200";
  
  // Variant classes
  const variantClasses = {
    default: "bg-white dark:bg-gray-800 shadow-md",
    outline: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
    elevated: "bg-white dark:bg-gray-800 shadow-lg",
    flat: "bg-gray-50 dark:bg-gray-900"
  };
  
  // Interactive and hover effects
  const hoverClass = isHoverable ? "hover:shadow-lg transform hover:-translate-y-1" : "";
  const interactiveClass = isInteractive ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500" : "";
  
  // Compose the final class string
  const classes = `${baseClass} ${variantClasses[variant] || variantClasses.default} ${hoverClass} ${interactiveClass} ${className}`;

  // Decide whether to render as a button or div based on interactivity
  const Element = isInteractive ? 'button' : 'div';
  
  return (
    <Element 
      className={classes}
      onClick={isInteractive ? onClick : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      type={isInteractive ? "button" : undefined}
      {...props}
    >
      {children}
    </Element>
  );
}

export function CardHeader({ 
  children, 
  className = "", 
  ...props 
}) {
  return (
    <div 
      className={`p-4 border-b border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ 
  children, 
  className = "", 
  ...props 
}) {
  return (
    <div 
      className={`p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ 
  children, 
  className = "", 
  ...props 
}) {
  return (
    <div 
      className={`p-4 border-t border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ 
  children, 
  className = "", 
  as = "h3", 
  ...props 
}) {
  const Component = as;
  
  return (
    <Component 
      className={`text-lg font-semibold text-gray-900 dark:text-gray-50 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardDescription({ 
  children, 
  className = "", 
  ...props 
}) {
  return (
    <p 
      className={`text-sm text-gray-600 dark:text-gray-400 mt-1 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardImage({ 
  src, 
  alt = "", 
  className = "", 
  ...props 
}) {
  return (
    <div className="overflow-hidden w-full">
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-auto object-cover ${className}`}
        {...props} 
      />
    </div>
  );
}