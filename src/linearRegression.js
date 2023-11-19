class LinearRegression {
  constructor(learningRate = 0.01, nIterations = 20, testSize = 0.2) {
    this.learningRate = learningRate;
    this.nIterations = nIterations;
    this.weights = null;
    this.bias = null;
    this.lossHistory = [];
    this.weightsHistory = [];
    this.X = null;
    this.y = null;
    this.testSize = testSize;
    this.currentIteration = 0; // Initialize current iteration
  }

  setData(csvData) {
    const lines = csvData.trim().split("\n");

    // Check if the first row contains labels and remove it if necessary
    let data = [...lines];
    const firstRow = data[0].split(",");
    if (!isNaN(parseFloat(firstRow[0]))) {
      // The first row does not contain labels, so keep it
    } else {
      // The first row contains labels, so remove it
      data = data.slice(1);
    }

    const parsedData = data.map((line) =>
      line.split(",").map((value) => parseFloat(value))
    );

    // Assuming the target variable (y) is in the last column
    const nFeatures = parsedData[0].length - 1;
    const X = parsedData.map((row) => row.slice(0, nFeatures));
    const y = parsedData.map((row) => row[nFeatures]);

    this.X = X;
    this.y = y;
  }

  splitData(X, y) {
    const nSamples = X.length;
    const nTrain = Math.floor(nSamples * (1 - this.testSize));
    const trainX = X.slice(0, nTrain);
    const testX = X.slice(nTrain);
    const trainY = y.slice(0, nTrain);
    const testY = y.slice(nTrain);

    return [trainX, testX, trainY, testY];
  }

  fit() {
    if (!this.X || !this.y) {
      throw new Error(
        "Data has not been set. Please use setData to set the data."
      );
    }

    const [trainX, testX, trainY, testY] = this.splitData(this.X, this.y);

    const nSamples = trainX.length;
    const nFeatures = trainX[0].length;
    this.weights = new Array(nFeatures).fill(0);
    this.bias = 0;

    for (let iteration = 0; iteration < this.nIterations; iteration++) {
      let model = 0;
      const dw = new Array(nFeatures).fill(0);
      let db = 0;

      for (let i = 0; i < nSamples; i++) {
        model +=
          trainX[i].reduce((acc, xi, j) => acc + xi * this.weights[j], 0) +
          this.bias;
        for (let j = 0; j < nFeatures; j++) {
          dw[j] += trainX[i][j] * (model - trainY[i]);
        }
        db += model - trainY[i];
      }

      model /= nSamples;
      db /= nSamples;
      this.lossHistory.push(this.meanSquaredError(trainY, model));
      this.weightsHistory.push([...this.weights]);

      // Update the iteration result element text
      const iterationResultElement = document.getElementById("iterationResult");

      const iterationResultElementP = document.createElement("p");

      // Append the iteration result to the <div>
      iterationResultElementP.textContent = `Iteration ${
        iteration + 1
      } - Loss: ${this.lossHistory[iteration]}`;

      iterationResultElement.appendChild(iterationResultElementP);

      for (let j = 0; j < nFeatures; j++) {
        this.weights[j] -= (this.learningRate * dw[j]) / nSamples;
      }
      this.bias -= this.learningRate * db;
    }
  }

  predict(X) {
    return X.map(
      (sample) =>
        sample.reduce((acc, xi, j) => acc + xi * this.weights[j], 0) + this.bias
    );
  }

  meanSquaredError(yTrue, yPredicted) {
    console.log(
      (1 / (2 * yTrue.length)) *
        yTrue.reduce(
          (acc, yTrueVal, i) => acc + Math.pow(yTrueVal - yPredicted, 2),
          0
        )
    );
    return (
      (1 / (2 * yTrue.length)) *
      yTrue.reduce(
        (acc, yTrueVal, i) => acc + Math.pow(yTrueVal - yPredicted, 2),
        0
      )
    );
  }

  getLossHistory() {
    return this.lossHistory;
  }

  getWeightsHistory() {
    return this.weightsHistory;
  }
  getCurrentIteration() {
    return this.currentIteration;
  }
}
export default LinearRegression;
