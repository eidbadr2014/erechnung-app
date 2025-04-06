import React, { useState } from 'react';
import { InvoiceData, InvoiceFormProps } from '../types';
import './InvoiceForm.css';

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onUpdate, onPreviewToggle }) => {
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
    items: [{ description: '', quantity: 1, price: 0, articleNumber: '' }],
  });

  const [showPreview, setShowPreview] = useState(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      const items = [...formData.items];
      if (name === 'price' || name === 'quantity') {
        items[index] = { ...items[index], [name]: value === '' ? 0 : parseFloat(value) };
      } else {
        items[index] = { ...items[index], [name]: value };
      }
      const newData = { ...formData, items };
      setFormData(newData);
      onUpdate(newData);
    } else {
      const newData = { ...formData, [name]: value };
      setFormData(newData);
      onUpdate(newData);
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, price: 0, articleNumber: '' }],
    });
  };

  const handlePreviewToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowPreview(e.target.checked);
    onPreviewToggle(e.target.checked);
  };

  return (
    <div className="invoice-form">
      <div className="form-header">
        <h2>PDF Rechnung Generator Online</h2>
        <div className="preview-toggle">
          <label className="toggle-switch">
            <span className="toggle-label">Vorschau:</span>
            <input
              type="checkbox"
              checked={showPreview}
              onChange={handlePreviewToggle}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div className="form-row">
        <label>
          Rechnungsvorlage:
          <select name="template">
            <option>Standardvorlage</option>
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          Kundenadresse:
          <textarea
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            rows={3}
            placeholder="Kundenadresse eingeben..."
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Deine Adresse:
          <textarea
            name="yourAddress"
            value={formData.yourAddress}
            onChange={handleInputChange}
            rows={3}
            placeholder="Deine Adresse eingeben..."
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Angebot Nr.:
          <input
            type="text"
            name="offerNumber"
            value={formData.offerNumber}
            onChange={handleInputChange}
            placeholder="Angebot Nr. eingeben..."
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Angebotsdatum:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Gültig bis:
          <input
            type="date"
            name="validUntil"
            value={formData.validUntil}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Titel:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Einleitungstext:
          <input
            type="text"
            name="introText"
            value={formData.introText}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="items-section">
        <div className="items-header">
          <span>Art.Nr.</span>
          <span>Bezeichnung</span>
          <span>Menge</span>
          <span>Einzelpreis (netto)</span>
          <span>MwSt.</span>
        </div>

        {formData.items.map((item, index) => (
          <div key={index} className="item-row">
            <input
              type="text"
              name="articleNumber"
              value={item.articleNumber}
              onChange={(e) => handleInputChange(e, index)}
            />
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleInputChange(e, index)}
            />
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(e, index)}
            />
            <input
              type="number"
              name="price"
              value={item.price}
              onChange={(e) => handleInputChange(e, index)}
            />
            <span className="vat-rate">{formData.vatRate}%</span>
          </div>
        ))}
        <button onClick={addItem}>Position hinzufügen</button>
      </div>
    </div>
  );
};

export default InvoiceForm;