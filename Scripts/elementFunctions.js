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

export function changeTokenPlayer(trainer) {
    console.log("changing the tainer " + trainer._name + " token");
    let id = noSpace(trainer._name);
    let token = document.getElementById(`${id}-Token`);
    token.classList.remove("empty");
    token.classList.remove("pokemon");
    token.classList.add("player-Filled-Container");

    let insideToken = document.createElement("div");
    insideToken.classList.add("player-Filled");
    token.appendChild(insideToken);
  
    let left = document.createElement("div");
    left.classList.add("player-Filled-Left");
    insideToken.appendChild(left);

    let leftInside = document.createElement("div");
    leftInside.classList.add("player-Filled-Left-Inside");
    left.appendChild(leftInside);

    let leftInsideImgContainer = document.createElement("div");
    leftInsideImgContainer.classList.add("player-Filled-Left-Inside-Image-Container");
    leftInside.appendChild(leftInsideImgContainer);

    let leftInsideImg = document.createElement("img");
    leftInsideImg.classList.add("player-Filled-Left-Inside-Image");
    leftInsideImg.src = trainer._image;
    leftInsideImgContainer.appendChild(leftInsideImg);

    let leftInsideHPContainer = document.createElement("div");
    leftInsideHPContainer.classList.add("player-Filled-Left-Inside-HP-Container");
    leftInside.appendChild(leftInsideHPContainer);

    let leftInsideHP = document.createElement("div");
    leftInsideHP.classList.add("player-Filled-Left-Inside-HP");
    leftInsideHP.textContent = "HP";
    leftInsideHPContainer.appendChild(leftInsideHP);

    let leftInsideHPValue = document.createElement("div");
    leftInsideHPValue.classList.add("player-Filled-Left-Inside-HP-Value");
    leftInsideHPValue.textContent = `${trainer._HP}`;
    leftInsideHP.appendChild(leftInsideHPValue);

    let leftInsideWILLContainer = document.createElement("div");
    leftInsideWILLContainer.classList.add("player-Filled-Left-Inside-WILL-Container");
    leftInside.appendChild(leftInsideWILLContainer);

    let leftInsideWILL = document.createElement("div");
    leftInsideWILL.classList.add("player-Filled-Left-Inside-WILL");
    leftInsideWILL.textContent = "WILL";
    leftInsideWILLContainer.appendChild(leftInsideWILL);

    let leftInsideWILLValue = document.createElement("div");
    leftInsideWILLValue.classList.add("player-Filled-Left-Inside-WILL-Value");
    leftInsideWILLValue.textContent = `${trainer._WILL}`;
    leftInsideWILL.appendChild(leftInsideWILLValue);

    let right = document.createElement("div");
    right.classList.add("player-Filled-Right");
    insideToken.appendChild(right);

    let rightInside = document.createElement("div");
    rightInside.classList.add("player-Filled-Right-Inside");
    right.appendChild(rightInside);

    let rightInsideTop = document.createElement("div");
    rightInsideTop.classList.add("player-Filled-Right-Inside-Top");
    right.appendChild(rightInsideTop);

    let rightInsideTopDiv = document.createElement("div");
    rightInsideTopDiv.classList.add("player-Filled-Right-Inside-Top-Div");
    rightInsideTop.appendChild(rightInsideTopDiv);

    let GuildImage = document.createElement("img");
    GuildImage.classList.add("player-Filled-Right-Inside-Top-Guild-Image");
    GuildImage.src = "../Assets/Images/leagueSymbol.png";
    rightInsideTopDiv.appendChild(GuildImage);

    let rightInsideTitleRankContainer = document.createElement("div");
    rightInsideTitleRankContainer.classList.add("player-Filled-Right-Inside-Title-Container");
    rightInsideTopDiv.appendChild(rightInsideTitleRankContainer);

    let rightInsideTitle = document.createElement("h1");
    rightInsideTitle.classList.add("player-Filled-Right-Inside-Title");
    rightInsideTitle.textContent = "POKÉMON LEAGUE";
    rightInsideTitleRankContainer.appendChild(rightInsideTitle);

    let rightInsideRank = document.createElement("div");
    rightInsideRank.classList.add("player-Filled-Right-Inside-Rank");
    rightInsideTitleRankContainer.appendChild(rightInsideRank);

    let rightInsideRankText = document.createElement("p");
    rightInsideRankText.classList.add("player-Filled-Right-Inside-Rank-Text");
    rightInsideRankText.textContent = `Trainer's Rank:`;
    rightInsideRank.appendChild(rightInsideRankText);

    let rightInsideRankValue = document.createElement("p");
    rightInsideRankValue.classList.add("player-Filled-Right-Inside-Rank-Value");
    rightInsideRankValue.textContent = `${trainer._rank}`;
    rightInsideRank.appendChild(rightInsideRankValue);

    let rightInsidePlayer = document.createElement("div");
    rightInsidePlayer.classList.add("player-Filled-Right-Inside-Player");
    rightInsidePlayer.textContent = `Player & Concept: ${trainer._name} & ${trainer._concept}`;
    rightInside.appendChild(rightInsidePlayer);

    let rightInsideName = document.createElement("div");
    rightInsideName.classList.add("player-Filled-Right-Inside-Name");
    rightInsideName.textContent = `Name: ${trainer._name} Age: ${trainer._age}`;
    rightInsideTop.appendChild(rightInsideName);

    let rightInsideNatureContainer = document.createElement("div");
    rightInsideNatureContainer.classList.add("player-Filled-Right-Inside-Nature-Container");
    rightInside.appendChild(rightInsideNatureContainer);

    let rightInsideNature = document.createElement("div");
    rightInsideNature.classList.add("player-Filled-Right-Inside-Nature");
    rightInsideNatureContainer.appendChild(rightInsideNature);

    let rightInsideNatureValue = document.createElement("div");
    rightInsideNatureValue.classList.add("player-Filled-Right-Inside-Nature-Value");
    rightInsideNatureValue.textContent = `Nature: ${trainer._nature}`;
    rightInsideNature.appendChild(rightInsideNatureValue);

    let rightInsideConfidenceValue = document.createElement("div");
    rightInsideConfidenceValue.classList.add("player-Filled-Right-Inside-Confidence-Value");
    rightInsideConfidenceValue.textContent = `Confidence: ${trainer._confidence}`;
    rightInsideNature.appendChild(rightInsideConfidenceValue);

    let rightInsideMoney = document.createElement("div");
    rightInsideMoney.classList.add("player-Filled-Right-Inside-Money");
    rightInsideMoney.textContent = `Money: ${trainer._money}`;
    rightInsideNatureContainer.appendChild(rightInsideMoney);

    let rightInsidePokemons = document.createElement("div");
    rightInsidePokemons.classList.add("player-Filled-Right-Inside-Pokemons");
    rightInside.appendChild(rightInsidePokemons);

    for(let k = 0; k < 6; k++) {
        let divTimeNicks = document.createElement("div");
        divTimeNicks.classList.add("player-Filled-Right-Inside-Pokemons-Nicknames");
        let img = document.createElement("img");
        img.classList.add("pokemonIcon")
        img.src = "../Assets/Images/capturedPokemon.png";
        divTimeNicks.appendChild(img);

        if (trainer._pokemons[k]) {
                let name = document.createElement("p");
                name.textContent = `${trainer._pokemons[k].nickname}`;
                name.classList = "pokemonNickname";
                divTimeNicks.appendChild(name);
        }
    
        rightInsidePokemons.appendChild(divTimeNicks);
    }
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