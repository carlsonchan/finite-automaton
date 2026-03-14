export function isEqualSet(a: Set<string>, b: Set<string>): boolean{
    return a.size === b.size && a.size === a.union(b).size;
}

export function isInputValid(input: string, inputSymbols: Set<string>): boolean{
    for(const char of input){
        if(!inputSymbols.has(char)){
            return false;
        }
    }
    return true;
}