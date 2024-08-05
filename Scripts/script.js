/* DECLARING IMPORTS */
import * as htmlMaker from './elementFunctions.js';
import * as fetch from './fetchFunctions.js';

/* DECLARING CLASSES */
import * as pokemonClass from './pokemon.js';
// name, nickname, level, attributes, basestats, ability, nature, ivs, evs, item, moves, types, weight, height, hapiness, friendship, isShiny, cries
import * as trainerClass from './trainer.js';
// name, nature, confidence, player, HP, WILL, money, concept, xp, age, rank, image, itens, badges, pokemons, attributes

/* GLOBAL VARIABLES */
let trainerList = {};
let firstChild = document.getElementById('main').children[0];
export let allMoves = fetch.AllMoves();

/* DECLARING FUNCTIONS */
export function getNatureEffect(nature) {
    // MAKING THE NATURE LOWERCASE
    nature = nature.toLowerCase();
    
    const natures = {
        "adamant": [2, 4],  // Attack+, Sp Atk-
        "bold": [3, 2],     // Defense+, Attack-
        "brave": [2, 6],    // Attack+, Speed-
        "calm": [5, 2],     // Sp Def+, Attack-
        "careful": [5, 4],  // Sp Def+, Sp Atk-
        "gentle": [5, 3],   // Sp Def+, Defense-
        "hardy": [0, 0],    // Neutral
        "hasty": [6, 3],    // Speed+, Defense-
        "impish": [3, 4],   // Defense+, Sp Atk-
        "jolly": [6, 4],    // Speed+, Sp Atk-
        "lax": [3, 5],      // Defense+, Sp Def-
        "lonely": [2, 3],   // Attack+, Defense-
        "mild": [4, 3],     // Sp Atk+, Defense-
        "modest": [4, 2],   // Sp Atk+, Attack-
        "naive": [6, 5],    // Speed+, Sp Def-
        "naughty": [2, 5],  // Attack+, Sp Def-
        "quiet": [4, 6],    // Sp Atk+, Speed-
        "quirky": [0, 0],   // Neutral
        "rash": [4, 5],     // Sp Atk+, Sp Def-
        "relaxed": [3, 6],  // Defense+, Speed-
        "sassy": [5, 6],    // Sp Def+, Speed-
        "serious": [0, 0],  // Neutral
        "timid": [6, 2]     // Speed+, Attack-
    };

    return natures[nature] || [0, 0]; // Returns 0 0 if the nature is not found
}

export function applyNature(pokemon, value, multiplier) {
    switch(value) {
        case 2:
            pokemon.attributes[1] = Math.floor(pokemon.attributes[1] * multiplier);
            break;
        case 3:
            pokemon.attributes[2] = Math.floor(pokemon.attributes[2] * multiplier);
            break;
        case 4:
            pokemon.attributes[3] = Math.floor(pokemon.attributes[3] * multiplier);
            break;
        case 5:
            pokemon.attributes[4] = Math.floor(pokemon.attributes[4] * multiplier);
            break;
        case 6:
            pokemon.attributes[5] = Math.floor(pokemon.attributes[5] * multiplier);
            break;
    }
}

export function actualizeAttributes(pokemon) {
    // HP CALCULATOR
    // (((IV + (EV/4)) + 2 * baseStat) * level / 100) + 10 + level
    // IV + EV/4
    pokemon.attributes[0] = Number(pokemon.ivs[0]) + (Number(pokemon.evs[0]) / 4);
    // " + 2 * Status Base
    pokemon.attributes[0] += 2 * Number(pokemon.baseStats[0]);
    // * level / 100
    pokemon.attributes[0] = Math.floor(pokemon.attributes[0] * Number(pokemon.level) / 100);
    // + 10 + level
    pokemon.attributes[0] += 10 + Number(pokemon.level);
    // IF ITS SHEDINJA
    if (pokemon.name == "Shedinja") {
        pokemon.attributes[i] = 1;
    }
    
    // OTHER ATTRIBUTES CALCULATOR
    for(let i = 1; i < 6; i++) {
        // ((((IV + (EV/4)) + 2 * baseStats) * level / 100 ) + 5) * nature (nature is later in code)
        // IV + EV/4
        pokemon.attributes[i] = Number(pokemon.ivs[i]) + (Number(pokemon.evs[i]) / 4);
        // + 2 * baseStats
        pokemon.attributes[i] += 2 * Number(pokemon.baseStats[i]);
        // * level / 100
        pokemon.attributes[i] =  Math.floor(Number(pokemon.attributes[i]) * Number(pokemon.level / 100));
        // + 5
        pokemon.attributes[i] += 5;
    }
    // APLYING NATURE
    applyNature(pokemon, getNatureEffect(pokemon.nature)[0], 1.1);
    applyNature(pokemon, getNatureEffect(pokemon.nature)[1], 0.9);
} 

