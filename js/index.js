

var synth = window.speechSynthesis;

var inputForm = document.querySelector("form");
var inputTxt = document.querySelector(".txt");
var voiceSelect = document.querySelector("select");

var pitch = document.querySelector("#pitch");
var pitchValue = document.querySelector(".pitch-value");
var rate = document.querySelector("#rate");
var rateValue = document.querySelector(".rate-value");
var btn = document.getElementById("btn")
var voices = [];

function populateVoiceList() {
  voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += "-- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }

  if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
  }


}
populateVoiceList();
console.log(voiceSelect);


btn.addEventListener("click", function(e){
    e.preventDefault();

    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

    for (let i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            utterThis.voice = voices[i]
        }
        
    }

    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);


});
rate.addEventListener("change", function(e){
    e.preventDefault();

    rateValue.innerHTML = rate.value;
});
pitch.addEventListener("change", function(e){
    e.preventDefault();

    pitchValue.innerHTML = pitch.value;
})

