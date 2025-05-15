import React from "react";
import { cn } from "../../lib/utils";

/**
 * Tabs Component Suite
 * 
 * A comprehensive tabbed interface implementation with accessibility features and smooth transitions.
 * This component suite includes:
 * - Tabs: The main container
 * - TabsList: Container for tab triggers
 * - TabsTrigger: Individual clickable tab headers
 * - TabsContent: Content panel associated with each tab
 * 
 * Features:
 * - ARIA compliant for accessibility
 * - Smooth transitions between tabs
 * - Keyboard navigation support
 * - Responsive design
 * 
 * @author Sam DevOps
 * @version 2.0.0
 */

const TabsContext = React.createContext(null);

// Tabs Component - Main container
const Tabs = React.forwardRef(({ 
  value, 
  onValueChange, 
  defaultValue, 
  className, 
  children, 
  ...props 
}, ref) => {
  const [tabValue, setTabValue] = React.useState(value || defaultValue || "");

  // Handle controlled/uncontrolled component patterns
  const handleValueChange = React.useCallback((newValue) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setTabValue(newValue);
    }
  }, [onValueChange]);

  // Memoize context value to prevent unnecessary renders
  const contextValue = React.useMemo(() => ({
    value: value !== undefined ? value : tabValue,
    onValueChange: handleValueChange,
  }), [value, tabValue, handleValueChange]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div 
        ref={ref} 
        className={cn("w-full", className)} 
        {...props}
        role="tablist"
        aria-orientation="horizontal"
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

Tabs.displayName = "Tabs";

// TabsList Component - Container for tab triggers
const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div 
      ref={ref} 
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-600 dark:bg-gray-800 dark:text-gray-300", 
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

TabsList.displayName = "TabsList";

// TabsTrigger Component - The clickable tab button
const TabsTrigger = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component");
  }
  
  const { value: selectedValue, onValueChange } = context;
  const isSelected = selectedValue === value;
  
  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isSelected}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isSelected ? 
          "bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400" : 
          "text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400",
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
});

TabsTrigger.displayName = "TabsTrigger";

// TabsContent Component - The content panel for each tab
const TabsContent = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component");
  }
  
  const { value: selectedValue } = context;
  const isSelected = selectedValue === value;
  
  // Using React.memo for performance optimization on tab content rendering
  const MemoizedContent = React.useMemo(() => (
    <div
      ref={ref}
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      hidden={!isSelected}
      className={cn(
        "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        {
          "animate-in fade-in-0 zoom-in-95": isSelected,
        },
        className
      )}
      tabIndex={isSelected ? 0 : -1}
      {...props}
    >
      {children}
    </div>
  ), [children, className, isSelected, props, ref, value]);
  
  return MemoizedContent;
});

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };