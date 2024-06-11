// API call
const BELLIES_URL = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

var globalData = [];

// function getSubjectData(dataList, subjectID) {
//     let subjectData = dataList.filter(element => element["id"] == subjectID)[0];
//     // console.log(subjectData); 
//     return subjectData;
// }


function demoBox(subjectNo) {

    let metadata = globalData[0].metadata;
    let metadata1 = metadata.filter(element => element["id"] == subjectNo)[0];

    console.log(subjectNo);
    console.log("demoBox", metadata1);

}

function barChart(subjectNo) {

    let samples = globalData[0].samples;

    // filter data to only the chosen id
    let samples1 = samples.filter(element => element["id"] == subjectNo)[0];

    console.log(subjectNo);
    console.log("bar", samples1);

    // select just the first 10 items from the bacteria array. use slice
    let labels1 = samples1['otu_labels'].slice(0,10);
    let ids1 = samples1['otu_ids'].slice(0,10);
    let ids2 = ids1.map(x => "OTU " + x);

    console.log("update otu id", ids2);

    let sliceSample1 = samples1['sample_values'].slice(0,10);
    console.log('labels sliced',labels1);
    console.log('ids sliced', ids1);
    console.log('values sliced', sliceSample1);


    let barChart = [{
        x: sliceSample1,
        y: ids2,
        type: 'bar',
        orientation: "h"
      }];
    
    let layout = {
        title: "Top 10 OTUs",
        xaxis: {"title": "Number of Bacteria"},
        yaxis: {autorange: 'reversed'},
        height: 600,
        width: 800
    }
    

      Plotly.newPlot("bar", barChart, layout);
    

}

function bubblePlot(subjectNo) {

    let samples = globalData[0].samples;

    // filter data to only the chosen id
    let samples1 = samples.filter(element => element["id"] == subjectNo)[0];
  

    console.log(subjectNo);
    console.log("bubble", samples1);

    // use samples1 as the subject, then use . notation to call the specific dictionary keys
    var bubble = [{
        x: samples1.otu_ids,
        y: samples1.sample_values,
        mode: 'markers',
        marker: {
          size: samples1.sample_values,
          color: samples1.otu_ids,
          opacity: 0.75
        },
        text: samples1.otu_labels,
      }];

    let layout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: {'title': "OTU ID"},
        yaxis: {'title': "Number of Bacteria"},
        height: 600,
        width: 1200
        
    }

    Plotly.newPlot("bubble", bubble, layout)

}

function optionChanged(subjectNo) {
    console.log(subjectNo);
    // d3.json(BELLIES_URL).then(function(allData) {
    //     let subjectMetaData = getSubjectData(allData['metadata'], subjectID);
    //     let subjectSamples = getSubjectData(allData['samples'], subjectID);
    demoBox(subjectNo);
    bubblePlot(subjectNo);
    barChart(subjectNo);
    //})
    


}

// subjMeta['otu_labels'].slice(0, 10).reverse()\
// subjMeta['otu_ids'].slice(0, 10).reverse().map(id => `OTU ${id}`);







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


}

// this will execute the init function and read the data. .then() will console log the data
d3.json(BELLIES_URL).then(data => init(data));