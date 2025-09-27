import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Terminal, Network, ChevronRight } from 'lucide-react';

const Tutorials: React.FC = () => {
  const [activeTab, setActiveTab] = useState('blockchain');

  const tabs = [
    { id: 'blockchain', label: 'Blockchain', icon: Code },
    { id: 'linux', label: 'Linux', icon: Terminal },
    { id: 'networking', label: 'Networking', icon: Network }
  ];

  const tutorialContent = {
    blockchain: {
      title: 'Understanding Automated Market Makers (AMMs)',
      description: 'Learn how AMMs work in DeFi protocols and implement your own token swap mechanism.',
      codeExample: `// Simple AMM Implementation
contract SimpleAMM {
    uint256 public reserveA;
    uint256 public reserveB;
    
    function getPrice(uint256 inputAmount, uint256 inputReserve, uint256 outputReserve) 
        public pure returns (uint256) {
        uint256 inputAmountWithFee = inputAmount * 997;
        uint256 numerator = inputAmountWithFee * outputReserve;
        uint256 denominator = (inputReserve * 1000) + inputAmountWithFee;
        return numerator / denominator;
    }
    
    function swap(uint256 amountIn, bool tokenAForB) external {
        require(amountIn > 0, "Amount must be greater than 0");
        
        uint256 amountOut;
        if (tokenAForB) {
            amountOut = getPrice(amountIn, reserveA, reserveB);
            reserveA += amountIn;
            reserveB -= amountOut;
        } else {
            amountOut = getPrice(amountIn, reserveB, reserveA);
            reserveB += amountIn;
            reserveA -= amountOut;
        }
        
        // Transfer tokens (simplified)
        emit Swap(msg.sender, amountIn, amountOut, tokenAForB);
    }
}`,
      highlights: [
        'Constant Product Formula (x * y = k)',
        'Price Impact and Slippage',
        'Liquidity Pool Management',
        'Fee Distribution Mechanisms'
      ]
    },
    linux: {
      title: 'Advanced Linux System Administration',
      description: 'Master essential Linux commands and system optimization techniques for production environments.',
      codeExample: `# System Performance Monitoring
$ htop                          # Interactive process viewer
$ iostat -x 1                   # I/O statistics
$ netstat -tulpn                # Network connections
$ df -h                         # Disk usage
$ free -h                       # Memory usage

# Process Management
$ systemctl status nginx        # Check service status
$ journalctl -u nginx -f        # Follow service logs
$ ps aux | grep nginx          # Find processes
$ kill -9 <PID>                # Force kill process

# Security Hardening
$ sudo ufw enable               # Enable firewall
$ sudo fail2ban-client status   # Check fail2ban
$ chmod 600 ~/.ssh/authorized_keys  # Secure SSH keys
$ sudo chown root:root /etc/passwd   # Secure system files

# Performance Optimization
$ echo 'vm.swappiness=10' >> /etc/sysctl.conf
$ sysctl -p                     # Apply kernel parameters
$ tune2fs -m 1 /dev/sda1       # Reduce reserved blocks`,
      highlights: [
        'System Monitoring & Diagnostics',
        'Service Management with systemd',
        'Security Hardening Practices',
        'Performance Tuning & Optimization'
      ]
    },
    networking: {
      title: 'Network Security Architecture',
      description: 'Design and implement secure network infrastructures with advanced routing and firewall configurations.',
      codeExample: `# Firewall Configuration (iptables)
# Drop all incoming traffic by default
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow loopback traffic
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow SSH (port 22) from specific subnet
iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT

# Allow HTTP and HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Rate limiting for SSH
iptables -A INPUT -p tcp --dport 22 -m limit --limit 3/min -j ACCEPT

# Log dropped packets
iptables -A INPUT -j LOG --log-prefix "DROPPED: "
iptables -A INPUT -j DROP

# Network monitoring
tcpdump -i eth0 port 80         # Capture HTTP traffic
nmap -sS -O target_ip           # TCP SYN scan with OS detection
wireshark                       # GUI packet analyzer`,
      highlights: [
        'Firewall Rules & Access Control',
        'Intrusion Detection Systems',
        'Network Segmentation Strategies',
        'Traffic Analysis & Monitoring'
      ]
    }
  };

  const currentContent = tutorialContent[activeTab as keyof typeof tutorialContent];

  return (
    <section id="tutorials" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Technical Tutorials
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-colors duration-300">
            Deep-dive into advanced concepts with practical examples and best practices
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-all duration-300 border-b-2 ${
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tutorial Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Code Example */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">
                  {activeTab === 'blockchain' ? 'contract.sol' : 
                   activeTab === 'linux' ? 'terminal' : 'network-config'}
                </span>
              </div>
              <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
                <code>{currentContent.codeExample}</code>
              </pre>
            </div>
          </div>

          {/* Content Description */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              {currentContent.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed transition-colors duration-300">
              {currentContent.description}
            </p>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Key Concepts Covered:
              </h4>
              {currentContent.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <ChevronRight className="text-blue-600 dark:text-blue-400 flex-shrink-0 transition-colors duration-300" size={16} />
                  <span className="text-gray-800 dark:text-gray-200 font-medium transition-colors duration-300">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/tutorials"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Interactive Tutorials
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tutorials;