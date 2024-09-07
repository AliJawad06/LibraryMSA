import { Table} from '@mantine/core';
import classes from './resourcesStyle.module.css';

export default function Resources() {
    const elements = [
        {label: 'Maliki', links:[ 'https://malikischool.org/']},
        {label: 'Aqeedah', links: ['https://bayhaqiyyah.com/']},
        {label: 'Hanbali', links: ['https://www.almadrasahalhanbaliyyah.com/']},
        {label: 'Everything', links: ['https://seekersguidance.org/']},
        {label: 'Fiqh/Aqeedah/Tazkiya', links: ['https://www.arkview.org/']},
        {label: 'History', links: ['https://muslimlegacy.com/']},
        {label: 'Hanifi Foundation Books', links:[ 'https://archive.org/details/absolute-essentials-of-islam-faraz-fareed-rabbani','https://academy.seekersguidance.org/enrol/index.php?id=114']},
        {label: "Shafi'i", links: ['https://drive.google.com/file/d/1srzua3PZKH_QlvO8cGoNEGS1CrqdfhMh/view?usp=sharing']}

      ];

      const rows = elements.map((element) => (
        <Table.Tr key={element.label}>
          <Table.Td>{element.label}</Table.Td>
          {
            element.links.map((link, index) => (
              <Table.Td key={index}>
                <a style={{ color: 'white' }} href={link}>{link}</a>
              </Table.Td>
            ))
          }
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