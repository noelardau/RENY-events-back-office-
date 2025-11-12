import { Button, Container, Flex, Text, Title } from "@mantine/core";
import { Link } from "react-router";
import { EventsGrid } from "~/components/EventsGrid";
import { routeProtection } from "~/utils/routeProtection";


export async function loader(){

 routeProtection()



}


export default function Evenements() {
  return (
    <Container size="md" my="md" p={100}>
     <Flex justify="space-between">


      <Title c="red" size="md">Liste des évènements</Title>
       {/* <Button variant="outline" color='red' size="xl" radius="xl" className={classes.control}>
          Se connecter
        </Button> */}

      <Link to={"new"} children={

      <Button variant="outline" color="red" >+ Nouveau</Button>
      }></Link>


     </Flex>
        
        <EventsGrid/>

    </Container>
  );
}