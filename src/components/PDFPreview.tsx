import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

interface Props {
  data: {
    customerName: string;
    invoiceNumber: string;
    date: string;
    items: { description: string; quantity: number; price: number }[];
  };
}

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  table: { display: 'flex', flexDirection: 'column', marginTop: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
});

const PDFPreview: React.FC<Props> = ({ data }) => {
  return (
    <PDFViewer style={{ width: '100%', height: '500px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Customer Name: {data.customerName}</Text>
            <Text>Invoice Number: {data.invoiceNumber}</Text>
            <Text>Date: {data.date}</Text>
          </View>
          <View style={styles.table}>
            <Text>Items:</Text>
            {data.items.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text>{item.description}</Text>
                <Text>{item.quantity}</Text>
                <Text>{item.price} €</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFPreview;