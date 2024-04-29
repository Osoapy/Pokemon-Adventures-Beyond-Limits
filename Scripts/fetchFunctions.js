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
            throw new Error("Não foi possível obter o recurso");
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