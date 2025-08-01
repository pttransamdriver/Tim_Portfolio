import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the data to a backend service
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Let's Build the Future Together
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-colors duration-300">
            Reach out to discuss a project, opportunity, or just to connect.
            I'm always interested in innovative blockchain and security projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                Get In Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors duration-300">
                I'm currently available for new opportunities and exciting projects.
                Whether you need blockchain development, network security consulting,
                or Linux system architecture, let's discuss how we can work together.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <a
                href="mailto:timillguth@outlook.com"
                className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg dark:shadow-gray-900/50 transition-all duration-300 hover:scale-105"
              >
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg transition-colors duration-300">
                  <Mail className="text-blue-600 dark:text-blue-400 transition-colors duration-300" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">timillguth@outlook.com</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/timillguth"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg dark:shadow-gray-900/50 transition-all duration-300 hover:scale-105"
              >
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg transition-colors duration-300">
                  <Linkedin className="text-blue-600 dark:text-blue-400 transition-colors duration-300" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">LinkedIn</h4>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Connect professionally</p>
                </div>
              </a>

              <a
                href="https://github.com/timillguth"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg dark:shadow-gray-900/50 transition-all duration-300 hover:scale-105"
              >
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg transition-colors duration-300">
                  <Github className="text-gray-800 dark:text-gray-300 transition-colors duration-300" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">GitHub</h4>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">View my repositories</p>
                </div>
              </a>

              <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 transition-colors duration-300">
                <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg transition-colors duration-300">
                  <MapPin className="text-green-600 dark:text-green-400 transition-colors duration-300" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Available for remote work worldwide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;