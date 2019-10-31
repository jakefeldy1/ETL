
// var progressLogEl = document.querySelector('#update .progress-log');
// var scanCount = document.querySelector(".scan-count");
//
//
// var seekInput = document.querySelector('.seek');
//
// var update = anime({
//   targets: '#seekAnim .el',
//   translateX: 0,
//   delay: 1000,
//   autoplay: false,
//   update: function(anim) {
//     scanCount.innerHTML = Math.round(anim.progress);
//   }
// });
//
// seekInput.oninput = function() {
//   update.seek(update.duration * (seekInput.value / 100));
// };

//Variable used to store the machine learning model
var models = [{"r": 0.8441135259024353, "user": "redwolf1", "coef": [2.2020461836031426, 0.03345741387605851, 0.00038054028508703597], "rid": "0_1_2"}, {"r": 0.8359101106493992, "user": "kurtissellen", "coef": [5.4578594754318335, -0.010154604351043796, -0.04599450924644289], "rid": "0_1_2"}, {"r": 0.7839515422307916, "user": "hopking311", "coef": [3.4840969841447578, 0.0044645373800589905, 0.02329236661934253], "rid": "0_1_2"}, {"r": 0.7764280242129648, "user": "xerenthar", "coef": [3.1013355368599247, 0.005915792721514921, 0.03890477404762095], "rid": "0_1_2"}, {"r": 0.7733890204788136, "user": "seabass87", "coef": [4.047660490113778, -0.016298388926290937, 0.02808417282184432], "rid": "0_1_2"}, {"r": 0.7588691572550589, "user": "LaneMeyer", "coef": [4.669804824365754, -0.03209070195398232, 0.02457348973687774], "rid": "0_1_2"}, {"r": 0.7400869550836124, "user": "jclzony", "coef": [2.184414617215456, 0.02057336341504415, 0.08775321981500583], "rid": "0_1_2"}, {"r": 0.7221037844820459, "user": "arkurzynski", "coef": [3.252939012318055, 0.013693855128635631, 0.012659582869087749], "rid": "0_1_2"}, {"r": 0.7211616460849497, "user": "ComputerBeer", "coef": [6.099740516638293, -0.038628954525383494, 0.023990568818154978], "rid": "0_1_2"}, {"r": 0.717160479922051, "user": "hoeferweisen", "coef": [3.430567422859147, 0.02242277085278245, 0.009969857635555513], "rid": "0_1_2"}, {"r": 0.7145277764436857, "user": "j37geogaddi", "coef": [6.054069066321313, -0.014967654244520165, -0.08872598703041568], "rid": "0_1_2"}, {"r": 0.7006783725906714, "user": "kylesobrien", "coef": [5.525661533250453, -0.029808321051916303, -0.016365750744511416], "rid": "0_1_2"}, {"r": 0.6877957536142697, "user": "BeachRez", "coef": [4.2892477773605036, 0.004796214617476861, -0.03703112658476393], "rid": "0_1_2"}, {"r": 0.6865089496325832, "user": "ranger7", "coef": [4.441571179306845, -0.04285388942833797, 0.030983325383781894], "rid": "0_1_2"}, {"r": 0.6839382103595636, "user": "case4816", "coef": [3.2360435385917823, 0.010872797438074427, 0.0241227552527292], "rid": "0_1_2"}, {"r": 0.6803918204073703, "user": "acer95", "coef": [2.7798919909004773, 0.028482699684628854, -0.008816770484548894], "rid": "0_1_2"}, {"r": 0.6681775913446586, "user": "RHCP313", "coef": [2.798430350190774, 0.012118739922989827, 0.02898534475526999], "rid": "0_1_2"}, {"r": 0.6618483629540799, "user": "dblinkhorn", "coef": [4.87161974681284, -0.011954731126371977, -0.022898015929281354], "rid": "0_1_2"}, {"r": 0.64113839496118, "user": "elephantrider", "coef": [2.6366677171901416, 0.022015071238842915, 0.023963632682127665], "rid": "0_1_2"}, {"r": 0.6376619006458605, "user": "rosmhuire", "coef": [5.34422578268745, -0.013753304300048702, -0.06906787769871155], "rid": "0_1_2"}];

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
console.log("---------------");
console.log(userSelected);
console.log("---------------");


//iterate the data to create the dorp down
function ai_model_ecuation(ibu,srm){
  //The AI function goes here
  //Filter by the user selected
  var filteredData = models.filter(model => (model.user === userSelected));
  var coefList = filteredData[0];
  var predicted_data = coefList.coef[0] + (coefList.coef[1] * ibu) + (coefList.coef[2] * srm);
  //Returning the value
  return predicted_data;
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
}


srm_output.innerHTML = srm_slider.value;
srm_slider.oninput = function() {
  srm_output.innerHTML = this.value;
  predict_output.innerHTML = ai_model_ecuation(ibu_slider.value,this.value);
}
//The AI function goes here
predict_output.innerHTML = ai_model_ecuation(ibu_slider.value,srm_slider.value);


//Function used to update the data
function getData(user) {
  //Update the user
  userSelected=user;
  //Execute the AI model
  predict_output.innerHTML = ai_model_ecuation(ibu_slider.value,srm_slider.value);
}
