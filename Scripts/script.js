/* DECLARING IMPORTS */
import * as htmlMaker from './elementFunctions.js';
import * as fetch from './fetchFunctions.js';

/* DECLARING CLASSES */
import * as pokemonClass from './pokemon.js';
// name, nickname, level, attributes, ability, nature, ivs, evs, item, moves, types, weight, height, hapiness, friendship, isShiny, cries
import * as trainerClass from './trainer.js';
// name, nature, confidence, player, HP, WILL, money, concept, xp, age, rank, image, itens, badges, pokemons, attributes

/* STARTING THE WEBSITE ON REFRESH */
let trainerList = {};

/* DECLARING FUNCTIONS */
function createPlayer(name, nature, confidence, player, HP, WILL, money, concept, xp, age, rank, image, itens, badges, attributes, skills) {
    htmlMaker.createPlayer(name, image);
    let trainer = new trainerClass.Trainer(name, nature, confidence, player, HP, WILL, money, concept, xp, age, rank, image, itens, badges, null, attributes, skills);
    let serializedObject = JSON.stringify(trainer); 
    let index = Object.keys(trainerList).length; 
    localStorage.setItem(`object${index}`, serializedObject);
    console.log("Creating the player " + name + "!"); // LOG
    console.log(trainer); // LOG
    trainerList[name] = trainer;
}

function readTrainer(trainer) {
    console.log("Reading the trainer " + trainer); // LOG
    console.log(trainer); // LOG
    htmlMaker.createPlayer(trainer._name, trainer._image);
    trainerList[trainer._name] = trainer;

    for(let k = 0; k < trainer._pokemons.length && trainer._pokemons[0] != null; k++) {
        createPokemon(trainer._name, trainer._pokemons[k].name, k)
    }
}

async function createPokemon(trainer, name, position) {
    position--;
    let img = document.getElementById(`Player${trainer}TimeImagem${position}`);
    let botao = document.getElementById(`Player${trainer}TimeBotao${position}`);
    let data = fetch.Data(name.toLowerCase())
    .then(data => {
        console.log("Creating the pokemon " + name + " of the player " + trainer + "!"); // LOG
        console.log(data); // LOG
        fetch.alterImgSrc(img, data.sprites.front_default);
        let pokemon = new pokemonClass.Pokemon(name);
        pokemon.cries = data.cries.latest;
        pokemon.attributes = data.stats.basestat;
        let types = [];
        for (let i = 0; i < data.types.length; types.push(data.types[i].type.name), i++) {}
        console.log("Pokemon types are: " + types); // LOG
        pokemon.types = types;
        pokemon.weight = data.weight/10;
        pokemon.height = data.height/10;
        console.log(pokemon); // LOG
        htmlMaker.changeType(img.parentNode, pokemon.types[0]);
      
        botao.onclick = function() {
            console.log(trainerList[trainer].pokemons[position]); // LOG
        }
      
        trainerList[trainer].pokemons[position] = pokemon;
    }).catch(error => {
        console.error(error);
    })
}

/*createPlayer("Jhonny Tail, é isso aí", "Bold", 10, "Bebel", 22, 3, 550, "bold", 100, 13, 1, "https://s1.zerochan.net/Aipom.600.3286573.jpg", ["pokeball x5"], ["Sunflower"], [0,1,0,1], [0,1,1,0,1,1,0,0,1,0,0,0,0,0,0,0]);

createPokemon("Jhonny Tail, é isso aí", "Aipom", 1);
createPokemon("Jhonny Tail, é isso aí", "Ivysaur", 2);*/

function reloadPage() {
    for(let k = 0; ; k++){
        let serializedObject = localStorage.getItem(`object${k}`);
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