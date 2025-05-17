
import React from "react";


// Placeholder button component
const Button = ({ children }) => (
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{children}</button>
);

// Placeholder card component
const Card = ({ children }) => (
  <div className="border rounded shadow p-4 bg-white">{children}</div>
);

// Main app component
function App() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <section className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold">Sam DevOps</h1>
          <p className="text-lg text-gray-600">Cloud Engineer & Frontend Hustler</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-xl font-bold mb-2">Movie Search App</h3>
              <p className="mb-2 text-sm text-gray-600">
                React app using TMDB API to search movies with a responsive UI.
              </p>
              <a href="https://your-movie-app.vercel.app" target="_blank" rel="noopener noreferrer">
                <Button>Live Demo</Button>
              </a>
              <a href="https://github.com/yourusername/movie-app" className="ml-4 text-sm text-blue-600" target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </Card>
            <Card>
              <h3 className="text-xl font-bold mb-2">AWS S3 Static Site</h3>
              <p className="mb-2 text-sm text-gray-600">
                A basic portfolio deployed on AWS S3 to demonstrate static hosting.
              </p>
              <a href="https://your-s3-site.aws.amazon.com" target="_blank" rel="noopener noreferrer">
                <Button>View Site</Button>
              </a>
            </Card>
            <Card>
              <h3 className="text-xl font-bold mb-2">Fitness Landing Page</h3>
              <p className="mb-2 text-sm text-gray-600">
                A responsive website for a fitness center with animated scroll effects and modern design. Built with HTML, CSS, and JavaScript.  

              </p>
              <a href="https://ravikumarkatta.github.io/Fitness" target="_blank" rel="noopener noreferrer">
                <Button>Live Demo</Button>
              </a>
              <a href="https://github.com/yourusername/movie-app" className="ml-4 text-sm text-blue-600" target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-700">
            I’m an aspiring Cloud Engineer with a frontend background, currently focused on AWS.
            I built this portfolio to demonstrate my learning speed, self-teaching ability, and practical skills.
          </p>
        </section>

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

export default App;
