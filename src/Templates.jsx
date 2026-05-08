import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Printer, Download, Save, RefreshCw } from 'lucide-react';
import './Templates.css';

const Templates = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [activeTemplate, setActiveTemplate] = useState('invoice');
  const [logo, setLogo] = useState(null);
  const [showMetadataEdit, setShowMetadataEdit] = useState(false);

  const [data, setData] = useState({
    invoice: {
      no: '1234',
      date: '01/01/2026',
      dueDate: '01/30/2026',
      poNumber: 'PO-9988',
      from: {
        name: 'ALBERT SORT',
        address: '5740, N. Sheridan Road,\nChicago, IL-60660',
        email: 'albert@invoicefly.com',
        phone: '123-456-789'
      },
      billTo: {
        name: 'SAM ALTMAN',
        address: 'Fifth Avenue New York,\n10029',
        email: 'sam@sam.com',
        phone: '987-654-321'
      },
      shipTo: {
        name: 'CLIENT NAME',
        address: 'Client Street, City,\nState, Zip Code',
        email: 'Client email',
        phone: 'Phone number'
      },
      items: [
        { desc: 'Item 1', qty: 2, price: 100 },
        { desc: 'Item 2', qty: 1, price: 150 },
        { desc: 'Item 3', qty: 2, price: 300 },
        { desc: 'Item 4', qty: 1, price: 300 },
      ],
      tax: 21,
      discount: 0,
      shipping: 0,
      amountPaid: 0,
      terms: 'Client is responsible for all collection costs in the event of non-payment.',
      paymentInfo: 'Invoice Fly\nBillionaire Bank of America\nAccount No.: 5677-4332-2271-3215'
    },
    customs: {
      date: '2026-04-29',
      invoiceNo: 'CI-1002',
      waybillNo: 'WB-7721',
      exporter: {
        type: 'Business',
        name: 'John Doe',
        company: 'Tenneco Inc.',
        address: '123 Industrial Way, London, UK'
      },
      importer: {
        type: 'Individual',
        name: 'Jane Smith',
        company: 'Global Parts Ltd.',
        address: '456 Delivery St, Berlin, Germany'
      },
      exporterDetails: {
        phone: '+44 20 1234 5678',
        email: 'export@tenneco.com',
        vat: 'GB123456789',
        eori: 'GB123456789000'
      },
      importerDetails: {
        phone: '+49 30 9876 5432',
        email: 'import@globalparts.de',
        vat: 'DE987654321',
        eori: 'DE987654321000'
      },
      items: [
        { desc: 'Piston Ring', qty: 100, tariff: '8409.91', country: 'UK', weight: 0.5, value: 5.00 },
        { desc: 'Gasket Set', qty: 50, tariff: '8484.10', country: 'UK', weight: 0.2, value: 12.00 },
      ],
      exportReason: 'Sale',
      detailedReason: 'Automotive Spare Parts for Resale',
      deliveryTerms: 'DAP - Delivered At Place',
      ioss: 'IM1234567890',
      shippingValue: 45.00,
      insuranceValue: 10.00
    },
    packing: {
      date: '10-04-2026',
      recipient: 'TransEuro Wholesale LTD\nAtt. Casper Richardson\n126 East Ferry Road\nE149FP LONDON\nUnited Kingdom',
      shipToCfr: 'Ex Work Moerdijk NL',
      reference: 'n.a.',
      orderNumber: '20265006',
      blNumber: '',
      items: [
        { desc: 'PDV Table Salt + 25kg PE Bags + Pallets', pallets: 5, bags: 245, totalNw: '6.125,00 kg', totalGw: '6.275,00 kg' }
      ],
      hsCode: '25010091',
      summaryBags: '245',
      summaryBagsLabel: '25 KG BAGS:',
      summaryPallets: '5',
      summaryPalletsLabel: 'PALLETS:',
      summaryNetWeight: '6.125,00 kg',
      summaryNetWeightLabel: 'NET WEIGHT:',
      summaryGrossWeight: '6.275,00 kg',
      summaryGrossWeightLabel: 'GROSS WEIGHT:',
      footerInfo1: 'Eurosalt Handelsmaatschappij B.V. Plaza 6, 4782SK Moerdijk NL. T. +31 (0) 168 393200',
      footerInfo2: 'Rabobank 1214.76.928 – IBAN: NL 76 RABO 0121 4769 28 – BIC: RABONL2U',
      footerInfo3: 'Chamber of Commerce: Breda NL, 24179430 – EORI: NL 0085.36.910 B01'
    }
  });

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('tenneco_templates_data');
    if (saved) {
      setData(JSON.parse(saved));
    }
    const savedLogo = localStorage.getItem('tenneco_custom_logo');
    if (savedLogo) {
      setLogo(savedLogo);
    }
    const auth = localStorage.getItem('tenneco_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === 'admin@templates.com' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('tenneco_auth', 'true');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('tenneco_auth');
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
        localStorage.setItem('tenneco_custom_logo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSave = () => {
    localStorage.setItem('tenneco_templates_data', JSON.stringify(data));
    alert('Templates saved successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

  const updateField = (template, field, value) => {
    setData(prev => ({
      ...prev,
      [template]: {
        ...prev[template],
        [field]: value
      }
    }));
  };

  const updateNestedField = (template, parent, field, value) => {
    setData(prev => ({
      ...prev,
      [template]: {
        ...prev[template],
        [parent]: {
          ...prev[template][parent],
          [field]: value
        }
      }
    }));
  };

  const updateItem = (template, index, field, value) => {
    const newItems = [...data[template].items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateField(template, 'items', newItems);
  };

  const addItem = (template) => {
    const newItem = template === 'invoice' 
      ? { desc: '', qty: 1, price: 0 }
      : template === 'customs'
      ? { desc: '', qty: 1, tariff: '', country: '', weight: 0, value: 0 }
      : { desc: '', pallets: 0, bags: 0, totalNw: '', totalGw: '' };
    
    updateField(template, 'items', [...data[template].items, newItem]);
  };

  const removeItem = (template, index) => {
    const newItems = data[template].items.filter((_, i) => i !== index);
    updateField(template, 'items', newItems);
  };

  const calculateSubtotal = () => {
    return data.invoice.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  };

  const calculateTax = () => {
    return (calculateSubtotal() * data.invoice.tax) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + Number(data.invoice.shipping) - Number(data.invoice.discount);
  };

  const renderInvoiceFly = () => {
    const d = data.invoice;
    return (
      <div className="template-paper">
        <div className="invoice-fly-header">
            <div className="invoice-fly-logo-container no-print-padding flex flex-col gap-4">
              <div className="relative group logo-wrapper">
                {logo ? (
                  <>
                    <img src={logo} alt="Logo" className="invoice-custom-logo" />
                    <div className="logo-actions no-print">
                      <label className="logo-action-btn edit">
                        Change
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </label>
                      <button 
                        className="logo-action-btn delete"
                        onClick={() => { setLogo(null); localStorage.removeItem('tenneco_custom_logo'); }}
                      >
                        Remove
                      </button>
                    </div>
                  </>
                ) : (
                  <label className="no-print block text-xs text-blue-600 cursor-pointer hover:underline mb-2">
                    + Upload Logo
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                )}
              </div>
              
              <div className="group relative">
                <input 
                  className="editable-input text-5xl font-medium tracking-tight" 
                  value="Invoice Fly." 
                  readOnly 
                  style={{ padding: 0, background: 'none' }}
                />
              </div>
            </div>

            <div className="invoice-fly-company-info">
              <input className="editable-input font-bold" value={d.from.name} onChange={e => updateNestedField('invoice', 'from', 'name', e.target.value)} />
              <textarea className="editable-input" rows="2" value={d.from.address} onChange={e => updateNestedField('invoice', 'from', 'address', e.target.value)} />
              <input className="editable-input" value={d.from.email} onChange={e => updateNestedField('invoice', 'from', 'email', e.target.value)} />
              <input className="editable-input" value={d.from.phone} onChange={e => updateNestedField('invoice', 'from', 'phone', e.target.value)} />
            </div>
            <div className="invoice-fly-right">
              <div className="invoice-fly-number-box">
              <div className="flex justify-between items-center px-3 py-1 bg-[#7a9ca5] text-white font-bold">
                <span>NO.</span>
                <input className="editable-input w-20 text-right bg-transparent text-white border-none p-0" value={d.no} onChange={e => updateField('invoice', 'no', e.target.value)} />
              </div>
              <div className="px-3 py-1 bg-[#94a3b8] text-white text-center text-sm">
                <input className="editable-input bg-transparent text-white border-none p-0 text-center" value={d.date} onChange={e => updateField('invoice', 'date', e.target.value)} />
              </div>
            </div>
            <div className="mt-8 text-sm">
              <div className="flex justify-end gap-2 mb-2">
                <span className="text-gray-500">Due date:</span>
                <input className="editable-input w-24 border-none text-right p-0" value={d.dueDate} onChange={e => updateField('invoice', 'dueDate', e.target.value)} />
              </div>
              <div className="flex justify-end gap-2">
                <span className="text-gray-500">P.O. Number:</span>
                <input className="editable-input w-24 border-none text-right p-0" value={d.poNumber} onChange={e => updateField('invoice', 'poNumber', e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div className="invoice-fly-addresses grid grid-cols-2 gap-20 mb-12">
          <div className="invoice-fly-address-group">
            <p className="invoice-fly-label mb-2">BILL TO:</p>
            <input className="editable-input font-bold" value={d.billTo.name} onChange={e => updateNestedField('invoice', 'billTo', 'name', e.target.value)} />
            <textarea className="editable-input" rows="2" value={d.billTo.address} onChange={e => updateNestedField('invoice', 'billTo', 'address', e.target.value)} />
            <input className="editable-input" value={d.billTo.email} onChange={e => updateNestedField('invoice', 'billTo', 'email', e.target.value)} />
            <input className="editable-input" value={d.billTo.phone} onChange={e => updateNestedField('invoice', 'billTo', 'phone', e.target.value)} />
          </div>
          <div className="invoice-fly-address-group">
            <p className="invoice-fly-label mb-2 text-right">SHIP TO:</p>
            <input className="editable-input font-bold text-right" value={d.shipTo.name} onChange={e => updateNestedField('invoice', 'shipTo', 'name', e.target.value)} />
            <textarea className="editable-input text-right" rows="2" value={d.shipTo.address} onChange={e => updateNestedField('invoice', 'shipTo', 'address', e.target.value)} />
            <input className="editable-input text-right" value={d.shipTo.email} onChange={e => updateNestedField('invoice', 'shipTo', 'email', e.target.value)} />
            <input className="editable-input text-right" value={d.shipTo.phone} onChange={e => updateNestedField('invoice', 'shipTo', 'phone', e.target.value)} />
          </div>
        </div>

        <div className="text-right mb-6">
          <p className="text-sm italic"><b>Payment Terms:</b> Please pay within 30 days.</p>
        </div>

        <table className="invoice-fly-table">
          <thead>
            <tr>
              <th className="text-left py-4 border-y border-gray-300">DESCRIPTION</th>
              <th className="text-center py-4 border-y border-gray-300">QTY</th>
              <th className="text-center py-4 border-y border-gray-300">PRICE</th>
              <th className="text-right py-4 border-y border-gray-300">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {d.items.map((item, i) => (
              <tr key={i}>
                <td className="py-4 border-b border-gray-100"><input className="editable-input" value={item.desc} onChange={e => updateItem('invoice', i, 'desc', e.target.value)} /></td>
                <td className="py-4 border-b border-gray-100 text-center"><input className="editable-input text-center" type="number" value={item.qty} onChange={e => updateItem('invoice', i, 'qty', e.target.value)} /></td>
                <td className="py-4 border-b border-gray-100 text-center"><input className="editable-input text-center" type="number" value={item.price} onChange={e => updateItem('invoice', i, 'price', e.target.value)} /></td>
                <td className="py-4 border-b border-gray-100 text-right font-medium">${(item.qty * item.price).toFixed(0)}</td>
              </tr>
            ))}
            <tr className="no-print">
              <td colSpan="4" className="py-2"><button onClick={() => addItem('invoice')} className="text-blue-600 text-sm font-bold">+ Add Item</button></td>
            </tr>
          </tbody>
        </table>

        <div className="invoice-fly-summary flex justify-end mt-8">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm text-gray-500 uppercase"><span>Sub Total</span> <span>${calculateSubtotal().toFixed(0)}</span></div>
            <div className="flex justify-between text-sm text-gray-500 uppercase"><span>Tax ({d.tax}%)</span> <span>${calculateTax().toFixed(0)}</span></div>
            <div className="flex justify-between text-sm text-gray-500 uppercase items-center">
              <span>Discount</span> 
              <input className="editable-input w-16 text-right p-0" type="number" value={d.discount} onChange={e => updateField('invoice', 'discount', e.target.value)} />
            </div>
            <div className="flex justify-between text-sm text-gray-500 uppercase items-center">
              <span>Shipping</span> 
              <input className="editable-input w-16 text-right p-0" type="number" value={d.shipping} onChange={e => updateField('invoice', 'shipping', e.target.value)} />
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-gray-300"><span>TOTAL AMOUNT</span> <span>${calculateTotal().toFixed(0)}</span></div>
            <div className="flex justify-between text-sm text-gray-500 uppercase items-center">
              <span>Amount Paid</span> 
              <input className="editable-input w-16 text-right p-0" type="number" value={d.amountPaid} onChange={e => updateField('invoice', 'amountPaid', e.target.value)} />
            </div>
            <div className="flex justify-between font-bold pt-4 border-t-2 border-black text-lg"><span>BALANCE DUE</span> <span>${(calculateTotal() - d.amountPaid).toFixed(0)}</span></div>
          </div>
        </div>

        <div className="invoice-fly-footer grid grid-cols-2 gap-12 mt-12 pt-12 border-t border-gray-300">
          <div className="invoice-fly-footer-section">
            <p className="font-bold mb-4 uppercase text-sm">Terms & Conditions:</p>
            <textarea className="editable-input text-xs leading-relaxed text-gray-600" rows="3" value={d.terms} onChange={e => updateField('invoice', 'terms', e.target.value)} />
          </div>
          <div className="invoice-fly-footer-section border-l border-gray-300 pl-12">
            <p className="font-bold mb-4 uppercase text-sm">Payment Information:</p>
            <textarea className="editable-input text-xs leading-relaxed text-gray-600" rows="4" value={d.paymentInfo} onChange={e => updateField('invoice', 'paymentInfo', e.target.value)} />
          </div>
        </div>
      </div>
    );
  };

  const renderCustomsInvoice = () => {
    const d = data.customs;
    const totalItemsValue = d.items.reduce((acc, item) => acc + (item.qty * item.value), 0);
    const totalWeight = d.items.reduce((acc, item) => acc + (item.qty * item.weight), 0);
    const totalQuantity = d.items.reduce((acc, item) => acc + Number(item.qty), 0);

    return (
      <div className="template-paper">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col gap-2">
            <div className="invoice-fly-logo-container no-print-padding">
              <div className="relative group logo-wrapper">
                {logo ? (
                  <>
                    <img src={logo} alt="Logo" className="invoice-custom-logo" />
                    <div className="logo-actions no-print">
                      <label className="logo-action-btn edit">
                        Change
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </label>
                      <button 
                        className="logo-action-btn delete"
                        onClick={() => { setLogo(null); localStorage.removeItem('tenneco_custom_logo'); }}
                      >
                        Remove
                      </button>
                    </div>
                  </>
                ) : (
                  <label className="no-print block text-xs text-blue-600 cursor-pointer hover:underline">
                    + Upload Logo
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                )}
              </div>
            </div>
          </div>
          <h1 className="customs-invoice-title text-right m-0">INVOICE FOR CUSTOMS VALUE ONLY</h1>
        </div>
        
        <div className="customs-meta-grid">
          <div className="customs-meta-item">
            <span className="customs-meta-label">(1) Invoice Date:</span>
            <input className="editable-input" value={d.date} onChange={e => updateField('customs', 'date', e.target.value)} />
          </div>
          <div className="customs-meta-item">
            <span className="customs-meta-label">(2) Invoice No:</span>
            <input className="editable-input" value={d.invoiceNo} onChange={e => updateField('customs', 'invoiceNo', e.target.value)} />
          </div>
          <div className="customs-meta-item">
            <span className="customs-meta-label">(3) Waybill No:</span>
            <input className="editable-input" value={d.waybillNo} onChange={e => updateField('customs', 'waybillNo', e.target.value)} />
          </div>
        </div>

        <div className="customs-main-grid">
          <div className="customs-box">
            <div className="customs-box-title">EXPORTER OF RECORD:</div>
            <div className="customs-box-content">
              <div className="customs-row"><div className="customs-label-cell">(4) Exporter Type:</div><div className="customs-value-cell"><input className="editable-input" value={d.exporter.type} onChange={e => updateNestedField('customs', 'exporter', 'type', e.target.value)} /></div></div>
              <div className="customs-row"><div className="customs-label-cell">(5) Contact Name:</div><div className="customs-value-cell"><input className="editable-input" value={d.exporter.name} onChange={e => updateNestedField('customs', 'exporter', 'name', e.target.value)} /></div></div>
              <div className="customs-row"><div className="customs-label-cell">(6) Company Name:</div><div className="customs-value-cell"><input className="editable-input" value={d.exporter.company} onChange={e => updateNestedField('customs', 'exporter', 'company', e.target.value)} /></div></div>
              <div className="customs-row" style={{ height: '100px' }}><div className="customs-label-cell">(7) Address:</div><div className="customs-value-cell"><textarea className="editable-input h-full" rows="4" value={d.exporter.address} onChange={e => updateNestedField('customs', 'exporter', 'address', e.target.value)} /></div></div>
              
              <div className="customs-row"><div className="customs-label-cell">(12) Contact Number:</div><div className="customs-value-cell"><input className="editable-input" value={d.exporterDetails.phone} onChange={e => updateNestedField('customs', 'exporterDetails', 'phone', e.target.value)} /></div></div>
              <div className="customs-row"><div className="customs-label-cell">(13) Contact Email:</div><div className="customs-value-cell"><input className="editable-input" value={d.exporterDetails.email} onChange={e => updateNestedField('customs', 'exporterDetails', 'email', e.target.value)} /></div></div>
              <div className="customs-row"><div className="customs-label-cell">(14) VAT Number:</div><div className="customs-value-cell"><input className="editable-input" value={d.exporterDetails.vat} onChange={e => updateNestedField('customs', 'exporterDetails', 'vat', e.target.value)} /></div></div>
              <div className="customs-row"><div className="customs-label-cell">(15) EORI Number:</div><div className="customs-value-cell"><input className="editable-input" value={d.exporterDetails.eori} onChange={e => updateNestedField('customs', 'exporterDetails', 'eori', e.target.value)} /></div></div>
            </div>
          </div>

          <div className="customs-box">
            <div className="customs-box-title">IMPORTER OF RECORD:</div>
            <div className="customs-box-content">
              <div className="customs-row"><div className="customs-label-cell">(8) Importer Type:</div><div className="customs-value-cell"><input className="editable-input" value={d.importer.type} onChange={e => updateNestedField('customs', 'importer', 'type', e.target.value)} /></div></div>
              <div className="customs-row"><div className="customs-label-cell">(9) Contact Name:</div><div className="customs-value-cell"><input className="editable-input" value={d.importer.name} onChange={e => updateNestedField('customs', 'importer', 'name', e.target.value)} /></div></div>
              <div className="customs-row"><div className="customs-label-cell">(10) Company Name:</div><div className="customs-value-cell"><input className="editable-input" value={d.importer.company} onChange={e => updateNestedField('customs', 'importer', 'company', e.target.value)} /></div></div>
              <div className="customs-row" style={{ height: '100px' }}><div className="customs-label-cell">(11) Address:</div><div className="customs-value-cell"><textarea className="editable-input h-full" rows="4" value={d.importer.address} onChange={e => updateNestedField('customs', 'importer', 'address', e.target.value)} /></div></div>

              <div className="customs-row"><div className="customs-label-cell">(16) Contact Number:</div><div className="customs-value-cell"><input className="editable-input" value={d.importerDetails.phone} onChange={e => updateNestedField('customs', 'importerDetails', 'phone', e.target.value)} /></div></div>
              <div className="customs-row"><div className="customs-label-cell">(17) Contact Email:</div><div className="customs-value-cell"><input className="editable-input" value={d.importerDetails.email} onChange={e => updateNestedField('customs', 'importerDetails', 'email', e.target.value)} /></div></div>
              <div className="customs-row"><div className="customs-label-cell">(18) VAT Number:</div><div className="customs-value-cell"><input className="editable-input" value={d.importerDetails.vat} onChange={e => updateNestedField('customs', 'importerDetails', 'vat', e.target.value)} /></div></div>
              <div className="customs-row"><div className="customs-label-cell">(19) EORI Number:</div><div className="customs-value-cell"><input className="editable-input" value={d.importerDetails.eori} onChange={e => updateNestedField('customs', 'importerDetails', 'eori', e.target.value)} /></div></div>
            </div>
          </div>
        </div>

        <div className="mb-2 font-bold text-sm">CONSIGNMENT CONTENTS:</div>
        <div className="grid grid-cols-3 border border-black mb-1">
          <div className="border-r border-black p-1 text-[10px] font-bold flex flex-col">
            <span>(20) Number of Parcels:</span>
            <input className="editable-input" value="1" />
          </div>
          <div className="border-r border-black p-1 text-[10px] font-bold flex flex-col">
            <span>(21) Total Net Weight:</span>
            <span className="text-sm">{totalWeight.toFixed(2)} KG</span>
          </div>
          <div className="p-1 text-[10px] font-bold flex flex-col">
            <span>(22) Total Gross Weight:</span>
            <input className="editable-input" value={(totalWeight + 0.5).toFixed(2)} />
          </div>
        </div>

        <table className="customs-table">
          <thead>
            <tr>
              <th width="30%">(23) Full Description</th>
              <th width="10%">(24) No. Items</th>
              <th width="15%">(25) Tariff Code</th>
              <th width="10%">(26) Man. Country</th>
              <th width="10%">(27) Net Weight</th>
              <th width="10%">(28) Item Value</th>
              <th width="15%">(29) Total Value</th>
            </tr>
          </thead>
          <tbody>
            {d.items.map((item, i) => (
              <tr key={i}>
                <td><input className="editable-input" value={item.desc} onChange={e => updateItem('customs', i, 'desc', e.target.value)} /></td>
                <td><input className="editable-input" type="number" value={item.qty} onChange={e => updateItem('customs', i, 'qty', e.target.value)} /></td>
                <td><input className="editable-input" value={item.tariff} onChange={e => updateItem('customs', i, 'tariff', e.target.value)} /></td>
                <td><input className="editable-input" value={item.country} onChange={e => updateItem('customs', i, 'country', e.target.value)} /></td>
                <td><input className="editable-input" type="number" value={item.weight} onChange={e => updateItem('customs', i, 'weight', e.target.value)} /></td>
                <td><input className="editable-input" type="number" value={item.value} onChange={e => updateItem('customs', i, 'value', e.target.value)} /></td>
                <td className="text-right">${(item.qty * item.value).toFixed(2)}</td>
              </tr>
            ))}
             <tr className="no-print">
              <td colSpan="7"><button onClick={() => addItem('customs')} className="text-blue-600 text-[10px] font-bold">+ Add Item</button></td>
            </tr>
          </tbody>
        </table>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <div className="grid grid-cols-2 border border-black mb-1">
              <span className="p-1 text-[10px] font-bold border-r border-black">(30) Export Reason:</span>
              <input className="editable-input" value={d.exportReason} onChange={e => updateField('customs', 'exportReason', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 border border-black mb-1">
              <span className="p-1 text-[10px] font-bold border-r border-black">(31) Detailed Reason:</span>
              <input className="editable-input" value={d.detailedReason} onChange={e => updateField('customs', 'detailedReason', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 border border-black mb-1">
              <span className="p-1 text-[10px] font-bold border-r border-black">(32) Delivery Terms:</span>
              <input className="editable-input" value={d.deliveryTerms} onChange={e => updateField('customs', 'deliveryTerms', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 border border-black">
              <span className="p-1 text-[10px] font-bold border-r border-black">(33) IOSS:</span>
              <input className="editable-input" value={d.ioss} onChange={e => updateField('customs', 'ioss', e.target.value)} />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 border border-black mb-1">
              <span className="p-1 text-[10px] font-bold border-r border-black">(34) Shipping Value:</span>
              <input className="editable-input text-right" type="number" value={d.shippingValue} onChange={e => updateField('customs', 'shippingValue', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 border border-black mb-1">
              <span className="p-1 text-[10px] font-bold border-r border-black">(35) Insurance Value:</span>
              <input className="editable-input text-right" type="number" value={d.insuranceValue} onChange={e => updateField('customs', 'insuranceValue', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 border-2 border-black bg-gray-100">
              <span className="p-1 text-[10px] font-bold border-r border-black">(36) Total Value:</span>
              <span className="p-1 text-right font-bold">${(totalItemsValue + Number(d.shippingValue) + Number(d.insuranceValue)).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border border-black p-4 text-[11px]">
          <p className="mb-2">I declare that the above information is true and correct to the best of my knowledge.</p>
          <p className="mb-2">I declare as the exporter, that the products within this shipment are not subject to any export or import prohibitions & restrictions.</p>
          <p className="mb-6">The undersigned exporter declares that, except where otherwise clearly indicated, these products are of United Kingdom preferential origin.</p>
          
          <div className="grid grid-cols-2 gap-10 mt-10">
            <div>
              <div className="border-b border-black mb-1"></div>
              <span className="text-[10px]">Signature:</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="border-b border-black mb-1 h-6"></div>
                <span className="text-[10px]">Date:</span>
              </div>
              <div>
                <div className="border-b border-black mb-1 h-6"></div>
                <span className="text-[10px]">Print Name:</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPackingSlip = () => {
    const d = data.packing;
    const totalPallets = d.items.reduce((acc, item) => acc + Number(item.pallets || 0), 0);
    const totalBags = d.items.reduce((acc, item) => acc + Number(item.bags || 0), 0);

    return (
      <div className="template-paper packing-slip-new">
        <div className="packing-new-header">
          <div className="packing-new-logo-section">
            <div className="invoice-fly-logo-container no-print-padding">
              <div className="relative group logo-wrapper">
                {logo ? (
                  <>
                    <img src={logo} alt="Logo" className="invoice-custom-logo" />
                    <div className="logo-actions no-print">
                      <label className="logo-action-btn edit">
                        Change
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </label>
                      <button 
                        className="logo-action-btn delete"
                        onClick={() => { setLogo(null); localStorage.removeItem('tenneco_custom_logo'); }}
                      >
                        Remove
                      </button>
                    </div>
                  </>
                ) : (
                  <label className="no-print block text-xs text-blue-600 cursor-pointer hover:underline">
                    + Upload Logo
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                )}
              </div>
            </div>
            
            <div className="packing-new-recipient">
              <textarea 
                className="editable-input font-bold" 
                rows="5" 
                value={d.recipient} 
                onChange={e => updateField('packing', 'recipient', e.target.value)} 
              />
            </div>
          </div>

          <div className="packing-new-title-section text-right">
            <h1 className="packing-new-title">PACKING LIST</h1>
            <div className="packing-new-date-box mt-10">
              <div className="text-gray-400 font-bold text-sm">DATE</div>
              <input 
                className="editable-input text-right text-gray-500 font-bold border-none bg-transparent p-0" 
                value={d.date} 
                onChange={e => updateField('packing', 'date', e.target.value)} 
              />
            </div>
          </div>
        </div>

        <div className="packing-new-meta-table mt-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-[10px] font-bold text-gray-500 uppercase w-1/4">SHIP-TO (CFR)</th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold text-gray-500 uppercase w-1/4">REFERENCE</th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold text-gray-500 uppercase w-1/4">ORDER NUMBER</th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold text-gray-500 uppercase w-1/4">B/L NUMBER</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2"><input className="editable-input text-[11px] text-center" value={d.shipToCfr} onChange={e => updateField('packing', 'shipToCfr', e.target.value)} /></td>
                <td className="border border-gray-300 p-2"><input className="editable-input text-[11px] text-center" value={d.reference} onChange={e => updateField('packing', 'reference', e.target.value)} /></td>
                <td className="border border-gray-300 p-2"><input className="editable-input text-[11px] text-center" value={d.orderNumber} onChange={e => updateField('packing', 'orderNumber', e.target.value)} /></td>
                <td className="border border-gray-300 p-2"><input className="editable-input text-[11px] text-center" value={d.blNumber} onChange={e => updateField('packing', 'blNumber', e.target.value)} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <hr className="my-12 border-gray-300 no-print-margin" />

        <div className="packing-new-items-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-[10px] font-bold text-gray-500 uppercase text-center">DESCRIPTION</th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold text-gray-500 uppercase w-20">PALLETS</th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold text-gray-500 uppercase w-20">BAGS</th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold text-gray-500 uppercase w-32">TOTAL NW</th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold text-gray-500 uppercase w-32">TOTAL GW</th>
              </tr>
            </thead>
            <tbody>
              {d.items.map((item, i) => (
                <tr key={i} className="group">
                  <td className="border border-gray-300 p-2 relative">
                    <textarea 
                      className="editable-input text-[11px] resize-none overflow-hidden min-h-[40px] w-full block" 
                      rows="1" 
                      value={item.desc} 
                      onChange={e => {
                        updateItem('packing', i, 'desc', e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                      onFocus={e => {
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                    />
                    <button 
                      onClick={() => removeItem('packing', i)}
                      className="absolute -left-8 top-1/2 -translate-y-1/2 text-red-500 opacity-0 group-hover:opacity-100 no-print p-2 font-bold text-lg"
                      title="Remove Item"
                    >
                      ×
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2"><input className="editable-input text-[11px] text-center" type="number" value={item.pallets} onChange={e => updateItem('packing', i, 'pallets', e.target.value)} /></td>
                  <td className="border border-gray-300 p-2"><input className="editable-input text-[11px] text-center" type="number" value={item.bags} onChange={e => updateItem('packing', i, 'bags', e.target.value)} /></td>
                  <td className="border border-gray-300 p-2"><input className="editable-input text-[11px] text-center font-bold" value={item.totalNw} onChange={e => updateItem('packing', i, 'totalNw', e.target.value)} /></td>
                  <td className="border border-gray-300 p-2"><input className="editable-input text-[11px] text-center font-bold" value={item.totalGw} onChange={e => updateItem('packing', i, 'totalGw', e.target.value)} /></td>
                </tr>
              ))}
              <tr className="bg-white">
                <td className="border border-gray-300 p-2 font-bold text-[11px] uppercase">TOTAL</td>
                <td className="border border-gray-300 p-2 text-center font-bold text-[11px]">{totalPallets}</td>
                <td className="border border-gray-300 p-2 text-center font-bold text-[11px]"><span className="bg-yellow-300 px-2 py-1">{totalBags}</span></td>
                <td className="border border-gray-300 p-2 text-center font-bold text-[11px]">{d.items.length === 1 ? d.items[0].totalNw : '-'}</td>
                <td className="border border-gray-300 p-2 text-center font-bold text-[11px]">{d.items.length === 1 ? d.items[0].totalGw : '-'}</td>
              </tr>
              <tr className="no-print">
                <td colSpan="5" className="p-2">
                  <button onClick={() => addItem('packing')} className="text-blue-600 text-xs font-bold">+ Add Item</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="packing-new-summary mt-12 flex justify-between items-start">
          <div className="w-1/2 pl-12">
            <div className="mb-4">
              <span className="text-[14px] font-medium flex items-center gap-1">HS: <input className="editable-input w-32 border-none p-0 bg-transparent font-medium" value={d.hsCode} onChange={e => updateField('packing', 'hsCode', e.target.value)} /></span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center w-80">
                <input className="editable-input w-40 text-[14px] font-bold uppercase border-none p-0 bg-transparent" value={d.summaryBagsLabel} onChange={e => updateField('packing', 'summaryBagsLabel', e.target.value)} />
                <input className="editable-input w-32 text-[14px] font-bold text-right border-none p-0 bg-transparent" value={d.summaryBags} onChange={e => updateField('packing', 'summaryBags', e.target.value)} />
              </div>
              <div className="flex justify-between items-center w-80">
                <input className="editable-input w-40 text-[14px] font-bold uppercase border-none p-0 bg-transparent" value={d.summaryPalletsLabel} onChange={e => updateField('packing', 'summaryPalletsLabel', e.target.value)} />
                <input className="editable-input w-32 text-[14px] font-bold text-right border-none p-0 bg-transparent" value={d.summaryPallets} onChange={e => updateField('packing', 'summaryPallets', e.target.value)} />
              </div>
              <div className="flex justify-between items-center w-80">
                <input className="editable-input w-40 text-[14px] font-bold uppercase border-none p-0 bg-transparent" value={d.summaryNetWeightLabel} onChange={e => updateField('packing', 'summaryNetWeightLabel', e.target.value)} />
                <input className="editable-input w-32 text-[14px] font-bold text-right border-none p-0 bg-transparent" value={d.summaryNetWeight} onChange={e => updateField('packing', 'summaryNetWeight', e.target.value)} />
              </div>
              <div className="flex justify-between items-center w-80">
                <input className="editable-input w-40 text-[14px] font-bold uppercase border-none p-0 bg-transparent" value={d.summaryGrossWeightLabel} onChange={e => updateField('packing', 'summaryGrossWeightLabel', e.target.value)} />
                <input className="editable-input w-32 text-[14px] font-bold text-right border-none p-0 bg-transparent" value={d.summaryGrossWeight} onChange={e => updateField('packing', 'summaryGrossWeight', e.target.value)} />
              </div>
            </div>
          </div>
          
          <div className="border border-gray-300 w-[380px] h-60 mr-4">
            {/* Right side empty box as in image */}
          </div>
        </div>

        <div className="packing-new-footer">
          <div className="text-[13px] text-gray-700 leading-relaxed text-center w-full">
            <input className="editable-input text-center w-full p-0 border-none bg-transparent" value={d.footerInfo1} onChange={e => updateField('packing', 'footerInfo1', e.target.value)} />
            <input className="editable-input text-center w-full p-0 border-none bg-transparent mt-2" value={d.footerInfo2} onChange={e => updateField('packing', 'footerInfo2', e.target.value)} />
            <div className="mt-3 bg-gray-100 px-8 py-1.5 rounded-full inline-block mx-auto min-w-[650px]">
              <input className="editable-input text-center w-full p-0 border-none bg-transparent font-medium" value={d.footerInfo3} onChange={e => updateField('packing', 'footerInfo3', e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="login-screen">
        <Helmet>
          <title>Login - Document Templates</title>
        </Helmet>
        <div className="login-card">
          <h1>Welcome Back</h1>
          <p>Please login to access the invoicing system.</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                required 
                value={loginForm.email} 
                onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                placeholder="admin@templates.com"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                required 
                value={loginForm.password} 
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="templates-container">
      <Helmet>
        <title>Document Templates</title>
        <meta name="description" content="Generate and manage packing slips, invoices, and customs invoices." />
      </Helmet>

      <div className="templates-header">
        <div className="template-selector">
          <button 
            className={`template-btn ${activeTemplate === 'invoice' ? 'active' : ''}`}
            onClick={() => setActiveTemplate('invoice')}
          >
            Invoice
          </button>
          <button 
            className={`template-btn ${activeTemplate === 'packing' ? 'active' : ''}`}
            onClick={() => setActiveTemplate('packing')}
          >
            Packing Slip
          </button>
          <button 
            className={`template-btn ${activeTemplate === 'customs' ? 'active' : ''}`}
            onClick={() => setActiveTemplate('customs')}
          >
            Customs Invoice
          </button>
        </div>

        <div className="action-btns">
          <button className="action-btn" onClick={handleSave}>
            <Save size={18} /> Save
          </button>
          <button className="action-btn" onClick={handlePrint}>
            <Printer size={18} /> Print / PDF
          </button>
          <button className="action-btn text-red-400" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="template-viewer">
        {activeTemplate === 'invoice' && renderInvoiceFly()}
        {activeTemplate === 'packing' && renderPackingSlip()}
        {activeTemplate === 'customs' && renderCustomsInvoice()}
      </div>
    </div>
  );
};

export default Templates;
