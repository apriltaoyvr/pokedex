import { IPokemonType } from 'pokeapi-typescript';

const PokeTypes = ({ types }: {types: IPokemonType[]}) => {
  return (
    <footer className='m-2 flex flex-row place-content-center place-items-center gap-2 place-self-end capitalize'>
      {types.map((type) => (
        <figure
          key={type.type.name + type.slot}
          className={`bg-type-${type.type.name} rounded px-2.5 py-0.5 text-sm font-semibold shadow`}
        >
          <p className='text-neutral-800 transition-colors'>{type.type.name}</p>
        </figure>
      ))}
    </footer>
  );
};

export default PokeTypes;