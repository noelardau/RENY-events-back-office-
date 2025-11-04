import { Container, Text } from "@mantine/core";
import type { Route } from "./+types/listeResa";
import { TableResa } from "~/components/TableResa";

export async function loader({params}:Route.LoaderArgs){
    let reservation = [
        {idEvent: params.eventId, nomClient: "FIDY", prenomClient: "Jo", typePlace: "VIP", nbPlace:1, valide: false},
        {idEvent: params.eventId, nomClient: "RAKOTO", prenomClient: "Joary", typePlace: "SIMPLE", nbPlace:3, valide: true},

    ]

}

export default function ListResa(){

    return <Container my="md" size="md" pt={100}>
        
        <div className="flex">
        <Text>Liste des réservations</Text>
        
        </div>

        <TableResa></TableResa>
    </Container>
}