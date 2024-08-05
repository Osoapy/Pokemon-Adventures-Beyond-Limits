/* IMPORTING FUNCTIONS */
import * as mainScript from './script.js';
import * as pokemonClass from './pokemon.js';
import * as fetch from './fetchFunctions.js';

/* DECLARING FUNCTIONS */
export function returnText(html) {
    return html.textContent;
}

export function createTextContent(element, text) {
    let p = document.createElement("p");
    p.classList.add("spam-Text-Content");
    p.textContent = text;
    element.appendChild(p);
}

/* EXPORTING FUNCTIONS*/
export function createPlayer(trainer, source, firstChild) {
    let main = document.getElementById("main");
    console.log(trainer);
    let id = trainer._name.replace(/\s+/g, '');

    let playerToken = document.createElement("div");
    playerToken.classList.add("player-Token");
    playerToken.classList.add("empty");
    playerToken.id = `${id}-Token`; 
    main.insertBefore(playerToken, firstChild);
    
    let playerContainer = document.createElement("div");
    playerContainer.classList.add("player-Container");
    playerContainer.id = `${id}-Container`; 
    main.insertBefore(playerContainer, playerToken);

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
    playerName.classList.add("player-Name");
    playerName.textContent = trainer._name;
    playerTop.appendChild(playerName);

    let underline = document.createElement("div");
    underline.classList.add("underline");
    playerTop.appendChild(underline);

    let pokemonTeamContainer = document.createElement("div");
    pokemonTeamContainer.classList.add("pokemonTeam-Container");
    player.appendChild(pokemonTeamContainer);

    for (let i = 0; i < 6; i++) {
            let divTime = document.createElement("button");
            divTime.classList.add("pokemonTeam");
            divTime.id = `player${id}TeamButton${i}`;
            pokemonTeamContainer.appendChild(divTime);
    
            divTime.onclick = function() {
                console.log("Creating a new pokemon"); // LOG

                // CREATING NEW POKEMONS
                createNewPokemon(trainer, i);
            }
    
            let Timeimage = document.createElement("img");
            Timeimage.classList.add("pokemonTeamImage");
            Timeimage.id = `player${id}TeamImage${i}`;
            Timeimage.src = `Assets/Images/addButton.png`;
            divTime.appendChild(Timeimage);
    }
}

