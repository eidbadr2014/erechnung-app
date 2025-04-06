import React, { useState } from 'react';
import './App.css';
import InvoiceForm from './components/InvoiceForm';
import PDFPreview from './components/PDFPreview';
import { InvoiceData } from './types';

const App: React.FC = () => {
  const [formData, setFormData] = useState<InvoiceData>({
    customerName: '',
    yourAddress: '',
    offerNumber: '',
    invoiceNumber: '',
    date: '',
    validUntil: '',
    title: '',
    introText: 'hiermit unterbreiten wir Ihnen unser Angebot über folgende Positionen:',
    vatRate: 19.00,
    items: []
  });
  const [showPreview, setShowPreview] = useState(true);

  const handleUpdate = (data: InvoiceData) => {
    setFormData(data);
  };

  const handlePreviewToggle = (show: boolean) => {
    setShowPreview(show);
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        
        <div className="form-container">

          <InvoiceForm 
            onUpdate={handleUpdate} 
            onPreviewToggle={handlePreviewToggle}
          />
        </div>
        <div className={`preview-container ${showPreview ? 'visible' : ''}`}>
          <PDFPreview data={formData} />
        </div>
      </div>
      Vibe coded by <a href="https://www.linkedin.com/in/eid-badr/">Eid Badr</a> | eid.badr@hotmail.com
        <br/>
        <br/>
    </div>
  );
};

export default App;