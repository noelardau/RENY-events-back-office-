
import { Button, Checkbox, Container, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NewEventForm } from '~/components/NewEventForm';

export default function NewEvenement() {

const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });


  return (
    <NewEventForm></NewEventForm>
  );

}