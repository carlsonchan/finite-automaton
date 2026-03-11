import { IFiniteAutomaton } from "./finiteAutomaton.interface";
import { isEqualSet } from "./helper";

export class FiniteAutomaton implements IFiniteAutomaton {
    private currentState:string;
    constructor(
        private readonly states: Set<string>,
        private readonly inputSymbols: Set<string>,
        private readonly initialState:string,
        private readonly acceptingStates: Set<string>,
        private readonly transitionState:Map<string, Map<string,string>>
    ){
        this.validate();
        this.currentState = this.initialState;
    }

    /**
     * Validate the configuration based on the definition of FSM
     */
    private validate(): void{
        const errors:string[] = [];

        if(!this.states.has(this.initialState)){
            errors.push("Initial state is not part of states");
        }

        if(!this.acceptingStates.isSubsetOf(this.states)){
            errors.push("Accepting/final states is not a subset of states")
        };

        const transitionStateKeys = new Set(this.transitionState.keys());
        if(!isEqualSet(transitionStateKeys, this.states)){
            errors.push("States are missing or transition states are missing")
        }

        const allSymbols: string[] = [];
        for (const [, transition] of this.transitionState.entries()){
            allSymbols.push(...transition.keys());
        }

        if(!isEqualSet(new Set(allSymbols), this.inputSymbols)){
            errors.push("Input symbols are missing or transition states have extra symbols");
        }

        if(errors.length > 0){
            throw new Error(errors.join(", "));
        }
    }

    run(input: string): string{
        for(const char of input){
            const nextState = this.transitionState.get(this.currentState)?.get(char);
            if(!nextState){
                throw new Error(`Unable to move from ${this.currentState} with input of ${char} to next state`);
            }
            this.currentState = nextState;
        }
        return this.currentState;
    }

    reset():void{
        this.currentState = this.initialState;
    }
}

