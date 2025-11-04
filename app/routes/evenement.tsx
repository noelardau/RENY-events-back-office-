import { Container, Flex } from "@mantine/core";
import type { Route } from "./+types/evenement";
import { SingleEventCard } from "~/components/SingleEventCard";

import {useQuery} from '@tanstack/react-query'

import { Loader } from '@mantine/core';


export async function clientLoader({params}:Route.LoaderArgs){

  let id = params.eventId

  

  // fetch("https://46f6ac1dd812.ngrok-free.app/v1/evenements/fc142deb-73c7-4dbb-8f51-fe05a8231836",{method:"GET"}).then(data=>{
  // if(!data.ok){
  //   console.log("il y a un problme")
  //   throw new Error("dklfqjmf")

  // }
  // return data.body
  // }).then(r=>console.log(r?.getReader())).catch(err=> {throw err})

    return null
}




export default function Evenement({loaderData}:Route.ComponentProps) {
  const {error,data,isPending} = useQuery({ queryKey: ['todos'], queryFn:  async () => {
     const response = await fetch(
       "https://46f6ac1dd812.ngrok-free.app/v1/evenements/fc142deb-73c7-4dbb-8f51-fe05a8231836"
     )
     return await response.json()

   }
    })
 
 
  if(error){
    return  <Container size="md" p="100">
      <div>Une erreur est survenue : {error.message}</div>

    </Container>
  }

  if(isPending){
    return  <Flex justify={"center"}>

   <Loader color="blue"></Loader>
    </Flex>
  }

  return (
    <Container size="md" p="100">
        
      {/* <h1>Event number {loaderData.title} </h1> */}

    <SingleEventCard idEvent={data}/>
    </Container>
  );
}