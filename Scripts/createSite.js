// IMPORTING
import * as trainerClass from './trainer.js';
import * as mainPage from './script.js';

// MAKING SO YOU CAN EDIT YOUR IMAGE
// CLEANING UP THE PLAYER CREATION
document.addEventListener('DOMContentLoaded', () => {
  let showInputBtn = document.getElementById('showInputBtn');
  let inputContainer = document.getElementById('inputContainer');
  let overlay = document.getElementById('overlay');
  let confirmBtn = document.getElementById('confirmBtn');
  let linkInput = document.getElementById('linkInput');
  let greenButton = document.getElementById('greenButton');
  let redButton = document.getElementById('redButton');
  showInputBtn.src = "https://media.istockphoto.com/id/1352945762/vector/no-image-available-like-missing-picture.jpg?s=612x612&w=0&k=20&c=4X-znbt02a8EIdxwDFaxfmKvUhTnLvLMv1i1f3bToog=";

  showInputBtn.addEventListener('click', () => {
    inputContainer.style.display = 'block';
    overlay.style.display = 'block';
    linkInput.focus();
  });

  overlay.addEventListener('click', () => {
    inputContainer.style.display = 'none';
    overlay.style.display = 'none';
    linkInput.value = '';
  });

  confirmBtn.addEventListener('click', () => {
    let link = linkInput.value;
    showInputBtn.src = link;
    console.log('Link inserido:', link);
    inputContainer.style.display = 'none';
    overlay.style.display = 'none';
    linkInput.value = '';
  });

  greenButton.addEventListener('click', () => {
    let rank = document.getElementById("creationRank");
    rank.textContent = "None";
    let name = document.getElementById("creationName");
    name.textContent = "Insert name here...";
    let age = document.getElementById("creationAge");
    age.textContent = "0";
    let HP = document.getElementById("creationHP");
    HP.textContent = "0";
    let WILL = document.getElementById("creationWILL");
    WILL.textContent = "0";
    let player = document.getElementById("creationPlayer");
    player.textContent = "???";
    let concept = document.getElementById("creationConcept");
    concept.textContent = "???";
    let nature = document.getElementById("creationNature");
    nature.textContent = "???";
    let confidence = document.getElementById("creationConfidence");
    confidence.textContent = "0";
    let money = document.getElementById("creationMoney");
    money.textContent = "0";
    showInputBtn.src = "https://media.istockphoto.com/id/1352945762/vector/no-image-available-like-missing-picture.jpg?s=612x612&w=0&k=20&c=4X-znbt02a8EIdxwDFaxfmKvUhTnLvLMv1i1f3bToog=";
  });

  greenButton.addEventListener('click', () => {
    let rank = document.getElementById("creationRank");
    rank = rank.textContent;
    let name = document.getElementById("creationName");
    name = name.textContent;
    let age = document.getElementById("creationAge");
    age = age.textContent;
    let HP = document.getElementById("creationHP");
    HP = HP.textContent;
    let WILL = document.getElementById("creationWILL");
    WILL = WILL.textContent;
    let player = document.getElementById("creationPlayer");
    player = player.textContent;
    let concept = document.getElementById("creationConcept");
    concept = concept.textContent;
    let nature = document.getElementById("creationNature");
    nature = nature.textContent;
    let confidence = document.getElementById("creationConfidence");
    confidence = confidence.textContent;
    let money = document.getElementById("creationMoney");
    money = money.textContent;
    let image = showInputBtn.src;

    // name, nature, confidence, player, HP, WILL, money, concept, xp, age, rank, image, itens, badges, pokemons, attributes, skills, qualities
    let trainer = new trainerClass.Trainer(name, nature, confidence, player, HP, WILL, money, concept, null, age, rank, image, null, null, null, null, null, null);
    mainPage.createPlayer(trainer);
  });

  redButton.addEventListener('click', () => {
    let rank = document.getElementById("creationRank");
    rank.textContent = "None";
    let name = document.getElementById("creationName");
    name.textContent = "Insert name here...";
    let age = document.getElementById("creationAge");
    age.textContent = "0";
    let HP = document.getElementById("creationHP");
    HP.textContent = "0";
    let WILL = document.getElementById("creationWILL");
    WILL.textContent = "0";
    let player = document.getElementById("creationPlayer");
    player.textContent = "???";
    let concept = document.getElementById("creationConcept");
    concept.textContent = "???";
    let nature = document.getElementById("creationNature");
    nature.textContent = "???";
    let confidence = document.getElementById("creationConfidence");
    confidence.textContent = "0";
    let money = document.getElementById("creationMoney");
    money.textContent = "0";
    showInputBtn.src = "https://media.istockphoto.com/id/1352945762/vector/no-image-available-like-missing-picture.jpg?s=612x612&w=0&k=20&c=4X-znbt02a8EIdxwDFaxfmKvUhTnLvLMv1i1f3bToog=";
  });
});