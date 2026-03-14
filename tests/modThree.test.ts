import { describe, expect, test } from 'vitest'
import { modThree } from '../src/modThree';

describe('modThree', () => {
    test('when 1101 (13) is divided by three then return 1', () => {
        expect(modThree("1101")).toBe(1);
    })
    test('when 1110 (14) is divided by three then return 2', () => {
        expect(modThree("1101")).toBe(1);
    })
    test('when 1111 (15) is divided by three then return 0', () => {
        expect(modThree("1101")).toBe(1);
    })
    test('when no input is provided then return 0', () => {
        expect(modThree("1101")).toBe(1);
    })
    test('when running with a random input then return the correct result based on using built in modulo division', () => {
        const decimalNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        const remainder = decimalNumber % 3;
        const binaryNumber = decimalNumber.toString(2);

        expect(modThree(binaryNumber)).toBe(remainder);
    })
    test('when invalid input is used then throw error', () => {
        const input = "234";
        expect(() => modThree(input)).toThrow(`Input ${input} contains invalid symbols that are not part of input symbols`);
    })
})