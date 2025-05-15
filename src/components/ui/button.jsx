import React from "react";

/**
 * Button Component with Advanced Features
 * 
 * This component demonstrates:
 * - Support for different variants (primary, secondary, outline, ghost)
 * - Support for different sizes (sm, md, lg)
 * - Accessibility considerations
 * - Loading state handling
 * - Icon support (left and right)
 */
export function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  isLoading = false,
  leftIcon = null,
  rightIcon = null,
  ...props 
}) {
  // Define base class and variant classes
  const baseClass = "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  // Variant classes
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 text-current",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-current",
    link: "bg-transparent text-blue-600 dark:text-blue-400 hover:underline p-0 h-auto"
  };
  
  // Size classes
  const sizeClasses = {
    sm: "text-xs px-3 py-1.5 h-8",
    md: "text-sm px-4 py-2 h-10",
    lg: "text-base px-6 py-3 h-12"
  };
  
  // Compose the final class string
  const classes = `${baseClass} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${className}`;
  
  return (
    <button 
      className={classes}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          ></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      
      {leftIcon && !isLoading && (
        <span className="mr-2">{leftIcon}</span>
      )}
      
      {children}
      
      {rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  );
}

/**
 * Icon Button Component
 * 
 * A specialized button that contains only an icon
 */
export function IconButton({ 
  icon, 
  variant = "ghost", 
  size = "md", 
  className = "", 
  "aria-label": ariaLabel,
  ...props 
}) {
  // Size classes specifically for icon buttons
  const sizeClasses = {
    sm: "p-1.5 h-8 w-8",
    md: "p-2 h-10 w-10",
    lg: "p-3 h-12 w-12"
  };
  
  // Use the base Button component with customized classes
  return (
    <Button
      variant={variant}
      className={`${sizeClasses[size] || sizeClasses.md} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </Button>
  );
}