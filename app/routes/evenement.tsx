import { Container } from "@mantine/core";
import type { Route } from "./+types/evenement";
import { SingleEventCard } from "~/components/SingleEventCard";


export async function clientLoader({params}:Route.LoaderArgs){

  let id = params.eventId

let response = await fetch("https://46f6ac1dd812.ngrok-free.app/v1/evenements/fc142deb-73c7-4dbb-8f51-fe05a8231836", {
  method: "GET",
  headers: {
        "ngrok-skip-browser-warning": "true"  // ← ÇA SKIP LA PAGE WARNING !
      }
});

console.log("Status:", response.status); // Vérifie si 200

if (!response.ok) {
  console.error("Erreur HTTP:", response.status, response.statusText);
} else {
  let data = await response.text(); // ← C'EST ÇA QU'IL FAUT !
  console.log("Données de l'événement :", data);
}
  // fetch("https://46f6ac1dd812.ngrok-free.app/v1/evenements/fc142deb-73c7-4dbb-8f51-fe05a8231836",{method:"GET"}).then(data=>{
  // if(!data.ok){
  //   console.log("il y a un problme")
  //   throw new Error("dklfqjmf")

  // }
  // return data.body
  // }).then(r=>console.log(r?.getReader())).catch(err=> {throw err})

    return  {
        id:1,
    title: 'Mountains at night: 12 best locations to enjoy the view',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'September 12, 2022',
  }
}




export default function Evenement({loaderData}:Route.ComponentProps) {
  return (
    <Container size="md" p="100">
        
      {/* <h1>Event number {loaderData.title} </h1> */}
    <SingleEventCard idEvent={loaderData.id}/>
    </Container>
  );
}