export function createPlayer(trainer) {
    // MAKE THE HTML PART
    htmlMaker.createPlayer(trainer, trainer.image, firstChild);

    // CREATING THE PLAYERID
    let playerID = trainer._name.replace(/\s+/g, '');

   // ADD THE PLAYER TO THE LOCALSTORAGE
    let serializedObject = JSON.stringify(trainer); 
    let index = Object.keys(trainerList).length;
    trainer["index"] = index;
    localStorage.setItem(`object${index}`, serializedObject);

    // ADDING THE LOG FUNCTION TO THE PLAYER IMG
    let button = document.getElementById(`player${playerID}Button`);
    button.onclick = function() {
        console.log(trainerList[trainer._name]); // LOG
        htmlMaker.changePlayerToken(trainer);
    }

    // CREATING EACH POKEMON BUTTON
    for(let i = 0; i < 6; i++) {
        let botao = document.getElementById(`player${playerID}TeamButton${i}`);
        botao.onclick = function() {
            console.log(`The ${i} button of the player ${trainer._name} has been clicked!`); // LOG
            htmlMaker.createNewPokemon(trainer, i);
        }
    }

    // LOGGING THE PLAYER
    console.log("Creating the player " + trainer.name + "!"); // LOG
    console.log(trainer); // LOG

    // ADDING TO THE LIST
    trainerList[trainer.name] = trainer;
}

function readTrainer(trainer) {
    // CREATING VARIABLES
    let trainerID = trainer._name.replace(/\s+/g, '');

    // LOGGING THE TRAINER
    console.log("Reading the trainer " + trainer._name); // LOG
    console.log(trainer); // LOG
    
    // MAKING THE HTML PART
    htmlMaker.createPlayer(trainer, trainer._image, firstChild);
  
    // ADDING THE PLAYER TO THE LIST
    trainerList[trainer._name] = trainer;

    // ADDING THE TOKEN-CHANGING TO THE PLAYER IMG
    let button = document.getElementById(`player${trainerID}Button`);
    button.onclick = function() {
        htmlMaker.changePlayerToken(trainer);
        console.log(trainerList[trainer._name]); // LOG
    }

    // ADDING THE POKEMONS TO THE HTML
    for(let k = 0; k < trainer._pokemons.length && trainer._pokemons[0] != null; k++) {
        createPokemon(trainer, trainer._pokemons[k], k);
    }
}

function updateTrainer(trainer) {
    // UPDATE THE LOCALSTORAGE INSTANCE OF THE TRAINER
    let serializedObject = JSON.stringify(trainer); 
    localStorage.setItem(`object${trainer.index}`, serializedObject);
}

