'use client';
import { Container, Loading as Loader } from '@nextui-org/react';

export default function Loading() {
  return (
    <Container
      fluid
      css={{ minHeight: '80vh' }}
      display='flex'
      justify='center'
      alignContent='center'
    >
      <Loader type='gradient'/>
    </Container>
  );
}