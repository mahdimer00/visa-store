// Imports
import { useState } from 'react';
import QRCode from 'qrcode.react';

// Component
function TicketForm() {
  // State Management
  const [formData, setFormData] = useState({
    phoneType: 'android',
    phoneModel: '',
    customerName: '',
    customerPhone: '',
    issue: '',
    status: 'لم يتم الصيانة بعد',
    errorReason: ''
  });
  const [ticketId, setTicketId] = useState(null);
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState(null);

  // Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTicketId(data.ticketId);
      setQrCode(`${window.location.origin}/public-track?ticketId=${data.ticketId}`);
    } catch (error) {
      console.error('Error creating ticket:', error);
      setError('فشل إنشاء التذكرة. تحقق من اتصال الخادم.');
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>طباعة تذكرة الصيانة</title>
          <style>
            body { font-family: 'Noto Sans Arabic', sans-serif; text-align: center; direction: rtl; margin: 0; padding: 20px; }
            .ticket { margin: 20px auto; padding: 20px; border: 1px solid #000; max-width: 300px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
            .qr-code { margin: 15px 0; }
            h2 { font-size: 1.5rem; color: #1D4ED8; }
            p { font-size: 1rem; margin: 8px 0; }
            .divider { border-top: 2px dashed #000; margin: 20px 0; }
          </style>
        </head>
        <body onload="window.print()">
          <div class="ticket">
            <h2>تذكرة صيانة - Visa Store</h2>
            <p>رقم التذكرة: ${ticketId}</p>
            <p>نوع الهاتف: ${formData.phoneType === 'android' ? 'أندرويد' : 'آيفون'}</p>
            <p>اسم الهاتف: ${formData.phoneModel}</p>
            <p>اسم العميل: ${formData.customerName}</p>
            <p>رقم الهاتف: ${formData.customerPhone}</p>
            <p>المشكلة: ${formData.issue}</p>
            <div class="qr-code">
              <img src="${document.getElementById('qr-code').toDataURL()}" alt="QR Code" />
            </div>
            <p>تذكرة العميل</p>
          </div>
          <div class="divider"></div>
          <div class="ticket">
            <h2>تذكرة صيانة - Visa Store (للصق على الهاتف)</h2>
            <p>رقم التذكرة: ${ticketId}</p>
            <p>اسم العميل: ${formData.customerName}</p>
            <div class="qr-code">
              <img src="${document.getElementById('qr-code').toDataURL()}" alt="QR Code" />
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Render
  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl animate-slide-up">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">إنشاء تذكرة صيانة</h2>
      
      {/* Error Message */}
      {error && <p className="text-accent mb-4 text-center">{error}</p>}
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">نوع الهاتف</label>
          <select
            value={formData.phoneType}
            onChange={(e) => setFormData({ ...formData, phoneType: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="android">أندرويد</option>
            <option value="iphone">آيفون</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">اسم الهاتف</label>
          <input
            type="text"
            value={formData.phoneModel}
            onChange={(e) => setFormData({ ...formData, phoneModel: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">اسم العميل</label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">رقم الهاتف</label>
          <input
            type="text"
            value={formData.customerPhone}
            onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">المشكلة</label>
          <textarea
            value={formData.issue}
            onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">حالة الصيانة</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="لم يتم الصيانة بعد">لم يتم الصيانة بعد</option>
            <option value="قيد الصيانة">قيد الصيانة</option>
            <option value="اكتملت الصيانة">اكتملت الصيانة</option>
            <option value="خطأ">خطأ</option>
          </select>
        </div>
        {formData.status === 'خطأ' && (
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">سبب الخطأ</label>
            <input
              type="text"
              value={formData.errorReason}
              onChange={(e) => setFormData({ ...formData, errorReason: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        )}
        <button type="submit" className="w-full bg-primary text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          إنشاء تذكرة
        </button>
      </form>
      
      {/* QR Code and Print Button */}
      {ticketId && (
        <div className="mt-8 text-center">
          <p className="font-semibold text-lg mb-4">رقم التذكرة: {ticketId}</p>
          <div className="mx-auto w-fit p-4 bg-gray-100 rounded-lg">
            <QRCode id="qr-code" value={qrCode} size={160} />
          </div>
          <button
            onClick={handlePrint}
            className="mt-6 bg-secondary text-white p-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            طباعة التذكرة
          </button>
        </div>
      )}
    </div>
  );
}

// Export
export default TicketForm;