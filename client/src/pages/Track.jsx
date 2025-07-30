// Imports
import MyPhones from '../components/MyPhones';
import TicketById from '../components/TicketById';

// Component
function Track({ isAdmin }) {
  // Render
  return (
    <div>
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8 text-center text-primary animate-fade-in">
        تتبع طلبات الصيانة
      </h1>
      
      {/* Conditional Content */}
      {isAdmin ? <MyPhones /> : <TicketById />}
    </div>
  );
}

// Export
export default Track;