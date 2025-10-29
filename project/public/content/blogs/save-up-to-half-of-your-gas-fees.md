# Solidity Gas Optimization: Stop Using uint256 for Everything

One of the first lessons I learned while studying for my blockchain architecture certification was about storage optimization. Coming from a systems programming background, I was fascinated to discover how Solidity's type choices dramatically affect gas costs.

In most Solidity codebases, you'll find developers defaulting to uint256 for every integer variable. Age? uint256. Counter? uint256. Boolean flags? uint256. This pattern wastes gas with every transaction.

Let me share what I've learned about why this happens and how to optimize it.

## Why Everyone Defaults to uint256

The habit of defaulting to uint256 comes from two places:

1. **Solidity 0.8.0+ overflow protection**: The compiler now handles overflow checks automatically for uint256, making it the "safe default"
2. **Arithmetic optimization**: The EVM is optimized for 256-bit operations and uses it exclusively

But here's what many developers miss: **these benefits only apply to arithmetic operations, NOT storage**.

When you're storing data in contract state, using uint256 for values that don't need 256 bits is like buying a semi-truck to commute to work. Sure, it works, but you're paying way more than necessary.

## Storage: Where the Real Costs Hide

Let's talk numbers. Storage operations are the most expensive operations in Solidity:

- **SSTORE** (store to storage): 20,000 gas for new values, 5,000 gas for updates
- **SLOAD** (load from storage): 2,100 gas (cold), 100 gas (warm)

Compare this to arithmetic:

- **ADD/SUB/MUL**: 3-5 gas
- **Memory operations**: 3 gas

The EVM stores data in 32-byte (256-bit) slots. This is where strategic type selection saves you money.

## The Power of Byte Packing

Here's the key insight: the EVM charges per storage slot, not per variable. If you can fit multiple variables into a single slot, you pay once instead of multiple times.

![Byte Packing Visualization](/media/Bytepacking_chart.png)
*Visual guide showing how different uint types pack into EVM storage slots*

### The Wasteful Way

```solidity
contract WastefulContract {
    uint256 public age;        // Slot 0: uses 256 bits for value 0-120
    uint256 public level;      // Slot 1: uses 256 bits for value 0-100
    uint256 public score;      // Slot 2: uses 256 bits for value 0-1000
    bool public isActive;      // Slot 3: uses 256 bits for true/false
}
```

**Storage cost**: 4 slots × 20,000 gas = 80,000 gas for initial storage. That's 3x more expensive than necessary.

### The Optimized Way

```solidity
contract OptimizedContract {
    uint8 public age;          // 8 bits  (0-255)
    uint8 public level;        // 8 bits  (0-255)
    uint16 public score;       // 16 bits (0-65535)
    bool public isActive;      // 8 bits  (true/false)
    // All packed into Slot 0: 8 + 8 + 16 + 8 = 40 bits < 256 bits
}
```

**Storage cost**: 1 slot × 20,000 gas = 20,000 gas

**Savings**: 60,000 gas (75% reduction)

At current gas prices (~30 gwei) and ETH at $2,500, that's $4.50 saved per deployment. For a protocol that creates thousands of user records? That's tens of thousands of dollars saved.

## Real-World Example: User Profile Contract

Let's build something realistic—a user profile system for a DeFi protocol.

### Before Optimization: The uint256 Disaster

```solidity
contract UserProfileWasteful {
    struct User {
        uint256 userId;           // Slot 0
        uint256 age;              // Slot 1
        uint256 accountLevel;     // Slot 2
        uint256 reputationScore;  // Slot 3
        uint256 joinTimestamp;    // Slot 4
        uint256 lastActive;       // Slot 5
        uint256 totalTransactions;// Slot 6
        uint256 flags;            // Slot 7 (using uint256 as bit flags!)
    }

    mapping(address => User) public users;

    function createUser(address _user) external {
        User storage user = users[_user];
        user.userId = nextUserId++;
        user.age = 25;
        user.accountLevel = 1;
        user.reputationScore = 100;
        user.joinTimestamp = block.timestamp;
        user.lastActive = block.timestamp;
        user.totalTransactions = 0;
        user.flags = 0;

        // Cost: 8 SSTORE operations = 160,000 gas
    }
}
```

### After Optimization: The Byte-Packed Beauty

