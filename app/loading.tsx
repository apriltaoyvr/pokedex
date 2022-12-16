'use client';
import { Container, Progress } from '@nextui-org/react';

export default function Loading() {
  return (
    <Container
      fluid
      css={{ minHeight: '80vh' }}
      display='flex'
      justify='center'
      alignContent='center'
    >
      <Progress shadow indeterminated value={50} color='gradient' />
    </Container>
  );
}
