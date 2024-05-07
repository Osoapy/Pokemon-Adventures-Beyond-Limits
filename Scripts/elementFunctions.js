/* DECLARING FUNCTIONS */
export function noSpace(string) {
    return string.replace(/\s/g, " ");
}

export function createTextContent(element, text) {
    let p = document.createElement("p");
    p.classList.add("spam-Text-Content");
    p.textContent = text;
    element.appendChild(p);
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

export function changePlayerToken(trainer) {
    let id = noSpace(trainer._name);
    let token = document.getElementById(`${id}-Token`);
    
    if(token.classList.contains("player-Filled-Container")) {
        console.log(`closing the trainer ${trainer._name} token`);

        token.classList.remove("player-Filled-Container");
        
        while (token.firstChild) {
            token.removeChild(token.firstChild);
        }
        return 0;
    }

    console.log("changing the tainer " + trainer._name + " token");
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

    let leftImageContainer = document.createElement("div");
    leftImageContainer.classList.add("player-Filled-Left-Inside-Image-Container");
    leftInside.appendChild(leftImageContainer);

    let leftImage = document.createElement("img");
    leftImage.classList.add("player-Filled-Left-Inside-Image");
    leftImage.src = trainer._image;
    leftImageContainer.appendChild(leftImage);

    let HPContainer = document.createElement("div");
    HPContainer.classList.add("player-Filled-Left-Inside-HP-Container");
    leftInside.appendChild(HPContainer);

    let HP = document.createElement("div");
    HP.classList.add("player-Filled-Left-Inside-HP");
    HP.textContent = "HP";
    HPContainer.appendChild(HP);

    let HPValue = document.createElement("div");
    HPValue.classList.add("player-Filled-Left-Inside-HP-Value");
    HPValue.textContent = `${trainer._HP}`;
    HP.appendChild(HPValue);
    HPValue.contentEditable = true;
    HPValue.spellcheck = false;
    HPValue.addEventListener('input', function() {
        trainer._HP = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let WILLContainer = document.createElement("div");
    WILLContainer.classList.add("player-Filled-Left-Inside-WILL-Container");
    leftInside.appendChild(WILLContainer);

    let WILL = document.createElement("div");
    WILL.classList.add("player-Filled-Left-Inside-WILL");
    WILL.textContent = "WILL";
    WILLContainer.appendChild(WILL);

    let WILLValue = document.createElement("div");
    WILLValue.classList.add("player-Filled-Left-Inside-WILL-Value");
    WILLValue.textContent = `${trainer._WILL}`;
    WILL.appendChild(WILLValue);
    WILLValue.contentEditable = true;
    WILLValue.spellcheck = false;
    WILLValue.addEventListener('input', function() {
        trainer._WILL = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let right = document.createElement("div");
    right.classList.add("player-Filled-Right");
    insideToken.appendChild(right);

    let rightInside = document.createElement("div");
    rightInside.classList.add("player-Filled-Right-Inside");
    right.appendChild(rightInside);

    let rightInsideTop = document.createElement("div");
    rightInsideTop.classList.add("player-Filled-Right-Inside-Top");
    right.appendChild(rightInsideTop);

    let rightInsideContainer = document.createElement("div");
    rightInsideContainer.classList.add("player-Filled-Right-Inside-Top-Div");
    rightInsideTop.appendChild(rightInsideContainer);

    let GuildImage = document.createElement("img");
    GuildImage.classList.add("player-Filled-Right-Inside-Top-Guild-Image");
    GuildImage.src = "../Assets/Images/leagueSymbol.png";
    rightInsideContainer.appendChild(GuildImage);

    let titleContainer = document.createElement("div");
    titleContainer.classList.add("player-Filled-Right-Inside-Title-Container");
    rightInsideContainer.appendChild(titleContainer);

    let title = document.createElement("h1");
    title.classList.add("player-Filled-Right-Inside-Title");
    title.textContent = "POKÉMON LEAGUE";
    titleContainer.appendChild(title);

    let rankContainer = document.createElement("div");
    rankContainer.classList.add("player-Filled-Right-Inside-Rank");
    titleContainer.appendChild(rankContainer);

    let rankContainerText = document.createElement("p");
    rankContainerText.classList.add("player-Filled-Right-Inside-Rank-Text");
    rankContainerText.textContent = `Trainer's Rank:`;
    rankContainer.appendChild(rankContainerText);

    let rankValue = document.createElement("p");
    rankValue.classList.add("player-Filled-Right-Inside-Rank-Value");
    rankValue.textContent = `${trainer._rank}`;
    rankValue.contentEditable = true;
    rankValue.spellcheck = false;
    rankValue.addEventListener('input', function() {
        trainer._rank = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });
    rankContainer.appendChild(rankValue);

    let player = document.createElement("div");
    player.classList.add("player-Filled-Right-Inside-Player-Container");
    rightInside.appendChild(player);

    let playerName = document.createElement("div");
    playerName.classList.add("token-Spam-Text-Content");
    playerName.textContent = `PLAYER:`;

    let playerNameContainer = document.createElement("div");
    playerNameContainer.classList.add("player-Filled-Right-Inside-Player-Name");
    playerNameContainer.appendChild(playerName);
    createTextContent(playerNameContainer, `${trainer._player}`);
    playerNameContainer.children[1].contentEditable = true;
    playerNameContainer.children[1].spellcheck = false;
    playerNameContainer.children[1].addEventListener('input', function() {
        trainer._player = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });
    player.appendChild(playerNameContainer);

    let playerConcept = document.createElement("div");
    playerConcept.classList.add("token-Spam-Text-Content");
    playerConcept.textContent = `CONCEPT:`;

    let playerConceptContainer = document.createElement("div");
    playerConceptContainer.classList.add("player-Filled-Right-Inside-Player-Concept");
    playerConceptContainer.appendChild(playerConcept);
    createTextContent(playerConceptContainer, `${trainer._concept}`);
    playerConceptContainer.children[1].contentEditable = true;
    playerConceptContainer.children[1].spellcheck = false;
    playerConceptContainer.children[1].addEventListener('input', function() {
        trainer._concept = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });
    player.appendChild(playerConceptContainer);

    let rightInsideName = document.createElement("div");
    rightInsideName.classList.add("player-Filled-Right-Inside-Name");
    rightInsideTop.appendChild(rightInsideName);

    let trainerName = document.createElement("div");
    trainerName.classList.add("token-Spam-Text-Content");
    trainerName.classList.add("small-Spam-Text-Content");
    trainerName.textContent = `Trainer:`;
    
    let trainerNameContainer = document.createElement("div");
    trainerNameContainer.classList.add("player-Filled-Right-Inside-Player");
    trainerNameContainer.appendChild(trainerName);
    createTextContent(trainerNameContainer, `${trainer._name}`);
    trainerNameContainer.children[1].contentEditable = true;
    trainerNameContainer.children[1].spellcheck = false;
    trainerNameContainer.children[1].addEventListener('input', function() {
        trainer._name = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });
    rightInsideName.appendChild(trainerNameContainer);

    let trainerAge = document.createElement("div");
    trainerAge.classList.add("token-Spam-Text-Content");
    trainerAge.classList.add("small-Spam-Text-Content");
    trainerAge.textContent = `Age:`;

    let trainerAgeContainer = document.createElement("div");
    trainerAgeContainer.classList.add("player-Filled-Right-Inside-Age");
    trainerAgeContainer.appendChild(trainerAge);
    createTextContent(trainerAgeContainer, `${trainer._age}`);
    trainerAgeContainer.children[1].contentEditable = true;
    trainerAgeContainer.children[1].spellcheck = false;
    trainerAgeContainer.children[1].addEventListener('input', function() {
        trainer._age = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });
    rightInsideName.appendChild(trainerAgeContainer);

    let natureContainer = document.createElement("div");
    natureContainer.classList.add("player-Filled-Right-Inside-Nature-Container");
    rightInside.appendChild(natureContainer);

    let rightInsideNature = document.createElement("div");
    rightInsideNature.classList.add("player-Filled-Right-Inside-Nature");
    natureContainer.appendChild(rightInsideNature);

    let natureValue = document.createElement("div");
    natureValue.classList.add("token-Spam-Text-Content");
    natureValue.textContent = `NATURE:`;
    
    let natureValueContainer = document.createElement("div");
    natureValueContainer.classList.add("player-Filled-Right-Inside-Nature-Value");
    natureValueContainer.appendChild(natureValue);
    createTextContent(natureValueContainer, `${trainer._nature}`);
    rightInsideNature.appendChild(natureValueContainer);
    natureValueContainer.children[1].contentEditable = true;
    natureValueContainer.children[1].spellcheck = false;
    natureValueContainer.children[1].addEventListener('input', function() {
        trainer._nature = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });
    rightInsideName.appendChild(trainerNameContainer);

    let confidenceContainer = document.createElement("div");
    confidenceContainer.classList.add("player-Filled-Right-Inside-Confidence-Value-Container");
    confidenceContainer.textContent = `Confidence:`;
    rightInsideNature.appendChild(confidenceContainer);

    let confidence = document.createElement("div");
    confidence.classList.add("player-Filled-Right-Inside-Confidence-Value");
    confidence.textContent = `${trainer._confidence}`;
    confidenceContainer.appendChild(confidence);
    confidence.contentEditable = true;
    confidence.spellcheck = false;
    confidence.addEventListener('input', function() {
        trainer._confidence = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let moneyText = document.createElement("div");
    moneyText.classList.add("token-Spam-Text-Content");
    moneyText.textContent = `MONEY:`;

    let money = document.createElement("div");
    money.classList.add("player-Filled-Right-Inside-Money");
    money.appendChild(moneyText);
    createTextContent(money, `${trainer._money}`);
    natureContainer.appendChild(money);
    money.children[1].contentEditable = true;
    money.children[1].spellcheck = false;
    money.children[1].addEventListener('input', function() {
        trainer._money = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let teamContainer = document.createElement("div");
    teamContainer.classList.add("player-Filled-Right-Inside-Pokemons");
    rightInside.appendChild(teamContainer);

    for(let k = 0; k < 6; k++) {
        let teamNicknames = document.createElement("div");
        teamNicknames.classList.add("player-Filled-Right-Inside-Pokemons-Nicknames");
        let img = document.createElement("img");
        img.classList.add("pokemonIcon");
        img.src = "../Assets/Images/capturedPokemon.png";
        teamNicknames.appendChild(img);

        if (trainer._pokemons[k]) {
            let name = document.createElement("p");
            name.textContent = `${trainer._pokemons[k].nickname}`;
            name.classList = "pokemonNickname";
            teamNicknames.appendChild(name);
        }

        teamContainer.appendChild(teamNicknames);
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