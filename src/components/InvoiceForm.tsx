import React, { useState } from 'react';

interface InvoiceData {
  customerName: string;
  invoiceNumber: string;
  date: string;
  items: { description: string; quantity: number; price: number }[];
}

interface Props {
  onUpdate: (data: InvoiceData) => void;
}

const InvoiceForm: React.FC<Props> = ({ onUpdate }) => {
  const [formData, setFormData] = useState<InvoiceData>({
    customerName: '',
    invoiceNumber: '',
    date: '',
    items: [{ description: '', quantity: 1, price: 0 }],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      const items = [...formData.items];
      items[index] = { ...items[index], [name]: value };
      setFormData({ ...formData, items });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    onUpdate(formData);
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, price: 0 }],
    });
  };

  return (
    <div>
      <h2>Invoice Form</h2>
      <label>
        Customer Name:
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Invoice Number:
        <input
          type="text"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </label>
      <h3>Items</h3>
      {formData.items.map((item, index) => (
        <div key={index}>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleInputChange(e, index)}
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(e, index)}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={item.price}
              onChange={(e) => handleInputChange(e, index)}
            />
          </label>
        </div>
      ))}
      <button onClick={addItem}>Add Item</button>
    </div>
  );
};

export default InvoiceForm;