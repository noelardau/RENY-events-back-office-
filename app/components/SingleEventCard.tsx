import { IconArrowLeft, IconEdit, IconList, IconTagPlus } from '@tabler/icons-react';
import { Modal, Badge, Button, Card, Group, Image, Text, SimpleGrid, AspectRatio } from '@mantine/core';
import { StatEvent } from './StatEvent';
import classes from '../styles/SingleEventCard.module.css';
import { useState } from 'react';
import { ReservationForm } from './ReservationFrom';
import { Link } from 'react-router';

import { useQueryPost } from '~/hooks/useQueryPost';




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
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Link to={"/event"} >
            <IconArrowLeft size={18} color='red' to={"/"} />
          </Link>
          <Text fz="lg" fw={500}>
            {event.titre}
          </Text>
          <Badge size="sm" variant="light">
            {event.type_evenement.type_evenement_nom}
          </Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {/* {event.description_evenement} */}
          <p>Lorem ipsum dolor sit amet. Ut cupiditate sapiente id possimus eius eum ducimus perspiciatis sed magnam quaerat et porro cumque aut reiciendis laboriosam quo galisum nulla. Qui rerum nihil aut omnis internos et harum dolores qui nulla unde. </p><p>Cum accusantium sunt in quaerat enim cum iusto magni eum voluptatem voluptatem sed quidem unde nam eaque alias sed iste veniam. Eos dolorum asperiores et omnis pariatur non dolor sint sed excepturi voluptatem et laudantium dolore. </p>

        </Text>
      </Card.Section>
      <Card.Section>
        <AspectRatio ratio={1920 / 1080}>
                <Image src={'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'} h={250} />
              </AspectRatio>
      </Card.Section>

{/* 
      <Card.Section className={classes.section}>
        <StatEvent/>
      </Card.Section> */}

      <SimpleGrid mt="xs" cols={{ base: 1, sm: 3 }}>
        <Button leftSection={
          <IconTagPlus size={18} />
        } radius="md" color='green' onClick={() => setOpened(true)} style={{ flex: 1 }}>
          Faire une réservation
        </Button>
        <Button leftSection={
          <IconList size={18} />
        } radius="md" color='red' style={{ flex: 1 }}>
       <Link  to={"/resa/"+ event.evenement_id} children={
          <Text visibleFrom='sm'> Voir les réservations</Text>

       }/>
        </Button>
        <Button leftSection={
          <IconEdit className={classes.like} stroke={1.5} />
        } 
        radius="md" onClick={() => setOpened(true)} style={{ flex: 1 }}>
       <Text visibleFrom='sm'> Modifier</Text>
        </Button>
        {/* <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className={classes.like} stroke={1.5} />
          </ActionIcon> */}
      </SimpleGrid>
    </Card>
          </>
  );
}