export function createPokemon(trainer, pokemon) {
    let pokemonPosition = 0;
    
    for(let name = pokemon.nickname; trainer._pokemons[pokemonPosition].nickname != name; pokemonPosition++) {}
    
    function createBoldParagraph (father, text) {
        let p = document.createElement("p");
        p.classList.add("pokemon-field-text");
        let b = document.createElement("b");
        b.textContent = text;
        p.appendChild(b);
        father.appendChild(p);
    }
    
    let id = trainer._name.replace(/\s+/g, '');
    let token = document.getElementById(`${id}-Token`);
    
    if(token.classList.contains("player-Filled-Container") || token.classList.contains("pokemon-Filled-Container") || token.classList.remove("new-pokemon-Filled-Container")) {
        console.log(`closing the trainer ${trainer._name} token`);

        token.classList.remove("new-pokemon-Filled-Container");
        token.classList.remove("pokemon-Filled-Container");
        token.classList.remove("player-Filled-Container");

        while (token.firstChild) {
            token.removeChild(token.firstChild);
        }

        return 0;
    }

    console.log("changing the trainer " + trainer._name + "'s token to the pokemon " + trainer._pokemons[pokemonPosition].name + " in position " + pokemonPosition); // LOG
    token.classList.remove("empty");
    token.classList.remove("player-Filled-Container");
    token.classList.add("pokemon-Filled-Container");
    
    let insideFirstToken = document.createElement("div");
    insideFirstToken.classList.add("start");
    token.appendChild(insideFirstToken);

    let insideFirstTokenInfo = document.createElement("div");
    insideFirstTokenInfo.classList.add("info");
    insideFirstTokenInfo.textContent = "Info";
    insideFirstToken.appendChild(insideFirstTokenInfo);

    let p = document.createElement("p");
    p.classList.add("pokemon-field-text")
    p.classList.add("first-field");;
    let b = document.createElement("b");
    b.textContent = "Nickname:";
    p.appendChild(b);
    insideFirstToken.appendChild(p);
    let nick = document.createElement("div");
    nick.classList.add("pokemon-field-answear");
    nick.classList.add("first-field");
    nick.textContent = trainer._pokemons[pokemonPosition].nickname;
    insideFirstToken.appendChild(nick);
    nick.contentEditable = true;
    nick.spellcheck = false;
    nick.addEventListener('input', function() {
        trainer._pokemons[pokemonPosition].nickname = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    createBoldParagraph(insideFirstToken, "Level:");
    let level = document.createElement("div");
    level.classList.add("pokemon-field-answear");
    level.textContent = trainer._pokemons[pokemonPosition].level;
    insideFirstToken.appendChild(level);
    level.contentEditable = true;
    level.spellcheck = false;
    level.addEventListener('input', function() {
        trainer._pokemons[pokemonPosition].level = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    createBoldParagraph(insideFirstToken, "Gender:");
    let gender = document.createElement("div");
    gender.classList.add("pokemon-field-answear");
    gender.textContent = trainer._pokemons[pokemonPosition].gender;
    insideFirstToken.appendChild(gender);
    gender.contentEditable = true;
    gender.spellcheck = false;
    gender.addEventListener('input', function() {
        trainer._pokemons[pokemonPosition].gender = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    createBoldParagraph(insideFirstToken, "Ability:");
    let ability = document.createElement("div");
    ability.classList.add("pokemon-field-answear");
    ability.textContent = trainer._pokemons[pokemonPosition].ability;
    insideFirstToken.appendChild(ability);
    ability.classList.add("ability");
    changeType(ability, trainer._pokemons[pokemonPosition].types[0]);
    ability.contentEditable = true;
    ability.spellcheck = false;
    ability.addEventListener('input', function() {
        trainer._pokemons[pokemonPosition].ability = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    createBoldParagraph(insideFirstToken, "Nature:");
    let nature = document.createElement("div");
    nature.classList.add("pokemon-field-answear");
    nature.textContent = trainer._pokemons[pokemonPosition].nature;
    insideFirstToken.appendChild(nature);
    nature.classList.add("nature");
    nature.contentEditable = true;
    nature.spellcheck = false;
    nature.addEventListener('input', function() {
        trainer._pokemons[pokemonPosition].nature = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    createBoldParagraph(insideFirstToken, "Held item:");
    let heldItem = document.createElement("div");
    heldItem.classList.add("pokemon-field-answear");
    if (trainer._pokemons[pokemonPosition].heldItem) {
        heldItem.textContent = trainer._pokemons[pokemonPosition].heldItem;
    }
    insideFirstToken.appendChild(heldItem);
    heldItem.contentEditable = true;
    heldItem.spellcheck = false;
    heldItem.addEventListener('input', function() {
        trainer._pokemons[pokemonPosition].heldItem = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let insideSecondToken = document.createElement("div");
    insideSecondToken.classList.add("moves-container");
    token.appendChild(insideSecondToken);

    let insideSecondTokenInfo = document.createElement("div");
    insideSecondTokenInfo.classList.add("info");
    insideSecondTokenInfo.textContent = "Moves";
    insideSecondToken.appendChild(insideSecondTokenInfo);

    let moves = document.createElement("div");
    moves.classList.add("moves");
    insideSecondToken.appendChild(moves);

    for (let i = 0; i < 4; i++) {
        let move = document.createElement("div");
        move.classList.add("move");
        if(trainer._pokemons[pokemonPosition].moves[i]) {
            move.textContent = trainer._pokemons[pokemonPosition].moves[i];
            
            // CHANGING THE COLOR OF THE MOVE IF IT'S A REAL MOVE
            mainScript.allMoves
                .then(allMoves => {
                    if(allMoves.includes(move.textContent.toLowerCase().replace(/ /g, '-'))) {
                        async function MoveType (moveName, element) {
                            try {
                                let moveType = await fetch.MoveType(moveName);
                                changeType(element, moveType);
                            } catch (error) {
                                console.error('Error: ', error);
                            }
                        };
                    MoveType(move.textContent, move);
                    }
                })
                .catch(error => {
                    console.error('Error: ', error); // Lida com erros, se houver
                });
        }
        
        moves.appendChild(move);
        move.contentEditable = true;
        move.spellcheck = false;
        move.addEventListener('input', function() {
            trainer._pokemons[pokemonPosition].moves[i] = this.textContent;
            localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
        });
    }

    let insideThirdToken = document.createElement("div");
    insideThirdToken.classList.add("ivs-container");
    token.appendChild(insideThirdToken);

    let insideThirdTokenInfo = document.createElement("div");
    insideThirdTokenInfo.classList.add("info");
    insideThirdTokenInfo.textContent = "IVs / EVs";
    insideThirdToken.appendChild(insideThirdTokenInfo);

    let ivButton = document.createElement("button");
    ivButton.classList.add("iv-button");
    insideThirdToken.appendChild(ivButton);

    let leftbutton = document.createElement("button");
    leftbutton.classList.add("left-button");
    leftbutton.textContent = "IVs";
    ivButton.appendChild(leftbutton);
    leftbutton.onclick = function() {
        let father = ivButton.parentElement;
        ivButton.children[1].classList.remove("active");
        father.children[3].classList.remove("show");
        ivButton.children[2].classList.remove("active");
        father.children[4].classList.remove("show");
        ivButton.children[0].classList.add("active");
        father.children[2].classList.add("show");
    }

    let attbutton = document.createElement("button");
    attbutton.classList.add("att-button");
    attbutton.textContent = "Stats";
    attbutton.classList.add("active");
    ivButton.appendChild(attbutton);
    attbutton.onclick = function() {
        let father = ivButton.parentElement;
        ivButton.children[0].classList.remove("active");
        father.children[2].classList.remove("show");
        ivButton.children[2].classList.remove("active");
        father.children[4].classList.remove("show");
        ivButton.children[1].classList.add("active");
        father.children[3].classList.add("show");
    }
    
    let righbutton = document.createElement("button");
    righbutton.classList.add("right-button");
    righbutton.textContent = "EVs";
    ivButton.appendChild(righbutton);
    righbutton.onclick = function() {
        let father = ivButton.parentElement;
        ivButton.children[0].classList.remove("active");
        father.children[2].classList.remove("show");
        ivButton.children[1].classList.remove("active");
        father.children[3].classList.remove("show");
        ivButton.children[2].classList.add("active");
        father.children[4].classList.add("show");
    }

    let ivsDiv = document.createElement("div");
    ivsDiv.classList.add("ivs");
    insideThirdToken.appendChild(ivsDiv);

    let attributes = ["HP", "Atk", "Def", "S.Atk", "S.Def", "Speed"];
    for (let i = 0; i < 6; i++) {
        let ivDiv = document.createElement("div");
        ivDiv.classList.add("ev");
        ivsDiv.appendChild(ivDiv);
        
        let attribute = document.createElement("div");
        attribute.classList.add("iv-text");
        attribute.textContent = attributes[i];
        ivDiv.appendChild(attribute);

        let value = document.createElement("div");
        value.classList.add("iv-value");
        value.textContent = trainer._pokemons[pokemonPosition].ivs[i];
        ivDiv.appendChild(value);
        value.contentEditable = true;
        value.spellcheck = false;
        value.addEventListener('input', function() {
            trainer._pokemons[pokemonPosition].ivs[i] = this.textContent;
            localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
        });
    }

    // ACTUALIZING THE STATS VALUES
    mainScript.actualizeAttributes(trainer._pokemons[pokemonPosition]);
    
    let attDiv = document.createElement("div");
    attDiv.classList.add("ivs");
    attDiv.classList.add("show");
    insideThirdToken.appendChild(attDiv);

    for (let i = 0; i < 6; i++) {
        let evDiv = document.createElement("div");
        evDiv.classList.add("ev");
        attDiv.appendChild(evDiv);

        let attribute = document.createElement("div");
        attribute.classList.add("ev-text");
        attribute.textContent = attributes[i];
        evDiv.appendChild(attribute);

        let value = document.createElement("div");
        value.classList.add("ev-value");
        value.textContent = trainer._pokemons[pokemonPosition].attributes[i];
        evDiv.appendChild(value);
        value.contentEditable = true;
        value.spellcheck = false;
        value.addEventListener('input', function() {
            trainer._pokemons[pokemonPosition].attributes[i] = this.textContent;
            localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
        });
    }

    let evsDiv = document.createElement("div");
    evsDiv.classList.add("evs");
    insideThirdToken.appendChild(evsDiv);

    for (let i = 0; i < 6; i++) {
        let evDiv = document.createElement("div");
        evDiv.classList.add("ev");
        evsDiv.appendChild(evDiv);
        
        let attribute = document.createElement("div");
        attribute.classList.add("ev-text");
        attribute.textContent = attributes[i];
        evDiv.appendChild(attribute);

        let value = document.createElement("div");
        value.classList.add("ev-value");
        value.textContent = trainer._pokemons[pokemonPosition].evs[i];
        evDiv.appendChild(value);
        value.contentEditable = true;
        value.spellcheck = false;
        value.addEventListener('input', function() {
            trainer._pokemons[pokemonPosition].evs[i] = this.textContent;
            localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
        });
    }

    let insideFourthToken = document.createElement("div");
    insideFourthToken.classList.add("stats");
    token.appendChild(insideFourthToken);

    let insideFourthTokenInfo = document.createElement("div");
    insideFourthTokenInfo.classList.add("info");
    insideFourthTokenInfo.textContent = "Stats";
    insideFourthToken.appendChild(insideFourthTokenInfo);

    let canvasContainer = document.createElement("div");
    canvasContainer.classList.add("canvas-container");
    insideFourthToken.appendChild(canvasContainer);
    
    let stats = document.createElement("canvas");
    stats.id = "myChart";
    canvasContainer.appendChild(stats);
    new Chart(stats, {
        type: 'radar',
        data: {
            labels: [
              'HP',
              'Attack',
              'Defence',
              'S.Atk',
              'S.Def',
              'Speed'
            ],
            datasets: [{
              label: '',
              data: trainer._pokemons[pokemonPosition].attributes,
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: "'Kimberle', sans-serif"
                        }
                    }
                }
            },
            elements: {
                line: {
                    borderWidth: 2
                }
            }
        }
    });
    Chart.defaults.font.size = 18;

    let imageCont = document.createElement("div");
    imageCont.classList.add("pokemon-sprite-Container");
    insideFourthToken.appendChild(imageCont);

    let image = document.createElement("img");
    image.src = trainer._pokemons[pokemonPosition].gif;
    image.classList.add("pokemon-sprite");
    imageCont.appendChild(image);
}

export function createNewPokemon(trainer, pokemonPosition) {
    function createBoldParagraph (father, text) {
        let p = document.createElement("p");
        p.classList.add("pokemon-field-text");
        let b = document.createElement("b");
        b.textContent = text;
        p.appendChild(b);
        father.appendChild(p);
    }

    let id = trainer._name.replace(/\s+/g, '');
    let token = document.getElementById(`${id}-Token`);

    if(token.classList.contains("player-Filled-Container") || token.classList.contains("pokemon-Filled-Container") || token.classList.contains("new-pokemon-Filled-Container")) {
        console.log(`closing the trainer ${trainer._name} token`);

        token.classList.remove("new-pokemon-Filled-Container");
        token.classList.remove("pokemon-Filled-Container");
        token.classList.remove("player-Filled-Container");

        while (token.firstChild) {
            token.removeChild(token.firstChild);
        }

        return 0;
    }

    console.log("changing the tainer " + trainer._name + " token");
    token.classList.remove("empty");
    token.classList.remove("player-Filled-Container");
    token.classList.add("pokemon-Filled-Container");

    let insideFirstToken = document.createElement("div");
    insideFirstToken.classList.add("start");
    token.appendChild(insideFirstToken);

    let insideFirstTokenInfo = document.createElement("div");
    insideFirstTokenInfo.classList.add("info");
    insideFirstTokenInfo.textContent = "Info";
    insideFirstToken.appendChild(insideFirstTokenInfo);

    let p = document.createElement("p");
    p.classList.add("pokemon-field-text");
    let b = document.createElement("b");
    b.textContent = "Species:";
    p.appendChild(b);
    insideFirstToken.appendChild(p);
    p.classList.add("creation-start");
    let name = document.createElement("div");
    name.classList.add("creation-start");
    name.classList.add("pokemon-field-answear");
    name.textContent = "Insert the specie's name here...";
    insideFirstToken.appendChild(name);
    name.contentEditable = true;
    name.spellcheck = false;

    createBoldParagraph(insideFirstToken, "Nickname:");
    let nickName = document.createElement("div");
    nickName.classList.add("pokemon-field-answear");
    nickName.textContent = "???";
    insideFirstToken.appendChild(nickName);
    nickName.contentEditable = true;
    nickName.spellcheck = false;
    
    createBoldParagraph(insideFirstToken, "Level:");
    let level = document.createElement("div");
    level.classList.add("pokemon-field-answear");
    level.textContent = "1";
    insideFirstToken.appendChild(level);
    level.contentEditable = true;
    level.spellcheck = false;

    createBoldParagraph(insideFirstToken, "Gender:");
    let gender = document.createElement("div");
    gender.classList.add("pokemon-field-answear");
    gender.textContent = "Choose between M, F or None";
    gender.ariaPlaceholder = "inser babies";
    insideFirstToken.appendChild(gender);
    gender.contentEditable = true;
    gender.spellcheck = false;

    createBoldParagraph(insideFirstToken, "Ability:");
    let ability = document.createElement("div");
    ability.classList.add("pokemon-field-answear");
    ability.textContent = "Insert its ability here...";
    insideFirstToken.appendChild(ability);
    ability.classList.add("ability");
    ability.contentEditable = true;
    ability.spellcheck = false;

    createBoldParagraph(insideFirstToken, "Nature:");
    let nature = document.createElement("div");
    nature.classList.add("pokemon-field-answear");
    nature.textContent = "Inset its nature here...";
    insideFirstToken.appendChild(nature);
    nature.classList.add("nature");
    nature.contentEditable = true;
    nature.spellcheck = false;

    createBoldParagraph(insideFirstToken, "Held item:");
    let heldItem = document.createElement("div");
    heldItem.classList.add("pokemon-field-answear");
    heldItem.textContent = "None";
    insideFirstToken.appendChild(heldItem);
    heldItem.contentEditable = true;
    heldItem.spellcheck = false;

    let insideSecondToken = document.createElement("div");
    insideSecondToken.classList.add("moves-container");
    token.appendChild(insideSecondToken);

    let insideSecondTokenInfo = document.createElement("div");
    insideSecondTokenInfo.classList.add("info");
    insideSecondTokenInfo.textContent = "Moves";
    insideSecondToken.appendChild(insideSecondTokenInfo);

    let moves = document.createElement("div");
    moves.classList.add("moves");
    insideSecondToken.appendChild(moves);

    let movesValue = [];
    for (let i = 0; i < 4; i++) {
        let move = document.createElement("div");
        move.classList.add("move");
        move.textContent = `Move #${i + 1}`;
        movesValue[i] = move;
        moves.appendChild(move);
        move.contentEditable = true;
        move.spellcheck = false;
    }

    let insideThirdToken = document.createElement("div");
    insideThirdToken.classList.add("ivs-container");
    token.appendChild(insideThirdToken);

    let insideThirdTokenInfo = document.createElement("div");
    insideThirdTokenInfo.classList.add("info");
    insideThirdTokenInfo.textContent = "IVs / EVs";
    insideThirdToken.appendChild(insideThirdTokenInfo);

    let ivButton = document.createElement("button");
    ivButton.classList.add("iv-button");
    insideThirdToken.appendChild(ivButton);

    let leftbutton = document.createElement("button");
    leftbutton.classList.add("left-button");
    leftbutton.textContent = "IVs";
    ivButton.appendChild(leftbutton);
    leftbutton.onclick = function() {
        let father = ivButton.parentElement;
        ivButton.children[1].classList.remove("active");
        father.children[3].classList.remove("show");
        ivButton.children[2].classList.remove("active");
        father.children[4].classList.remove("show");
        ivButton.children[0].classList.add("active");
        father.children[2].classList.add("show");
    }

    let attbutton = document.createElement("button");
    attbutton.classList.add("att-button");
    attbutton.textContent = "Stats";
    attbutton.classList.add("active");
    ivButton.appendChild(attbutton);
    attbutton.onclick = function() {
        let father = ivButton.parentElement;
        ivButton.children[0].classList.remove("active");
        father.children[2].classList.remove("show");
        ivButton.children[2].classList.remove("active");
        father.children[4].classList.remove("show");
        ivButton.children[1].classList.add("active");
        father.children[3].classList.add("show");
    }

    let righbutton = document.createElement("button");
    righbutton.classList.add("right-button");
    righbutton.textContent = "EVs";
    ivButton.appendChild(righbutton);
    righbutton.onclick = function() {
        let father = ivButton.parentElement;
        ivButton.children[0].classList.remove("active");
        father.children[2].classList.remove("show");
        ivButton.children[1].classList.remove("active");
        father.children[3].classList.remove("show");
        ivButton.children[2].classList.add("active");
        father.children[4].classList.add("show");
    }

    let ivsDiv = document.createElement("div");
    ivsDiv.classList.add("ivs");
    insideThirdToken.appendChild(ivsDiv);

    let attributes = ["HP", "Attack", "Defense", "S.Atk", "S.Def", "Speed"];

    let ivs = [];
    for (let i = 0; i < 6; i++) {
        let ivDiv = document.createElement("div");
        ivDiv.classList.add("ev");
        ivsDiv.appendChild(ivDiv);

        let attribute = document.createElement("div");
        attribute.classList.add("iv-text");
        attribute.textContent = attributes[i];
        ivDiv.appendChild(attribute);

        let value = document.createElement("div");
        ivs[i] = value;
        value.classList.add("iv-value");
        value.textContent = "0";
        ivDiv.appendChild(value);
        value.contentEditable = true;
        value.spellcheck = false;
    }

    let attDiv = document.createElement("div");
    attDiv.classList.add("ivs");
    attDiv.classList.add("show");
    insideThirdToken.appendChild(attDiv);

    let stats = [];
    for (let i = 0; i < 6; i++) {
        let evDiv = document.createElement("div");
        evDiv.classList.add("ev");
        attDiv.appendChild(evDiv);

        let attribute = document.createElement("div");
        attribute.classList.add("ev-text");
        attribute.textContent = attributes[i];
        evDiv.appendChild(attribute);

        let value = document.createElement("div");
        stats[i] = value;
        value.classList.add("ev-value");
        value.textContent = "0";
        evDiv.appendChild(value);
        value.contentEditable = true;
        value.spellcheck = false;
    }

    let evsDiv = document.createElement("div");
    evsDiv.classList.add("evs");
    insideThirdToken.appendChild(evsDiv);
    
    let evs = [];
    for (let i = 0; i < 6; i++) {
        let evDiv = document.createElement("div");
        evDiv.classList.add("ev");
        evsDiv.appendChild(evDiv);

        let attribute = document.createElement("div");
        attribute.classList.add("ev-text");
        attribute.textContent = attributes[i];
        evDiv.appendChild(attribute);

        let value = document.createElement("div");
        evs[i] = value;
        value.classList.add("ev-value");
        value.textContent = "0";
        evDiv.appendChild(value);
        value.contentEditable = true;
        value.spellcheck = false;
    }

    let createButton = document.createElement("button");
    createButton.textContent = "CREATE";
    createButton.classList.add("create-button");
    insideThirdToken.appendChild(createButton);
    
    createButton.onclick = function() {
        // CHECKING THE GIVEN NICKNAME
        let nickname = returnText(nickName);
        // MAKE NICKNAME1 NICKNAME2 WHEN REPEATING NICKNAMES
        for (let k = 0, time = 1; k < trainer._pokemons.length; k++) {
            if (nickname == trainer._pokemons[k].nickname) {
                nickname = `${nickname}${time}`;
                time++;
            }
        }
        
        //name, gender, nickname, level, attributes, basestats, ability, nature, ivs, evs, item, moves, types, weight, height, hapiness, friendship, isShiny, cries
        let pokemon = new pokemonClass.Pokemon(returnText(name), returnText(gender), nickname, returnText(level), [returnText(stats[0]), returnText(stats[1]), returnText(stats[2]), returnText(stats[3]), returnText(stats[4]), returnText(stats[5])], null, returnText(ability), returnText(nature), [returnText(ivs[0]), returnText(ivs[1]), returnText(ivs[2]), returnText(ivs[3]), returnText(ivs[4]), returnText(ivs[5])], [returnText(evs[0]), returnText(evs[1]), returnText(evs[2]), returnText(evs[3]), returnText(evs[4]), returnText(evs[5])], returnText(heldItem), [returnText(movesValue[0]), returnText(movesValue[1]), returnText(movesValue[2]), returnText(movesValue[3])], null, null, null, 100, 100, 0, null); 
        console.log(`Pokemon ${pokemon.name} created in position ${pokemonPosition}!`); // LOG
        mainScript.createPokemon(trainer, pokemon, pokemonPosition);
    }
}

export function changePlayerToken(trainer) {
    let id = trainer._name.replace(/\s+/g, '');
    let token = document.getElementById(`${id}-Token`);
    
    if(token.classList.contains("player-Filled-Container") || token.classList.contains("pokemon-Filled-Container")) {
        console.log(`closing the trainer ${trainer._name} token`); // LOG

        token.classList.remove("new-pokemon-Filled-Container");
        token.classList.remove("player-Filled-Container");
        token.classList.remove("pokemon-Filled-Container");
        
        while (token.firstChild) {
            token.removeChild(token.firstChild);
        }
        
        return 0;
    }

    console.log("changing the tainer " + trainer._name + " token");
    token.classList.remove("empty");
    token.classList.remove("pokemon-Filled-Container");
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
    trainerName.textContent = `TRAINER:`;
    
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
    trainerAge.textContent = `AGE:`;

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
            name.contentEditable = true;
            name.spellcheck = false;
            name.addEventListener('input', function() {
                trainer._pokemons[k].nickname = this.textContent;
                localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
            });
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