// Imports
import * as trainerClass from './trainer.js';
import * as mainPage from './script.js';

// Initialize player creation interface
document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    showInputBtn: document.getElementById('showInputBtn'),
    inputContainer: document.getElementById('inputContainer'),
    overlay: document.getElementById('overlay'),
    confirmBtn: document.getElementById('confirmBtn'),
    linkInput: document.getElementById('linkInput'),
    greenButton: document.getElementById('greenButton'),
    redButton: document.getElementById('redButton'),
  };

  // Default image for new players
  elements.showInputBtn.src = "Assets/Images/noImageAvailable.png";

  // Show input field for image link
  elements.showInputBtn.addEventListener('click', () => {
    elements.inputContainer.style.display = 'block';
    elements.overlay.style.display = 'block';
    elements.linkInput.focus();
  });

  // Hide overlay/input on clicking outside
  elements.overlay.addEventListener('click', () => {
    elements.inputContainer.style.display = 'none';
    elements.overlay.style.display = 'none';
    elements.linkInput.value = '';
  });

  // Update image with link and hide input
  elements.confirmBtn.addEventListener('click', () => {
    elements.showInputBtn.src = elements.linkInput.value;
    elements.inputContainer.style.display = 'none';
    elements.overlay.style.display = 'none';
    elements.linkInput.value = '';
  });

  // Reset player creation form
  const resetForm = () => {
    const fields = [
      'creationRank', 'creationName', 'creationAge', 'creationHP', 
      'creationWILL', 'creationPlayer', 'creationConcept', 'creationNature', 
      'creationConfidence', 'creationMoney'
    ];
    fields.forEach(id => document.getElementById(id).textContent = {
      creationName: "Insert name here...",
      creationPlayer: "???",
      creationConcept: "???",
      creationNature: "???"
    }[id] || "0");
    elements.showInputBtn.src = "https://media.istockphoto.com/id/1352945762/vector/no-image-available-like-missing-picture.jpg";
  };

  elements.greenButton.addEventListener('click', resetForm);

  // Create player object and pass it to mainPage
  elements.greenButton.addEventListener('click', () => {
    const trainer = new trainerClass.Trainer(
      document.getElementById("creationName").textContent,
      document.getElementById("creationNature").textContent,
      document.getElementById("creationConfidence").textContent,
      document.getElementById("creationPlayer").textContent,
      document.getElementById("creationHP").textContent,
      document.getElementById("creationWILL").textContent,
      document.getElementById("creationMoney").textContent,
      document.getElementById("creationConcept").textContent,
      null,  // xp
      document.getElementById("creationAge").textContent,
      document.getElementById("creationRank").textContent,
      elements.showInputBtn.src,
      null, null, null, null, null, null
    );
    mainPage.createPlayer(trainer);
  });

  // Clear form on red button click
  elements.redButton.addEventListener('click', resetForm);
});