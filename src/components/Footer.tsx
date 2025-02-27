import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white p-4 text-center text-sm">
      <div className="container mx-auto">
        <p>
          &copy; {new Date().getFullYear()} TableConv - テーブル形式変換ツール
        </p>
        <p className="text-slate-400 mt-1">
          CSV, JSON, Markdown, HTML, TeXの相互変換が可能なオープンソースツール
        </p>
      </div>
    </footer>
  );
};

export default Footer;
