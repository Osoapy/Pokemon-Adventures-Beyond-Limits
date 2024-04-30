/* DECLARING FUNCTIONS */
function noSpace(string) {
    return string.replace(/\s/g, " ");
}

/* EXPORTING FUNCTIONS*/
export function createPlayer(nome, source) {
    let main = document.getElementById("main");
    let id = noSpace(nome);

    let personagemContainer = document.createElement("div");
    personagemContainer.classList.add("personagem-container");
    personagemContainer.id = `${id}-container`; 
    main.appendChild(personagemContainer);

    let personagem = document.createElement("div");
    personagem.classList.add("personagem");
    personagem.id = id;
    personagemContainer.appendChild(personagem);

    let topcontainer = document.createElement("header");
    topcontainer.classList.add("top-container");
    personagem.appendChild(topcontainer);

    let imagem = document.createElement("img");
    imagem.classList = "personagemImg";
    imagem.id = `personagem${id}`;
    imagem.src = source;
    topcontainer.appendChild(imagem);

    let personagemtop = document.createElement("div");
    personagemtop.classList.add("personagem-top");
    topcontainer.appendChild(personagemtop);

    let nomeP = document.createElement("h1");
    nomeP.textContent = nome;
    personagemtop.appendChild(nomeP);

    let underline = document.createElement("div");
    underline.classList.add("underline");
    personagemtop.appendChild(underline);

    let timePokemonContainer = document.createElement("div");
    timePokemonContainer.classList.add("timePokemon-container");
    personagem.appendChild(timePokemonContainer);

    for (let i = 0; i <= 5; i++) {
        let divTime = document.createElement("button");
        divTime.classList.add("timePokemon");
        divTime.id = `Player${id}TimeBotao${i}`;
        timePokemonContainer.appendChild(divTime);

        divTime.onclick = function() {
            console.log("ping"); // LOG
        }

        let TimeImagem = document.createElement("img");
        TimeImagem.classList.add("timePokemonImagem");
        TimeImagem.id = `Player${id}TimeImagem${i}`;
        divTime.appendChild(TimeImagem);
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