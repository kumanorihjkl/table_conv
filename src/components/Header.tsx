import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="p-4">
      <div className="container mx-auto max-w-5xl flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-slate-500">TableConv</h1>
          <span className="text-sm text-slate-500">
            テーブル形式のデータを相互変換できるツール。ブラウザ内で実行され、サーバーへのデータ送信を行いません。<br/>
            対応形式: CSV, JSON, Markdown, HTML, TeX(出力のみ)
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/kumanorihjkl/table_conv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-700 transition-colors"
            title="GitHub"
          >
            <FaGithub className="text-xl" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
