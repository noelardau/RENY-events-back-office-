import { Container, Flex } from "@mantine/core";
import type { Route } from "./+types/evenement";
import { SingleEventCard } from "~/components/SingleEventCard";

import { queryGet } from "~/hooks/queryGet";

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

  
     const {error,data,isPending} = queryGet(['user'],"https://jsonplaceholder.typicode.com/users")
 
 
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

  return (
    <Container size="md" p="100">
        
      {/* <h1>Event number {loaderData.title} </h1> */}
{data[0].name}
    <SingleEventCard idEvent={data[0].id}/>
    </Container>
  );
}