import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * Badge Component
 * 
 * A versatile badge component that supports multiple variants and sizes
 * with a clean, modern design. Uses class-variance-authority for type-safe
 * variant handling and composition.
 * 
 * @author Sam DevOps
 * @version 1.0.0
 * @example
 *   <Badge>Default</Badge>
 *   <Badge variant="outline">Outline</Badge>
 *   <Badge variant="secondary" size="lg">Large Secondary</Badge>
 */

const badgeVariants = cva(
  "inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        secondary: "border-transparent bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "border-current text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
        success: "border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800",
        warning: "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Badge component for displaying short status descriptors
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant='default'] - Badge style variant
 * @param {string} [props.size='default'] - Badge size
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} - Rendered badge component
 */
const Badge = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export { Badge, badgeVariants };