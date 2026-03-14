import { describe, expect, test } from 'vitest'
import { isEqualSet, isInputValid } from '../src/helper'

const inputSymbols = new Set(["0","1"]);

describe('isEqualSet', () => {
    test('When 2 empty sets are passed in then return true.', () => {
        const emptySet = new Set<string>();
        
        expect(isEqualSet(emptySet, emptySet)).toBeTruthy();
    })
    test('When 2 sets with the same values are passed in then return true.', () => {
        const set1 = new Set(["a", "b", "c"]);
        const set2 = new Set(["a", "b", "c"]);
        
        expect(isEqualSet(set1, set2)).toBeTruthy();
    })
    test('When 2 sets with different size are passed in then return false.', () => {
        const set1 = new Set(["a", "b", "c"]);
        const set2 = new Set(["a", "b"]);
        
        expect(isEqualSet(set1, set2)).toBeFalsy();
    })
    test('When 2 sets with different values are passed in then return false.', () => {
        const set1 = new Set(["a", "b", "c"]);
        const set2 = new Set(["1", "2", "3"]);
        
        expect(isEqualSet(set1, set2)).toBeFalsy();
    })
})

describe('isInputValid', () => {
    test('When input is part of the input symbols then return true.', () => {
        expect(isInputValid("1", inputSymbols)).toBeTruthy();
    })
    test('When input is not part of the input symbols then return false.', () => {
       expect(isInputValid("2", inputSymbols)).toBeFalsy();
    })
})