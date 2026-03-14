import { IFiniteAutomaton } from "./finiteAutomaton.interface";
import { isEqualSet, isInputValid } from "./helper";

export class FiniteAutomaton implements IFiniteAutomaton {
    private currentState:string;
    constructor(
        private readonly states: Set<string>,
        private readonly inputSymbols: Set<string>,
        private readonly initialState:string,
        private readonly acceptingStates: Set<string>,
        private readonly transitions:Map<string, Map<string,string>>
    ){
        this.validate();
        this.currentState = this.initialState;
    }

    /**
     * Validate the configuration based on the definition of FSM
     */
    private validate(): void{
        const errors:Set<string> = new Set();

        if(!this.states.has(this.initialState)){
            errors.add("Initial state is not part of states");
        }

        if(!this.acceptingStates.isSubsetOf(this.states)){
            errors.add("Accepting/final states is not a subset of states")
        };

        const transitionsKeys = new Set(this.transitions.keys());
        if(!isEqualSet(transitionsKeys, this.states)){
            errors.add("States are missing or transitions are missing")
        }

        for (const [, transition] of this.transitions.entries()){
            if(!isEqualSet(new Set(transition.keys()), this.inputSymbols)){
                errors.add("Input symbols are missing or transitions have extra symbols");
            }

            if(!new Set(transition.values()).isSubsetOf(this.states)){
                errors.add("States in transitions have invalid states that are not part of states");
            }
        }

        if(errors.size > 0){
            throw new Error([...errors].join(", "));
        }
    }

    run(input: string): string{
        if(!isInputValid(input, this.inputSymbols)){
            throw new Error(`Input ${input} contains invalid symbols that are not part of input symbols`);
        }
        
        for(const char of input){
            const nextState = this.transitions.get(this.currentState)?.get(char);
            if(!nextState){
                throw new Error(`Unable to move from ${this.currentState} with input of ${char} to next state`);
            }
            this.currentState = nextState;
        }

        if(!this.acceptingStates.has(this.currentState)){
            throw new Error(`The current state ${this.currentState} after processing the input is not an accepting/final state`);
        }
        
        return this.currentState;
    }

    reset():void{
        this.currentState = this.initialState;
    }
}

