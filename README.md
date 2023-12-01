# Installation and Launching the App

- run ```npm install``` to install all necessary packages for the project.
- run ```npm start``` to launch the application at http://localhost:3000.

The Spreadsheet Application should now be open. 

# User Guide

- to enter a number just click an empty cell, enter your number and press enter. 
- to enter strings you must surround them with "". example: "hello".
- the header buttons add/remove column/row can be pressed to adjust the size of the spreadsheet. 
- the 'Download CSV' downloads a CSV version of your spreadsheet labelled as output.csv. 
- right-clicking on any cell opens the context menu with the ability to clear row/column, sort row/column in ascending/descending order. 
    - note: the cell that is right-clicked on is the reference cell for those functions. 

# Formula Entry

- to sum a range of numerical cells, click an empty cell and enter sum(a1..a4) which returns the sum from cell A1 to cell A4. (note: no quotes)
- to average a range of numerical cells, click an empty cell and enter avg(a1..a4) which returns the average of the values from cell A1 to cell A4. 

# In-Cell Calculation

- within a cell you can add, subtract, multiply, and divide numbers. for example entering 12/4 in a cell and clicking enter will produce 3 in the entered cell. 
- you can also concatenate strings within cells, for example entering "a" + "b" (note: quotes only surround strings) will produce "ab" in the entered cell. 

