//***********************************************************************
//Beer style data section
//***********************************************************************
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

function tableFilter(inputIbu,inputSrm){
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
}

// // Select the submit button
// var submit = d3.select("#filter-btn");
//
// //Action on button click
// submit.on("click", function() {
//   //-------------------------------
//   //Get the data form the form
//   //-------------------------------
//   //[-] IBU
//   var inputElement = d3.select("#ibuFil");
//   var inputIbu = inputElement.property("value");
//   //[-] SRM
//   inputElement = d3.select("#srmFil");
//   var inputSrm = inputElement.property("value");
//   //-------------------------------
//   //tableFilter(inputIbu,inputSrm);
// });

//tableInit(tableData);
//***********************************************************************
//AI section
//***********************************************************************
//Variable used to store the machine learning model
var models = py_models;

//Variable used to select the user
var userSelected = "";
//Create the drop down menu
var select  = d3.select("#my_container").append("select").attr('class', 'custom-select').attr("onchange", "getData(this.value)");
for (var model_index in models) {
  if(userSelected === ""){
    userSelected = models[model_index].user;
  }
  select.append("option").attr("value",models[model_index].user).text(models[model_index].user);
}

//iterate the data to create the dorp down
function ai_model_ecuation(ibu,srm){
  //The AI function goes here
  //Filter by the user selected
  var filteredData = models.filter(model => (model.user === userSelected));
  var coefList = filteredData[0];
  var predicted_data = coefList.coef[0] + (coefList.coef[1] * ibu) + (coefList.coef[2] * srm);
  //Returning the value
  return predicted_data.toFixed(3);
}

var predict_output  = document.getElementById("prediction");
var ibu_slider = document.getElementById("myIBURange");
var ibu_output = document.getElementById("ibu");
var srm_slider = document.getElementById("mySRMRange");
var srm_output = document.getElementById("srm");


ibu_output.innerHTML = ibu_slider.value;
ibu_slider.oninput = function() {
  ibu_output.innerHTML = this.value;
  predict_output.innerHTML = ai_model_ecuation(this.value,srm_slider.value);
  tableFilter(this.value,srm_slider.value);
}


srm_output.innerHTML = srm_slider.value;
srm_slider.oninput = function() {
  srm_output.innerHTML = this.value;
  predict_output.innerHTML = ai_model_ecuation(ibu_slider.value,this.value);
  tableFilter(ibu_slider.value,this.value);
}
//The AI function goes here
predict_output.innerHTML = ai_model_ecuation(ibu_slider.value,srm_slider.value);
tableFilter(ibu_slider.value,srm_slider.value);

//Function used to update the data
function getData(user) {
  //Update the user
  userSelected=user;
  //Execute the AI model
  predict_output.innerHTML = ai_model_ecuation(ibu_slider.value,srm_slider.value);
  tableFilter(ibu_slider.value,srm_slider.value);
}

//Used for dropdoen menu to update the filter format
function getStyleData(dataset) {
  filter_format=dataset;
  tableFilter(ibu_slider.value,srm_slider.value);
}
