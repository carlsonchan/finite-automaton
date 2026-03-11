export interface IFiniteAutomaton {
    /**
     * Process a string of input symbol and return the final state
     * @param input symbol
     * @returns final state after processing the input
     */
    run(input: string): string;

    /**
     * Reset the FSM to the initial state
     */
    reset(): void;
}