// Imports
import { Link } from 'react-router-dom';

// Component
function Navbar({ isAdmin, onLogout }) {
  // Render
  return (
    <nav className="bg-gradient-to-r from-primary to-blue-700 text-white py-4 px-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-wide transition-transform transform hover:scale-105">
          Visa Store
        </Link>
        
        {/* Navigation Links */}
        <div className="space-x-6 rtl:space-x-reverse text-lg flex items-center">
          <Link to="/" className="hover:text-gray-200 transition-colors">الرئيسية</Link>
          {isAdmin ? (
            <>
              <Link to="/track" className="hover:text-gray-200 transition-colors">هواتفي</Link>
              <Link to="/awaiting-repair" className="hover:text-gray-200 transition-colors">هواتفي التي تنتظر الصيانة</Link>
              <Link to="/admin" className="hover:text-gray-200 transition-colors">الإدارة</Link>
              <button onClick={onLogout} className="hover:text-gray-200 transition-colors">تسجيل الخروج</button>
            </>
          ) : (
            <Link to="/public-track" className="hover:text-gray-200 transition-colors">تتبع التذكرة</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// Export
export default Navbar;