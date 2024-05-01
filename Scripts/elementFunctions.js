/* DECLARING FUNCTIONS */
export function noSpace(string) {
    return string.replace(/\s/g, " ");
}

/* EXPORTING FUNCTIONS*/
export function createPlayer(name, source) {
    let main = document.getElementById("main");
    let id = noSpace(name);

    let playerContainer = document.createElement("div");
    playerContainer.classList.add("player-Container");
    playerContainer.id = `${id}-Container`; 
    main.appendChild(playerContainer);

    let playerToken = document.createElement("div");
    playerToken.classList.add("player-Token");
    playerToken.classList.add("empty");
    playerToken.id = `${id}-Token`; 
    main.appendChild(playerToken);

    let player = document.createElement("div");
    player.classList.add("player");
    player.id = id;
    playerContainer.appendChild(player);

    let topContainer = document.createElement("header");
    topContainer.classList.add("top-Container");
    player.appendChild(topContainer);

    let playerButton = document.createElement("div");
    playerButton.classList = "playerButton";
    playerButton.id = `player${id}Button`;
    topContainer.appendChild(playerButton);

    let image = document.createElement("img");
    image.classList = "playerImg";
    image.id = `player${id}`;
    image.src = source;
    playerButton.appendChild(image);

    let playerTop = document.createElement("div");
    playerTop.classList.add("player-Top");
    topContainer.appendChild(playerTop);

    let playerName = document.createElement("h1");
    playerName.textContent = name;
    playerTop.appendChild(playerName);

    let underline = document.createElement("div");
    underline.classList.add("underline");
    playerTop.appendChild(underline);

    let pokemonTeamContainer = document.createElement("div");
    pokemonTeamContainer.classList.add("pokemonTeam-Container");
    player.appendChild(pokemonTeamContainer);

    for (let i = 0; i <= 5; i++) {
        let divTime = document.createElement("button");
        divTime.classList.add("pokemonTeam");
        divTime.id = `player${id}TeamButton${i}`;
        pokemonTeamContainer.appendChild(divTime);

        divTime.onclick = function() {
            console.log("ping"); // LOG
        }

        let Timeimage = document.createElement("img");
        Timeimage.classList.add("pokemonTeamImage");
        Timeimage.id = `player${id}TeamImage${i}`;
        divTime.appendChild(Timeimage);
    }
}

export function changeToken(trainer) {
    console.log("changing the tainer " + trainer._name + " token");
    let id = noSpace(trainer._name);
    let token = document.getElementById(`${id}-Token`);
    token.classList.remove("empty");
    token.classList.remove("pokemon");
    token.classList.add("player");
    //token.textContent = `Skills {"brawl": ${trainer.skills[0]}, "trow": ${trainer.skills[1]}, "evasion": ${trainer.skills[2]}, "weapon": ${trainer.skills[3]}, "alert": ${trainer.skills[4]}, "athletic": ${trainer.skills[5]}, "nature": ${trainer.skills[6]}, "stealth": ${trainer.skills[7]}, "allure": ${trainer.skills[8]}, "etiquette": ${trainer.skills[9]}, "intimidate": ${trainer.skills[10]}, "peform": ${trainer.skills[11]}, "crafts": ${trainer.skills[12]}, "lore": ${trainer.skills[13]}, "medicine": ${trainer.skills[14]}, "science": ${trainer.skills[15]}}`
}

export function changeType(element, type) {
    switch(type) {
        case "electric":
            element.classList.add("electric"); 
            break;
        case "fire":
          element.classList.add("fire"); 
          break;
        case "water":
          element.classList.add("water");
          break;
        case "psychic":
            element.classList.add("psychic");
            break;
        case "grass":
            element.classList.add("grass");
            break;
        case "ice":
            element.classList.add("ice");
            break;
        case "fighting":
            element.classList.add("fighting");
            break;
        case "poison":
            element.classList.add("poison");
            break;
        case "ground":
            element.classList.add("ground");
            break;
        case "flying":
            element.classList.add("flying");
            break;
        case "bug":
            element.classList.add("bug");
            break;
        case "rock":
            element.classList.add("rock");
            break;
        case "ghost":
            element.classList.add("ghost");
            break;
        case "dragon":
            element.classList.add("dragon");
            break;
        case "dark":
            element.classList.add("dark");
            break;
        case "steel":
            element.classList.add("steel");
            break;
        case "fairy":
            element.classList.add("fairy");
            break;
        default:
          element.classList.add("normal");
    }
}