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
function createPlayer(name, image) {
    console.log("Creating the player " + name + "!"); // LOG
    htmlMaker.createPlayer(name, image);
    let trainer = new trainerClass.Trainer(name);
    trainer.image = image;
    console.log(trainer); // LOG
    trainerList[name] = trainer;
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
        trainerList[trainer].pokemons[position] = pokemon;
    }).catch(error => {
        console.error(error);
    })
}

createPlayer("A história de Jhonny", "https://s1.zerochan.net/Aipom.600.3286573.jpg");
createPokemon("A história de Jhonny", "Flygon", 1);
createPokemon("A história de Jhonny", "Galvantula", 2);
createPokemon("A história de Jhonny", "Braviary", 3);
createPokemon("A história de Jhonny", "Camerupt", 4);
createPokemon("A história de Jhonny", "Aurorus", 5);
createPokemon("A história de Jhonny", "Gogoat", 6);

createPlayer("Jhonny Tail, é isso aí", "https://s1.zerochan.net/Aipom.600.3286573.jpg");
createPokemon("Jhonny Tail, é isso aí", "Aipom", 1);
createPokemon("Jhonny Tail, é isso aí", "Ivysaur", 2);

createPlayer("Café", "https://i.pinimg.com/474x/7d/78/5a/7d785ab2ddeb49f66484d0fe0b2e9886.jpg");
createPokemon("Café", "Froakie", 1);
createPokemon("Café", "Cyndaquil", 2);

createPlayer("Couve", "https://i.pinimg.com/474x/7d/78/5a/7d785ab2ddeb49f66484d0fe0b2e9886.jpg");
createPokemon("Couve", "Misdreavus", 1);
createPokemon("Couve", "Zorua-Hisui", 2);

createPlayer("Mário", "https://i.pinimg.com/474x/7d/78/5a/7d785ab2ddeb49f66484d0fe0b2e9886.jpg");
createPokemon("Mário", "Chimchar", 1);
createPokemon("Mário", "Shroomish", 2);

createPlayer("Mário 2", "https://i.pinimg.com/474x/7d/78/5a/7d785ab2ddeb49f66484d0fe0b2e9886.jpg");
createPokemon("Mário 2", "Sandshrew", 1);
createPokemon("Mário 2", "Munchlax", 2);

createPlayer("Gagá", "https://i.pinimg.com/474x/7d/78/5a/7d785ab2ddeb49f66484d0fe0b2e9886.jpg");
createPokemon("Gagá", "Phantump", 1);
createPokemon("Gagá", "Honedge", 2);

createPlayer("Barney", "https://i.pinimg.com/474x/7d/78/5a/7d785ab2ddeb49f66484d0fe0b2e9886.jpg");
createPokemon("Barney", "Sableye", 1);
createPokemon("Barney", "Kricketot", 2);

createPlayer("Alex", "https://i.pinimg.com/474x/7d/78/5a/7d785ab2ddeb49f66484d0fe0b2e9886.jpg");
createPokemon("Alex", "Squirtle", 1);
createPokemon("Alex", "Eevee", 2);
createPokemon("Alex", "Feebas", 3);