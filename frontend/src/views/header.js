import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './HeaderSimple.module.css';

const links = [
  { link: '/books', label: 'Books' },
  { link: '/sign-up', label: 'Sign Up' },
  { link: '/sign-in', label: 'Sign In' },
  { link: '/', label: 'Home' },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();
        window.location.href = link.link
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
      <img src='uncmsa-LOGO.png'/>
      <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
       
      </Container>
    </header>
  );
}