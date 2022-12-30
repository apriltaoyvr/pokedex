'use client'
import { Progress, Container } from '@nextui-org/react';

export default function Loading() {
  return (
    <Container
      fluid
      display='flex'
      justify='center'
      alignItems='center'
      alignContent='center'
      as='section'
    >
      <Progress
        indeterminated
        value={50}
        color='secondary'
        status='secondary'
      />
    </Container>
  );
}