interface Directory {
  count: number;
  next: string | null;
  previous: string | null;
  results: [{ name: string; url: string }];
}

interface PokemonBasic {
  name: string;
  description: pSpecies.flavor_text_entries[0];
  id: string;
  image: string;
  types: [{ slot: number; name: string }];
  is_default: boolean;
}

type PokemonDetailed = PokemonBasic & FormsEvolutions;

interface FormsEvolutions {
  evolves_from: string | null;
  evolves_to: [
    evolves_to: {
      species: string;
      url: string;
    }
  ];
  evolves_final: string | null;
  varieties: [{ name: string; url: string }];
}