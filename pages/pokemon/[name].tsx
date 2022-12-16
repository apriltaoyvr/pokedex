import { Container, Card, Text } from '@nextui-org/react';
import allPokemon from '@/api/pokemon';

export async function getServerSideProps(context: any) {
  console.log(context.params.name);
  const data = await allPokemon.getPokemonByName(context.params.name);
  return { props: { data } };
}

export default function PokemonPage({ data }: any) {
  return (
    <Container responsive>
      <Card>
        <Card.Header>
          <Text h2 transform='capitalize'>
            {data.name}
          </Text>
        </Card.Header>
        <Card.Body>
          <Text>Default card. (shadow)</Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
