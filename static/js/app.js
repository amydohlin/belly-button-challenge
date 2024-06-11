// API call, read in the json samples
const BELLIES_URL = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

var globalData = [];

// Create the function to populate the demo box
function demoBox(subjectNo) {

    // define variables to store the data per a specific subject number
    let metadata = globalData[0].metadata;
    let metadata1 = metadata.filter(element => element["id"] == subjectNo);

    console.log(subjectNo);
    console.log("demoBox", metadata1);

    // use D3 to call into the html file and direct it to the ID where the demo box is stored
    d3.select("#sample-metadata") // call the html ID
        .selectAll("div") // select all the divs within the ID
        .data(metadata1) // grab the selected subject's metadata
        .enter()
        .append("div") // add the data to the div
        .classed("card-demo", true) 
        .style("font-weight", function (d) { return "bold"}) // add a little formatting (from tutor session)
        .html(function (d) { // create an anonymous function to feed in the values from the relevant JSON dictionary
            return `<h6>ID: ${d.id}</h6>
                    <h6>Ethnicity: ${d.ethnicity}</h6>
                    <h6>Gender: ${d.gender}</h6>
                    <h6>Age: ${d.age}</h6>
                    <h6>Location: ${d.location}</h6>
                    <h6>Belly Button Type: ${d.bbtype}</h6>
                    <h6>Wash Frequency: ${d.wfreq}</h6>
                    `         
        });

}

// Create the function to populate the bar chart
function barChart(subjectNo) {

    let samples = globalData[0].samples;

    // filter data to only the chosen id
    let samples1 = samples.filter(element => element["id"] == subjectNo)[0];

    console.log(subjectNo);
    console.log("bar", samples1);

    // select just the first 10 items from the bacteria array using slice
    let labels1 = samples1['otu_labels'].slice(0,10);
    let ids1 = samples1['otu_ids'].slice(0,10);
    let sliceSample1 = samples1['sample_values'].slice(0,10);
    
    // create the label for the bacteria id as "OTU + [id number]"
    let ids2 = ids1.map(x => "OTU " + x);

    console.log("update otu id", ids2);  
    console.log('labels sliced',labels1);
    console.log('ids sliced', ids1);
    console.log('values sliced', sliceSample1);

    // define the chart type and input data
    let barChart = [{
        x: sliceSample1,
        y: ids2,
        type: 'bar',
        orientation: "h"
      }];
    
    // define the chart layout
    let layout = {
        title: "Top 10 OTUs",
        xaxis: {"title": "Number of Bacteria"},
        yaxis: {autorange: 'reversed'},
        height: 600,
        width: 800
    }
    
      Plotly.newPlot("bar", barChart, layout);

}

// Create the function to populate the bubble chart
function bubblePlot(subjectNo) {

    let samples = globalData[0].samples;

    // filter data to only the chosen id
    let samples1 = samples.filter(element => element["id"] == subjectNo)[0];
  
    console.log(subjectNo);
    console.log("bubble", samples1);

    // use samples1 as the subject, then use dot notation to call the specific dictionary keys
    var bubble = [{
        x: samples1.otu_ids,
        y: samples1.sample_values,
        mode: 'markers',
        marker: {
          size: samples1.sample_values,
          color: samples1.otu_ids,
          opacity: 0.60
        },
        text: samples1.otu_labels,
      }];

    // define the chart layout
    let layout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: {'title': "OTU ID"},
        yaxis: {'title': "Number of Bacteria"},
        height: 600,
        width: 1200
        
    }

    Plotly.newPlot("bubble", bubble, layout)

}

// Create the function to populate the dropdown menu and select subjects
function optionChanged(subjectNo) {
    console.log(subjectNo);
   
    // remove the data from the previous subject so the data from the next subject can populate the demo box and charts
    d3.select(".card-demo").remove();

    demoBox(subjectNo);
    bubblePlot(subjectNo);
    barChart(subjectNo);
    //})
    
}

// Create the init function to execute all the above functions
function init(data){

    console.log("init function")
    console.log(data);

    globalData.push(data);

    let names = data.names;

    d3.select("select")
        .selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .text(function (d) { return d; })
        .attr("value", function (d) { return d; });

    demoBox("940");
    bubblePlot("940");
    barChart("940");


}

// this will execute the init function and read the data. .then() will console log the data
d3.json(BELLIES_URL).then(data => init(data));