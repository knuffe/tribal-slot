const words = [
  "Advisor",
  "Ally",
  "Ape",
  "Archer",
  "Artificer",
  "Assassin",
  "Avatar",
  "Barbarian",
  "Bat",
  "Bird",
  "Blinkmoth",
  "Boar",
  "Camarid",
  "Centaur",
  "Citizen",
  "Cleric",
  "Construct",
  "Crab",
  "Crocodile",
  "Cyclops",
  "Devil",
  "Djinn",
  "Drake",
  "Drone",
  "Druid",
  "Dryad",
  "Dwarf",
  "Efreet",
  "Elder",
  "Elephant",
  "Elk",
  "Fish",
  "Fox",
  "Frog",
  "Fungus",
  "Gargoyle",
  "Giant",
  "Gnome",
  "Golem",
  "Gorgon",
  "Griffin",
  "Homunculus",
  "Horror",
  "Horse",
  "Illusion",
  "Imp",
  "Incarnation",
  "Insect",
  "Jackal",
  "Jellyfish",
  "Kavu",
  "Kithkin",
  "Kor",
  "Kraken",
  "Leviathan",
  "Lizard",
  "Minion",
  "Minotaur",
  "Moonfolk",
  "Myr",
  "Nightmare",
  "Nomad",
  "Octopus",
  "Ogre",
  "Orc",
  "Ox",
  "Phoenix",
  "Pilot",
  "Plant",
  "Rabbit",
  "Rebel",
  "Rhino",
  "Robot",
  "Rogue",
  "Samurai",
  "Satyr",
  "Scarecrow",
  "Scout",
  "Serpent",
  "Shade",
  "Shaman",
  "Skeleton",
  "Snake",
  "Specter",
  "Spellshaper",
  "Sphinx",
  "Thrull",
  "Treefolk",
  "Troll",
  "Turtle",
  "Unicorn",
  "Vedalken",
  "Viashino",
  "Wall",
  "Wolf",
  "Wurm"
];

const SPIN_DURATION_MS = 10000;
const drawButton = document.querySelector("#drawButton");
const slotMachine = document.querySelector(".slot-machine");
const slots = [...document.querySelectorAll(".slot")];
const slotWords = [...document.querySelectorAll(".slot-word")];
const statusText = document.querySelector("#statusText");
const punchline = document.querySelector("#punchline");

let isSpinning = false;
let intervalIds = [];

function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function getThreeUniqueWords() {
  const shuffled = [...words];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, 3);
}

function clearResultState() {
  slots.forEach((slot) => slot.classList.remove("final-result"));
  punchline.hidden = true;
}

function startReels() {
  intervalIds = slotWords.map((wordElement, index) => {
    const speed = 68 + index * 17;

    return window.setInterval(() => {
      wordElement.textContent = randomWord();
    }, speed);
  });
}

function stopReels() {
  intervalIds.forEach((intervalId) => window.clearInterval(intervalId));
  intervalIds = [];
}

function finishSpin(results) {
  stopReels();

  results.forEach((word, index) => {
    slotWords[index].textContent = word;
  });

  slotMachine.classList.remove("is-spinning");
  slots.forEach((slot) => slot.classList.add("final-result"));

  statusText.textContent = "Das Schicksal hat entschieden!";
  punchline.hidden = false;

  drawButton.disabled = false;
  drawButton.querySelector(".button-text").textContent = "NOCH EINMAL";
  isSpinning = false;
}

function spin() {
  if (isSpinning) {
    return;
  }

  isSpinning = true;
  drawButton.disabled = true;
  drawButton.querySelector(".button-text").textContent = "WIRD AUSGELOST ...";

  clearResultState();
  slotMachine.classList.add("is-spinning");
  statusText.textContent = "Die Kreaturen des Multiversums wirbeln durcheinander ...";

  const results = getThreeUniqueWords();
  startReels();

  window.setTimeout(() => finishSpin(results), SPIN_DURATION_MS);
}

drawButton.addEventListener("click", spin);
