function createTestArray(length) {
    return Array.from({ length }, (_, i) => `User ${i + 1}`);
}

function measurePerformance(fn, array) {
    const start = performance.now();
    fn(array);
    const end = performance.now();
    return end - start;
}

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
const sizes = [100, 1000, 10000, 100000, 1000000];
const results = {};

for (const size of sizes) {
    const names = createTestArray(size);
    
    results[size] = {
        approach1: measurePerformance(approach1, names),
        approach2: measurePerformance(approach2, names),
        approach3: measurePerformance(approach3, names)
    };
}

console.table(results);