import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, BookOpen } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: string;
  timestamp: string;
}

const LinuxTutorial: React.FC = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandOutput[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandDatabase: Record<string, string> = {
    'ls': `total 24
drwxr-xr-x  5 tim tim 4096 Jan 15 10:30 Documents
drwxr-xr-x  3 tim tim 4096 Jan 15 09:15 Downloads
drwxr-xr-x  2 tim tim 4096 Jan 14 16:45 Pictures
-rw-r--r--  1 tim tim 1024 Jan 15 11:20 README.md
-rwxr-xr-x  1 tim tim 2048 Jan 15 10:00 script.sh`,
    
    'ls -la': `total 32
drwxr-xr-x  6 tim tim 4096 Jan 15 10:30 .
drwxr-xr-x  3 root root 4096 Jan 10 08:00 ..
-rw-r--r--  1 tim tim  220 Jan 10 08:00 .bash_logout
-rw-r--r--  1 tim tim 3771 Jan 10 08:00 .bashrc
drwxr-xr-x  5 tim tim 4096 Jan 15 10:30 Documents
drwxr-xr-x  3 tim tim 4096 Jan 15 09:15 Downloads
drwxr-xr-x  2 tim tim 4096 Jan 14 16:45 Pictures
-rw-r--r--  1 tim tim 1024 Jan 15 11:20 README.md
-rwxr-xr-x  1 tim tim 2048 Jan 15 10:00 script.sh`,

    'pwd': '/home/tim',
    
    'whoami': 'tim',
    
    'date': 'Mon Jan 15 11:25:30 UTC 2024',
    
    'ps aux': `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1  19312  1584 ?        Ss   08:00   0:01 /sbin/init
root         2  0.0  0.0      0     0 ?        S    08:00   0:00 [kthreadd]
tim       1234  0.1  0.5  12345  5678 pts/0    Ss   10:30   0:02 -bash
tim       5678  0.0  0.3   8765  3456 pts/0    R+   11:25   0:00 ps aux`,

    'df -h': `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        20G  8.5G   11G  45% /
/dev/sda2       100G   45G   50G  48% /home
tmpfs           2.0G     0  2.0G   0% /dev/shm
/dev/sdb1       500G  250G  225G  53% /data`,

    'free -h': `              total        used        free      shared  buff/cache   available
Mem:           8.0G        2.1G        3.2G        256M        2.7G        5.4G
Swap:          2.0G          0B        2.0G`,

    'top': `top - 11:25:30 up 3:25,  1 user,  load average: 0.15, 0.10, 0.05
Tasks: 125 total,   1 running, 124 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.5 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   8192.0 total,   3276.8 free,   2150.4 used,   2764.8 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   5529.6 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 1234 tim       20   0   12345   5678   4321 S   1.3   0.1   0:02.45 bash
 5678 root      20   0   98765  12345   8765 S   0.7   0.2   0:01.23 systemd`,

    'uname -a': 'Linux ubuntu-server 5.15.0-56-generic #62-Ubuntu SMP Tue Nov 22 19:54:14 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux',

    'cat /etc/os-release': `NAME="Ubuntu"
VERSION="22.04.1 LTS (Jammy Jellyfish)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 22.04.1 LTS"
VERSION_ID="22.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"`,

    'netstat -tulpn': `Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1234/sshd
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN      5678/mysqld
tcp6       0      0 :::80                   :::*                    LISTEN      9012/nginx
tcp6       0      0 :::443                  :::*                    LISTEN      9012/nginx`,

    'systemctl status nginx': `● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2024-01-15 08:00:15 UTC; 3h 25min ago
     Docs: man:nginx(8)
  Process: 9012 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
  Process: 9013 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
 Main PID: 9014 (nginx)
    Tasks: 5 (limit: 9392)
   Memory: 12.3M
   CGroup: /system.slice/nginx.service
           ├─9014 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─9015 nginx: worker process`,

    'help': `Available commands:
• ls, ls -la          - List directory contents
• pwd                 - Print working directory
• whoami              - Display current username
• date                - Show current date and time
• ps aux              - Show running processes
• df -h               - Display disk usage
• free -h             - Show memory usage
• top                 - Display running processes (real-time)
• uname -a            - System information
• cat /etc/os-release - OS version information
• netstat -tulpn      - Network connections
• systemctl status nginx - Service status
• clear               - Clear terminal
• help                - Show this help message

Try typing any of these commands!`,

    'clear': 'CLEAR_TERMINAL'
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const timestamp = new Date().toLocaleTimeString();

    if (trimmedCmd === 'clear') {
      setCommandHistory([]);
      return;
    }

    let output = commandDatabase[trimmedCmd] || `bash: ${cmd}: command not found`;
    
    const newEntry: CommandOutput = {
      command: cmd,
      output,
      timestamp
    };

    setCommandHistory(prev => [...prev, newEntry]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim()) {
      executeCommand(currentCommand);
      setCurrentCommand('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commands = commandHistory.map(h => h.command);
      if (commands.length > 0 && historyIndex < commands.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commands[commands.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const commands = commandHistory.map(h => h.command);
        setCurrentCommand(commands[commands.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const clearTerminal = () => {
    setCommandHistory([]);
    setCurrentCommand('');
  };

  const runExample = (command: string) => {
    setCurrentCommand(command);
    executeCommand(command);
    setCurrentCommand('');
  };

  const exampleCommands = [
    { cmd: 'ls -la', desc: 'List all files with details' },
    { cmd: 'ps aux', desc: 'Show running processes' },
    { cmd: 'df -h', desc: 'Check disk usage' },
    { cmd: 'systemctl status nginx', desc: 'Check service status' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Interactive Linux Terminal
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Practice Linux commands in this simulated terminal environment. 
          Type commands and see realistic output just like on a real Linux system.
        </p>
      </div>

      {/* Quick Commands */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="mr-2" size={20} />
          Quick Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exampleCommands.map((example, index) => (
            <button
              key={index}
              onClick={() => runExample(example.cmd)}
              className="flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors text-left"
            >
              <div>
                <code className="text-sm font-mono text-blue-600">{example.cmd}</code>
                <p className="text-xs text-gray-600 mt-1">{example.desc}</p>
              </div>
              <Play size={16} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Terminal */}
      <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm ml-4 flex items-center">
              <Terminal size={16} className="mr-2" />
              tim@ubuntu-server:~
            </span>
          </div>
          <button
            onClick={clearTerminal}
            className="text-gray-400 hover:text-white transition-colors"
            title="Clear terminal"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="p-4 h-96 overflow-y-auto font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Welcome Message */}
          {commandHistory.length === 0 && (
            <div className="text-green-400 mb-4">
              <p>Welcome to the Interactive Linux Terminal!</p>
              <p className="text-gray-400">Type 'help' to see available commands.</p>
              <p className="text-gray-400">Use ↑/↓ arrow keys to navigate command history.</p>
            </div>
          )}

          {/* Command History */}
          {commandHistory.map((entry, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center text-green-400">
                <span className="text-blue-400">tim@ubuntu-server</span>
                <span className="text-white">:</span>
                <span className="text-purple-400">~</span>
                <span className="text-white">$ </span>
                <span className="text-white">{entry.command}</span>
              </div>
              <pre className="text-gray-300 whitespace-pre-wrap mt-1 ml-4">
                {entry.output}
              </pre>
            </div>
          ))}

          {/* Current Input */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-blue-400">tim@ubuntu-server</span>
            <span className="text-white">:</span>
            <span className="text-purple-400">~</span>
            <span className="text-white">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none ml-1"
              placeholder="Type a command..."
              autoComplete="off"
            />
          </form>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          💡 Terminal Tips
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start space-x-2">
            <span className="text-green-600 font-bold">•</span>
            <span>Use the <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">↑</kbd> and <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">↓</kbd> arrow keys to navigate through command history</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 font-bold">•</span>
            <span>Type <code className="bg-gray-200 px-1 rounded">help</code> to see all available commands</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 font-bold">•</span>
            <span>Try the quick example buttons above to see common Linux commands in action</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 font-bold">•</span>
            <span>Use <code className="bg-gray-200 px-1 rounded">clear</code> to clear the terminal screen</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LinuxTutorial;
