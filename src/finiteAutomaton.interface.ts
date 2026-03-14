export interface IFiniteAutomaton {
    /**
     * Processes a string of input symbols and return the final state. If the input contains invalid symbols that are not part of input symbols, then an error will be thrown. If the final state after processing the input is not an accepting/final state, then an error will be thrown.
     * @param input String of symbols to be processed
     * @returns Final state after processing the input
     */
    run(input: string): string;

    /**
     * Reset the FSM to the initial state
     */
    reset(): void;
}