// Imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component
function Login({ onLogin }) {
  // State Management
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(username, password)) {
      navigate('/admin');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  // Render
  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-auto animate-slide-up">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">تسجيل دخول الإدارة</h2>
      
      {/* Error Message */}
      {error && <p className="text-accent mb-4 text-center">{error}</p>}
      
      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">اسم المستخدم</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            required
          />
        </div>
        <button type="submit" className="w-full bg-primary text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
}

// Export
export default Login;