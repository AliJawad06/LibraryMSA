import { Table} from '@mantine/core';
import classes from './resourcesStyle.module.css';

export default function Resources() {
    const elements = [
        {label: 'Maliki', link: 'https://malikischool.org/'},
        {label: 'Aqeedah', link: 'https://bayhaqiyyah.com/'},
        {label: 'Hanbali', link: 'https://www.almadrasahalhanbaliyyah.com/'},
        {label: 'Everything', link: 'https://seekersguidance.org/'},
        {label: 'Fiqh/Aqeedah/Tazkiya', link: 'https://www.arkview.org/'},
        {label: 'History', link: 'https://muslimlegacy.com/collections/all'}
       
      ];


  const rows = elements.map((element) => (
    <Table.Tr key={element.label} >
      <Table.Td>{element.label}</Table.Td>
      <Table.Td><a href={element.link}>{element.link}</a></Table.Td>
     
    </Table.Tr>
  ));

  return (
    <Table  className={classes.table}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Type</Table.Th>
          <Table.Th>Link</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}