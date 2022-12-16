import Link from 'next/link';

export default async function Evolutions({
  evolves_from,
  evolves_to,
  evolves_final,
  varieties,
}: FormsEvolutions) {
  return (
    <main>
      {evolves_from && <Link href={`/${evolves_from}`}>{evolves_from}</Link>}
      {evolves_to &&
        evolves_to.map((evolution) => {
          return (
            <Link href={`/${evolution.species}`} key={evolution.species}>
              {evolution.species}
            </Link>
          );
        })}
      {evolves_final && <Link href={`/${evolves_final}`}>{evolves_final}</Link>}
      {varieties &&
        varieties.map((variety) => {
          return (
            <Link href={`/${variety.name}`} key={variety.name}>
              {variety.name}
            </Link>
          );
        })}
    </main>
  );
};

