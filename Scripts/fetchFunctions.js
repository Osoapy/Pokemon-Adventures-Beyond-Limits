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

export async function MoveType(moveName) {
    if (moveName) {
        try {
            moveName = moveName.toLowerCase().replace(/ /g, '-');

            const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);

            if (!response.ok) {
                throw new Error("Could not fetch resorce");
            }

            const data = await response.json();
            return data.type.name;
        } catch (error) {
            console.error(error);
        }
    }
}

export async function AllMoves() {
    try {
        const initialResponse = await fetch(`https://pokeapi.co/api/v2/move/?offset=0&limit=1`);
        
        if (!initialResponse.ok) {
            throw new Error("Could not fetch resorce");
        }

        const initialData = await initialResponse.json();
        const limit = initialData.count;

        const finalResponse = await fetch(`https://pokeapi.co/api/v2/move/?offset=0&limit=${limit}`);

        if (!finalResponse.ok) {
            throw new Error("Could not fetch resorce");
        }

        const finalData = await finalResponse.json();
        let result = [];
        for (let i = 0; i < limit; i++) {
            result[i] = finalData.results[i].name;
        }
        return result;
    } catch (error) {
        console.error(error);
    }
}