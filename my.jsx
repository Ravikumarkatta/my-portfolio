import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // Custom Card UI component
import { Button } from "@/components/ui/button"; // Custom Button UI component

// Main component for the portfolio page
export default function Portfolio() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-800">
      {/* Container for the entire portfolio page */}
      <section className="max-w-4xl mx-auto">
        
        {/* Header section with name and subtitle */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold">Sam DevOps</h1>
          <p className="text-lg text-gray-600">Cloud Engineer & Frontend Hustler</p>
        </header>

        {/* Projects section showcasing personal builds */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          
          {/* Grid layout for displaying project cards */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Project Card 1: Movie Search App */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">Movie Search App</h3>
                <p className="mb-2 text-sm text-gray-600">
                  React app using TMDB API to search movies with a responsive UI.
                </p>
                {/* Button linking to live deployed site */}
                <a href="https://your-movie-app.vercel.app" target="_blank">
                  <Button>Live Demo</Button>
                </a>
                {/* Link to GitHub source code */}
                <a
                  href="https://github.com/ravikumarkatta/movie-app"
                  className="ml-4 text-sm text-blue-600"
                  target="_blank"
                >
                  GitHub ↗
                </a>
              </CardContent>
            </Card>

            {/* Project Card 2: AWS S3 Static Site */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">AWS S3 Static Site</h3>
                <p className="mb-2 text-sm text-gray-600">
                  A basic portfolio deployed on AWS S3 to demonstrate static hosting.
                </p>
                {/* Button linking to the S3-hosted portfolio */}
                <a href="https://your-s3-site.aws.amazon.com" target="_blank">
                  <Button>View Site</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* About section describing the developer's goals and path */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-700">
            I’m an aspiring Cloud Engineer with a frontend background, currently focused on AWS.
            I built this portfolio to demonstrate my learning speed, self-teaching ability, and practical skills.
          </p>
        </section>

        {/* Contact section with email link */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            Email me:{" "}
            <a href="mailto:youremail@example.com" className="text-blue-600">
              kattaravi000@gmail.com
            </a>
          </p>
        </section>
      </section>
    </main>
  );
}
