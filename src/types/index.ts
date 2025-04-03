export type InvoiceItem = {
  description: string;
  quantity: number;
  price: number;
  articleNumber: string;
};

export type InvoiceData = {
  customerName: string;
  yourAddress: string;
  offerNumber: string;
  invoiceNumber: string;
  date: string;
  validUntil: string;
  title: string;
  introText: string;
  vatRate: number;
  items: InvoiceItem[];
};

export interface InvoiceFormProps {
  onUpdate: (data: InvoiceData) => void;
  onPreviewToggle: (show: boolean) => void;
}

export interface PDFPreviewProps {
  data: InvoiceData;
} 