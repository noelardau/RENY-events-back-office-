import { useState } from 'react';
import cx from 'clsx';
import {
  ScrollArea,
  Table,
  Text,
  UnstyledButton,
  Loader,
  Group,
  Badge,
  Card,
  Stack,
  ActionIcon,
  useMantineTheme,
  Box,
  Button,
  Flex,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from '../styles/TableScrollArea.module.css';
import type { reservation } from '~/interfaces/reservation';
import { Link } from 'react-router';
import { IconCheck, IconClock, IconMail, IconId } from '@tabler/icons-react';

export function TableResa({ reservations }: { reservations: reservation[] }) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [scrolled, setScrolled] = useState(false);
  const [validatingIds, setValidatingIds] = useState<Set<string>>(new Set());

  const validateResa = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setValidatingIds((prev) => new Set(prev).add(id));

    try {
      const res = await fetch(`http://localhost:3000/v1/reservations/validate/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!res.ok) throw new Error('Échec validation');
      // Optionnel : rafraîchir via queryClient
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setValidatingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  // === Vue Mobile : Cartes ===
  const MobileView = () => (
    <Stack gap="md" mt={20}>
      {reservations.map((row) => {
        const isValidating = validatingIds.has(row.reservation_id);
        const isPending = row.etat_reservation === 'en_attente';

        return (
          <Card
            key={row.reservation_id}
            withBorder
            radius="md"
            p="md"
            className={classes.clickableRow}
            component={Link}
            to={row.reservation_id}
            onClick={(e) => isValidating && e.preventDefault()}
            style={{ pointerEvents: isValidating ? 'none' : 'auto' }}
          >
            <Stack gap="xs">
              {/* ID + État */}
              <Flex justify="space-between" align="center">
                <Group gap="xs">
                  <IconId size={16} color="gray" />
                  <Text size="sm" fw={600} truncate>
                    {row.reservation_id.slice(0, 8)}
                  </Text>
                </Group>

                <Badge
                  color={isPending ? 'orange' : 'green'}
                  variant="light"
                  size="sm"
                  leftSection={isPending ? <IconClock size={14} /> : <IconCheck size={14} />}
                >
                  {isPending ? 'En attente' : 'Validée'}
                </Badge>
              </Flex>

              {/* Email */}
              <Group gap="xs">
                <IconMail size={16} color="gray" />
                <Text size="sm" truncate>{row.email}</Text>
              </Group>

              {/* Bouton Valider */}
              {isPending && (
                <Button
                  size="xs"
                  color="green"
                  onClick={(e) => validateResa(row.reservation_id, e)}
                  loading={isValidating}
                  loaderProps={{ type: 'dots' }}
                  fullWidth
                  mt="xs"
                >
                  {isValidating ? 'Validation...' : 'Valider la réservation'}
                </Button>
              )}
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );

  // === Vue Desktop : Tableau ===
  const DesktopView = () => (
    <ScrollArea
      mt={20}
      h={300}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={700} verticalSpacing="sm">
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>ID Réservation</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>État</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {reservations.map((row) => {
            const isValidating = validatingIds.has(row.reservation_id);

            return (
              <Table.Tr key={row.reservation_id} className={classes.clickableRow}>
                <Table.Td colSpan={3}>
                  <UnstyledButton
                    component={Link}
                    to={row.reservation_id}
                    className={classes.rowLink}
                    onClick={(e) => isValidating && e.preventDefault()}
                    style={{ pointerEvents: isValidating ? 'none' : 'auto' }}
                  >
                    <Group justify="space-between" wrap="nowrap" align="center" w="100%">
                      <Text size="sm" fw={500}>
                        {row.reservation_id.slice(0, 8)}
                      </Text>
                      <Text size="sm" c="dimmed" truncate>
                        {row.email}
                      </Text>

                      {row.etat_reservation === 'en_attente' ? (
                        <Button
                          size="xs"
                          color="green"
                          onClick={(e) => validateResa(row.reservation_id, e)}
                          disabled={isValidating}
                          loading={isValidating}
                          loaderProps={{ type: 'dots' }}
                        >
                          {isValidating ? 'Validation...' : 'Valider'}
                        </Button>
                      ) : (
                        <Text size="sm" c="green" fw={500}>
                          Validée
                        </Text>
                      )}
                    </Group>
                  </UnstyledButton>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );

  return <Box>{isMobile ? <MobileView /> : <DesktopView />}</Box>;
}