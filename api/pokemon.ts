const perPage = 100;


class Pokedex{
  constructor(){
    this._pokemon = []
  }

  get pokemon(){
    return this._pokemon
  }

  push(data){
    this._pokemon.push(...data)
    this.onChange();
  }

  onChange() {
    // This is intentional
  }
}


let allPokemon = new Pokedex();

async function fetchData() {
 for (let i = 0; i < 12; i++) {
    allPokemon.push(await fetchPage(i));
    await delay(2000);
 }
}

async function fetchPage(page) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page*perPage}&limit=${perPage}`);
  const data = await response.json();

  for (let result of data.results) {
    result.data = await fetch(result.url).then(response => response.json());
  }

  return data.results;
}

async function delay(ms: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}
fetchData();
export default allPokemon;