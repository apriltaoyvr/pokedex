'use client';
import { Container } from '@nextui-org/react';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container md>{children}</Container>;
}
