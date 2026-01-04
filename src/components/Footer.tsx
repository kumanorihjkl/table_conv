import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 text-center text-sm">
      <div className="container mx-auto max-w-5xl">
        <p className="text-slate-500">
          &copy; {new Date().getFullYear()} <a href="https://github.com/kumanorihjkl" className="text-slate-500 hover:text-slate-700 transition-colors">kumanorihjkl</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
