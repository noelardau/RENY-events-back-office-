import { Container, Flex, Loader, Text } from "@mantine/core";
import type { Route } from "./+types/listeResa";
import { TableResa } from "~/components/TableResa";

import { queryGet } from "~/hooks/queryGet";

export async function loader({params}:Route.LoaderArgs){

    return params.eventId
    
}


export default function ListResa({loaderData}:Route.ComponentProps){
    
    let {data, error,isPending} = queryGet(['reservations'], `http://localhost:8080/v1/evenements/reservations/${loaderData}`)
  
    if(error){
      return  <Container size="md" p="100">
        <div>Une erreur est survenue : {error.message}</div>
  
      </Container>
    }
  
    if(isPending){
      return <Container size="md" p="100">  
        <Flex justify="center" align="center" style={{ height: '100vh' }}>  
          <Loader size="lg" variant="dots" />
        </Flex>
      </Container>
  
  
    }

    


    return <Container my="md" size="md" pt={100}>
        
        <div className="flex">
        <Text>Liste des réservations</Text>
        
        </div>

        <TableResa resaData={data}></TableResa>
    </Container>
}