import { IconHeart } from '@tabler/icons-react';
import { Modal, Badge, Button, Card, Group, Image, Text, SimpleGrid } from '@mantine/core';
import { StatEvent } from './StatEvent';
import classes from '../styles/SingleEventCard.module.css';
import { useState } from 'react';
import { ReservationForm } from './ReservationFrom';
import { Link } from 'react-router';

import { useQueryPost } from '~/hooks/useQueryPost';


const mockdata = {
  image:
    'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  title: 'Verudela Beach',
  country: 'Croatia',
  description:
    'Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.',
  badges: [
    { emoji: '☀️', label: 'Sunny weather' },
    { emoji: '🦓', label: 'Onsite zoo' },
    { emoji: '🌊', label: 'Sea' },
    { emoji: '🌲', label: 'Nature' },
    { emoji: '🤽', label: 'Water sports' },
  ],
};


export function SingleEventCard({event}) {
  // const { image, title, description, country, badges } = mockdata;

  const [opened, setOpened] = useState(false);

  // const features = badges.map((badge) => (
  //   <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
  //     {badge.label}
  //   </Badge>
  // ));

  
  let {mutate, error, isPending} =  useQueryPost("http://localhost:4000/v1/reservations")
  let saveResa = (newResa)=>{
    
  mutate(newResa)
}


  return ( 
    <>
    <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Réservez une ou plusieurs place"
        centered
      >
       <div>

        <ReservationForm evenement_id={event.evenement_id} onSubmit={saveResa}/>

       </div>
       
      </Modal>
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image alt={"title"} height={100} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {event.titre}
          </Text>
          <Badge size="sm" variant="light">
            {event.type_evenement.type_evenement_nom}
          </Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {event.description_evenement}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <StatEvent/>
      </Card.Section>

      <SimpleGrid mt="xs" cols={{ base: 1, sm: 3 }}>
        <Button radius="md" color='green' onClick={() => setOpened(true)} style={{ flex: 1 }}>
          Faire une réservation
        </Button>
        <Button radius="md" color='red' style={{ flex: 1 }}>
       <Link to={"/resa/"+ event.evenement_id} children={
          "Voir liste de réservation" 

       }/>
        </Button>
        <Button radius="md" onClick={() => setOpened(true)} style={{ flex: 1 }}>
          Modifier
        </Button>
        {/* <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className={classes.like} stroke={1.5} />
          </ActionIcon> */}
      </SimpleGrid>
    </Card>
          </>
  );
}