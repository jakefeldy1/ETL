
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

function ai_model_ecuation(ibu,srm){
  //The AI function goes here
  sunBurstData = ibu * srm;
  //Returning the value
  return sunBurstData;
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
