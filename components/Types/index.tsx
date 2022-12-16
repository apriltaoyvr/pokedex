import React from 'react';
import { Badge, Row } from '@nextui-org/react';

export default function Types({ types }: any) {
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
    <Row justify='center' gap={2}>
      {types.map((type: any) => (
        <Badge
          disableOutline
          size='lg'
          css={{
            textTransform: 'capitalize',
            mx: 2,
            backgroundColor: `${typeColor(type.type.name)}`,
          }}
          key={`${type.type.name}`}
        >
          {type.type.name}
        </Badge>
      ))}
    </Row>
  );
}
