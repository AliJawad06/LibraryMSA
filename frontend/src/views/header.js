import { useState } from 'react';
import { Container, Group, Burger, AppShell, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './HeaderSimple.module.css';

const links = [
  { link: '/books', label: 'Books' },
  { link: '/sign-up', label: 'Sign Up' },
  { link: '/sign-in', label: 'Sign In' },
  { link: '/resources', label: 'Resources' },

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
    <AppShell
      header={{ 
        height: 80
      }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="lg"
      withBorder={false}
    >
      <AppShell.Header  >
      <Flex
      mih={0}
      
      justify="flex-end"
      
    >
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        
        />
      </Flex>
         <Container size="md" className={classes.inner}>
      <img src='uncmsa-LOGO.png'/>
        <Group gap={5} visibleFrom="sm">
          {items}
        </Group>
      </Container>
      </AppShell.Header>
      {
      opened && 
      <AppShell.Navbar p="md"> 
      <Group gap={5} display={'table-column'} >
          {items}
        </Group>
      </AppShell.Navbar>
      }

</AppShell>

  );
}