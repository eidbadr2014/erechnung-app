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
  customerAddress: {
    marginTop: 10,
    fontSize: 10,
  },
  senderAddress: {
    position: 'absolute',
    top: 30,
    right: 30,
    fontSize: 10,
    textAlign: 'right',
    maxWidth: '40%',
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
  totalRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#f8f8f8',
  },
  colArticleNo: { width: '15%' },
  colDescription: { width: '40%' },
  colQuantity: { width: '15%', textAlign: 'right' },
  colPrice: { width: '15%', textAlign: 'right' },
  colTotal: { width: '15%', textAlign: 'right' },
});

const PDFPreview: React.FC<PDFPreviewProps> = ({ data }) => {
  const formatCurrency = (amount: number | string) => {
    // Convert to number if it's a string
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    // Check if it's a valid number
    return isNaN(numAmount) ? '0.00 €' : `${numAmount.toFixed(2)} €`;
  };
  const calculateTotal = (quantity: number | string, price: number | string) => {
    // Convert to numbers if they're strings
    const numQuantity = typeof quantity === 'string' ? parseFloat(quantity) : quantity;
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    // Check if they're valid numbers
    return isNaN(numQuantity) || isNaN(numPrice) ? 0 : numQuantity * numPrice;
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };
  
  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.senderAddress}>
          <Text>{data.yourAddress}</Text>
        </View>
        
        <View style={styles.header}>
          <View style={styles.documentInfo}>
            <Text>Angebot Nr.: {data.offerNumber || '-'}</Text>
            <Text>Datum: {formatDate(data.date)}</Text>
            <Text>Gültig bis: {formatDate(data.validUntil)}</Text>
          </View>
          
          <View style={styles.customerAddress}>
            <Text>{data.customerName}</Text>
          </View>
          
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
          
          <View style={styles.totalRow}>
            <Text style={styles.colArticleNo}></Text>
            <Text style={styles.colDescription}>Gesamtsumme</Text>
            <Text style={styles.colQuantity}></Text>
            <Text style={styles.colPrice}></Text>
            <Text style={styles.colTotal}>
              {formatCurrency(data.items.reduce((sum, item) => 
                sum + calculateTotal(item.quantity, item.price), 0
              ))}
            </Text>
          </View>
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