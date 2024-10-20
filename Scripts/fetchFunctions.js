// Change the source of an image element
export function alterImgSrc(img, src) {
    img.src = src;
}

// Fetch full Pokémon data
export async function Data(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error("Could not fetch resource");
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Fetch Pokémon sprite
export async function Sprite(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        if (!response.ok) throw new Error("Could not fetch resource");
        const data = await response.json();
        return data.sprites.front_default;
    } catch (error) {
        console.error(error);
    }
}

// Fetch Pokémon type
export async function Type(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        if (!response.ok) throw new Error("Could not fetch resource");
        const data = await response.json();
        return data.types[0].type.name;
    } catch (error) {
        console.error(error);
    }
}

// Fetch all moves and their types
export async function AllMoves() {
    const movesDict = {};
    const baseURL = `https://pokeapi.co/api/v2/move/`;

    try {
        // Fetch total number of moves
        const firstData = await (await fetch(baseURL)).json();
        const fullDataURL = `${baseURL}?offset=0&limit=${firstData.count}`;

        // Fetch all moves
        const data = await (await fetch(fullDataURL)).json();

        for (const move of data.results) {
            // Fetch details of each move
            const moveDetails = await (await fetch(move.url)).json();
            movesDict[moveDetails.name] = moveDetails.type.name;  // Store move name and type
        }

        console.log(movesDict);  // Log all moves and types
        return movesDict;
    } catch (error) {
        console.error('Error fetching moves:', error);
    }
}