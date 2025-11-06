import { Button, Container, Flex, Text } from "@mantine/core";
import { Link } from "react-router";
import { EventsGrid } from "~/components/EventsGrid";


export async function loader(){

  return 



}


export default function Evenements() {
  return (
    <Container size="md" my="md" p={100}>
     <Flex justify="space-between">


      <Text color="red" size="md">Liste des évènements</Text>

      <Link to={"new"} children={

      <Button color="rgb(79, 70, 229)" >+ Nouveau</Button>
      }></Link>


     </Flex>
        
        <EventsGrid/>

    </Container>
  );
}