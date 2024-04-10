// API call
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Add a promise pending for data, use D3
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it. This logs the entire data object 
d3.json(url).then(function(data) {
    console.log(data);
});

// Extract the required fields from the sample object
const samples = data.samples_values;

// // Check if the samples array is not empty
// if (samples.length > 0) {
//     // Get the first sample for demonstration purposes
//     const sample = samples[0];
//     const sampleValues = sample.sample_values;
//     const otuIds = sample.otu_ids;
//     const otuLabels = sample.otu_labels;

//     console.log("Sample Values: ", sampleValues);
//     console.log("OTU IDs: ", otuIds);
//     console.log("OTU Labels: ", otuLabels);

//     // Create combinedData array by mapping the values
//     const combinedData = sampleValues.map((value, index) => ({
//         sample_value: value,
//         otu_id: otuIds[index],
//         otu_label: otuLabels[index]
//     }));

//     console.log("Combined Data: ", combinedData);
//     // Proceed with using combinedData
// } else {
//     console.log('Samples array is empty.');
// }
 //------------------------------------------------------------

// Get the JSON data by using .then() to extract the required data fields (sample values, otuIds, otuLabels)
d3.json(url).then(function(data) {
    // Getting the required fields. Use const to make sure these variables cannot be changed later.
    const sampleValues = data.sample_values;
    const otuIds = data.otu_ids;
    const otuLabels = data.otu_labels;

    console.log("Sample Values: ", sampleValues);
    console.log("OTU IDs: ", otuIds);
    console.log("OTU Labels: ", otuLabels);

    // Test variables
    if (sampleValues && otuIds && otuLabels) {
        const combinedData = sampleValues.map((value, index) => ({
            sample_value: value,
            otu_id: otuIds[index],
            otu_label: otuLabels[index]
        }));
        // Proceed with using combinedData
    } else {
        console.log('One of the arrays is undefined or empty.');
    }

    // Create an array of objects for sampleValues, otuIds, and otuLabels to make sorting easier. Make the array a const and use .map() and => to push the function.
    // .map() xforms data into an array; value is an agrument used to rep the current element being processed; index is the index of the current element
    // being processed; [index] allows the elements from the otu cols to be processed from the same row as sample_value. This ties together by putting each corresponding 
    // sample value, otu_id, and otu_label in the same row.
    const combinedData = sampleValues.map((value, index) => ({
        sample_value: value,
        otu_id: otuIds[index],
        otu_label: otuLabels[index]
    }));

    // Sort data in descending order based on sample_values. Use .sort() and => to push the function. Make it a const.
    const sortedData = combinedData.sort((a,b) => b.sample_value - a.sample_value);

    // Slice the sorted data so it only shows the top 10 OTUs. Make it a const and use .slice(0,10) (this tells it to pull rows 0 -9 per zero-indexing,
    // i.e. include index zero and go up to index 10 but exclude index 10).
    const top10OTUs = sortedData.slice(0,10);

    // Log the top 10 OTUs in the console
    console.log("Top 10 OTUs: ", top10OTUs);
});