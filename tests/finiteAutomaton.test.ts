import { afterEach, beforeAll, describe, expect, test } from 'vitest'
import { FiniteAutomaton } from '../src/finiteAutomaton';

let fsm: FiniteAutomaton;

const states = new Set(["S0", "S1", "S2"]);
const inputSymbols = new Set(["0","1"]);
const initialState = "S0";
const acceptingStates = new Set(["S0", "S1", "S2"]);
const transitions = new Map([["S0", new Map([["0", "S0"], ["1", "S1"]])], ["S1", new Map([["0", "S2"], ["1", "S0"]])], ["S2", new Map([["0", "S1"], ["1", "S2"]])]]);

describe('FiniteAutomaton implementing mod three', () => {
    beforeAll(() => {
        fsm = new FiniteAutomaton(states, inputSymbols, initialState, acceptingStates, transitions);
    })
    afterEach(() => {
        // Reset the FSM to the initial state after each test to ensure tests are independent of each other
        fsm.reset();
    })
    test('When no input is given then return initialState.', () => {
        const result = fsm.run("");

        expect(result).toBe(initialState);
    })
    test('When input of 1 is given then return S1.', () => {
        const result = fsm.run("1");

        expect(result).toBe("S1");
    })
    test('When input of 110 is given then return S0.', () => {
        const result = fsm.run("110");

        expect(result).toBe("S0");
    })
    test('When input of 1110 is given then return S2.', () => {
        const result = fsm.run("1110");

        expect(result).toBe("S2");
    })
    test('When random input is given then return the correct result based on mod three operation.', () => {
        const decimalNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        const remainder = decimalNumber % 3;
        const binaryNumber = decimalNumber.toString(2);

        const result = fsm.run(binaryNumber);
        expect(result[1]).toBe(remainder.toString());
    })
    test('When the same input is given and reset is called then return same result.', () => {
        const firstRunResult = fsm.run("1");
        fsm.reset();
        const secondRunResult = fsm.run("1");

        expect(firstRunResult).toBe(secondRunResult);
    })      
    test('When run is called twice without a reset then return difference result.', () => {
        const firstRunResult = fsm.run("1");
        const secondRunResult = fsm.run("1");

        expect(firstRunResult).not.toBe(secondRunResult);
    })
    test('When invalid input is provided then throw.', () => {
        const input = "2";
        expect(() => fsm.run(input)).toThrow(`Input ${input} contains invalid symbols that are not part of input symbols`);
    })
})

describe('FiniteAutomaton edge case', () => {
    test('When final state is not an accepting state then throw error.', () => {
        fsm = new FiniteAutomaton(states, inputSymbols, initialState, new Set(["S2"]), transitions);
        expect(() => fsm.run("1")).toThrow("not an accepting/final state");
    })
});

describe('FiniteAutomaton validation', () => {
    test('When invalid initial state is set then throw error.', () => {
        expect(() => new FiniteAutomaton(states, inputSymbols, "invalidState", acceptingStates, transitions)).toThrow("Initial state is not part of states");
    })
    test('When accepting state is not a subset of states then throw error.', () => {
        const newAcceptingState = new Set([...acceptingStates, "s4"]);
        expect(() => new FiniteAutomaton(states, inputSymbols, initialState, newAcceptingState, transitions)).toThrow("Accepting/final states is not a subset of states");
    })
    test('When keys from transitions do no not match with the states then throw error.', () => {
        const newState = new Set([...states, "S4"]);
        expect(() => new FiniteAutomaton(newState, inputSymbols, initialState, acceptingStates, transitions)).toThrow("States are missing or transitions are missing");
    })
    test('When input symbols are missing from the transitions then throw error.', () => {
        const newInputSymbols = new Set([...inputSymbols, "2"]);
        expect(() => new FiniteAutomaton(states, newInputSymbols, initialState, acceptingStates, transitions)).toThrow("Input symbols are missing or transitions have extra symbols");
    })
    test('When there are invalid symbols in transitions then throw error.', () => {
        const newTransitions = new Map([["S0", new Map([["0", "S0"], ["1", "S1"]])], ["S1", new Map([["0", "S2"], ["1", "S0"]])], ["S2", new Map([["0", "S1"], ["#", "S2"]])]]);
        
        expect(() => new FiniteAutomaton(states, inputSymbols, initialState, acceptingStates, newTransitions)).toThrow("Input symbols are missing or transitions have extra symbols");
    })

    test('When there are invalid states in transitions then throw error.', () => {
        const newTransitions = new Map([["S0", new Map([["0", "S0"], ["1", "S1"]])], ["S1", new Map([["0", "S2"], ["1", "S0"]])], ["S2", new Map([["0", "S1"], ["1", "A4"]])]]);
        
        expect(() => new FiniteAutomaton(states, inputSymbols, initialState, acceptingStates, newTransitions)).toThrow("States in transitions have invalid states that are not part of states");
    })
    test('When multiple input parameter are incorrect then throw all related errors.', () => {
        const newInputSymbols = new Set([...inputSymbols, "2"]);
        expect(() => new FiniteAutomaton(states, newInputSymbols, "invalidState", acceptingStates, transitions)).toThrow("Initial state is not part of states, Input symbols are missing or transitions have extra symbols");
    })
})