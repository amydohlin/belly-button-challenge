# belly-button-challenge
# Module 14 - Interactive Visualizations

## Overview
The goal of this challenge was to build an interactive dashboard to visualize data about the microbes found in the human navel. This challenge requires the use of the D3 library to read in JSON data, create a bar chart with a drop-down menu, a bubble chart with various marker colors and sizes, implement the ability to update the plots when new data is selected, create a dashboard, and deploy the finished dashboard to a free static page hosting service (in this case: GitHub Pages).

Interactive Page: https://amydohlin.github.io/belly-button-challenge/

Data Source (can also be found in the 'data' folder withing the repository): https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json

--------
## Summary
* D3 is a Java Script library that allows a programmer to read in data from a JSON source and put it into various visualizations.
* Within the Java Script file "app.js", various functions are defined to populate the demographics box, create a bar chart of the top 10 bacteria found in the subject's belly button, create a bubble chart that displays a visual of bacteria quantities, choose a subject from a dropdown menu, and an init function to execute all aforementioned functions.
* Commands used within functions:
  * `.filter()`: sifts through data to extract certain elements;
  * `=>`: define a function;
  * `.slice()`: only read a certain amount of data;
* Console.log() commands are used throughout to help examine the code and data within the webpage.
* Finally, a d3.json().then() command with execute the init function to display data on the interactive webpage.

-------
## Sources
* Xpert Learning Assistant
* Module 14 Activities
* https://www.tutorialsteacher.com/d3js/data-binding-in-d3js
* https://plotly.com/javascript/bar-charts/
* https://plotly.com/javascript/bubble-charts/
* Huge thank you to tutor Reza Abasaltian who spent a total of 3 hours helping me through this assignment
