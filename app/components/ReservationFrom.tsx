import { useForm } from '@mantine/form';
import {
  TextInput,
  Button,
  Group,
  Box,
  ActionIcon,
  Select,
  NumberInput,
  Stack,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

type PlaceDemandee = {
  type_place_id: string;
  nombre: number;
};

type FormValues = {
  email: string;
  places_demandees: PlaceDemandee[];
};

type ReservationFormProps = {
  evenement_id: string;
  loading?: boolean;
  disabled?: boolean;
  onSubmit?: (data: {
    email: string;
    evenement_id: string;
    places_demandees: PlaceDemandee[];
  }) => void;
};

const TYPE_PLACES_OPTIONS = [
  { value: '211c482e-2197-467c-a4ea-f825611a58ea', label: 'Standard' },
  { value: '262a7176-e2f7-4d88-adb9-6591f0942734', label: 'VIP' },
  { value: '8003a69b-98a2-4901-a655-91415d979382', label: 'Premium' },
];

export function ReservationForm({ evenement_id, onSubmit, loading, disabled }: ReservationFormProps) {
  const [entries, setEntries] = useState<number[]>([0]); // indices des lignes

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      places_demandees: [],
    },
  });

  // Synchronise le nombre de lignes avec le tableau places_demandees
  useEffect(() => {
    const currentLength = form.values.places_demandees.length;
    const targetLength = entries.length;

    if (currentLength < targetLength) {
      // Ajouter des entrées manquantes
      const missing = targetLength - currentLength;
      form.setFieldValue('places_demandees', [
        ...form.values.places_demandees,
        ...Array(missing).fill(null).map(() => ({ type_place_id: '', nombre: 1 })),
      ]);
    } else if (currentLength > targetLength) {
      // Supprimer les excédents
      form.setFieldValue(
        'places_demandees',
        form.values.places_demandees.slice(0, targetLength)
      );
    }
  }, [entries.length]);

  const addPlaceField = () => {
    setEntries((prev) => [...prev, prev.length]);
  };

  const removePlaceField = (index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
    // Le useEffect ci-dessus supprimera automatiquement l'entrée du tableau
  };

  const handleSubmit = (values: FormValues) => {
    // Nettoyer les entrées vides ou invalides
    const validPlaces = values.places_demandees.filter(
      (p) => p.type_place_id && p.nombre > 0
    );

    const data = {
      email: values.email,
      evenement_id,
      places_demandees: validPlaces,
    };

    console.log('Données soumises :', data);
    onSubmit?.(data);
    form.reset();
    setEntries([0]);
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)} maw={500}>
      <Stack gap="md">
        <TextInput
          label="Email"
          placeholder="client@example.com"
          withAsterisk
          {...form.getInputProps('email')}
        />

        {entries.map((_, index) => (
          <Group key={index} grow align="flex-end" wrap="nowrap">
            <Select
              label={index === 0 ? 'Type de place' : ''}
              placeholder="Choisir un type"
              data={TYPE_PLACES_OPTIONS}
              withAsterisk={index === 0}
              {...form.getInputProps(`places_demandees.${index}.type_place_id`)}
              onChange={(value) => {
                form.setFieldValue(`places_demandees.${index}.type_place_id`, value || '');
              }}
            />
            <NumberInput
              label={index === 0 ? 'Nombre' : ''}
              placeholder="1"
              min={1}
              max={10}
              {...form.getInputProps(`places_demandees.${index}.nombre`)}
              onChange={(value) => {
                form.setFieldValue(`places_demandees.${index}.nombre`, Number(value) || 1);
              }}
            />
            {entries.length > 1 && (
              <ActionIcon
                color="red"
                variant="subtle"
                onClick={() => removePlaceField(index)}
                mb={index === 0 ? 28 : 0}
              >
                <IconTrash size={16} />
              </ActionIcon>
            )}
          </Group>
        ))}

        <Button variant="outline" onClick={addPlaceField} size="sm" w="fit-content">
          + Ajouter un type de place
        </Button>

        <Group justify="flex-end" mt="md">
          <Button type="submit">Réserver</Button>
        </Group>
      </Stack>
    </Box>
  );
}