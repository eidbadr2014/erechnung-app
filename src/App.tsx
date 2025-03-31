import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import PDFPreview from './components/PDFPreview';

type InvoiceItem = {
  description: string;
  quantity: number;
  price: number;
};

type InvoiceData = {
  customerName: string;
  invoiceNumber: string;
  date: string;
  items: InvoiceItem[];
};

const App: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    customerName: '',
    invoiceNumber: '',
    date: '',
    items: [],
  });

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <InvoiceForm onUpdate={setInvoiceData} />
      </div>
      <div style={{ flex: 1 }}>
        <PDFPreview data={invoiceData} />
      </div>
    </div>
  );
};

export default App;