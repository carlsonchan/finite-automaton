import { describe, expect, test } from 'vitest'
import { isEqualSet } from '../src/helper'

describe('isEqualSet', () => {
    test('when 2 empty set are passed in then return true', () => {
        const emptySet = new Set<string>();
        
        expect(isEqualSet(emptySet, emptySet)).toBeTruthy();
    })
    test('when 2 set with the same values are passed in then return true', () => {
        const set1 = new Set(["a", "b", "c"]);
        const set2 = new Set(["a", "b", "c"]);
        
        expect(isEqualSet(set1, set2)).toBeTruthy();
    })
    test('when 2 set with different size are passed in then return false', () => {
        const set1 = new Set(["a", "b", "c"]);
        const set2 = new Set(["a", "b"]);
        
        expect(isEqualSet(set1, set2)).toBeFalsy();
    })
    test('when 2 set with the different values are passed in then return false', () => {
        const set1 = new Set(["a", "b", "c"]);
        const set2 = new Set(["1", "2", "3"]);
        
        expect(isEqualSet(set1, set2)).toBeFalsy();
    })
})