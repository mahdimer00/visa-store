function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto text-center md:flex md:justify-between md:items-center">
        <div>
          <p className="mb-4 md:mb-0 text-xl font-semibold">Visa Store &copy; 2025</p>
          <p className="text-lg">متخصصون في صيانة وفلاش الهواتف بأحدث التقنيات</p>
        </div>
        <div className="flex justify-center space-x-8 rtl:space-x-reverse mt-6 md:mt-0">
          <a href="https://facebook.com/visastore" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-lg flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>
            فيسبوك
          </a>
          <a href="https://instagram.com/visastore" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-lg flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.227-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 3.528.227.227 3.528.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.225 3.524 3.526 6.825 7.052 6.928 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c3.524-.225 6.825-3.526 6.928-7.052.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.225-3.524-3.526-6.825-7.052-6.928C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
            إنستغرام
          </a>
          <a href="https://twitter.com/visastore" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-lg flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.25 1.9-4.25 4.25 0 .33.04.65.11.96C8.56 9.1 5.87 7.66 4.05 5.55c-.36.62-.56 1.34-.56 2.11 0 1.47.75 2.77 1.88 3.53-.69-.02-1.34-.21-1.91-.52v.05c0 2.06 1.46 3.78 3.4 4.17-.36.1-.73.16-1.12.16-.27 0-.54-.03-.8-.08.54 1.69 2.1 2.92 3.95 2.96-1.45 1.14-3.27 1.82-5.25 1.82-.34 0-.68-.02-1.01-.07 1.88 1.21 4.12 1.92 6.52 1.92 7.82 0 12.1-6.48 12.1-12.1 0-.18 0-.36-.01-.54.83-.6 1.55-1.34 2.12-2.19z"/></svg>
            تويتر
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;