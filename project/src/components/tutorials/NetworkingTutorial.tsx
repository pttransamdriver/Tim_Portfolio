import React, { useState } from 'react';
import { Mail, MapPin, Router, Shield, Navigation, Info } from 'lucide-react';

interface NetworkingConcept {
  id: string;
  title: string;
  analogy: string;
  technical: string;
  example: string;
  position: { x: number; y: number };
  icon: React.ComponentType<any>;
  color: string;
}

const NetworkingTutorial: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [showAnalogy, setShowAnalogy] = useState(true);

  const networkingConcepts: NetworkingConcept[] = [
    {
      id: 'ip-address',
      title: 'IP Address',
      analogy: 'Like a house address (123 Main St, Springfield, IL 62701) - it tells exactly where to deliver the mail.',
      technical: 'A unique numerical identifier assigned to each device on a network, consisting of network and host portions.',
      example: 'user@mx480> show interfaces ge-0/0/1 | match "Logical interface"\nLogical interface ge-0/0/1.0 (Index 333) (SNMP ifIndex 606)\n    Flags: Up SNMP-Traps 0x4004000 Encapsulation: ENET2 Traffic-Statistics\n    Input  packets :                123456\n    Output packets :                789012\n    Protocol inet, MTU: 1500\n    Addresses, Flags: Is-Preferred Is-Primary\n      Destination: 192.168.1/24, Local: 192.168.1.1, Broadcast: 192.168.1.255',
      position: { x: 40, y: 60 },
      icon: MapPin,
      color: 'bg-blue-500'
    },
    {
      id: 'subnet-mask',
      title: 'Subnet Mask',
      analogy: 'Like the ZIP code system - it groups addresses into neighborhoods (subnets) for efficient mail sorting.',
      technical: 'Determines which portion of an IP address represents the network and which represents the host.',
      example: 'user@mx480> show route table inet.0\n\ninet.0: 742108 destinations, 1484216 routes (742108 active, 0 holddown, 0 hidden)\n+ = Active Route, - = Last Active, * = Both\n\n0.0.0.0/0          *[BGP/170] 2d 14:23:45, localpref 100\n                      AS path: 174 I, validation-state: unverified\n                    >  to 10.1.1.1 via ge-0/0/0.0\n192.168.1.0/24     *[Direct/0] 5d 08:15:23\n                    >  via ge-0/0/1.0',
      position: { x: 61, y: 60 },
      icon: Navigation,
      color: 'bg-green-500'
    },
    {
      id: 'default-gateway',
      title: 'Default Gateway',
      analogy: 'Like the local post office - when mail needs to go outside your neighborhood, it goes here first.',
      technical: 'The router that connects your local network to other networks, typically the internet.',
      example: 'user@mx480> show bgp summary\nGroups: 3 Peers: 8 Down peers: 0\nTable          Tot Paths  Act Paths Suppressed    History Damp State    Pending\ninet.0           742108     742108          0          0          0          0\nPeer                     AS      InPkt     OutPkt    OutQ   Flaps Last Up/Dwn State|#Active/Received/Accepted/Damped...\n10.1.1.1               174     156234     123456       0       2     2d 14:23:45 Establ\n  inet.0: 742108/742108/742108/0',
      position: { x: 50.2, y: 60 },
      icon: Router,
      color: 'bg-purple-500'
    },
    {
      id: 'dns',
      title: 'DNS Server',
      analogy: 'Like a phone book - you give it a name (google.com) and it tells you the address (172.217.164.110).',
      technical: 'Translates human-readable domain names into IP addresses that computers can understand.',
      example: 'user@mx480> show system services dns\nDNS configuration:\n    Forwarders: 8.8.8.8, 8.8.4.4\n    Maximum concurrent requests: 1000\n    Query source address: 10.1.1.100\n\nuser@mx480> show host google.com\nHost google.com:\n172.217.164.110 has address 172.217.164.110\n172.217.164.110 has address 142.250.185.78',
      position: { x: 50, y: 13 },
      icon: Mail,
      color: 'bg-yellow-500'
    },
    {
      id: 'firewall',
      title: 'Firewall',
      analogy: 'Like a security guard at a gated community - checks every visitor and decides who can enter.',
      technical: 'Network security system that monitors and controls incoming and outgoing network traffic.',
      example: 'user@mx480> show firewall filter INGRESS-FILTER\nFilter: INGRESS-FILTER\nTerm                        Type       Name\n10                          inet       ALLOW-BGP\n    From: source-address 10.1.1.0/24;\n    From: protocol tcp;\n    From: port 179;\n    Then: accept;\n20                          inet       DENY-TELNET\n    From: port 23;\n    Then: discard;\n99                          inet       DEFAULT-PERMIT\n    Then: accept;',
      position: { x: 88, y: 15 },
      icon: Shield,
      color: 'bg-red-500'
    }
  ];

  const selectedConceptData = networkingConcepts.find(concept => concept.id === selectedConcept);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Interactive Juniper JunOS Networking Tutorial
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Learn networking concepts through real-world analogies and authentic Juniper JunOS commands.
          Click on the components to see how enterprise network routers manage traffic.
        </p>
      </div>

      {/* Toggle View */}
      <div className="flex justify-center">
        <div className="bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setShowAnalogy(true)}
            className={`px-4 py-2 rounded-md transition-all ${
              showAnalogy 
                ? 'bg-blue-500 text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📮 Postal Analogy
          </button>
          <button
            onClick={() => setShowAnalogy(false)}
            className={`px-4 py-2 rounded-md transition-all ${
              !showAnalogy 
                ? 'bg-blue-500 text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🌐 Technical View
          </button>
        </div>
      </div>

      {/* Interactive Envelope Diagram */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          {showAnalogy ? '📮 Mail Delivery System' : '🌐 JunOS Network Architecture'}
        </h2>
        
        <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
          {/* Envelope Background */}
          <div className="absolute inset-4 bg-white rounded-lg shadow-inner border border-gray-200">
            {/* Envelope flap */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gray-100 rounded-b-lg border-l border-r border-b border-gray-200"></div>
            
            {/* Stamp area */}
            <div className="absolute top-4 right-4 w-16 h-12 bg-red-100 border-2 border-red-300 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-red-600">STAMP</span>
            </div>

            {/* Address lines */}
            <div className="absolute top-20 left-8 space-y-2">
              <div className="w-32 h-2 bg-gray-200 rounded"></div>
              <div className="w-40 h-2 bg-gray-200 rounded"></div>
              <div className="w-36 h-2 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Interactive Components */}
          {networkingConcepts.map((concept) => (
            <button
              key={concept.id}
              onClick={() => setSelectedConcept(concept.id)}
              className={`
                absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-lg transition-all duration-300 text-white
                ${selectedConcept === concept.id
                  ? `${concept.color} scale-110 shadow-lg ring-4 ring-white`
                  : `${concept.color} hover:scale-105 shadow-md opacity-90 hover:opacity-100`
                }
              `}
              style={{
                left: `${concept.position.x}%`,
                top: `${concept.position.y}%`,
              }}
            >
              <div className="flex flex-col items-center space-y-1">
                <concept.icon size={20} />
                <span className="text-xs font-medium text-center leading-tight">
                  {concept.title}
                </span>
              </div>
            </button>
          ))}

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-sm text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
            <Info size={14} />
            <span>Click on any component to see JunOS commands</span>
          </div>
        </div>
      </div>

      {/* Concept Details */}
      {selectedConceptData && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className={`${selectedConceptData.color} px-6 py-4`}>
            <div className="flex items-center space-x-3 text-white">
              <selectedConceptData.icon size={24} />
              <h3 className="text-xl font-semibold">
                {selectedConceptData.title}
              </h3>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {showAnalogy ? (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  📮 Postal Analogy
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {selectedConceptData.analogy}
                </p>
              </div>
            ) : (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  🌐 Technical Explanation
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {selectedConceptData.technical}
                </p>
              </div>
            )}
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                💻 Juniper JunOS Command
              </h4>
              <div className="bg-gray-900 rounded-lg p-4 shadow-inner">
                <div className="bg-gray-800 px-3 py-1 rounded-t flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-xs ml-2">Juniper MX480 Router Console</span>
                </div>
                <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                  {selectedConceptData.example}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Network Flow Diagram */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📊 How Data Travels Through a Network
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <h4 className="font-medium text-gray-900">Source Device</h4>
              <p className="text-sm text-gray-600">Your computer wants to send data to google.com</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <h4 className="font-medium text-gray-900">DNS Resolution</h4>
              <p className="text-sm text-gray-600">DNS server translates google.com to IP address 172.217.164.110</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <h4 className="font-medium text-gray-900">Local Network Check</h4>
              <p className="text-sm text-gray-600">Subnet mask determines if destination is local or remote</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
            <div>
              <h4 className="font-medium text-gray-900">Gateway Routing</h4>
              <p className="text-sm text-gray-600">Default gateway forwards packet to external network</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
            <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
            <div>
              <h4 className="font-medium text-gray-900">Firewall Security</h4>
              <p className="text-sm text-gray-600">Firewall checks if the traffic is allowed based on security rules</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      {!selectedConcept && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            🚀 Quick Reference
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Common IP Ranges</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><code className="bg-gray-200 px-1 rounded">192.168.x.x</code> - Home networks</li>
                <li><code className="bg-gray-200 px-1 rounded">10.x.x.x</code> - Large private networks</li>
                <li><code className="bg-gray-200 px-1 rounded">172.16-31.x.x</code> - Medium private networks</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Common Ports</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><code className="bg-gray-200 px-1 rounded">80</code> - HTTP (Web)</li>
                <li><code className="bg-gray-200 px-1 rounded">443</code> - HTTPS (Secure Web)</li>
                <li><code className="bg-gray-200 px-1 rounded">22</code> - SSH (Secure Shell)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkingTutorial;
