import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Tutorials from './components/Tutorials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TutorialsPage from './components/TutorialsPage';
import BlogPage from './components/BlogPage';
import BlogPost from './components/BlogPost';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'tutorials', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const HomePage = () => (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <Hero />
        <Projects />
        <Tutorials />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/vibe-coding-vs-knowledgeable-developers-the-ai-productivity-divide" element={<BlogPost />} />
          <Route path="/thoughts-on-thread-safe-blockchain-development" element={<BlogPost />} />
          <Route path="/blockchain-development-principles" element={<BlogPost />} />
          <Route path="/:slug" element={<BlogPost />} />
        </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;