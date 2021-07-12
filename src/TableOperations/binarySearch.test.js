import {binarySearch} from "./binarySearch";

describe('BinarySearch function:', () => {

    test('when there are 5 elements in the array should return value is 0', () => {
        const arr = [1, 2, 3, 4, 5];
        const target = 1;
        expect(binarySearch(arr, target)).toEqual(0);
    });

    test('when there is 1 element in the array should return value is 0', () => {
        const arr = [1];
        const target = 1;
        expect(binarySearch(arr, target)).toEqual(0);
    });

    test('when there is no element found in the array should return value is -1', () => {
        const arr = [1, 2, 3, 4, 5];
        const target = 55;
        expect(binarySearch(arr, target)).toEqual(-1);
    });

    test('when the array is empty should return value is -1', () => {
        const arr = [];
        const target = 1;
        expect(binarySearch(arr, target)).toEqual(-1);
    });
})



