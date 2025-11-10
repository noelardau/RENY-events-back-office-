import { Button, Container, Flex, Loader, Text, Title } from "@mantine/core";
import type { Route } from "./+types/listeResa";
import { TableResa } from "~/components/TableResa";
import { useQueryGet } from "~/hooks/useQueryGet";
import { Link } from "react-router";
import { IconArrowLeft } from "@tabler/icons-react";

export const loader = async ({params}:Route.LoaderArgs) => params.eventId 

export default function ListResa({loaderData}:Route.ComponentProps){

    const {data, error, isPending} = useQueryGet(['resa'], "https://backend-reny-event.onrender.com/v1/evenements/reservations/"+loaderData)
    
    console.log(data)

    if(error){ 
        return <Container size="md" p="100">
            <div>Une erreur est survenue : {error.message}</div>
        </Container>
     }

     if(isPending){
        return <Container size="md" p="100">
            <div>Chargement...</div>
        </Container>
     }  


    return <Container my="md" size="md" pt={100}>
       
         <Flex justify="space-between">

 <Link to={"/event/"+data.evenement_id} children={<IconArrowLeft size={18} color="red" />} />



      <Title c={"red"} size="md">Liste des réservations</Title>

      <Link to={"new"} children={

      <Button color="red" variant="outline" >+ Nouveau</Button>
      }></Link>
         </Flex >
       
        <TableResa reservations={data.reservations}></TableResa>
        

    </Container>
}