```solidity
contract UserProfileOptimized {
    struct User {
        uint32 userId;            // 4 bytes  (0 to 4.2B users)
        uint8 age;                // 1 byte   (0-255)
        uint8 accountLevel;       // 1 byte   (0-255 levels)
        uint16 reputationScore;   // 2 bytes  (0-65535)
        uint32 joinTimestamp;     // 4 bytes  (timestamps until 2106)
        uint32 lastActive;        // 4 bytes
        uint24 totalTransactions; // 3 bytes  (0-16.7M transactions)
        uint8 flags;              // 1 byte   (8 boolean flags)
        // Total: 20 bytes = fits in 1 slot!
    }

    mapping(address => User) public users;

    function createUser(address _user) external {
        User storage user = users[_user];
        user.userId = uint32(nextUserId++);
        user.age = 25;
        user.accountLevel = 1;
        user.reputationScore = 100;
        user.joinTimestamp = uint32(block.timestamp);
        user.lastActive = uint32(block.timestamp);
        user.totalTransactions = 0;
        user.flags = 0;

        // Cost: 1 SSTORE operation = 20,000 gas
    }
}
```

**Savings**: 140,000 gas (87.5% reduction)

## The Byte Packing Rules

To maximize storage efficiency, follow these rules:

### Rule 1: Order Variables by Size

The compiler packs variables declared sequentially. Always order from largest to smallest or group by size:

```solidity

// BAD: Compiler can't pack these
struct BadPacking {
    uint8 a;      // Slot 0
    uint256 b;    // Slot 1 (can't pack with uint8)
    uint8 c;      // Slot 2 (new slot needed)
}

// GOOD: Compiler packs these efficiently
struct GoodPacking {
    uint256 b;    // Slot 0
    uint8 a;      // Slot 1 (start)
    uint8 c;      // Slot 1 (packed with 'a')
}
```

### Rule 2: Know Your Value Ranges

Choose the smallest type that can hold your maximum value:

```solidity

// Value Range Guide
uint8    // 0 to 255
uint16   // 0 to 65,535
uint24   // 0 to 16,777,215
uint32   // 0 to 4,294,967,295
uint64   // 0 to 18 quintillion
uint128  // 0 to 340 undecillion
uint256  // 0 to 115 quattuorvigintillion
```

### Rule 3: Pack Boolean Flags

Instead of multiple bool variables, use a single uint8 for up to 8 flags:

```solidity

// WASTEFUL: 8 storage slots
contract WastefulFlags {
    bool public isActive;
    bool public isVerified;
    bool public isPremium;
    bool public canTrade;
    bool public canVote;
    bool public isAdmin;
    bool public isBanned;
    bool public isLocked;
}

// OPTIMIZED: 1 storage slot
contract OptimizedFlags {
    uint8 private flags;

    uint8 constant IS_ACTIVE   = 1 << 0; // 0x01
    uint8 constant IS_VERIFIED = 1 << 1; // 0x02
    uint8 constant IS_PREMIUM  = 1 << 2; // 0x04
    uint8 constant CAN_TRADE   = 1 << 3; // 0x08
    uint8 constant CAN_VOTE    = 1 << 4; // 0x10
    uint8 constant IS_ADMIN    = 1 << 5; // 0x20
    uint8 constant IS_BANNED   = 1 << 6; // 0x40
    uint8 constant IS_LOCKED   = 1 << 7; // 0x80

    function isActive() public view returns (bool) {
        return flags & IS_ACTIVE != 0;
    }

    function setActive(bool _active) public {
        if (_active) {
            flags |= IS_ACTIVE;  // Set bit
        } else {
            flags &= ~IS_ACTIVE; // Clear bit
        }
    }
}
```

## When uint256 Makes Sense

Before you start converting everything to uint8, understand when uint256 is actually the right choice:

**Use uint256 for:**

**Token balances and amounts**

```solidity
uint256 public totalSupply; // Needs full range for tokens
```

**Hashes and cryptographic values**

```solidity
uint256 public merkleRoot; // Must be 256 bits
```

**Mathematical calculations**

```solidity
function calculateReward(uint256 principal, uint256 rate)
    public pure returns (uint256) {
    // Intermediate calculations need full precision
    return (principal * rate) / 10000;
}
```

**Values that might overflow smaller types**

```solidity
uint256 public cumulativeVolume; // Could exceed uint128 over time
```

**Use smaller types for:**

