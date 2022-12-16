'use client';
import { Suspense } from 'react';
import { Grid, Card, Text, Image } from '@nextui-org/react';
import Types from '../Types';

const PokeCard = ({ name, image, types, id, description }: Pokemon) => {
  let languageArray = description.filter(
    (entry: any) => entry.language.name === 'en'
  );
  const singleDesc = languageArray[languageArray.length - 1].flavor_text;

  return (
    <Grid>
      <Card isHoverable isPressable css={{ mw: '400px' }}>
        <Card.Header
          css={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <Text h2 transform='capitalize'>
            {name}
          </Text>
          <Text h5>#{id}</Text>
        </Card.Header>
        <Suspense>
          <Card.Body css={{ textAlign: 'center' }}>
              <Image
                src={image}
                alt={name}
                width={96}
                height={96}
                css={{ mb: '$2' }}
              />
            <Text css={{ p: '$10' }}>{singleDesc}</Text>
          </Card.Body>
        </Suspense>
        <Card.Footer>
          <Types types={types} />
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default PokeCard;
