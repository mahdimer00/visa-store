import { useState, useEffect } from 'react';

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [editingTicket, setEditingTicket] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [updatedErrorReason, setUpdatedErrorReason] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setError('فشل تحميل التذاكر. تحقق من اتصال الخادم.');
    }
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket.ticketId);
    setUpdatedStatus(ticket.status);
    setUpdatedErrorReason(ticket.errorReason);
  };

  const handleUpdate = async (ticketId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tickets/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: updatedStatus, errorReason: updatedErrorReason }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setEditingTicket(null);
      fetchTickets(); // Refresh list
    } catch (error) {
      console.error('Error updating ticket:', error);
      setError('فشل تحديث التذكرة.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-primary">قائمة التذاكر</h2>
      {error && <p className="text-accent mb-4">{error}</p>}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم التذكرة</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نوع الهاتف</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم الهاتف</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اسم العميل</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الهاتف</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المشكلة</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">سبب الخطأ</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <tr key={ticket.ticketId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.ticketId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.phoneType === 'android' ? 'أندرويد' : 'آيفون'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.phoneModel}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.customerName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.customerPhone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.issue}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {editingTicket === ticket.ticketId ? (
                  <select
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                    className="p-2 border rounded-md"
                  >
                    <option value="لم يتم الصيانة بعد">لم يتم الصيانة بعد</option>
                    <option value="قيد الصيانة">قيد الصيانة</option>
                    <option value="اكتملت الصيانة">اكتملت الصيانة</option>
                    <option value="خطأ">خطأ</option>
                  </select>
                ) : (
                  ticket.status
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {editingTicket === ticket.ticketId && updatedStatus === 'خطأ' ? (
                  <input
                    type="text"
                    value={updatedErrorReason}
                    onChange={(e) => setUpdatedErrorReason(e.target.value)}
                    className="p-2 border rounded-md"
                  />
                ) : (
                  ticket.errorReason
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {editingTicket === ticket.ticketId ? (
                  <button onClick={() => handleUpdate(ticket.ticketId)} className="text-secondary hover:underline">
                    حفظ
                  </button>
                ) : (
                  <button onClick={() => handleEdit(ticket)} className="text-primary hover:underline">
                    تعديل
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketList;