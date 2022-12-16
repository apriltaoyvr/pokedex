const perPage = 100;

class Pokedex {
  _pokemon: any[];

  _pokemonByName: { name: string};

  constructor() {
    this._pokemon = [];
    this._pokemonByName = {name: ''};
  }

  get pokemon() {
    return this._pokemon;
  }

  async getPokemonByName(name: string) {
    //@ts-ignore
    if (this._pokemonByName[name]) return this._pokemonByName[name];

    const pokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}/`
    ).then((r) => r.json());
    //@ts-ignore
    this._pokemonByName[name] = pokemon;
    return pokemon;
  }

  push(data: any) {
    this._pokemon.push(
      ...data.filter(
        (item: { is_default: boolean }) => item.is_default === true
      )
    );
    data.forEach((element: any) => {
      //@ts-ignore
      this._pokemonByName[element.name] = element;
    });
    this.onChange();
  }

  onChange() {
    // This is intentional
  }
}

let allPokemon = new Pokedex();

async function fetchData(onStep = () => {}) {
  for (let i = 0; i < 12; i++) {
    allPokemon.push(await fetchPage(i));
    onStep();
    await delay(2000);
  }
}

export async function fetchPage(page: any) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${
      page * perPage
    }&limit=${perPage}`
  );
  const data = await response.json();

  const output = [];
  for (let result of data.results) {
    const pData = await fetch(result.url).then((response) => response.json());
    output.push({ ...result, ...pData });
  }

  return output;
}

async function delay(ms: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}
fetchData();
export default allPokemon;
