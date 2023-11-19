// Import Redux from CDN
import { createStore } from "redux";
import LinearRegression from "./linearRegression"; // Import your LinearRegression class
// Import the renderGraph function
import renderGraph from "./renderGraph";
// Define your Redux actions and reducer
const initialState = {
  data: [],
  results: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    // Define your action types and update logic here
    // For example, to update data or results
    default:
      return state;
  }
}

// Create a Redux store
const store = createStore(reducer);

// Initialize LinearRegression with Redux store
const linearRegression = new LinearRegression();

// Add an event listener to handle file input changes
document.getElementById("fileInput").addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    // Read the contents of the selected file
    const reader = new FileReader();
    reader.onload = function (e) {
      const csvData = e.target.result;
      document.getElementById("csvInput").value = csvData;
      linearRegression.setData(csvData); // Set data for LinearRegression when file is loaded
    };
    reader.readAsText(file);
  }
});

// Add an event listener for the "Load Sample Data" button
document.getElementById("loadSampleData").addEventListener("click", () => {
  // Load sample CSV data into the textarea for demo purposes
  const sampleData = `x,y
    1,2
    2,3
    3,4
    4,5
    5,6`;
  document.getElementById("csvInput").value = sampleData;

  // Set data for LinearRegression with sample data
  linearRegression.setData(sampleData);

  // You can optionally trigger the linear regression and graph rendering here.
});
// Add an event listener to the "Run Linear Regression" button
document.getElementById("runRegression").addEventListener("click", () => {
  const inputData = document.getElementById("csvInput").value;

  // Set data for LinearRegression
  linearRegression.setData(inputData);

  // Get the number of iterations from the input field
  const numIterations = parseInt(
    document.getElementById("iterations").value,
    10
  );

  // Set the number of iterations for LinearRegression
  linearRegression.nIterations = numIterations;

  // Initialize a reference to the <div> element to display iteration results
  const iterationResultsDiv = document.getElementById("iterationResult");
  iterationResultsDiv.innerHTML = ""; // Clear previous results

  // Call the fit method only once
  linearRegression.fit();

  // Get the loss history after all iterations
  const lossHistory = linearRegression.getLossHistory();

  // Render the graph with the loss history
  renderGraph(lossHistory);
});
