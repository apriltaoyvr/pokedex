interface Directory {
  count: number;
  next: string | null;
  previous: string | null;
  results: [{ name: string; url: string }];
}

interface Pokemon {
  name: string;
  id: string;
  image: string;
  types: [{ slot: number; name: string }];
  description: pSpecies.flavor_text_entries[0];
  is_default?: boolean;
}