- Timestamps (use uint32 - valid until year 2106)
- Counters with known limits (user IDs, levels, etc.)
- Percentages and ratios (use uint16 for basis points)
- Array indices (if array size is bounded)
- Enums and flags (use smallest sufficient type)

## Advanced Technique: Hybrid Approach

For maximum optimization, combine packed storage with uint256 computation:

```solidity

contract HybridOptimization {
    struct CompactData {
        uint32 timestamp;
        uint16 value1;
        uint16 value2;
    } // Packed into 1 slot

    mapping(uint256 => CompactData) public data;

    function processData(uint256 id) external {
        CompactData storage compact = data[id];

        // Load packed values (1 SLOAD)
        uint256 t = compact.timestamp;
        uint256 v1 = compact.value1;
        uint256 v2 = compact.value2;

        // Compute with uint256 (optimized arithmetic)
        uint256 result = (v1 * v2 * 10000) / t;

        // Store result if needed
        // ...
    }
}
```

This approach gives you:

- Storage efficiency from byte packing
- Computation efficiency from uint256 arithmetic

## Common Pitfalls to Avoid

### Pitfall 1: Breaking Packing with Poor Ordering

```solidity
// BAD: uint256 breaks the packing chain
struct BrokenPacking {
    uint8 a;       // Slot 0
    uint256 big;   // Slot 1 (forces new slot)
    uint8 b;       // Slot 2 (can't pack with 'a')
    uint8 c;       // Slot 2 (packs with 'b')
}

// GOOD: Keep uint256 separate
struct FixedPacking {
    uint256 big;   // Slot 0
    uint8 a;       // Slot 1
    uint8 b;       // Slot 1
    uint8 c;       // Slot 1
}
```

### Pitfall 2: Forgetting About Mapping Keys

Mappings always use a full slot for the key, regardless of type:

```solidity

// These both cost the same for storage
mapping(uint8 => uint256) public map1;
mapping(uint256 => uint256) public map2;

// Save gas by packing the VALUE, not the key
mapping(uint256 => PackedStruct) public optimized;
```

### Pitfall 3: Premature Optimization in Arrays

Dynamic arrays can't be byte-packed (each element uses a full slot):

```solidity

// NO BENEFIT: Each uint8 still uses a full slot
uint8[] public numbers;

// BETTER: Use uint256 for array elements
uint256[] public numbers;

// BEST: Avoid dynamic arrays when possible
```

## Complete Real-World Example: Token Vesting Contract

Let's put it all together in a production-ready contract:

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract OptimizedVesting {
    struct VestingSchedule {
        uint128 totalAmount;      // 16 bytes: up to 340 undecillion tokens
        uint128 releasedAmount;   // 16 bytes: tracks released tokens
        // Slot 0: 32 bytes ✓

        uint32 startTime;         // 4 bytes: timestamp
        uint32 cliffDuration;     // 4 bytes: seconds
        uint32 duration;          // 4 bytes: total vesting period
        uint32 lastReleaseTime;   // 4 bytes: last claim timestamp
        uint16 releaseCount;      // 2 bytes: number of releases (up to 65k)
        uint8 vestingType;        // 1 byte: 0=linear, 1=cliff, etc.
        bool revocable;           // 1 byte: can be revoked?
        bool revoked;             // 1 byte: has been revoked?
        // Slot 1: 22 bytes ✓
    }

    mapping(address => VestingSchedule) public schedules;

    // Gas comparison:
    // Unoptimized struct: 10 slots × 20,000 gas = 200,000 gas
    // Optimized struct: 2 slots × 20,000 gas = 40,000 gas
    // Savings: 160,000 gas (80% reduction)

    function createVesting(
        address beneficiary,
        uint128 amount,
        uint32 cliffDuration,
        uint32 duration,
        bool revocable
    ) external {
        require(schedules[beneficiary].totalAmount == 0, "Already exists");

        schedules[beneficiary] = VestingSchedule({
            totalAmount: amount,
            releasedAmount: 0,
            startTime: uint32(block.timestamp),
            cliffDuration: cliffDuration,
            duration: duration,
            lastReleaseTime: uint32(block.timestamp),
            releaseCount: 0,
            vestingType: 0,
            revocable: revocable,
            revoked: false
        });

        // Only 2 SSTORE operations needed!
    }

    function calculateVested(address beneficiary)
        public view returns (uint256)
    {
        VestingSchedule storage schedule = schedules[beneficiary];

        if (schedule.revoked) return 0;

        // Load values into uint256 for arithmetic
        uint256 elapsed = block.timestamp - schedule.startTime;
        uint256 totalAmount = schedule.totalAmount;
        uint256 duration = schedule.duration;
        uint256 cliffDuration = schedule.cliffDuration;

        if (elapsed < cliffDuration) return 0;
        if (elapsed >= duration) return totalAmount;

        // Safe arithmetic with uint256
        return (totalAmount * elapsed) / duration;
    }

    function release() external {
        VestingSchedule storage schedule = schedules[msg.sender];

        uint256 vested = calculateVested(msg.sender);
        uint256 releasable = vested - schedule.releasedAmount;

        require(releasable > 0, "Nothing to release");

        schedule.releasedAmount = uint128(schedule.releasedAmount + releasable);
        schedule.lastReleaseTime = uint32(block.timestamp);
        schedule.releaseCount++;

        // Transfer tokens...
    }
}
```

## Gas Cost Comparison: The Numbers Don't Lie

Let's compare three implementations of the same functionality:

**Scenario: Creating 1000 user profiles**

| Implementation | Gas Per User | Total Gas | ETH Cost (@30 gwei, $2500/ETH) |
|----------------|--------------|-----------|----------------------------------|
| Naive uint256 | 160,000 | 160,000,000 | $12,000 |
| Partially optimized | 80,000 | 80,000,000 | $6,000 |
| Fully byte-packed | 40,000 | 40,000,000 | $3,000 |

Total savings: $9,000 for a medium-sized protocol

For large protocols handling millions of users, we're talking about hundreds of thousands of dollars in savings.

## Tools for Optimization

**1. Solidity Storage Layout Inspector**

```bash
# Install
npm install -g sol2uml

