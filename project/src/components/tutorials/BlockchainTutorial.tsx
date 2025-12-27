import React, { useState } from 'react';
import { Code, Users, Coins, ArrowRightLeft, Zap, Info } from 'lucide-react';

interface UniswapComponent {
  id: string;
  title: string;
  description: string;
  code: string;
  position: { x: number; y: number };
  icon: React.ComponentType<any>;
}

const BlockchainTutorial: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const uniswapComponents: UniswapComponent[] = [
    {
      id: 'liquidity-pool',
      title: 'Liquidity Pool',
      description: 'The core of Uniswap - a smart contract that holds reserves of two tokens and enables trading between them using the constant product formula (x * y = k).',
      code: `contract LiquidityPool {
    uint256 public reserveA;
    uint256 public reserveB;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    
    function addLiquidity(uint256 amountA, uint256 amountB) 
        external returns (uint256 liquidity) {
        
        if (totalSupply == 0) {
            liquidity = sqrt(amountA * amountB);
        } else {
            liquidity = min(
                (amountA * totalSupply) / reserveA,
                (amountB * totalSupply) / reserveB
            );
        }
        
        balanceOf[msg.sender] += liquidity;
        totalSupply += liquidity;
        
        reserveA += amountA;
        reserveB += amountB;
        
        emit AddLiquidity(msg.sender, amountA, amountB, liquidity);
    }
}`,
      position: { x: 50, y: 30 },
      icon: Coins
    },
    {
      id: 'swap-mechanism',
      title: 'Swap Mechanism',
      description: 'The automated market maker that calculates token exchange rates based on the constant product formula, including slippage and fees.',
      code: `function swap(uint256 amountIn, bool tokenAForB) external {
    require(amountIn > 0, "Invalid amount");
    
    uint256 amountInWithFee = amountIn * 997; // 0.3% fee
    uint256 amountOut;
    
    if (tokenAForB) {
        amountOut = (amountInWithFee * reserveB) / 
                   (reserveA * 1000 + amountInWithFee);
        
        reserveA += amountIn;
        reserveB -= amountOut;
        
        tokenA.transferFrom(msg.sender, address(this), amountIn);
        tokenB.transfer(msg.sender, amountOut);
    } else {
        amountOut = (amountInWithFee * reserveA) / 
                   (reserveB * 1000 + amountInWithFee);
        
        reserveB += amountIn;
        reserveA -= amountOut;
        
        tokenB.transferFrom(msg.sender, address(this), amountIn);
        tokenA.transfer(msg.sender, amountOut);
    }
    
    emit Swap(msg.sender, amountIn, amountOut, tokenAForB);
}`,
      position: { x: 20, y: 60 },
      icon: ArrowRightLeft
    },
    {
      id: 'liquidity-providers',
      title: 'Liquidity Providers',
      description: 'Users who deposit tokens into the pool to earn fees. They receive LP tokens representing their share of the pool.',
      code: `contract LiquidityProvider {
    struct Position {
        uint256 liquidity;
        uint256 feeGrowthInside0LastX128;
        uint256 feeGrowthInside1LastX128;
        uint128 tokensOwed0;
        uint128 tokensOwed1;
    }
    
    mapping(address => Position) public positions;
    
    function mint(address recipient, uint256 amount0, uint256 amount1)
        external returns (uint256 liquidity) {
        
        liquidity = calculateLiquidity(amount0, amount1);
        
        positions[recipient].liquidity += liquidity;
        
        // Update fee tracking
        positions[recipient].feeGrowthInside0LastX128 = feeGrowthGlobal0X128;
        positions[recipient].feeGrowthInside1LastX128 = feeGrowthGlobal1X128;
        
        emit Mint(recipient, amount0, amount1, liquidity);
    }
    
    function collectFees(address recipient) 
        external returns (uint128 amount0, uint128 amount1) {
        
        Position storage position = positions[recipient];
        
        amount0 = position.tokensOwed0;
        amount1 = position.tokensOwed1;
        
        position.tokensOwed0 = 0;
        position.tokensOwed1 = 0;
        
        token0.transfer(recipient, amount0);
        token1.transfer(recipient, amount1);
    }
}`,
      position: { x: 80, y: 60 },
      icon: Users
    },
    {
      id: 'price-oracle',
      title: 'Price Oracle',
      description: 'Time-weighted average price (TWAP) oracle that provides reliable price data for other DeFi protocols.',
      code: `contract PriceOracle {
    struct Observation {
        uint32 blockTimestamp;
        int56 tickCumulative;
        uint160 secondsPerLiquidityCumulativeX128;
        bool initialized;
    }
    
    Observation[65536] public observations;
    uint16 public observationIndex;
    uint16 public observationCardinality;
    
    function observe(uint32[] calldata secondsAgos)
        external view returns (
            int56[] memory tickCumulatives,
            uint160[] memory secondsPerLiquidityCumulativeX128s
        ) {
        
        tickCumulatives = new int56[](secondsAgos.length);
        secondsPerLiquidityCumulativeX128s = new uint160[](secondsAgos.length);
        
        for (uint256 i = 0; i < secondsAgos.length; i++) {
            (tickCumulatives[i], secondsPerLiquidityCumulativeX128s[i]) = 
                observeSingle(secondsAgos[i]);
        }
    }
    
    function getTimeWeightedAveragePrice(uint32 period) 
        external view returns (int24 arithmeticMeanTick) {
        
        uint32[] memory secondsAgos = new uint32[](2);
        secondsAgos[0] = period;
        secondsAgos[1] = 0;
        
        (int56[] memory tickCumulatives,) = observe(secondsAgos);
        
        arithmeticMeanTick = int24(
            (tickCumulatives[1] - tickCumulatives[0]) / period
        );
    }
}`,
      position: { x: 50, y: 85 },
      icon: Zap
    }
  ];

  const selectedComponentData = uniswapComponents.find(comp => comp.id === selectedComponent);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
          Interactive Uniswap AMM Tutorial
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-colors duration-300">
          Explore how Uniswap's Automated Market Maker works by clicking on different components
          of the system to see the underlying smart contract code and explanations.
        </p>
      </div>

      {/* Interactive Diagram */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-300">
          Uniswap V3 Architecture
        </h2>
        
        <div className="relative h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-10 grid-rows-10 h-full">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>

          {/* Components */}
          {uniswapComponents.map((component) => (
            <button
              key={component.id}
              onClick={() => setSelectedComponent(component.id)}
              className={`
                absolute transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg transition-all duration-300
                ${selectedComponent === component.id
                  ? 'bg-blue-600 text-white scale-110 shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:scale-105 shadow-md'
                }
              `}
              style={{
                left: `${component.position.x}%`,
                top: `${component.position.y}%`,
              }}
            >
              <div className="flex flex-col items-center space-y-2">
                <component.icon size={24} />
                <span className="text-sm font-medium text-center leading-tight">
                  {component.title}
                </span>
              </div>
            </button>
          ))}

          {/* Connection lines */}
          <svg className="absolute inset-0 pointer-events-none">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                      refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
              </marker>
            </defs>
            
            {/* Pool to Swap */}
            <line x1="50%" y1="30%" x2="20%" y2="60%" 
                  stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
            
            {/* Pool to LP */}
            <line x1="50%" y1="30%" x2="80%" y2="60%" 
                  stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
            
            {/* Pool to Oracle */}
            <line x1="50%" y1="30%" x2="50%" y2="85%" 
                  stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
          </svg>
        </div>

        {/* Instructions */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
          <Info size={16} />
          <span>Click on any component above to explore its smart contract implementation</span>
        </div>
      </div>

      {/* Code Display */}
      {selectedComponentData && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-300">
          <div className="bg-gray-800 dark:bg-gray-900 px-6 py-4 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-white">
              {selectedComponentData.title}
            </h3>
            <p className="text-gray-300 mt-2">
              {selectedComponentData.description}
            </p>
          </div>
          
          <div className="bg-gray-900">
            <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-4">
                {selectedComponentData.id}.sol
              </span>
            </div>
            <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
              <code>{selectedComponentData.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Additional Info */}
      {!selectedComponent && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            🚀 How to Use This Tutorial
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Click on any component in the diagram above to see its smart contract code</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Read the detailed explanation of how each component works</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Understand the relationships between different parts of the AMM system</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlockchainTutorial;
