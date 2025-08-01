import React, { useEffect, useState } from 'react';
import { Shield, Code, Server, Award } from 'lucide-react';

const Hero: React.FC = () => {
  const [animatedStats, setAnimatedStats] = useState({
    experience: 0,
    certifications: 0,
    technologies: 0,
    projects: 0
  });

  const finalStats = {
    experience: 8,
    certifications: 12,
    technologies: 25,
    projects: 50
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedStats({
        experience: Math.floor(finalStats.experience * progress),
        certifications: Math.floor(finalStats.certifications * progress),
        technologies: Math.floor(finalStats.technologies * progress),
        projects: Math.floor(finalStats.projects * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedStats(finalStats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: Award, label: 'Years Experience', value: animatedStats.experience },
    { icon: Shield, label: 'Certifications', value: animatedStats.certifications },
    { icon: Code, label: 'Technologies', value: animatedStats.technologies },
    { icon: Server, label: 'Projects Completed', value: animatedStats.projects }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-gradient-to-b dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-all duration-500">
      {/* Northern Lights Background - Only visible in dark mode */}
      <div className="northern-lights dark:opacity-100 opacity-0 transition-opacity duration-500">
        <div className="stars"></div>
        <div className="aurora-layer"></div>
        <div className="aurora-layer-2"></div>
        <div className="aurora-layer-3"></div>
      </div>

      {/* Light mode decorative elements */}
      <div className="absolute inset-0 dark:opacity-0 opacity-30 transition-opacity duration-500">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in-up">
          {/* Profile Picture Section */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-green-400 p-1 profile-picture-glow">
                {/* Replace the div below with <img src="/path/to/your/profile.jpg" alt="Tim Illguth" className="w-full h-full rounded-full object-cover" /> */}
                <div className="w-full h-full rounded-full bg-gray-800 dark:bg-gray-800 flex items-center justify-center text-white text-4xl sm:text-5xl lg:text-6xl font-bold">
                  TI
                </div>
              </div>
              {/* Floating particles around profile */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/2 -right-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-lg transition-colors duration-300">
            Tim Illguth
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-blue-600 dark:text-blue-200 mb-4 drop-shadow-md transition-colors duration-300">
            Fullstack Blockchain Developer & Network Engineer
          </p>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-blue-100 mb-12 max-w-3xl mx-auto drop-shadow-sm transition-colors duration-300">
            Certified Blockchain Developer | Linux Engineer | Network Security Specialist
            <br />
            Building secure, scalable solutions for the decentralized future
          </p>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/90 dark:hover:bg-white/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-300 transition-colors duration-300" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  {stat.value}+
                </div>
                <div className="text-sm text-gray-700 dark:text-blue-200 font-medium transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-white/20"
            >
              View My Work
            </button>
            <button
              onClick={() => document.getElementById('tutorials')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/90 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/30 hover:bg-white dark:hover:bg-white/20 text-gray-900 dark:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Tutorials
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;