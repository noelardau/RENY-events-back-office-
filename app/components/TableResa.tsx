import { useState } from 'react';
import cx from 'clsx';
import { Button, ScrollArea, Table } from '@mantine/core';
import classes from '../styles/TableScrollArea.module.css';

const data = [
    {
        id: 1,
        nom: "BABA",
        prenom:"Ganga",
        email:"baba@gmail.com",
        ref_paiement: "0012457",
        verified: false
    },
     {
        id: 2,
        nom: "BABAkoto",
        prenom:"GG",
        email:"gga@gmail.com",
        ref_paiement: "00487",
        verified: true
    },
    
]
  

export function TableResa({resaData}) {
  const [scrolled, setScrolled] = useState(false);

  const rows = resaData.reservations.map((row) => (
    <Table.Tr key={row.email}>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.nombre_places_reservees}</Table.Td>
      <Table.Td>{row.etat_reservation}</Table.Td>
      {/* <Table.Td>{row.ref_paiement}</Table.Td>
      <Table.Td>{row.verified ? <Button>xxx</Button> : "non validé"}</Table.Td> */}
    </Table.Tr>
  ));

  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>Email</Table.Th>
            <Table.Th>Nombre place reservé</Table.Th>
            <Table.Th>Etat du resa</Table.Th>
            {/* <Table.Th>Ref Paiement</Table.Th>
            <Table.Th>---</Table.Th> */}

          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}