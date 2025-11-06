import { Container, Flex, Loader, Text } from "@mantine/core";
import type { Route } from "./+types/listeResa";
import { TableResa } from "~/components/TableResa";
import { useQueryGet } from "~/hooks/useQueryGet";

export const loader = async ({params}:Route.LoaderArgs) => params.eventId 

export default function ListResa({loaderData}:Route.ComponentProps){

    const {data, error, isPending} = useQueryGet(['resa'], "http://localhost:4000/v1/evenements/reservations/"+loaderData)
    
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
       
          <div className="flex">
        <Text>Liste des réservations</Text>
        
        </div>
       
        <TableResa reservations={data.reservations}></TableResa>
        

    </Container>
}