"use strict";
// tudus laden
var tudus = JSON.parse(localStorage.getItem("tu-dus")) || [];

// maximale Anzahl Tudus
var maxTudus = 10;

// elemente zwischenspeichern
var tuduslisteEl = document.getElementById("tu-du-liste");
var tuduEl = document.getElementById("tu-du-template");
var neuTuduTextEl = document.getElementById("neu-tu-du-text");
var neuTuduFormEl = document.getElementById("tu-du-neu-form");
var btnNichtsErledigtEl = document.getElementById("btn-nichtsErledigt");
var btnAllesErledigtEl = document.getElementById("btn-allesErledigt");
var btnAlleLoeschenEl = document.getElementById("btn-alleLoeschen");


function tudusSpeichern() {
  localStorage.setItem("tu-dus", JSON.stringify(tudus));
}

function tuduSubmit(event) {
  event.preventDefault();
  if (tudus.length >= maxTudus) {
    alert ("Sie haben bereits " + tudus.length + " Dinge zu erledigen!");
    return false;
  }

  if (neuTuduTextEl.value !== "") {
    var neuTudu = {erledigt: false, bezeichnung: neuTuduTextEl.value};
    tudus.push(neuTudu);
    tudusSpeichern();
    tuduRendern(neuTudu);
    neuTuduTextEl.value = "";
    neuTuduTextEl.focus();
  }
}

function tuduLoeschen(index) {
  tudus.splice(index, 1);
  tuduslisteEl.children[index].remove();
  tudusSpeichern();
}

function getTuduIndex(element) {
  var index = 0;
  while((element = element.previousElementSibling) != null && index < maxTudus) index++;
  if (index === maxTudus) return -1;
  return index;
}

function tuduRendern(tudu) {
  var tuduClone = tuduEl.content.cloneNode(true);
  var tuduStatusEl = tuduClone.getElementById("tu-du-status");
  var tuduErledigenEl = tuduClone.getElementById("tu-du-status");
  var tuduLoeschenEl = tuduClone.getElementById("tu-du-loeschen");
  var tuduBezeichnungEl = tuduClone.getElementById("tu-du-bezeichnung");

  if (tudu.erledigt === true) {
    tuduStatusEl.checked = "checked";
  }

  tuduErledigenEl.onclick = function() {
    var i = getTuduIndex(this.parentNode.parentNode);
    tudus[i].erledigt = this.checked
    tudusSpeichern();
  }

  tuduLoeschenEl.onclick = function() {
    var i = getTuduIndex(this.parentNode);
    tuduLoeschen(i);
  }

  tuduBezeichnungEl.innerHTML = tudu.bezeichnung;

  tuduslisteEl.appendChild(tuduClone);
}

function tuduAlleRendern() {
  tuduslisteEl.innerHTML = null;
  
  // alle tudus anzeigen
  if (tudus && Array.isArray(tudus)) {
    for (var i = 0; i < tudus.length; i++) {
      tuduRendern(tudus[i]);
    }
  }
  neuTuduTextEl.focus();
}

neuTuduFormEl.onsubmit = tuduSubmit;

btnNichtsErledigtEl.onclick = function () {
  for (var i = 0; i < tudus.length; i++) {
    tudus[i].erledigt = false;
  }
  tudusSpeichern();
  tuduAlleRendern();
}

btnAllesErledigtEl.onclick = function () {
  for (var i = 0; i < tudus.length; i++) {
    tudus[i].erledigt = true;
  }
  tudusSpeichern();
  tuduAlleRendern();
}

btnAlleLoeschenEl.onclick = function () {
  tudus = [];
  tudusSpeichern();
  tuduAlleRendern();
}

tuduAlleRendern();