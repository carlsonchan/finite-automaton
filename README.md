# Introduction
The code in this folder provides a generic approach to define Finite State Automata. It allows you to define state, input symbols, accepting state and transitions to determine final state. To see definition of the module go to `finiteAutomaton.interface.ts`.

# Pre-requisite
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
- [Node LTS](https://nodejs.org/en/download/archive/v22.22.1)
  
# Example usage
You can also see the FiniteAutomaton being used in `modThree.ts`.
```ts
const states = new Set(["S0", "S1", "S2"]);
const inputSymbols = new Set(["0","1"]);
const initialState = "S0";
const acceptingStates = new Set(["S0", "S1", "S2"]);
const transitions = new Map([["S0", new Map([["0", "S0"], ["1", "S1"]])], ["S1", new Map([["0", "S2"], ["1", "S0"]])], ["S2", new Map([["0", "S1"], ["1", "S2"]])]]);

const modThree = new FiniteAutomaton(states, inputSymbols, initialState, acceptingStates, transitions)

console.log(modThree.run("110"));
```

# Running Locally
1. Open folder in vscode 
2. Run `yarn` to install packages
3. Run `yarn run modThree` to see modThree function in action

# Running tests
Run all tests using `yarn test`

# Running linter
Run `yarn lint`

# Potential improvements
- Add test cases using different input beyond mod three procedure
- Understand what the typical use case is to expose more functionality to the users