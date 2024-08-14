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

export function createElementClassIdFather(element, classList, id, father) {
    let result = document.createElement(element);
    result.classList = classList;
    if (id != null)
    result.id = id;
    father.appendChild(result);
    return result;
}

/* EXPORTING FUNCTIONS*/
export function createPlayer(trainer, source, firstChild) {
    let main = document.getElementById("main");
    console.log(trainer);
    let id = trainer._name.replace(/\s+/g, '');

    let playerToken = createElementClassIdFather("div", "player-Token", `${id}-Token`, main);
    playerToken.classList.add("empty");
    main.insertBefore(playerToken, firstChild);
    
    let playerContainer = createElementClassIdFather("div", "player-Container", `${id}-Container`, main);
    main.insertBefore(playerContainer, playerToken);

    let player = createElementClassIdFather("div", "player", id, playerContainer);

    let topContainer = createElementClassIdFather("header", "top-Container", null, player);

    let playerButton = createElementClassIdFather("div", "playerButton", `player${id}Button`, topContainer);

    let image = createElementClassIdFather("img", "playerImg", `player${id}`, playerButton);
    image.src = source;

    let playerTop = createElementClassIdFather("div", "player-Top", null, topContainer);

    let playerName = createElementClassIdFather("h1", "player-Name", null, playerTop);
    playerName.textContent = trainer._name;

    let underline = createElementClassIdFather("div", "underline", null, playerTop);

    let pokemonTeamContainer = createElementClassIdFather("div", "pokemonTeam-Container", null, player);

    for (let i = 0; i < 6; i++) {
            let divTime = createElementClassIdFather("button", "pokemonTeam", `player${id}TeamButton${i}`, pokemonTeamContainer);
    
            divTime.onclick = function() {
                console.log("Creating a new pokemon"); // LOG

                // CREATING NEW POKEMONS
                createNewPokemon(trainer, i);
            }
    
            let Timeimage = createElementClassIdFather("img", "pokemonTeamImage", `player${id}TeamImage${i}`, divTime);
            Timeimage.src = `./Assets/Images/addButton.png`;
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
    
    let insideFirstToken = createElementClassIdFather("div", "start", null, token);

    let insideFirstTokenInfo = createElementClassIdFather("div", "info", null, insideFirstToken);
    insideFirstTokenInfo.textContent = "Info";

    let p = createElementClassIdFather("p", "pokemon-field-text first-field", null, insideFirstToken);
    let b = createElementClassIdFather("b", null, null, p);
    b.textContent = "Nickname:";
    let nick = createElementClassIdFather("div", "pokemon-field-answear first-field", null, insideFirstToken);
    nick.textContent = trainer._pokemons[pokemonPosition].nickname;
    nick.contentEditable = true;
    nick.spellcheck = false;
    nick.addEventListener('input', function() {
        trainer._pokemons[pokemonPosition].nickname = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    createBoldParagraph(insideFirstToken, "Level:");
    let level = createElementClassIdFather("div", "pokemon-field-answear", null, insideFirstToken);
    level.textContent = trainer._pokemons[pokemonPosition].level;
    level.contentEditable = true;
    level.spellcheck = false;
    level.addEventListener('input', function() {
        trainer._pokemons[pokemonPosition].level = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    createBoldParagraph(insideFirstToken, "Gender:");
    let gender = createElementClassIdFather("div", "pokemon-field-answear", null, insideFirstToken);
    gender.textContent = trainer._pokemons[pokemonPosition].gender;
    gender.contentEditable = true;
    gender.spellcheck = false;
    gender.addEventListener('input', function() {
        trainer._pokemons[pokemonPosition].gender = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    createBoldParagraph(insideFirstToken, "Ability:");
    let ability = createElementClassIdFather("div", "pokemon-field-answear", null, insideFirstToken);
    ability.textContent = trainer._pokemons[pokemonPosition].ability;
    ability.classList.add("ability");
    changeType(ability, trainer._pokemons[pokemonPosition].types[0]);
    ability.contentEditable = true;
    ability.spellcheck = false;
    ability.addEventListener('input', function() {
        trainer._pokemons[pokemonPosition].ability = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    createBoldParagraph(insideFirstToken, "Nature:");
    let nature = createElementClassIdFather("div", "pokemon-field-answear", null, insideFirstToken);
    nature.textContent = trainer._pokemons[pokemonPosition].nature;
    nature.classList.add("nature");
    nature.contentEditable = true;
    nature.spellcheck = false;
    nature.addEventListener('input', function() {
        trainer._pokemons[pokemonPosition].nature = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    createBoldParagraph(insideFirstToken, "Held item:");
    let heldItem = createElementClassIdFather("div", "pokemon-field-answear", null, insideFirstToken);
    if (trainer._pokemons[pokemonPosition].heldItem) {
        heldItem.textContent = trainer._pokemons[pokemonPosition].heldItem;
    }
    heldItem.contentEditable = true;
    heldItem.spellcheck = false;
    heldItem.addEventListener('input', function() {
        trainer._pokemons[pokemonPosition].heldItem = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let insideSecondToken = createElementClassIdFather("div", "moves-container", null, token);

    let insideSecondTokenInfo = createElementClassIdFather("div", "info", null, insideSecondToken);
    insideSecondTokenInfo.textContent = "Moves";

    let moves = createElementClassIdFather("div", "moves", null, insideSecondToken);

    for (let i = 0; i < 4; i++) {
        let move = createElementClassIdFather("div", "move", null, moves);
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
        
        move.contentEditable = true;
        move.spellcheck = false;
        move.addEventListener('input', function() {
            trainer._pokemons[pokemonPosition].moves[i] = this.textContent;
            localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
        });
    }

    let insideThirdToken = createElementClassIdFather("div", "ivs-container", null, token);

    let insideThirdTokenInfo = createElementClassIdFather("div", "info", null, insideThirdToken);
    insideThirdTokenInfo.textContent = "IVs / EVs";

    let ivButton = createElementClassIdFather("button", "iv-button", null, insideThirdToken);

    let leftbutton = createElementClassIdFather("button", "left-button", null, ivButton);
    leftbutton.textContent = "IVs";
    leftbutton.onclick = function() {
        let father = ivButton.parentElement;
        ivButton.children[1].classList.remove("active");
        father.children[3].classList.remove("show");
        ivButton.children[2].classList.remove("active");
        father.children[4].classList.remove("show");
        ivButton.children[0].classList.add("active");
        father.children[2].classList.add("show");
    }

    let attbutton = createElementClassIdFather("button", "att-button", null, ivButton);
    attbutton.textContent = "Stats";
    attbutton.classList.add("active");
    attbutton.onclick = function() {
        let father = ivButton.parentElement;
        ivButton.children[0].classList.remove("active");
        father.children[2].classList.remove("show");
        ivButton.children[2].classList.remove("active");
        father.children[4].classList.remove("show");
        ivButton.children[1].classList.add("active");
        father.children[3].classList.add("show");
    }
    
    let righbutton = createElementClassIdFather("button", "right-button", null, ivButton);
    righbutton.textContent = "EVs";
    righbutton.onclick = function() {
        let father = ivButton.parentElement;
        ivButton.children[0].classList.remove("active");
        father.children[2].classList.remove("show");
        ivButton.children[1].classList.remove("active");
        father.children[3].classList.remove("show");
        ivButton.children[2].classList.add("active");
        father.children[4].classList.add("show");
    }

    let ivsDiv = createElementClassIdFather("div", "ivs", null, insideThirdToken);

    let attributes = ["HP", "Atk", "Def", "S.Atk", "S.Def", "Speed"];
    for (let i = 0; i < 6; i++) {
        let ivDiv = createElementClassIdFather("div", "ev", null, ivsDiv);
        
        let attribute = createElementClassIdFather("div", "iv-text", null, ivDiv);
        attribute.textContent = attributes[i];

        let value = createElementClassIdFather("div", "iv-value", null, ivDiv);
        value.textContent = trainer._pokemons[pokemonPosition].ivs[i];
        value.contentEditable = true;
        value.spellcheck = false;
        value.addEventListener('input', function() {
            trainer._pokemons[pokemonPosition].ivs[i] = this.textContent;
            localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
        });
    }

    // ACTUALIZING THE STATS VALUES
    mainScript.actualizeAttributes(trainer._pokemons[pokemonPosition]);
    
    let attDiv = createElementClassIdFather("div", "ivs", null, insideThirdToken);
    attDiv.classList.add("show");

    for (let i = 0; i < 6; i++) {
        let evDiv = createElementClassIdFather("div", "ev", null, attDiv);

        let attribute = createElementClassIdFather("div", "ev-text", null, evDiv);
        attribute.textContent = attributes[i];

        let value = createElementClassIdFather("div", "ev-value", null, evDiv);
        value.textContent = trainer._pokemons[pokemonPosition].attributes[i];
        value.contentEditable = true;
        value.spellcheck = false;
        value.addEventListener('input', function() {
            trainer._pokemons[pokemonPosition].attributes[i] = this.textContent;
            localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
        });
    }

    let evsDiv = createElementClassIdFather("div", "evs", null, insideThirdToken);

    for (let i = 0; i < 6; i++) {
        let evDiv = createElementClassIdFather("div", "ev", null, evsDiv);
        
        let attribute = createElementClassIdFather("div", "ev-text", null, evDiv);
        attribute.textContent = attributes[i];
        
        let value = createElementClassIdFather("div", "ev-value", null, evDiv);
        value.textContent = trainer._pokemons[pokemonPosition].evs[i];
        value.contentEditable = true;
        value.spellcheck = false;
        value.addEventListener('input', function() {
            trainer._pokemons[pokemonPosition].evs[i] = this.textContent;
            localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
        });
    }

    let insideFourthToken = createElementClassIdFather("div", "stats", null, token);

    let insideFourthTokenInfo = createElementClassIdFather("div", "info", null, insideFourthToken);
    insideFourthTokenInfo.textContent = "Stats";

    let canvasContainer = createElementClassIdFather("div", "canvas-container", null, insideFourthToken);
    
    let stats = createElementClassIdFather("canvas", null, "myChart", canvasContainer);
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

    let imageCont = createElementClassIdFather("div", "pokemon-sprite-Container", null, insideFourthToken);

    let image = createElementClassIdFather("img", "pokemon-sprite", null, imageCont);
    image.src = trainer._pokemons[pokemonPosition].gif;
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

    let insideFirstToken = createElementClassIdFather("div", "start", null, token);

    let insideFirstTokenInfo = createElementClassIdFather("div", "info", null, insideFirstToken);
    insideFirstTokenInfo.textContent = "Info";

    let p = createElementClassIdFather("p", "pokemon-field-text creation-start", null, insideFirstToken);
    let b = createElementClassIdFather("b", null, null, p);
    b.textContent = "Species:";
    let name = createElementClassIdFather("div", "creation-start pokemon-field-answear", null, insideFirstToken);
    name.textContent = "Insert the specie's name here...";
    name.contentEditable = true;
    name.spellcheck = false;

    createBoldParagraph(insideFirstToken, "Nickname:");
    let nickName = createElementClassIdFather("div", "pokemon-field-answear", null, insideFirstToken);
    nickName.textContent = "???";
    nickName.contentEditable = true;
    nickName.spellcheck = false;
    
    createBoldParagraph(insideFirstToken, "Level:");
    let level = createElementClassIdFather("div", "pokemon-field-answear", null, insideFirstToken);
    level.textContent = "1";
    level.contentEditable = true;
    level.spellcheck = false;

    createBoldParagraph(insideFirstToken, "Gender:");
    let gender = createElementClassIdFather("div", "pokemon-field-answear", null, insideFirstToken);
    gender.textContent = "Choose between M, F or None";
    gender.ariaPlaceholder = "inser babies";
    gender.contentEditable = true;
    gender.spellcheck = false;

    createBoldParagraph(insideFirstToken, "Ability:");
    let ability = createElementClassIdFather("div", "pokemon-field-answear", null, insideFirstToken);
    ability.textContent = "Insert its ability here...";
    ability.classList.add("ability");
    ability.contentEditable = true;
    ability.spellcheck = false;

    createBoldParagraph(insideFirstToken, "Nature:");
    let nature = createElementClassIdFather("div", "pokemon-field-answear", null, insideFirstToken);
    nature.textContent = "Inset its nature here...";
    nature.classList.add("nature");
    nature.contentEditable = true;
    nature.spellcheck = false;

    createBoldParagraph(insideFirstToken, "Held item:");
    let heldItem = createElementClassIdFather("div", "pokemon-field-answear", null, insideFirstToken);
    heldItem.textContent = "None";
    heldItem.contentEditable = true;
    heldItem.spellcheck = false;

    let insideSecondToken = createElementClassIdFather("div", "moves-container", null, token);

    let insideSecondTokenInfo = createElementClassIdFather("div", "info", null, insideSecondToken);
    insideSecondTokenInfo.textContent = "Moves";

    let moves = createElementClassIdFather("div", "moves", null, insideSecondToken);

    let movesValue = [];
    for (let i = 0; i < 4; i++) {
        let move = createElementClassIdFather("div", "move", null, moves);
        move.textContent = `Move #${i + 1}`;
        movesValue[i] = move;
        move.contentEditable = true;
        move.spellcheck = false;
    }

    let insideThirdToken = createElementClassIdFather("div", "ivs-container", null, token);

    let insideThirdTokenInfo = createElementClassIdFather("div", "info", null, insideThirdToken);
    insideThirdTokenInfo.textContent = "IVs / EVs";

    let ivButton = createElementClassIdFather("button", "iv-button", null, insideThirdToken);

    let leftbutton = createElementClassIdFather("button", "left-button", null, ivButton);
    leftbutton.textContent = "IVs";
    leftbutton.onclick = function() {
        let father = ivButton.parentElement;
        ivButton.children[1].classList.remove("active");
        father.children[3].classList.remove("show");
        ivButton.children[2].classList.remove("active");
        father.children[4].classList.remove("show");
        ivButton.children[0].classList.add("active");
        father.children[2].classList.add("show");
    }

    let attbutton = createElementClassIdFather("button", "att-button", null, ivButton);
    attbutton.textContent = "Stats";
    attbutton.classList.add("active");
    attbutton.onclick = function() {
        let father = ivButton.parentElement;
        ivButton.children[0].classList.remove("active");
        father.children[2].classList.remove("show");
        ivButton.children[2].classList.remove("active");
        father.children[4].classList.remove("show");
        ivButton.children[1].classList.add("active");
        father.children[3].classList.add("show");
    }

    let righbutton = createElementClassIdFather("button", "right-button", null, ivButton);
    righbutton.textContent = "EVs";
    righbutton.onclick = function() {
        let father = ivButton.parentElement;
        ivButton.children[0].classList.remove("active");
        father.children[2].classList.remove("show");
        ivButton.children[1].classList.remove("active");
        father.children[3].classList.remove("show");
        ivButton.children[2].classList.add("active");
        father.children[4].classList.add("show");
    }

    let ivsDiv = createElementClassIdFather("div", "ivs", null, insideThirdToken);

    let attributes = ["HP", "Attack", "Defense", "S.Atk", "S.Def", "Speed"];

    let ivs = [];
    for (let i = 0; i < 6; i++) {
        let ivDiv = createElementClassIdFather("div", "ev", null, ivsDiv);

        let attribute = createElementClassIdFather("div", "iv-text", null, ivDiv);
        attribute.textContent = attributes[i];

        let value = createElementClassIdFather("div", "iv-value", null, ivDiv);
        ivs[i] = value;
        value.textContent = "0";
        value.contentEditable = true;
        value.spellcheck = false;
    }

    let attDiv = createElementClassIdFather("div", "ivs show", null, insideThirdToken);

    let stats = [];
    for (let i = 0; i < 6; i++) {
        let evDiv = createElementClassIdFather("div", "ev", null, attDiv);

        let attribute = createElementClassIdFather("div", "ev-text", null, evDiv);
        attribute.textContent = attributes[i];

        let value = createElementClassIdFather("div", "ev-value", null, evDiv);
        stats[i] = value;
        value.textContent = "0";
        value.contentEditable = true;
        value.spellcheck = false;
    }

    let evsDiv = createElementClassIdFather("div", "evs", null, insideThirdToken);
    
    let evs = [];
    for (let i = 0; i < 6; i++) {
        let evDiv = createElementClassIdFather("div", "ev", null, evsDiv);

        let attribute = createElementClassIdFather("div", "ev-text", null, evDiv);
        attribute.textContent = attributes[i];

        let value = createElementClassIdFather("div", "ev-value", null, evDiv);
        evs[i] = value;
        value.textContent = "0";
        value.contentEditable = true;
        value.spellcheck = false;
    }

    let createButton = createElementClassIdFather("button", "create-button", null, insideThirdToken);
    createButton.textContent = "CREATE";
    
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
    
    let insideToken = createElementClassIdFather("div", "player-Filled", null, token);
  
    let left = createElementClassIdFather("div", "player-Filled-Left", null, insideToken);

    let leftInside = createElementClassIdFather("div", "player-Filled-Left-Inside", null, left);

    let leftImageContainer = createElementClassIdFather("div", "player-Filled-Left-Inside-Image-Container", null, leftInside);

    let leftImage = createElementClassIdFather("img", "player-Filled-Left-Inside-Image", null, leftImageContainer);
    leftImage.src = trainer._image;

    let HPContainer = createElementClassIdFather("div", "player-Filled-Left-Inside-HP-Container", null, leftInside);

    let HP = createElementClassIdFather("div", "player-Filled-Left-Inside-HP", null, HPContainer);
    HP.textContent = "HP";

    let HPValue = createElementClassIdFather("div", "player-Filled-Left-Inside-HP-Value", null, HP);
    HPValue.textContent = `${trainer._HP}`;
    HPValue.contentEditable = true;
    HPValue.spellcheck = false;
    HPValue.addEventListener('input', function() {
        trainer._HP = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let WILLContainer = createElementClassIdFather("div", "player-Filled-Left-Inside-WILL-Container", null, leftInside);

    let WILL = createElementClassIdFather("div", "player-Filled-Left-Inside-WILL", null, WILLContainer);
    WILL.textContent = "WILL";

    let WILLValue = createElementClassIdFather("div", "player-Filled-Left-Inside-WILL-Value", null, WILL);
    WILLValue.textContent = `${trainer._WILL}`;
    WILLValue.contentEditable = true;
    WILLValue.spellcheck = false;
    WILLValue.addEventListener('input', function() {
        trainer._WILL = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let right = createElementClassIdFather("div", "player-Filled-Right", null, insideToken);

    let rightInside = createElementClassIdFather("div", "player-Filled-Right-Inside", null, right);

    let rightInsideTop = createElementClassIdFather("div", "player-Filled-Right-Inside-Top", null, right);

    let rightInsideContainer = createElementClassIdFather("div", "player-Filled-Right-Inside-Top-Div", null, rightInsideTop);

    let GuildImage = createElementClassIdFather("img", "player-Filled-Right-Inside-Top-Guild-Image", null, rightInsideContainer);
    GuildImage.src = "./Assets/Images/leagueSymbol.png";

    let titleContainer = createElementClassIdFather("div", "player-Filled-Right-Inside-Title-Container", null, rightInsideContainer);

    let title = createElementClassIdFather("h1", "player-Filled-Right-Inside-Title", null, titleContainer);
    title.textContent = "POKÉMON LEAGUE";

    let rankContainer = createElementClassIdFather("div", "player-Filled-Right-Inside-Rank", null, titleContainer);

    let rankContainerText = createElementClassIdFather("p", "player-Filled-Right-Inside-Rank-Text", null, rankContainer);
    rankContainerText.textContent = `Trainer's Rank:`;

    let rankValue = createElementClassIdFather("p", "player-Filled-Right-Inside-Rank-Value", null, rankContainer);
    rankValue.textContent = `${trainer._rank}`;
    rankValue.contentEditable = true;
    rankValue.spellcheck = false;
    rankValue.addEventListener('input', function() {
        trainer._rank = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let player = createElementClassIdFather("div", "player-Filled-Right-Inside-Player-Container", null, rightInside);

    let playerName = createElementClassIdFather("div", "token-Spam-Text-Content", null, player);
    playerName.textContent = `PLAYER:`;

    let playerNameContainer = createElementClassIdFather("div", "player-Filled-Right-Inside-Player-Name", null, player);
    playerNameContainer.appendChild(playerName);
    createTextContent(playerNameContainer, `${trainer._player}`);
    playerNameContainer.children[1].contentEditable = true;
    playerNameContainer.children[1].spellcheck = false;
    playerNameContainer.children[1].addEventListener('input', function() {
        trainer._player = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let playerConcept = createElementClassIdFather("div", "token-Spam-Text-Content", null, player);
    playerConcept.textContent = `CONCEPT:`;

    let playerConceptContainer = createElementClassIdFather("div", "player-Filled-Right-Inside-Player-Concept", null, player);
    playerConceptContainer.appendChild(playerConcept);
    createTextContent(playerConceptContainer, `${trainer._concept}`);
    playerConceptContainer.children[1].contentEditable = true;
    playerConceptContainer.children[1].spellcheck = false;
    playerConceptContainer.children[1].addEventListener('input', function() {
        trainer._concept = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let rightInsideName = createElementClassIdFather("div", "player-Filled-Right-Inside-Name", null, rightInsideTop);

    let trainerName = createElementClassIdFather("div", "token-Spam-Text-Content small-Spam-Text-Content", null, rightInsideName);
    trainerName.textContent = `TRAINER:`;
    
    let trainerNameContainer = createElementClassIdFather("div", "player-Filled-Right-Inside-Player", null, rightInsideName);
    trainerNameContainer.appendChild(trainerName);
    createTextContent(trainerNameContainer, `${trainer._name}`);
    trainerNameContainer.children[1].contentEditable = true;
    trainerNameContainer.children[1].spellcheck = false;
    trainerNameContainer.children[1].addEventListener('input', function() {
        trainer._name = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let trainerAge = createElementClassIdFather("div", "token-Spam-Text-Content small-Spam-Text-Content", null, rightInsideName);
    trainerAge.textContent = `AGE:`;

    let trainerAgeContainer = createElementClassIdFather("div", "player-Filled-Right-Inside-Age", null, rightInsideName);
    trainerAgeContainer.appendChild(trainerAge);
    createTextContent(trainerAgeContainer, `${trainer._age}`);
    trainerAgeContainer.children[1].contentEditable = true;
    trainerAgeContainer.children[1].spellcheck = false;
    trainerAgeContainer.children[1].addEventListener('input', function() {
        trainer._age = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let natureContainer = createElementClassIdFather("div", "player-Filled-Right-Inside-Nature-Container", null, rightInside);

    let rightInsideNature = createElementClassIdFather("div", "player-Filled-Right-Inside-Nature", null, natureContainer);

    let natureValue = createElementClassIdFather("div", "token-Spam-Text-Content", null, rightInsideNature);
    natureValue.textContent = `NATURE:`;
    
    let natureValueContainer = createElementClassIdFather("div", "player-Filled-Right-Inside-Nature-Value", null, rightInsideNature);
    natureValueContainer.appendChild(natureValue);
    createTextContent(natureValueContainer, `${trainer._nature}`);
    natureValueContainer.children[1].contentEditable = true;
    natureValueContainer.children[1].spellcheck = false;
    natureValueContainer.children[1].addEventListener('input', function() {
        trainer._nature = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let confidenceContainer = createElementClassIdFather("div", "player-Filled-Right-Inside-Confidence-Value-Container", null, rightInsideNature);
    confidenceContainer.textContent = `Confidence:`;

    let confidence = createElementClassIdFather("div", "player-Filled-Right-Inside-Confidence-Value", null, confidenceContainer);
    confidence.textContent = `${trainer._confidence}`;
    confidence.contentEditable = true;
    confidence.spellcheck = false;
    confidence.addEventListener('input', function() {
        trainer._confidence = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let moneyText = createElementClassIdFather("div", "token-Spam-Text-Content", null, natureContainer);
    moneyText.textContent = `MONEY:`;

    let money = createElementClassIdFather("div", "player-Filled-Right-Inside-Money", null, natureContainer);
    money.appendChild(moneyText);
    createTextContent(money, `${trainer._money}`);
    money.children[1].contentEditable = true;
    money.children[1].spellcheck = false;
    money.children[1].addEventListener('input', function() {
        trainer._money = this.textContent;
        localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
    });

    let teamContainer = createElementClassIdFather("div", "player-Filled-Right-Inside-Pokemons", null, rightInside);

    for(let k = 0; k < 6; k++) {
        let teamNicknames = createElementClassIdFather("div", "player-Filled-Right-Inside-Pokemons-Nicknames", null, teamContainer);
        let img = createElementClassIdFather("img", "pokemonIcon", null, teamNicknames);
        img.src = "./Assets/Images/capturedPokemon.png";

        if (trainer._pokemons[k]) {
            let name = createElementClassIdFather("p", "pokemonNickname", null, teamNicknames);
            name.textContent = `${trainer._pokemons[k].nickname}`;
            name.contentEditable = true;
            name.spellcheck = false;
            name.addEventListener('input', function() {
                trainer._pokemons[k].nickname = this.textContent;
                localStorage.setItem(`object${trainer.index}`, JSON.stringify(trainer));
            });
        }
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