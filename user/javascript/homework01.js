// homework01.js
// Jeremy Campbell
// First homework in Web Dev II, practice using basic JavaScript

function repeat (word, numOfTimes) {
    let newWord = "";
    for (let i = 0; i < numOfTimes; i++) {
        newWord += word;
    }
    return newWord;
}

function runningSum(numbers) {
    let summedNums = [];
    if (Array.isArray(numbers)) {
        for (let i = 0; i < numbers.length; i++) {
            let sum = 0;
            for (let j = 0; j <= i; j++) {
                sum += numbers[j];
            }
            summedNums.push(sum);
        }
    }
    return summedNums;
}

function slice(container, subset) {
    let newContainer = {};
    if (typeof(container) == "object" && Array.isArray(subset)) {
        for (key in container) {
            if (subset.indexOf(key) != -1) {
                newContainer[key] = container[key];
            }
        }
    }
    return newContainer;
}

function makeAccumulator() {
    if (typeof(arguments[0]) == "number") {
        var num = arguments[0];
        return () => num++ 
    }
}