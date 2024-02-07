"use strict";

let globalArrayOfWords;

// Function to fetch data asynchronously
async function fetchData() {
  // Fetch data from CSV file
  const response = await fetch("../data/ddo_fullforms_2023-10-11.csv");
  const rawtext = await response.text();

  // Parse the raw text into an array of word objects
  globalArrayOfWords = rawtext.split("\n").map(line => {
    const parts = line.split("\t");
    return {
      variant: parts[0],
      headword: parts[1],
      homograph: parts[2],
      partofspeech: parts[3],
      id: parts[4]
    };
  });

  // Log the length of the array
  console.log("Array length:", globalArrayOfWords.length);
  
  // Perform binary search and log the result
  const resultIndex = binarySearchCompare("hestevogn", globalArrayOfWords, compare);
  if (resultIndex !== -1) {
    console.log("Found at index:", resultIndex);
  } else {
    console.log("Not found");
  }
}

// Call fetchData to initiate
fetchData();

// Comparison function for strings
function compare(str1, str2) {
  return str1.localeCompare(str2);
}

// Binary search function with comparison
function binarySearchCompare(value, values, compare) {
  let start = 0;
  let end = values.length - 1; // Ensure values is not undefined
  let iterations = 0; //Used for the count iterations for "max iterations needed"

  // Binary search algorithm
  while (start <= end) {
    iterations++; // Count iterations
    const mid = Math.floor((start + end) / 2);
    const comparisonResult = compare(values[mid].variant, value);
    
    // Check comparison result
    if (comparisonResult === 0) {
      return mid; // Found
    } else if (comparisonResult < 0) {
      start = mid + 1; // Update start index
    } else {
      end = mid - 1; // Update end index
    }
  }
  console.log("Max iterations needed:", iterations);
  return -1; // Not found
}
