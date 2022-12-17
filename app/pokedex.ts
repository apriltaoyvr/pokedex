import PokeAPI, {
  IFlavorText,
  INamedApiResourceList,
  IPokemon,
  IPokemonSprites,
} from 'pokeapi-typescript';
import { PokemonType } from '../types/api';

class Pokedex {
  _pokemonDirectory: INamedApiResourceList<IPokemon>;
  constructor() {
    //@ts-ignore
    this._pokemonDirectory = [
      {
        count: 0,
        previous: null,
        next: null,
        results: [{ name: '', url: '' }],
      },
    ];
  }

  async getDirectory() {
    this._pokemonDirectory = await PokeAPI.Pokemon.list(150, 0);
    // this._pokemonDirectory = await PokeAPI.Pokemon.listAll()
  }
}

class Pokemon {
  _name: PokemonType['name'];
  _id: PokemonType['id'];
  _image: IPokemonSprites['front_default'];
  _description: IFlavorText['flavor_text'];
  _types: PokemonType['types'];
  _is_default: PokemonType["is_default"];

  constructor() {
    this._name = '';
    this._id = 0;
    this._image = '';
    this._description = '';
    this._types = [{ slot: -1, type: { name: '', url: '' } }];
    this._is_default = false;
  }

  async getPokemon() {
    return await PokeAPI.Pokemon.fetch(this._name);
  }

  async getPokemonSpecies() {
    return await PokeAPI.PokemonSpecies.fetch(this._name);
  }

  async getPokemonEvolution() {
    // return await PokeAPI.EvolutionChain.fetch(this._id);
  }

  async getAllInfo() {
    const pokemonBasic = this.getPokemon();
    const pokemonSpecies = this.getPokemonSpecies();
    // const pokemonEvolution = this.getPokemonEvolution(this._id);
    const [basicData, speciesData] = await Promise.all([
      pokemonBasic,
      pokemonSpecies,
    ]);

    const object = { ...basicData, ...speciesData };
    return object;
  }
}
