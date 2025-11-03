import { Container } from "@mantine/core";
import { EventsGrid } from "~/components/EventsGrid";


export default function Evenements() {
  return (
    <Container size="lg" my="md">
        <EventsGrid/>

    </Container>
  );
}