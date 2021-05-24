//BinarySearch
export const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;
    let mid;

    if (target === '') {
        return -1;
    }

    while (left <= right) {
        mid = Math.round((right - left) / 2) + left;

        if (+target === arr[mid]) {
            return mid;
        } else if (+target < arr[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}

export const drawTableBinarySearch = (indexSearch, ratingArr, sortArr) => {
    if (indexSearch === -1) {
        return sortArr;
    }

    let outputArray = [indexSearch];
    let i = indexSearch;

    while (ratingArr.length > i + 1 && ratingArr[i] === ratingArr[i + 1]) {
        outputArray.push(i + 1);
        i++;
    }

    i = indexSearch;
    while (i - 1 >= 0 && ratingArr[i] === ratingArr[i - 1]) {
        outputArray.push(i - 1);
        i--;
    }

    return outputArray.map((elem, indexSearch) => {
        return sortArr[outputArray[indexSearch]];
    })
}