import { useForm, zodResolver } from '@mantine/form';
import {
  TextInput,
  Select,
  NumberInput,
  Button,
  Group,
  Box,
  Text,
  ActionIcon,
  Stack,
  SimpleGrid,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { z } from 'zod';
import { reservationSchema } from '../schema/reservationSchema';

type FormValues = z.infer<typeof reservationSchema>;

const placeOptions = [
  { value: 'standard', label: 'Standard' },
  { value: 'vip', label: 'VIP' },
  { value: 'premium', label: 'Premium' },
];

export function ReservationForm({ onSubmit }: { onSubmit?: (values: FormValues) => void }) {
  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      reference: '',
      places: [{ type: 'standard', quantity: 1 }],
    }
  });

  const addPlaceType = () => {
    form.insertListItem('places', { type: 'standard', quantity: 1 });
  };

  const removePlaceType = (index: number) => {
    form.removeListItem('places', index);
  };

  const fields = form.values.places.map((_, index) => (
    <SimpleGrid cols={{ base: 1, sm: 2 }} key={index} mt="xs" align="end">
      <Select
        label={index === 0 ? 'Type de place' : ''}
        placeholder="Choisir"
        data={placeOptions}
        {...form.getInputProps(`places.${index}.type`)}
      />
      <Group align="end" grow>
        <NumberInput
          label={index === 0 ? 'Nombre' : ''}
          placeholder="1"
          min={1}
          max={10}
          {...form.getInputProps(`places.${index}.quantity`)}
        />
        {form.values.places.length > 1 && (
          <ActionIcon
            color="red"
            variant="subtle"
            onClick={() => removePlaceType(index)}
            size="lg"
          >
            <IconTrash size={16} />
          </ActionIcon>
        )}
      </Group>
    </SimpleGrid>
  ));

  const handleSubmit = (values: FormValues) => {
    console.log('Réservation :', values);
    onSubmit?.(values);
    form.reset();
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)} maw={500} mx="auto">
      <Stack gap="md">
        <TextInput
          label="Email"
          placeholder="votre@email.com"
          withAsterisk
          {...form.getInputProps('email')}
        />

        {fields}

        <Button
          type="button"
          variant="light"
          onClick={addPlaceType}
          leftSection={<Text size="sm">+</Text>}
        >
          Ajouter un type de place
        </Button>

        <TextInput
          label="Référence du transfert"
          placeholder="Ex: TRANS-12345"
          withAsterisk
          {...form.getInputProps('reference')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" color="blue">
            Réserver
          </Button>
        </Group>
      </Stack>
    </Box>
  );
}