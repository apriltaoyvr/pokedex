import Link from 'next/link';
import { Card, Text, Image, Badge, Row } from '@nextui-org/react';

export default function PokeCard({ name, image, types, id }: PokeCard) {
  function typeColor(type: string) {
    switch (type) {
      case 'grass':
        return '$green500';
      case 'water':
        return '$blue500';
      case 'ice':
        return '$cyan600';
      case 'electric':
        return '$yellow700';
      case 'ground':
        return '$yellow500';
      case 'rock':
        return '$yellow200';
      case 'psychic':
        return '$red700';
      case 'poison':
        return '$purple500';
      case 'ghost':
        return '$purple300';
      case 'flying':
        return '$purple800';
      case 'fighting':
        return '$red500';
      case 'fairy':
        return '$pink800';
      case 'steel':
        return '$gray500';
      case 'bug':
        return '#a8b820';
      case 'dragon':
        return '#7038f8';
      case 'dark':
        return '#705848';
      case 'normal':
        return '#a8a878';
      case 'fire':
        return '#f08030';
      default:
        return 'default';
    }
  }

  return (
    <Link href={`/pokemon/${name}/`}>
      <Card isHoverable isPressable css={{ minWidth: '250px' }}>
        <Card.Header css={{ display: 'flex', justifyContent: 'center' }}>
          <Text h2 transform='capitalize'>
            {name}
          </Text>
        </Card.Header>
        <Card.Body
          css={{
            py: '$10',
            display: 'flex',
            placeContent: 'center',
            alignContent: 'center',
          }}
        >
          <Image
            src={image}
            alt={name}
            width={96}
            height={96}
            showSkeleton
            maxDelay={10000}
          />
          <Text></Text>
        </Card.Body>
        <Card.Footer>
          <Row justify='center' gap={2}>
            {types.map((type) => (
              <Badge
                disableOutline
                size='lg'
                css={{
                  textTransform: 'capitalize',
                  mx: 2,
                  backgroundColor: `${typeColor(type.type.name)}`,
                }}
                key={`${name + type.type.name + id}`}
              >
                {type.type.name}
              </Badge>
            ))}
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  );
}
