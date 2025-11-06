
import { Button, Checkbox, Container, Flex, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NewEventForm } from '~/components/NewEventForm';
import type { Route } from './+types/newEvenement';
import { IconArrowLeft } from '@tabler/icons-react';
import { Link, data } from 'react-router';

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
    <Container size="md" my="md" p={100}>


 <Link to={"/event/"} children={
          
  <Button
    leftSection={<IconArrowLeft size={18} />}
    variant="default"
    // onClick={() => navigate(-1)}
  >
    Retour
  </Button>} />
      <NewEventForm ></NewEventForm>

    </Container>
  );

}