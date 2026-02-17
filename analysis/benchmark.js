// REAL NUMERAL SYSTEM BENCHMARK ENGINE

// number of test iterations (higher = more accurate)
const ITERATIONS = 5000;


// ---------- NUMERAL SYSTEM CONVERTERS ----------

// Arabic (base 10)
function arabicToNumber(str) {
    return parseInt(str, 10);
}

// Babylonian (base 60 simulation)
function babylonianToNumber(str) {
    let digits = str.split(",");
    let total = 0;

    for (let i = 0; i < digits.length; i++) {
        total = total * 60 + parseInt(digits[i]);
    }
    return total;
}

// Roman numerals
function romanToNumber(str) {
    const map = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
    let total = 0;

    for (let i = 0; i < str.length; i++) {
        let curr = map[str[i]];
        let next = map[str[i+1]];
        total += next > curr ? -curr : curr;
    }
    return total;
}

// Binary
function binaryToNumber(str) {
    return parseInt(str, 2);
}



// ---------- OPERATIONS ----------
function runOperation(a, b, op) {
    switch(op) {
        case "add": return a + b;
        case "sub": return a - b;
        case "mul": return a * b;
        case "div": return a / b;
    }
}



// ---------- BENCHMARK CORE ----------
function benchmarkSystem(convertFunc, valueA, valueB, operator) {

    let start = performance.now();

    for (let i = 0; i < ITERATIONS; i++) {
        let a = convertFunc(valueA);
        let b = convertFunc(valueB);
        runOperation(a, b, operator);
    }

    let end = performance.now();
    return end - start;
}



// ---------- PUBLIC FUNCTION ----------
function runRealBenchmark(system1, system2, a, b, operator) {

    const systems = {
        arabic: arabicToNumber,
        babylonian: babylonianToNumber,
        roman: romanToNumber,
        binary: binaryToNumber
    };

    let time1 = benchmarkSystem(systems[system1], a, b, operator);
    let time2 = benchmarkSystem(systems[system2], a, b, operator);

    let faster = time1 < time2 ? system1 : system2;
    let diff = Math.abs(time1 - time2);
    let percent = (diff / Math.max(time1, time2)) * 100;

    return {
        time1: time1.toFixed(3),
        time2: time2.toFixed(3),
        faster: faster,
        percent: percent.toFixed(2)
    };
}
