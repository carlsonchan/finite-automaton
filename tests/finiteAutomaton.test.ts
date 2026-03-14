import { afterEach, beforeAll, describe, expect, test } from 'vitest'
import { FiniteAutomaton } from '../src/finiteAutomaton';

let fsm: FiniteAutomaton;

const states = new Set(["S0", "S1", "S2"]);
const inputSymbols = new Set(["0","1"]);
const initialState = "S0";
const acceptingStates = new Set(["S0", "S1", "S2"]);
const transitionStates = new Map([["S0", new Map([["0", "S0"], ["1", "S1"]])], ["S1", new Map([["0", "S2"], ["1", "S0"]])], ["S2", new Map([["0", "S1"], ["1", "S2"]])]]);

describe('FiniteAutomaton implementing mod three', () => {
    beforeAll(() => {
        fsm = new FiniteAutomaton(states, inputSymbols, initialState, acceptingStates, transitionStates);
    })
    afterEach(() => {
        // Reset the FSM to the initial state after each test to ensure tests are independent of each other
        fsm.reset();
    })
    test('when running with the input of 1 then return S1', () => {
        const result = fsm.run("1");

        expect(result).toBe("S1");
    })
    test('when running with the input of 110 then return S0', () => {
        const result = fsm.run("110");

        expect(result).toBe("S0");
    })
    test('when running with the input of 1010 then return S1', () => {
        const result = fsm.run("1010");

        expect(result).toBe("S1");
    })
    test('when running with a random input then return the correct result based on mod three', () => {
        const decimalNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        const remainder = decimalNumber % 3;
        const binaryNumber = decimalNumber.toString(2);

        const result = fsm.run(binaryNumber);
        expect(result[1]).toBe(remainder.toString());
    })
    test('when running with the same input and a reset then return same result', () => {
        const firstRunResult = fsm.run("1");
        fsm.reset();
        const secondRunResult = fsm.run("1");

        expect(firstRunResult).toBe(secondRunResult);
    })      
    test('when running with the same input without a reset then expect different result', () => {
        const firstRunResult = fsm.run("1");
        const secondRunResult = fsm.run("1");

        expect(firstRunResult).not.toBe(secondRunResult);
    })
    test('when invalid input is provided then throw', () => {
        const input = "2";
        expect(() => fsm.run(input)).toThrow(`Input ${input} contains invalid symbols that are not part of input symbols`);
    })
})

describe('FiniteAutomaton validation', () => {
    test('when invalid initial state is set then throw error', () => {
        expect(() => new FiniteAutomaton(states, inputSymbols, "invalidState", acceptingStates, transitionStates)).toThrow("Initial state is not part of states");
    })
    test('when accepting state is not a subset of states then throw error', () => {
        const newAcceptingState = new Set([...acceptingStates, "s4"]);
        expect(() => new FiniteAutomaton(states, inputSymbols, initialState, newAcceptingState, transitionStates)).toThrow("Accepting/final states is not a subset of states");
    })
    test('when keys from transition state do no not match with the states then throw error', () => {
        const newState = new Set([...states, "S4"]);
        expect(() => new FiniteAutomaton(newState, inputSymbols, initialState, acceptingStates, transitionStates)).toThrow("States are missing or transition states are missing");
    })
    test('when input symbols are missing from the transition state then throw error', () => {
        const newInputSymbols = new Set([...inputSymbols, "2"]);
        expect(() => new FiniteAutomaton(states, newInputSymbols, initialState, acceptingStates, transitionStates)).toThrow("Input symbols are missing or transition states have extra symbols");
    })
    test('when multiple input parameter are incorrect then throw all related errors', () => {
        const newInputSymbols = new Set([...inputSymbols, "2"]);
        expect(() => new FiniteAutomaton(states, newInputSymbols, "invalidState", acceptingStates, transitionStates)).toThrow("Initial state is not part of states, Input symbols are missing or transition states have extra symbols");
    })
})