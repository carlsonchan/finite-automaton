export function isEqualSet(a: Set<string>, b: Set<string>): boolean{
    return a.size === b.size && a.size === a.union(b).size;
}
