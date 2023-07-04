
import { getInputValues, genotypeResult } from './input.js'

// allgemeine Variablen

const generateBtn = document.getElementById('generate-btn');
const genotypeText = document.getElementById('genotype-text');
const imgDiv = document.querySelector('.img-container');

// Variablen für Genetik

let isExpressingAgouti = false;
let eumelanin = "black";
let phaeomelanin = "orange";

let sLokus; 
let eLokus; 
let kLokus; 
let aLokus; 
let bLokus; 
let dLokus; 
let iLokus; 

// Event Listeners

generateBtn.addEventListener('click', createImg);

// Funktionen

function createImg () {

  getInputValues(); // Funktion ist in input.js
  sLokus = genotypeResult[0];
  eLokus = genotypeResult[1];
  kLokus = genotypeResult[2];
  aLokus = genotypeResult[3];
  bLokus = genotypeResult[4];
  dLokus = genotypeResult[5];
  iLokus = genotypeResult[6];
  genotypeText.innerText = genotypeResult;

  imgDiv.replaceChildren (); // altes Bild entfernen

  getEumelaninValue ();
  getPhaeomelaninValue ();
  determineAgouti ();

  addEumelanin ();
  addPhaeomelanin ();
  addAgouti ();
  addBrindle();
  addMask ();
  addSpotting ();
  addOutline ();
};

/* Für alle folgenden Funktionen gilt: die arrays wurden in der Funktion getInputValues sortiert, es müssen also nicht immer beide Allele geprüft werden.
  Wenn z.B. bLokus[0] === "b" ist, dann muss bLokus[1] ebenfalls "b" sein, da "B" sonst an erster Stelle wäre. */

// Farbtöne (eumelanin, phaeomelanin) bestimmen

function getEumelaninValue () {

  if (bLokus[0] === "b") {
    eumelanin = "brown"
  } else {
    eumelanin = "black"
  };
  if (dLokus[0] === "d" && eumelanin === "black") {
    eumelanin = "blue"
  } else if (dLokus[0] === "d" && eumelanin === "brown") {
    eumelanin = "lilac"
  };
}

function getPhaeomelaninValue () {

  if (iLokus[0] === 'i') {
    phaeomelanin = "creme"
  } else if (iLokus[0] === 'I' && iLokus[1]=== 'i') {
    phaeomelanin = "orange"
  } else {
    phaeomelanin = "tan"
  }
}

// Agouti boolean

function determineAgouti () {

  if (kLokus[0] === "KB" || eLokus[0] === "e") { 
    isExpressingAgouti = false;
  } else {
    isExpressingAgouti = true;
  }
}

// wenn kein Agouti: Eumelanin Layer drauf (auch bei rezessivem Rot für Nasenfarbe)

function addEumelanin () {
  if (!isExpressingAgouti) {
    const newImg = document.createElement('img');
    newImg.src = `coat-illustrations/eumelanin_${eumelanin}.png`;
    imgDiv.appendChild(newImg);
  }
};

// wenn Agouti ODER rezessives Rot: Phäomelanin Layer drauf
// kein Phäomelanin wenn der Hund dominant schwarz ist (K (isExpressingAgouti = false) & nicht rezessiv rot (!e))

  function addPhaeomelanin () {
    if (isExpressingAgouti === false && eLokus[0] !== "e") {
      isExpressingAgouti = false;
      return;
    } 
    const newImg = document.createElement('img');
    newImg.src = `coat-illustrations/phaeomelanin_${phaeomelanin}.png`;
    imgDiv.appendChild(newImg);
  }

// Fellzeichnungen der A-Serie (sable, agouti, tanpoint)

function addAgouti () {
  const newImg = document.createElement('img');
  if (isExpressingAgouti === true) {
    if (aLokus.includes("As")) {
      newImg.src = `coat-illustrations/sable_${eumelanin}.png`;
    } else if (aLokus[0] === "Aw") {
      newImg.src = `coat-illustrations/agouti_${eumelanin}.png`;
      } else if (aLokus[0] === "at") {
      newImg.src = `coat-illustrations/tanpoint_${eumelanin}.png`;
    } 
  }  imgDiv.appendChild(newImg);
};

// Brindle und Maske

function addBrindle(){
  if (kLokus[0] === "KBr" && isExpressingAgouti === true){
    const newImg = document.createElement('img');
    newImg.src = `coat-illustrations/brindle_${eumelanin}.png`;
    imgDiv.appendChild(newImg);
  }
}

function addMask () {
  if (eLokus.includes("Em")) {
    const newImg = document.createElement('img');
    newImg.src = `coat-illustrations/mask_${eumelanin}.png`;
    imgDiv.appendChild(newImg);
  }
};

// Weißscheckung

function addSpotting () {
  const newImg = document.createElement('img');

  if (sLokus[1] === 'S') {
    return;
  } else if (sLokus[0] === 'si' && sLokus[1] === 'si' || sLokus[0] === 'S' && sLokus[1] === 'sp') {  
    newImg.src = "coat-illustrations/irish-spotting.png";
  } else if (sLokus[0] === 'sp') {
    newImg.src = "coat-illustrations/piebald.png";
  } else if (sLokus[0] === 'S' && sLokus[1] === 'si') { 
    newImg.src= "coat-illustrations/white-trim.png";
  } else if (sLokus[0] === 'si' && sLokus[1] === 'sp') {
    newImg.src = "coat-illustrations/flashy-irish.png";
  }
  imgDiv.appendChild(newImg);
};

// Outline

function addOutline () {
  const newImg = document.createElement('img');
  newImg.src = "coat-illustrations/outline.png";
  imgDiv.appendChild(newImg);
};