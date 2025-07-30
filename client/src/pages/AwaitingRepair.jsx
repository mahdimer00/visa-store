// Imports
import { useState, useEffect } from 'react';

// Component
function AwaitingRepair() {
  // State Management
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  // Data Fetching
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets?status=لم يتم الصيانة بعد`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setError('فشل تحميل التذاكر. تحقق من اتصال الخادم.');
    }
  };

  // Render
  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl animate-slide-up">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">هواتفي التي تنتظر الصيانة</h1>
      
      {/* Error Message */}
      {error && <p className="text-accent mb-4 text-center">{error}</p>}
      
      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div key={ticket.ticketId} className="border border-gray-200 p-6 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
            <p className="font-semibold text-lg">رقم التذكرة: {ticket.ticketId}</p>
            <p>نوع الهاتف: {ticket.phoneType === 'android' ? 'أندرويد' : 'آيفون'}</p>
            <p>اسم الهاتف: {ticket.phoneModel}</p>
            <p>اسم العميل: {ticket.customerName}</p>
            <p>رقم الهاتف: {ticket.customerPhone}</p>
            <p>المشكلة: {ticket.issue}</p>
            <p className="font-semibold">الحالة: {ticket.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export
export default AwaitingRepair;