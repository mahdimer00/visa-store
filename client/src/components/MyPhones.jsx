import { useState } from 'react';

function MyPhones() {
  const [customerPhone, setCustomerPhone] = useState('');
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setTickets([]);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets?customerPhone=${customerPhone}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.length === 0) {
        setError('لا توجد تذاكر مرتبطة برقم الهاتف هذا.');
      } else {
        setTickets(data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setError('فشل العثور على التذاكر. تحقق من رقم الهاتف أو اتصال الخادم.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">تتبع هواتفي</h2>
      {error && <p className="text-accent mb-4 text-center">{error}</p>}
      <form onSubmit={handleSearch} className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          placeholder="أدخل رقم هاتفك (مثال: 0501234567)"
          className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="submit" className="bg-primary text-white p-3 rounded-md hover:bg-blue-700 transition-colors">
          بحث
        </button>
      </form>
      {tickets.length > 0 && (
        <div className="space-y-6">
          {tickets.map((ticket) => (
            <div key={ticket.ticketId} className="border border-gray-200 p-4 rounded-md shadow-sm">
              <p className="font-semibold">رقم التذكرة: {ticket.ticketId}</p>
              <p>نوع الهاتف: {ticket.phoneType === 'android' ? 'أندرويد' : 'آيفون'}</p>
              <p>اسم الهاتف: {ticket.phoneModel}</p>
              <p>اسم العميل: {ticket.customerName}</p>
              <p>رقم الهاتف: {ticket.customerPhone}</p>
              <p>المشكلة: {ticket.issue}</p>
              <p className="font-semibold">الحالة: {ticket.status}</p>
              {ticket.status === 'خطأ' && <p>سبب الخطأ: {ticket.errorReason}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPhones;