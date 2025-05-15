import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

/**
 * ContactForm Component
 * 
 * An interactive contact form with advanced features:
 * - Form validation with error messages
 * - Animated feedback
 * - Accessibility compliant
 * - Dark/light mode compatible
 * - Success/error state handling
 * 
 * Uses custom hooks for form handling and validation logic.
 * 
 * @author Sam DevOps
 * @version 3.0.0
 */

// Custom hook for form validation
function useFormValidation() {
  const [errors, setErrors] = useState({});
  
  const validateField = (name, value) => {
    let fieldErrors = {};
    
    switch (name) {
      case "name":
        if (!value.trim()) {
          fieldErrors.name = "Name is required";
        } else if (value.trim().length < 2) {
          fieldErrors.name = "Name must be at least 2 characters";
        }
        break;
        
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          fieldErrors.email = "Email is required";
        } else if (!emailRegex.test(value)) {
          fieldErrors.email = "Please enter a valid email address";
        }
        break;
        
      case "message":
        if (!value.trim()) {
          fieldErrors.message = "Message is required";
        } else if (value.trim().length < 10) {
          fieldErrors.message = "Message must be at least 10 characters";
        }
        break;
        
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, ...fieldErrors }));
    return Object.keys(fieldErrors).length === 0;
  };
  
  const validateForm = (formData) => {
    let formErrors = {};
    
    if (!formData.name || formData.name.trim().length < 2) {
      formErrors.name = "Name is required (min 2 characters)";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      formErrors.email = "Valid email is required";
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
      formErrors.message = "Message is required (min 10 characters)";
    }
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  
  return { errors, validateField, validateForm, setErrors };
}

// The main ContactForm component
const ContactForm = () => {
  // Form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  // Form submission status
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    success: false,
    error: null
  });
  
  // Custom validation hook
  const { errors, validateField, validateForm, setErrors } = useFormValidation();
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear the error for this field when user starts typing again
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle input blur for real-time validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isValid = validateForm(formState);
    if (!isValid) return;
    
    // Update status to submitting
    setStatus({
      submitted: false,
      submitting: true,
      success: false,
      error: null
    });
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle successful submission
      setStatus({
        submitted: true,
        submitting: false,
        success: true,
        error: null
      });
      
      // Clear form after successful submission
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset status after showing success message
      setTimeout(() => {
        setStatus(prev => ({
          ...prev,
          submitted: false,
          success: false
        }));
      }, 5000);
      
    } catch (error) {
      // Handle error
      setStatus({
        submitted: true,
        submitting: false,
        success: false,
        error: "Something went wrong. Please try again."
      });
    }
  };
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };
  
  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <h3 className="text-xl font-semibold">Send Me a Message</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Have a question or want to work together? Send me a message!
        </p>
      </CardHeader>
      
      <CardContent>
        <AnimatePresence mode="wait">
          {status.success ? (
            <motion.div
              key="success"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg text-center"
            >
              <svg 
                className="w-12 h-12 text-green-500 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <h4 className="text-lg font-medium text-green-800 dark:text-green-200">Message Sent!</h4>
              <p className="text-green-700 dark:text-green-300">
                Thank you for reaching out. I'll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Form error message */}
              {status.error && (
                <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-md text-red-700 dark:text-red-300 text-sm">
                  {status.error}
                </div>
              )}
              
              {/* Name field */}
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.name 
                      ? "border-red-500 dark:border-red-500" 
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={status.submitting}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              
              {/* Email field */}
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.email 
                      ? "border-red-500 dark:border-red-500" 
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={status.submitting}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              
              {/* Subject field */}
              <div className="space-y-1">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formState.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={status.submitting}
                />
              </div>
              
              {/* Message field */}
              <div className="space-y-1">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.message 
                      ? "border-red-500 dark:border-red-500" 
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  disabled={status.submitting}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>
              
              {/* Submit button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full relative"
                  disabled={status.submitting}
                >
                  {status.submitting ? (
                    <span className="flex items-center justify-center">
                      <svg 
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
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
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
      
      <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 dark:text-gray-400">
        <p>* Required fields</p>
        <p>Your data is secure and will not be shared</p>
      </CardFooter>
    </Card>
  );
};

export { ContactForm };