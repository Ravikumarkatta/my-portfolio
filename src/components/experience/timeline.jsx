import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";

/**
 * Timeline component for displaying work experience and education
 * 
 * @param {Object} props
 * @param {Array} props.experiences - Array of experience objects
 */
export const Timeline = ({ experiences }) => {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-400 before:via-blue-500 before:to-purple-500">
      {experiences.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
        >
          {/* Timeline node */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-300 bg-blue-50 dark:bg-blue-900 dark:border-blue-700 shadow shrink-0 md:order-1 md:mx-auto z-10">
            {item.type === "work" ? (
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            )}
          </div>

          {/* Card */}
          <div className="w-full md:w-5/12">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{item.organization}</p>
                </div>
                <Badge variant="secondary">
                  {item.period}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{item.description}</p>
                {item.achievements && (
                  <ul className="space-y-1 list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
                    {item.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                )}
                {item.technologies && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;