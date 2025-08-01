import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, Terminal, Network, Menu, X } from 'lucide-react';
import BlockchainTutorial from './tutorials/BlockchainTutorial';
import LinuxTutorial from './tutorials/LinuxTutorial';
import NetworkingTutorial from './tutorials/NetworkingTutorial';

const TutorialsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('blockchain');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    {
      id: 'blockchain',
      title: 'Blockchain Development',
      icon: Code,
      description: 'Interactive Uniswap AMM visualization',
      component: BlockchainTutorial
    },
    {
      id: 'linux',
      title: 'Linux Administration',
      icon: Terminal,
      description: 'Interactive terminal commands',
      component: LinuxTutorial
    },
    {
      id: 'networking',
      title: 'Network Engineering',
      icon: Network,
      description: 'Interactive networking concepts',
      component: NetworkingTutorial
    }
  ];

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || BlockchainTutorial;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Portfolio</span>
              </Link>
              <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
              <h1 className="hidden sm:block text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Interactive Tutorials
              </h1>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:block border-r border-gray-200 dark:border-gray-700
        `}>
          <div className="h-full overflow-y-auto pt-6 pb-6">
            <div className="px-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                Tutorial Sections
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Choose a topic to explore interactive tutorials and examples
              </p>
            </div>

            <nav className="px-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full text-left p-4 rounded-lg mb-2 transition-all duration-200 group
                    ${activeSection === section.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 text-blue-700 dark:text-blue-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <section.icon
                      size={20}
                      className={`mt-0.5 transition-colors ${
                        activeSection === section.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1">
                        {section.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed transition-colors">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </nav>

            {/* Additional Info */}
            <div className="px-6 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 transition-colors duration-300">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  💡 Interactive Learning
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  These tutorials feature hands-on examples, interactive diagrams, and real code snippets you can explore.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="max-w-6xl mx-auto p-6 lg:p-8">
            <ActiveComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TutorialsPage;
