import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';

function Admin() {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">لوحة الإدارة</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TicketForm />
        <TicketList />
      </div>
    </div>
  );
}

export default Admin;