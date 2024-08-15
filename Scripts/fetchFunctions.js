export function alterImgSrc(img, src) {
    img.src = src;
}

export async function Data(pokemonName) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

      if (!response.ok) {
          throw new Error("Could not fetch resorce");
      }

      const data = await response.json();
      return data;
    }

    catch (error) {
        console.error(error);
    }
}

export async function Sprite(pokemonName) {
    try {
        pokemonName = pokemonName.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resorce");
        }

        const data = await response.json();
        return data.sprites.front_default;
    } catch (error) {
        console.error(error);
    }
}

export async function Type(pokemonName) {
    try {
        pokemonName = pokemonName.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Não foi possível obter o recurso");
        }

        const data = await response.json();
        return data.types[0]["type"]["name"];
    } catch (error) {
        console.error(error);
    }
}

export async function AllMoves() {
    const movesDict = {};
    let primitiveURL = `https://pokeapi.co/api/v2/move/`;

    try {
        // MAKE A REQUEST TO THE API
        const responseData = await fetch(primitiveURL);
        const firstData = await responseData.json();
        let URL = `https://pokeapi.co/api/v2/move/?offset=0&limit=${firstData.count}`;

        const response = await fetch(URL);
        const data = await response.json();

        for (const move of data.results) {
            console.log("no for");
            
            // Para cada ataque, faz uma requisição para obter detalhes adicionais
            const moveDetailsResponse = await fetch(move.url);
            const moveDetails = await moveDetailsResponse.json();

            // Obtém o nome e o tipo do ataque
            const moveName = moveDetails.name;
            const moveType = moveDetails.type.name;

            // Armazena no dicionário
            movesDict[moveName] = moveType;
        }

        console.log(movesDict); // Exibe o dicionário no console

        return movesDict;
    } catch (error) {
        console.error('Erro ao obter os ataques:', error);
    }
}