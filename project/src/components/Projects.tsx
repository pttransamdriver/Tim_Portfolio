import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'NFT Patents Project',
      description: 'A comprehensive blockchain solution for patent management using NFTs. Built with Solidity smart contracts, React frontend, and IPFS for decentralized storage.',
      image: '/media/NFT_Patents.png',
      technologies: ['Solidity', 'React', 'IPFS', 'Web3.js', 'Hardhat', 'Tailwind.css', 'TypeScript', 'Vite', 'USPTO API', 'AI Integration'],
      github: 'https://github.com/pttransamdriver/NFT_Patents',
      demo: '#',
      featured: true
    },
    {
      title: 'Uniswap Clone Project',
      description: 'Full-featured DEX implementation with automated market maker functionality. Includes liquidity pools, token swapping, and yield farming capabilities.',
      image: '/media/uniswap.png',
      technologies: ['Solidity', 'React', 'Ethers.js', 'TypeScript', 'Tailwind.css', 'Hardhat'],
      github: 'https://github.com/pttransamdriver/amm_project',
      demo: '#',
      featured: true
    },
    {
      title: 'NASA Network Security Upgrade',
      description: 'While working as a NASA Contractor at ASF for 12 years I implemented two new netwok upgrades with firewalls, VPN and setup a ZTNA solution.',
      image: '/media/NASA_Logo.png',
      technologies: ['ZTNA', 'Juniper', 'Fortinet', 'Kubernetes', 'Docker', 'Linux'],
      github: 'https://github.com/timillguth/security-dashboard',
      demo: '#',
      featured: false
    },
    {
      title: 'Linux Systems Manager',
      description: 'Automated system optimization tool for Linux servers with performance monitoring and resource management.',
      image: '/media/Clouds.png',
      technologies: ['Bash', 'Python', 'SystemD', 'Prometheus', 'Grafana'],
      github: 'https://github.com/timillguth/linux-optimizer',
      demo: '#',
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-colors duration-300">
            A showcase of my work in blockchain development, network security, and system engineering
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 overflow-hidden hover:scale-105 ${
                project.featured ? 'lg:col-span-1' : 'lg:col-span-1'
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-200 mb-4 leading-relaxed transition-colors duration-300">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {(project.title === 'NFT Patents Project' || project.title === 'Uniswap Clone Project') && (
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={20} />
                      <span className="font-medium">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span className="font-medium">Demo</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Profile Link */}
        <div className="text-center">
          <a
            href="https://github.com/timillguth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gray-900 dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;