export async function createPokemon(trainer, pokemon, position) {
    // CREATING VARIABLES
    let trainerID = trainer._name.replace(/\s+/g, '');
    
    // ADJUSTING THE INDEX
    pokemon.index = position;

    // FETCH ITS DATA
    let data = fetch.Data(pokemon.name.toLowerCase())
    .then(data => {
        // LOGGING THE DATA
        console.log("Creating the pokemon " + pokemon.name + " in position " + pokemon.index + " of the player " + trainer._name + "!"); // LOG
        console.log(data); // LOG

        // IF IT'S A SHINY POKEMON, PICK IT'S SHINY SPRITE
        let img = document.getElementById(`player${trainerID}TeamImage${pokemon.index}`);
        if(pokemon.isShiny == 1) {
            fetch.alterImgSrc(img, data.sprites.other.home.front_shiny);
            pokemon.gif = data.sprites.other.showdown.front_shiny;
        }
        // IF IT'S NOT A SHINY POKEMON, PICK IT'S NORMAL SPRITE
        else {
            fetch.alterImgSrc(img, data.sprites.other.home.front_default);
            pokemon.gif = data.sprites.other.showdown.front_default;
        }

        // INSERT IN THE OBJECT POKEMON ITS CRIES, ATTRIBUTES, TYPES, WEIGHT & HEIGHT
        pokemon.cries = data.cries.latest;
        pokemon.baseStats = [];
        pokemon.attributes = [];
        for(let i = 0; i < 6; i++) {
            pokemon.baseStats[i] = data.stats[i].base_stat;
            pokemon.attributes[i] = data.stats[i].base_stat;
        }
        // ACTUALIZE THE ATTRIBUTES
        actualizeAttributes(pokemon);
        let types = [];
        for (let i = 0; i < data.types.length; types.push(data.types[i].type.name), i++) {}
        console.log("Pokemon types are: " + types); // LOG
        pokemon.types = types;
        pokemon.weight = data.weight/10;
        pokemon.height = data.height/10;
        console.log(trainerList[trainer._name]); // LOG
        console.log(pokemon); // LOG

        // CHANGE THE IMAGE BACKGROUND BASED ON THE POKEMON FIRST TYPE
        htmlMaker.changeType(img.parentNode, pokemon.types[0]);

        // IF THE BUTTON IS PRESSED LOG THE POKEMON
        let botao = document.getElementById(`player${trainerID}TeamButton${pokemon.index}`);
        botao.onclick = function() {
            console.log(trainerList[trainer._name]._pokemons[pokemon.index]); // LOG
            
            // CREATING THE HTML PART
            htmlMaker.createPokemon(trainer, trainerList[trainer._name]._pokemons[pokemon.index])
        }

        // NOW, SAVE IT
        trainerList[trainer._name]._pokemons[pokemon.index] = pokemon;
        updateTrainer(trainer);
        console.log("The trainer " + trainer._name + " has been saved!"); // LOG
    }).catch(error => {
        console.error(error);
    })
}

