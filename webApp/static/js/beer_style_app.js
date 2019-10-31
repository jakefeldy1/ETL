var tableData = data;
var filter_format = "gteq";

/*
Function used to update the table
*/
function tableInit(my_data) {
    // Find the table
    // Use D3 to select the table
    var table = d3.select("#beer-table");
    //Remove the las tbody to avoid unwanted data
    var my_tbody = table.select('tbody');
    my_tbody.remove();
    //Create e new tbody entity to append the data
    var tbody = table.append("tbody");
    // Build the table
    my_data.forEach((style) => {
        var row = tbody.append("tr");
        //Name
        var sname = row.append("td");
        sname.text(style.name);
        //ibu_min
        var sibu_min = row.append("td");
        sibu_min.text(style.ibu_Min);
        //srm_min
        var ssrm_min = row.append("td");
        ssrm_min.text(style.srm_Min);
        //abv_min
        var sabv_min = row.append("td");
        sabv_min.text(style.abv_Min);
        //og_min
        var sog_min = row.append("td");
        sog_min.text(style.og_Min);
        //fg_Min
        var sfg_min = row.append("td");
        sfg_min.text(style.fg_Min);
    });
}


//Used for dropdoen menu to update the filter format
function getStyleData(dataset) {
  filter_format=dataset;
}

/*
Function used to calculate and condition for filter
if the input is not define the condition will be ignored
returning true for further logical condition
*/
function gteCond(input, data){
  return parseFloat(data) >= parseFloat(input);
}

/*
Function used to calculate or condition for filter
if the input is not define the condition will be ignored
returning true for further logical condition
*/
function lteCond(input, data){
  return parseFloat(data) <= parseFloat(input);
}

// Select the submit button
var submit = d3.select("#filter-btn");

//Action on button click
submit.on("click", function() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  //-------------------------------
  //Get the data form the form
  //-------------------------------
  //[-] IBU
  var inputElement = d3.select("#ibuFil");
  var inputIbu = inputElement.property("value");
  //[-] SRM
  inputElement = d3.select("#srmFil");
  var inputSrm = inputElement.property("value");
  //-------------------------------
  //Check the filter format
  if(filter_format === "gteq"){
    //Filter anding the conditions
    var filteredData = tableData.filter(sighting => {
      var ibuFlag = gteCond(inputIbu, sighting.ibu_Min);
      var srmFlag = gteCond(inputSrm, sighting.srm_Min);
      return ibuFlag && srmFlag;
    });
  } else {
    var filteredData = tableData.filter(sighting => {
      var ibuFlag = lteCond(inputIbu, sighting.ibu_Min);
      var srmFlag = lteCond(inputSrm, sighting.srm_Min);
      return ibuFlag && srmFlag;
    });
  }
  tableInit(filteredData);
});

tableInit(tableData);
