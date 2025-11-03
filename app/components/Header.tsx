import { useState } from 'react';
import { Burger, Button, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../styles//HeaderSimple.module.css';
import { FiLogOut } from "react-icons/fi";
import { Form, Link } from 'react-router';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export function Header({isConnected}: {isConnected: boolean}) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        
        <Link to="/" className={classes.title}>RENY Events <br /> <span className={classes.title_second}>Back office</span> </Link>
        
        
        { isConnected ? 
         <Group gap={3} visibleFrom="xs">
          
         <Form method='POST'>
              <Button type='submit' color='none'><FiLogOut size={18} color='red' /></Button>
         </Form>
        </Group> 
        : 
        null
     }

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}