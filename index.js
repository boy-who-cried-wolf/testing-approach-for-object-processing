function createTestArray(length) {
    return Array.from({ length }, (_, i) => `User ${i + 1}`);
}

function measurePerformance(fn, array) {
    const start = performance.now();
    const result = fn(array);
    const end = performance.now();
    return {
        time: end - start,
        result: result // Just in case we want to verify the output
    };
}

const MAX_TIME_MS = 120000; // 2 minutes

// Test functions
const approach1 = (names) => names.reduce((acc, name) => {
    acc[name] = name;
    return acc;
}, {});

const approach2 = (names) => names.reduce((acc, name) => {
    return {...acc, [name]: name};
}, {});

const approach3 = (names) => Object.fromEntries(names.map(name => [name, name]));

// Test with different array sizes
const sizes = [100, 1000, 10000, 100000, 1000000, 10000000];
const results = {};

for (const size of sizes) {
    const names = createTestArray(size);
    results[size] = {};
    
    // Approach 1
    try {
        const perf1 = measurePerformance(approach1, names);
        results[size].approach1 = perf1.time > MAX_TIME_MS ? "Skipped (would exceed 2min)" : perf1.time;
    } catch (e) {
        results[size].approach1 = "Error: " + e.message;
    }
    
    // Approach 2
    try {
        // Skip approach 2 for large arrays as we know it will be too slow
        if (size >= 100000) {
            results[size].approach2 = "Skipped (known to be too slow)";
        } else {
            const perf2 = measurePerformance(approach2, names);
            results[size].approach2 = perf2.time > MAX_TIME_MS ? "Skipped (would exceed 2min)" : perf2.time;
        }
    } catch (e) {
        results[size].approach2 = "Error: " + e.message;
    }
    
    // Approach 3
    try {
        const perf3 = measurePerformance(approach3, names);
        results[size].approach3 = perf3.time > MAX_TIME_MS ? "Skipped (would exceed 2min)" : perf3.time;
    } catch (e) {
        results[size].approach3 = "Error: " + e.message;
    }
    
    // Early exit if all approaches are skipped for this size
    if (
        (results[size].approach1 === "Skipped (would exceed 2min)" || results[size].approach1 === "Skipped (known to be too slow)") &&
        (results[size].approach2 === "Skipped (would exceed 2min)" || results[size].approach2 === "Skipped (known to be too slow)") &&
        (results[size].approach3 === "Skipped (would exceed 2min)" || results[size].approach3 === "Skipped (known to be too slow)")
    ) {
        console.log(`All approaches skipped for size ${size}, stopping tests`);
        break;
    }
    console.table(results);
}

console.table(results);