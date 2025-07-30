// Component
function Home() {
  // Render
  return (
    <div className="text-center space-y-12 animate-fade-in">
      {/* Header */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-primary bg-clip-text bg-gradient-to-r from-primary to-blue-700">
        مرحبًا بكم في Visa Store
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
        متخصصون في صيانة الهواتف، فلاشها، وفك تشفيرها بأحدث التقنيات. نضمن خدمة سريعة واحترافية لجميع أنواع الهواتف الأندرويد والآيفون.
      </p>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-semibold mb-4 text-primary">صيانة سريعة</h3>
          <p className="text-gray-600">إصلاح الأعطال في وقت قياسي مع ضمان الجودة.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-semibold mb-4 text-primary">فلاش وتحديث</h3>
          <p className="text-gray-600">ترقية نظام الهاتف وإزالة الفيروسات بكفاءة.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-semibold mb-4 text-primary">تتبع الطلبات</h3>
          <p className="text-gray-600">تابع حالة صيانة هاتفك عبر الإنترنت بسهولة.</p>
        </div>
      </div>
      
      {/* Call to Action */}
      <a
        href="/public-track"
        className="inline-block mt-8 bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
      >
        تتبع تذكرتك الآن
      </a>
    </div>
  );
}

// Export
export default Home;