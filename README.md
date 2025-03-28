 # Object Processing Performance Testing

This project demonstrates and compares different approaches for converting an array of strings into an object, measuring their performance across various array sizes.

## Overview

The code compares three different approaches for creating an object from an array of strings:

1. Using `reduce` with direct object property assignment
2. Using `reduce` with spread operator
3. Using `Object.fromEntries` with `map`

## Approaches

### Approach 1
```javascript
names.reduce((acc, name) => {
    acc[name] = name;
    return acc;
}, {});
```
This approach uses direct object property assignment within a reduce function.

### Approach 2
```javascript
names.reduce((acc, name) => {
    return {...acc, [name]: name};
}, {});
```
This approach uses the spread operator to create a new object on each iteration.

### Approach 3
```javascript
Object.fromEntries(names.map(name => [name, name]));
```
This approach uses `Object.fromEntries` combined with `map` to create key-value pairs.

## Usage

1. Make sure you have Node.js installed on your system
2. Clone this repository
3. Run the code using:
   ```bash
   node index.js
   ```

## Performance Testing

The code tests each approach with different array sizes:
- 100 elements
- 1,000 elements
- 10,000 elements
- 100,000 elements
- 1,000,000 elements

The results are displayed in a table format showing the execution time in milliseconds for each approach and array size.

## Expected Results

The performance results will vary based on your system, but generally:
- Approach 1 (direct assignment) tends to be the most performant for larger arrays
- Approach 2 (spread operator) may be slower due to creating new objects on each iteration
- Approach 3 (Object.fromEntries) offers a clean syntax but may have varying performance characteristics

## License

MIT