/* CREATING JHONNY'S FIRST TEAM */
// name, nature, confidence, player, HP, WILL, money, concept, xp, age, rank, image, itens, badges, pokemons, attributes, skills, qualities
let jhonny = new trainerClass.Trainer("Jhonny Tail", "Bold", 9, "Bebel", 25, 4, 680, "Fotógrafo", 0, 13, "Beginner", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLu64GywifUB9hi5ydUFnFn-9BPn1_j67jtg&s", ["pokeball x3", "mochila", "câmera", "cartas", "pokedex", "gancho de alpinismo", "roupa de trapper", "potion x1"], ["Sunflower"], [], [1,2,1,2], [0,1,1,0,1,1,0,0,1,0,0,0,0,0,0,0], [1, 2, 1, 1, 2]);
createPlayer(jhonny);
//name, gender, nickname, level, attributes, basestats, ability, nature, ivs, evs, item, moves, types, weight, height, hapiness, friendship, isShiny, cries
let jhonnyPokemon1 = new pokemonClass.Pokemon("Aipom", "M", "Polaroid", 23, null, null, "Skill Link", "Jolly", [31, 31, 31, 31, 31, 31], [4, 252, 0, 0, 0, 252], "Leppa Berry", ["Sand Attack", "Rain Dance", "Tickle", "Sunny Day"], null, null, null, 100, 100, 0, null);
createPokemon(jhonny, jhonnyPokemon1, 0);
let jhonnyPokemon2 = new pokemonClass.Pokemon("Ivysaur", "F", "Leica", 24, null, null, "Overgrow", "Quiet", [31, 12, 30, 27, 19, 13], [252, 0, 0, 252, 4, 0], "Leppa Berry", ["Sleep Powder", "Poison Powder", "Solar Beam", "Seed Bomb"], null, null, null, 100, 100, 0, null);
createPokemon(jhonny, jhonnyPokemon2, 1);
let jhonnyPokemon3 = new pokemonClass.Pokemon("Roggenrola", "F", "Nokia", 23, null, null, "Sand Force", "Adamant", [21, 29, 26, 25, 17, 16], [252, 252, 0, 0, 4, 0], null, ["Sand Attack", "Smack Down", "Earthquake", "Tackle"], null, null, null, 100, 100, 0, null);
createPokemon(jhonny, jhonnyPokemon3, 2);
let jhonnyPokemon4 = new pokemonClass.Pokemon("Metapod", "F", "Fujifilm", 20, null, null, "Shed Skin", "Modest", [28, 27, 16, 25, 28, 12], [252, 0, 4, 252, 0, 0], null, ["String Shot", "Harden", "Bug Bite"], null, null, null, 100, 100, 0, null);
createPokemon(jhonny, jhonnyPokemon4, 3);
let jhonnyPokemon5 = new pokemonClass.Pokemon("Trapinch", "M", "Olympus", 16, null, null, "Sheer Force", "Adamant", [31, 31, 31, 31, 31, 31], [4, 252, 0, 0, 0, 252], null, ["Sand Attack", "Astonish", "Fury Cutter"], null, null, null, 100, 100, 0, null);
createPokemon(jhonny, jhonnyPokemon5, 4);
let jhonnyPokemon6 = new pokemonClass.Pokemon("Numel", "M", "Samsung", 24, null, null, "Own Tempo", "Modest", [12, 22, 29, 29, 17, 15], [252, 0, 4, 252, 0, 0], null, ["Bulldoze", "Incinerate", "Tackle", "Earthquake"], null, null, null, 100, 100, 0, null);
createPokemon(jhonny, jhonnyPokemon6, 5);
/* CREATING JHONNY'S SECOND TEAM */
let jhonny2 = new trainerClass.Trainer("Jhonny Tail 2", "Bold", 9, "Bebel", 25, 4, 680, "Fotógrafo", 0, 13, "Beginner", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLu64GywifUB9hi5ydUFnFn-9BPn1_j67jtg&s", ["pokeball x3", "mochila", "câmera", "cartas", "pokedex", "gancho de alpinismo", "roupa de trapper", "potion x1"], ["Sunflower"], [], [1,2,1,2], [0,1,1,0,1,1,0,0,1,0,0,0,0,0,0,0], [1, 2, 1, 1, 2]);
createPlayer(jhonny2);
let jhonny2Pokemon1 = new pokemonClass.Pokemon("Metang", "None", "Lente", 20, null, null, "Clear Body", "Adamant", [14, 18, 16, 18, 16, 28], [252, 252, 0, 0, 4, 0], null, ["Zen Headbutt", "Confusion", "Bullet Punch", "Flash Cannon"], null, null, null, 100, 100, 0, null);
createPokemon(jhonny2, jhonny2Pokemon1, 0);
let jhonny2Pokemon2 = new pokemonClass.Pokemon("Poliwag", "M", "Paramount", 21, null, null, "Water Absorb", "Mild", [19, 27, 15, 15, 21, 27], [252, 0, 4, 252, 0, 0], null, ["Bubble Beam", "Hypnosis", "Mud Shot", "Pound"], null, null, null, 100, 100, 0, null);
createPokemon(jhonny2, jhonny2Pokemon2, 1);


function reloadPage() {
    // READ EVERY OBJECT/PLAYER IN THE LOCALSTORAGE
    for(let k = 0; ; k++){
        let serializedObject = localStorage.getItem(`object${k}`);
        if (serializedObject){
                let object = JSON.parse(serializedObject);
                if (!trainerList[object._name]) {
                        readTrainer(object);
                }
        }
        else {
            break;
        }
    }
}

window.addEventListener("beforeunload", function() { 
    localStorage.setItem("reloadedPage", "true");
});
window.addEventListener("load", function() {
    if (localStorage.getItem("reloadedPage") === "true") {
        reloadPage();
        localStorage.removeItem("reloadedPage");
    }
});