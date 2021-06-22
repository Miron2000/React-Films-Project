import {binarySearch, drawTableBinarySearch} from "./binarySearch";
import {Films} from "../store/reducers/reducers";
import data from "../data";
import {useSelector} from "react-redux";
import {render, screen} from "@testing-library/react";
import App from "../App";
import sortTable from "./sortTable";

describe('BinarySearch function:', () => {
    test('should return value, not an undefinded', () => {
        expect(binarySearch(data)).not.toBeUndefined();
    });
    test('should return define value', () => {
        expect(binarySearch(data)).toBeDefined();
    });

    test('when there are 5 elements in the array should return value is 0', () => {
        const arr = [1, 2, 3, 4, 5];
        const target = 1;
        //массив не должен содеражть null и пустую строку
        expect(binarySearch(arr)).not.toContain(null);
        expect(binarySearch(arr)).not.toContain('');
        expect(binarySearch(arr, target)).toEqual(0);
    });

    test('when there is 1 element in the array should return value is 0', () => {
        const arr = [1];
        const target = 1;
        expect(binarySearch(arr)).not.toContain(null);
        expect(binarySearch(arr)).not.toContain('');
        expect(binarySearch(arr, target)).toEqual(0);
    });

    test('when there is no element found in the array should return value is -1', () => {
        const arr = [1, 2, 3, 4, 5];
        const target = 55;
        expect(binarySearch(arr)).not.toContain(null);
        expect(binarySearch(arr)).not.toContain('');
        expect(binarySearch(arr, target)).toEqual(-1);
    });

    test('when the array is empty should return value is -1', () => {
        const arr = [];
        const target = 1;
        expect(binarySearch(arr)).not.toContain(null);
        expect(binarySearch(arr)).not.toContain('');
        expect(binarySearch(arr, target)).toEqual(-1);
    });
})



