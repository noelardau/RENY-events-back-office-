

import { useForm } from '@mantine/form';
import { 
  TextInput, 
  NumberInput, 
  Select, 
  Button, 
  Group, 
  Box, 
  Text 
} from '@mantine/core';
import { zodResolver } from '@mantine/form';
import { reservationSchema} from '../schema/reservationSchema'; // Adapte le chemin
import {z} from "zod"

type FormValues = z.infer<typeof reservationSchema>;

export function ReservationForm({ onSubmit }: { onSubmit?: (values: FormValues) => void }) {
  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      type: 'standard',
      places: 1,
      reference: '',
    }
  });

  const handleSubmit = (values: FormValues) => {
    console.log('Données de réservation :', values);
    // Ici : Appel API pour soumettre la réservation
    if (onSubmit) onSubmit(values);
    form.reset(); // Optionnel : Reset après soumission
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)} maw={400}>
      <TextInput
        label="Email"
        placeholder="votre@email.com"
        withAsterisk
        mb="sm"
        {...form.getInputProps('email')}
      />
      
      <Select
        label="Type de réservation"
        placeholder="Choisir un type"
        withAsterisk
        mb="sm"
        data={[
          { value: 'standard', label: 'Standard' },
          { value: 'vip', label: 'VIP' },
          { value: 'premium', label: 'Premium' },
        ]}
        {...form.getInputProps('type')}
      />
      
      <NumberInput
        label="Nombre de places"
        placeholder="1"
        withAsterisk
        mb="sm"
        min={1}
        max={10}
        {...form.getInputProps('places')}
      />
      
      <TextInput
        label="Référence du transfert d'argent"
        placeholder="Ex: TRANS-12345"
        withAsterisk
        mb="md"
        {...form.getInputProps('reference')}
      />

      <Group justify="flex-end">
        <Button type="submit" fullWidth>
          Réserver
        </Button>
      </Group>

      {/* Optionnel : Affichage des erreurs globales */}
      {/* {form.errors.$schema && (
        <Text c="red" size="sm" mt="sm">
          {form.errors.$schema}
        </Text>
      )} */}
    </Box>
  );
}