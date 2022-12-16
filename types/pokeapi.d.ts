interface PokeCard {
  name: string;
  image: string;
  types: TypesArray[];
  id: number;
}

interface TypesArray {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
