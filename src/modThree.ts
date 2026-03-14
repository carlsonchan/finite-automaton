import { FiniteAutomaton } from "./finiteAutomaton";

/**
 * This function will take the input as a binary string and return the remainder 
 * @param input binary string input to be processed. The binary string should contain only 0s and 1s. Any other character will throw an error.
 * @returns the remainder. The return value will be a number between 0 and 2 inclusive.
 */
export function modThree(input: string): number{
    const states = new Set(["S0", "S1", "S2"]);
    const inputSymbols = new Set(["0","1"]);
    const initialState = "S0";
    const acceptingStates = new Set(["S0", "S1", "S2"]);
    const transitionStates = new Map([["S0", new Map([["0", "S0"], ["1", "S1"]])], ["S1", new Map([["0", "S2"], ["1", "S0"]])], ["S2", new Map([["0", "S1"], ["1", "S2"]])]]);
    const stateToRemainder: Record<string, number> = {
        "S0": 0,
        "S1": 1,
        "S2": 2
    };

    const modThree = new FiniteAutomaton(states, inputSymbols, initialState, acceptingStates, transitionStates)
    const result = modThree.run(input);

    return stateToRemainder[result];
}

const inputs = ["1101", "1110", "1111"];
inputs.forEach(input => {
    console.log(`modThree("${input}") => ${modThree(input)}`);
})