# Generate storage layout
sol2uml storage YourContract.sol
```

**2. Foundry Gas Snapshots**

```bash
# Compare gas costs
forge snapshot --diff
```

**3. Hardhat Gas Reporter**

```javascript
// hardhat.config.js
gasReporter: {
  enabled: true,
  currency: 'USD',
  coinmarketcap: process.env.CMC_API_KEY
}
```

## The Optimization Checklist

Before deploying any contract, run through this checklist:

**Storage Variables:**

- [ ] Are all uint256 variables actually needed?
- [ ] Can any values fit in uint128, uint64, uint32, uint16, or uint8?
- [ ] Are variables ordered to maximize packing?
- [ ] Can multiple bool variables be replaced with bit flags?
- [ ] Are timestamps using uint32 (valid until 2106)?

**Structs:**

- [ ] Are struct fields ordered largest to smallest?
- [ ] Do related small fields pack into single slots?
- [ ] Are all packed structs under 32 bytes per slot?

**Mappings:**

- [ ] Are mapping values packed structs?
- [ ] Is the key type appropriate (uint256 vs smaller types)?

**Arrays:**

- [ ] Are fixed-size arrays used instead of dynamic when possible?
- [ ] Are array elements the right size (or should they be structs)?
## Conclusion: Rethinking Type Choices

The habit of using uint256 everywhere is one of the most common inefficiencies in Solidity development. Through my studies and experimentation, I've learned that storage optimization can dramatically reduce gas costs for users.

**Key Takeaways:**

- **Storage is expensive** - 20,000 gas per new slot adds up fast
- **Byte packing works** - Fit multiple values in one 32-byte slot
- **Choose types strategically** - Match variable size to value range
- **Order matters** - Sequential small types pack together
- **uint256 for math, smaller types for storage** - Hybrid approach wins

This was one of the harder concepts for me to grasp when transitioning from traditional programming, where we generally don't worry about variable sizes (beyond int vs long). But in Solidity, these choices directly impact how much users pay.

The next time you type uint256, pause and ask: "Does this value really need 256 bits?" Your users' wallets will thank you.

**Helpful Resources:**
- [Solidity Storage Layout Documentation](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html)
- [EVM Storage Opcodes Reference](https://www.evm.codes/)
- [OpenZeppelin Gas Optimization Patterns](https://docs.openzeppelin.com/contracts/4.x/)

What gas optimization techniques have you discovered? I'm always learning new approaches and would love to hear what's worked for you.

---

**Tags:** Solidity, Gas Optimization, Smart Contracts, Ethereum, Best Practices