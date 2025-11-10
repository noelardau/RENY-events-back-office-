import { useState } from 'react';
import { Modal, Button, Container, Group, Input, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../styles//HeaderSimple.module.css';
import { FiLogOut } from "react-icons/fi";
import { Form, Link, useLocation } from 'react-router';
import { AddMenu } from './AddMenu';
import {user} from "~/db/user";


const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export function Header({isConnected}: {isConnected: boolean}) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

   const location = useLocation().pathname
    const [openedModal, setOpened] = useState(false);

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
       <Modal
              opened={openedModal}
              onClose={() => setOpened(false)}
              centered
            >
              <Text>Voulez-vous vraiment vous déconnecter ?</Text>
              <Group justify="flex-end" mt="md">
                <Button variant="subtle" onClick={() => setOpened(false)}>
                  Annuler
                </Button>
                <Form method='POST' onClick={() => setOpened(false)}>
                <Button type='submit' color='red'>Confirmer</Button>
                </Form>
              
              </Group>
            </Modal>
      <Container size="md" className={classes.inner}>
        
        <Link to="/" className="text-xl font-bold text-red-600">RENY Events {user.isConnected ?  <div> <br /> <span className={classes.title_second}>Back office</span> </div> : null} </Link>
        { location === "/events" ? 
         <Group gap={3} >
          
         <Form method='POST'>
              <Input type='search' placeholder='rechercher un évènement' visibleFrom='xs'/> 
         </Form>
        </Group> 
        : 
        null
     }
        
        { isConnected ? 
        //  <Group gap={3} visibleFrom="xs">
         <Group gap={3} >
          
        
              <Button onClick={()=> setOpened(true)} color='none'><FiLogOut size={18} color='red' /></Button>
         
        </Group> 
        : 
        null
     }

        {/* <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" /> */}
      </Container>
    </header>
  );
}