// Imports
import { useState } from 'react';

// Component
function TicketById() {
  // State Management
  const [ticketId, setTicketId] = useState('');
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);

  // Handlers
  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setTicket(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets/${ticketId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTicket(data);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      setError('فشل العثور على التذكرة. تحقق من رقم التذكرة أو اتصال الخادم.');
    }
  };

  // Render
  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg mx-auto animate-slide-up">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">تتبع تذكرة الصيانة</h2>
      
      {/* Error Message */}
      {error && <p className="text-accent mb-4 text-center">{error}</p>}
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6 flex flex-col gap-4">
        <input
          type="text"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          placeholder="أدخل رقم التذكرة (مثال: VS-1)"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        <button type="submit" className="bg-primary text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          بحث
        </button>
      </form>
      
      {/* Ticket Details */}
      {ticket && (
        <div className="border border-gray-200 p-6 rounded-lg shadow-sm bg-gray-50">
          <p className="font-semibold text-lg">رقم التذكرة: {ticket.ticketId}</p>
          <p>نوع الهاتف: {ticket.phoneType === 'android' ? 'أندرويد' : 'آيفون'}</p>
          <p>اسم الهاتف: {ticket.phoneModel}</p>
          <p>اسم العميل: {ticket.customerName}</p>
          <p>رقم الهاتف: {ticket.customerPhone}</p>
          <p>المشكلة: {ticket.issue}</p>
          <p className="font-semibold">الحالة: {ticket.status}</p>
          {ticket.status === 'خطأ' && <p>سبب الخطأ: {ticket.errorReason}</p>}
        </div>
      )}
    </div>
  );
}

// Export
export default TicketById;