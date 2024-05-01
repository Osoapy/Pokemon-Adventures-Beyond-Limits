/* DECLARING IMPORTS */
import * as htmlMaker from './elementFunctions.js';
import * as fetch from './fetchFunctions.js';

/* DECLARING CLASSES */
import * as pokemonClass from './pokemon.js';
// name, nickname, level, attributes, ability, nature, ivs, evs, item, moves, types, weight, height, hapiness, friendship, isShiny, cries
import * as trainerClass from './trainer.js';
// name, nature, confidence, player, HP, WILL, money, concept, xp, age, rank, image, itens, badges, pokemons, attributes

/* GLOBAL VARIABLES */
let trainerList = {};

/* DECLARING FUNCTIONS */
function createPlayer(trainer) {
    // MAKE THE HTML PART
    htmlMaker.createPlayer(trainer.name, trainer.image);

   // ADD THE PLAYER TO THE LOCALSTORAGE
    let serializedObject = JSON.stringify(trainer); 
    let index = Object.keys(trainerList).length;
    trainer["index"] = index;
    localStorage.setItem(`object${index}`, serializedObject);

    // ADDING THE LOG FUNCTION TO THE PLAYER IMG
    let button = document.getElementById(`player${trainer._name}Button`);
    button.onclick = function() {
        htmlMaker.changeToken(trainer);
        console.log(trainerList[trainer._name]); // LOG
    }

    console.log("Creating the player " + trainer.name + "!"); // LOG
    console.log(trainer); // LOG

    // ADDING TO THE LIST
    trainerList[trainer.name] = trainer;
}

function readTrainer(trainer) {
    console.log("Reading the trainer " + trainer); // LOG
    console.log(trainer); // LOG

    // MAKING THE HTML PART
    htmlMaker.createPlayer(trainer._name, trainer._image);
  
    // ADDING THE PLAYER TO THE LIST
    trainerList[trainer._name] = trainer;

    // ADDING THE LOG FUNCTION TO THE PLAYER IMG
    let button = document.getElementById(`player${trainer._name}Button`);
    button.onclick = function() {
        htmlMaker.changeToken(trainer);
        console.log(trainerList[trainer._name]); // LOG
    }

    // ADDING THE POKEMONS TO THE HTML
    for(let k = 0; k < trainer._pokemons.length && trainer._pokemons[0] != null; k++) {
        createPokemon(trainer, trainer._pokemons[k], k + 1);
    }
}

function updateTrainer(trainer) {
    // UPDATE THE LOCALSTORAGE INSTANCE OF THE TRAINER
    let serializedObject = JSON.stringify(trainer); 
    localStorage.setItem(`object${trainer.index}`, serializedObject);
}

async function createPokemon(trainer, pokemon, position) {
    // ADJUSTING THE INDEX
    position--;
    pokemon.index = position;

    // FETCH ITS DATA
    let data = fetch.Data(pokemon.name.toLowerCase())
    .then(data => {
        console.log("Creating the pokemon " + pokemon.name + " of the player " + trainer._name + "!"); // LOG
        console.log(data); // LOG

        // IF IT'S A SHINY POKEMON, PICK IT'S SHINY SPRITE, ELSE, PICK IT'S NORMAL SPRITE
        let img = document.getElementById(`player${trainer._name}TeamImage${position}`);
        if(pokemon.isShiny == 1) {
            fetch.alterImgSrc(img, data.sprites.front_shiny);
        }
        else {
            fetch.alterImgSrc(img, data.sprites.front_default);
        }

        // INSERT IN THE OBJECT POKEMON ITS CRIES, ATTRIBUTES, TYPES, WEIGHT & HEIGHT
        pokemon.cries = data.cries.latest;
        pokemon.attributes = data.stats.basestat;
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
        let botao = document.getElementById(`player${trainer._name}TeamButton${position}`);
        botao.onclick = function() {
            console.log(trainerList[trainer._name]._pokemons[position]); // LOG
        }

        // NOW, SAVE IT
        trainerList[trainer._name]._pokemons[position] = pokemon;
        updateTrainer(trainer);
        console.log("The trainer " + trainer._name + " has been saved!"); // LOG
    }).catch(error => {
        console.error(error);
    })
}

// name, nature, confidence, player, HP, WILL, money, concept, xp, age, rank, image, itens, badges, pokemons, attributes, skills, qualities
let trainer = new trainerClass.Trainer("Jhonny Tail, é isso aí", "Bold", 9, "Bebel", 25, 4, 680, "Fotógrafo", 0, 13, "Beginner", "https://s1.zerochan.net/Aipom.600.3286573.jpg", ["pokeball x4", "mochila", "câmera", "cartas", "pokedex", "gancho de alpinismo", "roupa de trapper", "potion x2", "super potion"], ["Sunflower"], [], [1,2,1,2], [0,1,1,0,1,1,0,0,1,0,0,0,0,0,0,0], [1, 2, 1, 1, 2]);
createPlayer(trainer);
//name, gender, nickname, level, attributes, ability, nature, ivs, evs, item, moves, types, weight, height, hapiness, friendship, isShiny, cries
let pokemon1 = new pokemonClass.Pokemon("Aipom", "M", "Polaroid", 16, [48, 42, 27, 51, 27, 20], "Skill Link", "Jolly", [31, 31, 31, 31, 31], [6, 252, 0, 252, 0, 0], null, ["Sand Attack", "Rain Dance", "Tickle", "Astonish"], null, null, null, 100, 100, 0, null);
createPokemon(trainer, pokemon1, 1);
let pokemon2 = new pokemonClass.Pokemon("Ivysaur", "F", "Leica", 17, [47, 40, 26, 22, 32, 42], "Overgrow", "Brave", [31, 31, 31, 31, 31], [6, 252, 0, 252, 0, 0], null, ["Sleep Powder", "Poison Powder", "Solar Beam", "Razor Leaf"], null, null, null, 100, 100, 0, null);
createPokemon(trainer, pokemon2, 2);

function reloadPage() {
    // READ EVERY OBJECT/PLAYER IN THE LOCALSTORAGE
    for(let k = 0; ; k++){
        let serializedObject = localStorage.getItem(`object${k+99}`);
        if (serializedObject){
            let object = JSON.parse(serializedObject);
            readTrainer(object);
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