import React from 'react';
import { Github, Linkedin, Mail, Code } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/timillguth',
      icon: Github,
      color: 'hover:text-gray-900'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/timillguth',
      icon: Linkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      url: 'mailto:timillguth@outlook.com',
      icon: Mail,
      color: 'hover:text-red-600'
    }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="text-blue-400" size={24} />
              <h3 className="text-xl font-bold">Tim Illguth</h3>
            </div>
            <p className="text-gray-400 dark:text-gray-500 leading-relaxed transition-colors duration-300">
              Fullstack Blockchain Developer & Network Engineer specializing in
              secure, scalable solutions for the decentralized future.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'Projects', 'Tutorials', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const element = document.getElementById(link.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-gray-400 dark:text-gray-500 hover:text-white transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 dark:text-gray-500 mb-2 transition-colors duration-300">Email</p>
                <a
                  href="mailto:timillguth@outlook.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  timillguth@outlook.com
                </a>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 dark:text-gray-500 ${social.color} transition-colors p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900`}
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 transition-colors duration-300">
          <p className="text-gray-400 dark:text-gray-500 text-center sm:text-left transition-colors duration-300">
            © {currentYear} Tim Illguth. All rights reserved.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-center sm:text-right text-sm transition-colors duration-300">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;