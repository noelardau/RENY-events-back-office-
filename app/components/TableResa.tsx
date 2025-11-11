import { useState } from 'react';
import cx from 'clsx';
import { Button, ScrollArea, Table, Text } from '@mantine/core';
import classes from '../styles/TableScrollArea.module.css';
import { CheckboxResa } from './CheckBoxResa';

  

export function TableResa({reservations}) {
  const [scrolled, setScrolled] = useState(false);

  const validateResa = async ( id:string) =>{
      const res = await fetch(`http://localhost:3000/v1/reservations/validate/${id}`, {
        method: 'POST', body: JSON.stringify({}),
      });

    console.log(res)


  }

  const rows = reservations.map((row) => (
    <Table.Tr key={row.reservation_id}>
      <Table.Td>{row.reservation_id}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      {/* <Table.Td>{row.etat_reservation == "en_attente" ? <Button onClick={e=>{ validateResa(row.reservation_id)}}>Valider resa</Button> : <Text color='green'>Validée</Text> }</Table.Td> */}
      <Table.Td>
        {/* <CheckboxResa eventStat={row.etat_reservation}  />   */}
   {row.etat_reservation == "en_attente" ? <Button onClick={e=>{ validateResa(row.reservation_id)}}>Valider resa</Button> : <Text color='green'>Validée</Text> }
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea mt={20} h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>Id Resa</Table.Th>
            
            <Table.Th>Email</Table.Th>
            <Table.Th>Etat</Table.Th>

          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}