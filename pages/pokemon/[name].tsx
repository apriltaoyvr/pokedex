import { Container, Card, Text, Image } from '@nextui-org/react';
import allPokemon from '@/api/pokemon';
import Types from '@/components/Types';

export async function getServerSideProps(context: any) {
  console.log(context.params.name);
  const data = await allPokemon.getPokemonByName(context.params.name);
  return { props: { data } };
}

export default function PokemonPage({ data }: any) {

  return (
    <Container responsive>
      <Card>
        <Card.Header css={{ display: 'flex', justifyContent: 'center'}}>
          <Text h2 transform='capitalize' >
            {data.name}
          </Text>
        </Card.Header>
        <Card.Body>
          <Image
            src={data.sprites.front_default}
            alt={data.name}
            width={96}
            height={96}
            showSkeleton
            maxDelay={10000}
            draggable={false}
          />
          <Text></Text>
        </Card.Body>
        <Card.Footer>
          <Types types={data.types}></Types>
        </Card.Footer>
      </Card>
    </Container>
  );
}
