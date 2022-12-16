let page = 0;
let perPage = 25;

export async function fetchPokemon(page: number, perPage: number) {
  const directory = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${
      page * perPage
    }&limit=${perPage}`
  );
  const data: Directory = await directory.json();

  const output: Pokemon[] = [];
  for (let result of data.results) {
    const pData = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${result.name}/`
    ).then((response) => response.json());
    const pSpecies = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${result.name}/`
    ).then((response) => response.json());

    const pokemon: Pokemon = {
      name: pData.name,
      id: pData.id,
      image: pData.sprites.front_default,
      is_default: pData.is_default,
      types: pData.types,
      description: pSpecies.flavor_text_entries,
    };

    output.push(pokemon);
  }

  return output;
}

export async function fetchPage(url: string) {
  const page = await fetch(url);
  const json = await page.json();
  return json;
}
