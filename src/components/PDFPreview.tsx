import { Document, Page, PDFDownloadLink, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { PDFPreviewProps } from '../types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 30,
  },
  documentInfo: {
    marginBottom: 20,
    fontSize: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  introText: {
    fontSize: 11,
    marginBottom: 20,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 10,
    fontSize: 10,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    fontSize: 10,
  },
  colArticleNo: { width: '15%' },
  colDescription: { width: '40%' },
  colQuantity: { width: '15%', textAlign: 'right' },
  colPrice: { width: '15%', textAlign: 'right' },
  colTotal: { width: '15%', textAlign: 'right' },
});

const PDFPreview: React.FC<PDFPreviewProps> = ({ data }) => {
  const formatCurrency = (amount: number) => `${amount.toFixed(2)} €`;
  const calculateTotal = (quantity: number, price: number) => quantity * price;

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.documentInfo}>
            Angebot Nr.: {data.invoiceNumber || '-'}{'\n'}
            Datum: {data.date || '-'}{'\n'}
            Gültig bis: {data.validUntil || '-'}
          </Text>
          
          <Text style={styles.title}>{data.title || 'Angebot'}</Text>
          <Text style={styles.introText}>{data.introText}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colArticleNo}>Art.Nr.</Text>
            <Text style={styles.colDescription}>Bezeichnung</Text>
            <Text style={styles.colQuantity}>Menge</Text>
            <Text style={styles.colPrice}>Preis</Text>
            <Text style={styles.colTotal}>Gesamt</Text>
          </View>

          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.colArticleNo}>{item.articleNumber}</Text>
              <Text style={styles.colDescription}>{item.description}</Text>
              <Text style={styles.colQuantity}>{item.quantity}</Text>
              <Text style={styles.colPrice}>{formatCurrency(item.price)}</Text>
              <Text style={styles.colTotal}>
                {formatCurrency(calculateTotal(item.quantity, item.price))}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="pdf-viewer">
      <div className="pdf-toolbar">
        <h3>PDF Vorschau</h3>
        <PDFDownloadLink
          document={MyDocument}
          fileName={`Angebot-${data.invoiceNumber || 'draft'}.pdf`}
        >
          {({ loading }) => (
            <button 
              className="download-button"
              disabled={loading}
            >
              {loading ? 'Wird generiert...' : 'PDF herunterladen'}
            </button>
          )}
        </PDFDownloadLink>
      </div>
      <div className="pdf-content">
        <PDFViewer 
          style={{ width: '100%', height: '100vh' }}
          showToolbar={false}
        >
          {MyDocument}
        </PDFViewer>
      </div>
    </div>
  );
};

export default PDFPreview;