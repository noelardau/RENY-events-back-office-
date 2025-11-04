
import { Button, Checkbox, Container, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NewEventForm } from '~/components/NewEventForm';
import type { Route } from './+types/newEvenement';

export async function action({request}:Route.ActionArgs){

    let df = await request.formData()
    let data = df.get("titre")

    console.log(data)

}

export async function loader(){
    return [
        {
            id:1,
            type:"VIP"
        },
        {id:2, type:"GOLD"}
    ]
}



export default function NewEvenement({loaderData}: Route.ComponentProps) {




  return (
    <Container size="md" my="md">

      <NewEventForm ></NewEventForm>

    </Container>
  );

}