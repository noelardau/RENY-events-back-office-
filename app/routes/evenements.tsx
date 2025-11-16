import { Button, Container, Flex, Text, Title, Pagination } from "@mantine/core";
import { Link, useSearchParams } from "react-router";
import { EventsGrid } from "~/components/EventsGrid";
import { routeProtection } from "~/utils/routeProtection";
import type { Route } from "./+types/evenements";
import { useQueryGet } from "~/hooks/useQueryGet";
import { api_paths } from "~/constants/api";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import srcImg from "../assets/Foaran_ny_fetin_ny_reny.jpg";

dayjs.locale('fr');

const ITEMS_PER_PAGE = 4;

// Loader vide : on gère tout côté client
export async function loader() {
  routeProtection();
  return null;
}

export default function Evenements() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const { data, isPending, error } = useQueryGet(['evenements'], api_paths.getAllEvenements);

  // === Gestion des états de chargement ===
  if (isPending) {
    return (
      <Container size="md" my="md" py={100} pb={50}>
        <Text ta="center" c="dimmed">Chargement des événements...</Text>
      </Container>
    );
  }

  if (error || !data || !Array.isArray(data)) {
    return (
      <Container size="md" my="md" py={100} pb={50}>
        <Text ta="center" c="red">Erreur lors du chargement des événements.</Text>
      </Container>
    );
  }

  // === allEvents = données réelles de l'API ===
  const allEvents = data.map((event: any) => {
    const debut = dayjs(event.date_debut);
    const fin = dayjs(event.date_fin);
    const isSameDay = debut.isSame(fin, 'day');

    const prixMin = event.tarifs?.length > 0
      ? Math.min(...event.tarifs.map((t: any) => t.prix))
      : null;

    return {
      id: event.evenement_id,
      title: event.titre,
      image: event.fichiers?.[0]?.fichier_url || srcImg, // fallback si pas d'image
      date: isSameDay
        ? debut.format('D MMMM YYYY')
        : `${debut.format('D')} → ${fin.format('D MMMM YYYY')}`,
      price: prixMin,
    };
  });

  // === Pagination côté client (identique à l'original) ===
  const total = allEvents.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const start = (validPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedEvents = allEvents.slice(start, end);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo(0, 0);
  };

  return (
    <Container size="md" my="md" py={100} pb={50}>
      <Flex justify="space-between" align="center" mb="lg">
        <Title c="red" size="h3">
          Liste des évènements
        </Title>
        <Link to="new">
          <Button variant="outline" color="red">
            + Nouveau
          </Button>
        </Link>
      </Flex>

      <EventsGrid events={paginatedEvents} />

      {totalPages > 1 && (
        <Flex justify="center" mt="xl">
          <Pagination
            total={totalPages}
            value={validPage}
            onChange={handlePageChange}
            withEdges
            color="red"
            radius="md"
            size="sm"
          />
        </Flex>
      )}

      <Text size="sm" c="dimmed" ta="center" mt="sm">
        Page {validPage} sur {totalPages} • {total} événement(s)
      </Text>
    </Container>
  );
}