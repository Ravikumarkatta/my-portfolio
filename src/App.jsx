import React from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

function App() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <section className="max-w-4xl mx-auto">
        {/* Header section */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold">Sam DevOps</h1>
          <p className="text-lg text-gray-600">Cloud Engineer & Frontend Hustler</p>
        </header>

        {/* Projects */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Project 1 */}
            <Card>
              <CardContent>
                <h3 className="text-xl font-bold mb-2">Movie Search App</h3>
                <p className="mb-2 text-sm text-gray-600">
                  React app using TMDB API to search movies with a responsive UI.
                </p>
                <a href="https://your-movie-app.vercel.app" target="_blank">
                  <Button>Live Demo</Button>
                </a>
                <a
                  href="https://github.com/yourusername/movie-app"
                  className="ml-4 text-sm text-blue-600"
                  target="_blank"
                >
                  GitHub ↗
                </a>
              </CardContent>
            </Card>

            {/* Project 2 */}
            <Card>
              <CardContent>
                <h3 className="text-xl font-bold mb-2">AWS S3 Static Site</h3>
                <p className="mb-2 text-sm text-gray-600">
                  A basic portfolio deployed on AWS S3 to demonstrate static hosting.
                </p>
                <a href="https://your-s3-site.aws.amazon.com" target="_blank">
                  <Button>View Site</Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* About */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-700">
            I’m an aspiring Cloud Engineer with a frontend background, currently focused on AWS.
            I built this portfolio to demonstrate my learning speed, self-teaching ability, and practical skills.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            Email me:{" "}
            <a href="mailto:kattaravi00@gmail.com" className="text-blue-600">
              youremail@example.com
            </a>
          </p>
        </section>
      </section>
    </main>
  );
}

export default App;
